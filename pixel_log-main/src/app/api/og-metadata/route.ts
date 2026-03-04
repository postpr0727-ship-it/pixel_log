import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { auth } from '@/auth';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'postpr0727@gmail.com';

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

    // 네이버 블로그 전용 처리
    const naverInfo = parseNaverBlogUrl(url);
    if (naverInfo) {
      metadata = await fetchNaverBlogMetadata(naverInfo.blogId, naverInfo.logNo);
    }

    // 일반 사이트 또는 네이버에서 데이터를 못 가져온 경우
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
