/**
 * Extract YouTube video ID from various URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 */
export function extractYouTubeVideoId(url: string): string | null {
  try {
    const urlObj = new URL(url);

    // youtu.be/VIDEO_ID
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1).split('?')[0];
    }

    // youtube.com/watch?v=VIDEO_ID
    if (urlObj.hostname.includes('youtube.com')) {
      // Check query parameter
      const videoId = urlObj.searchParams.get('v');
      if (videoId) return videoId;

      // Check /embed/VIDEO_ID or /v/VIDEO_ID
      const pathMatch = urlObj.pathname.match(/\/(embed|v)\/([^/?]+)/);
      if (pathMatch) return pathMatch[2];
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Generate YouTube thumbnail URL from video URL
 * Returns maxresdefault (1280x720) if available
 */
export function getYouTubeThumbnail(url: string): string | null {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;

  // Try maxresdefault first (best quality)
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

/**
 * Check if URL is a YouTube URL
 */
export function isYouTubeUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('youtube.com') || urlObj.hostname === 'youtu.be';
  } catch {
    return false;
  }
}

/**
 * Extract Vimeo video ID from URL
 * Supports: https://vimeo.com/VIDEO_ID
 */
export function extractVimeoVideoId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('vimeo.com')) {
      const match = urlObj.pathname.match(/\/(\d+)/);
      if (match) return match[1];
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Get video thumbnail based on URL type
 * Automatically detects YouTube or Vimeo
 */
export function getVideoThumbnail(url: string): string | null {
  if (isYouTubeUrl(url)) {
    return getYouTubeThumbnail(url);
  }

  // Vimeo thumbnails require API call, so return null for now
  // Can be implemented if needed
  return null;
}
