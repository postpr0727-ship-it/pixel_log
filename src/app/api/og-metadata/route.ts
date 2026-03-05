import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { auth } from '@/auth';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'postpr0727@gmail.com';

// YouTube URL에서 Video ID 추출
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?&/#]+)/,
    /youtube\.com\/watch\?v=([^?&/#]+)/,
    /youtube\.com\/embed\/([^?&/#]+)/,
    /youtube\.com\/shorts\/([^?&/#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

async function fetchYouTubeMetadata(url: string) {
  const videoId = extractYouTubeId(url);
  if (!videoId) return null;

  // YouTube oEmbed API (API 키 불필요, 공식 무료 API)
  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  const res = await fetch(oembedUrl, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) return null;

  const data = await res.json();

  // maxresdefault 썸네일 시도 → 없으면 hqdefault 사용
  const maxRes = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const hqDefault = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const thumbCheck = await fetch(maxRes, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
  const thumbnail_url = thumbCheck.ok ? maxRes : hqDefault;

  return {
    title: data.title || '',
    description: data.author_name ? `유튜브 채널: ${data.author_name}` : '',
    thumbnail_url,
  };
}

function parseNaverBlogUrl(url: string): { blogId: string; logNo: string } | null {
  // https://blog.naver.com/BLOGID/LOGNO
  const match = url.match(/blog\.naver\.com\/([^/?]+)\/(\d+)/);
  if (match) return { blogId: match[1], logNo: match[2] };

  // https://blog.naver.com/PostView.naver?blogId=X&logNo=Y
  const urlObj = new URL(url);
  const blogId = urlObj.searchParams.get('blogId');
  const logNo = urlObj.searchParams.get('logNo');
  if (blogId && logNo) return { blogId, logNo };

  return null;
}

async function fetchNaverBlogMetadata(blogId: string, logNo: string) {
  const rssUrl = `https://rss.blog.naver.com/${blogId}.xml`;
  const res = await fetch(rssUrl, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) return null;

  const xml = await res.text();
  const $ = cheerio.load(xml, { xmlMode: true });

  const targetLink = `blog.naver.com/${blogId}/${logNo}`;

  let title = '';
  let description = '';
  let thumbnail_url = '';

  $('item').each((_, item) => {
    const link = $(item).find('link').text();
    if (link.includes(targetLink)) {
      title = $(item).find('title').text();
      const descHtml = $(item).find('description').text();
      const desc$ = cheerio.load(descHtml);
      const imgSrc = desc$('img').first().attr('src');
      if (imgSrc) thumbnail_url = imgSrc;
      const textOnly = desc$.text().trim();
      description = textOnly.substring(0, 200);
      return false; // break
    }
  });

  // RSS에 해당 글이 없는 경우 (오래된 글), PostView에서 시도
  if (!title) {
    const postUrl = `https://blog.naver.com/PostView.naver?blogId=${blogId}&logNo=${logNo}&redirect=Dlog&widgetTypeCall=true&directAccess=false`;
    const postRes = await fetch(postUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': `https://blog.naver.com/${blogId}`,
      },
      signal: AbortSignal.timeout(10000),
    });
    if (postRes.ok) {
      const html = await postRes.text();
      const post$ = cheerio.load(html);
      title = post$('meta[property="og:title"]').attr('content') || '';
      description = post$('meta[property="og:description"]').attr('content') || '';
      thumbnail_url = post$('meta[property="og:image"]').attr('content') || '';
    }
  }

  return { title, description, thumbnail_url };
}

async function fetchGenericMetadata(url: string) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html',
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) return null;

  const html = await res.text();
  const $ = cheerio.load(html);

  const title =
    $('meta[property="og:title"]').attr('content') ||
    $('meta[name="twitter:title"]').attr('content') ||
    $('title').text() ||
    '';

  const description =
    $('meta[property="og:description"]').attr('content') ||
    $('meta[name="twitter:description"]').attr('content') ||
    $('meta[name="description"]').attr('content') ||
    '';

  const thumbnail_url =
    $('meta[property="og:image"]').attr('content') ||
    $('meta[name="twitter:image"]').attr('content') ||
    '';

  return { title, description, thumbnail_url };
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    let metadata;

    // 1. YouTube 전용 처리 (oEmbed API)
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      metadata = await fetchYouTubeMetadata(url);
    }

    // 2. 네이버 블로그 전용 처리
    if (!metadata || !metadata.title) {
      const naverInfo = parseNaverBlogUrl(url);
      if (naverInfo) {
        metadata = await fetchNaverBlogMetadata(naverInfo.blogId, naverInfo.logNo);
      }
    }

    // 3. 일반 사이트
    if (!metadata || !metadata.title) {
      metadata = await fetchGenericMetadata(url);
    }

    if (!metadata) {
      return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 400 });
    }

    return NextResponse.json({
      data: {
        title: metadata.title.trim(),
        description: metadata.description.trim(),
        thumbnail_url: metadata.thumbnail_url.trim(),
      },
    });
  } catch (error: any) {
    console.error('Error fetching OG metadata:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch metadata' },
      { status: 500 }
    );
  }
}
