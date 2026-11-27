// Cloudflare Pages Function: GET /api/video?id=YOUTUBE_VIDEO_ID
// Store YOUTUBE_API_KEY as an encrypted Pages secret in the Production environment.
export async function onRequestGet({ request, env }) {
  const corsHeaders = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  };

  const respond = (body, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: corsHeaders });

  const apiKey = env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return respond({ error: "The YouTube API key is not configured in Cloudflare Production." }, 500);
  }

  const url = new URL(request.url);
  const videoId = url.searchParams.get("id") || "";
  if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    return respond({ error: "Please provide a valid YouTube video link." }, 400);
  }

  const apiUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
  apiUrl.searchParams.set("part", "snippet");
  apiUrl.searchParams.set("id", videoId);
  apiUrl.searchParams.set("key", apiKey);

  try {
    const apiResponse = await fetch(apiUrl.toString());
    const apiData = await apiResponse.json();

    if (!apiResponse.ok) {
      // Do not return Google's raw error payload or expose the API key.
      return respond({ error: "YouTube API request failed. Please check the API key, API restriction and quota." }, 502);
    }

    const item = apiData.items && apiData.items[0];
    if (!item) {
      return respond({ error: "No public video information was found. The video may be private, removed or unavailable." }, 404);
    }

    const snippet = item.snippet || {};
    const thumbnails = snippet.thumbnails || {};
    const thumbnail =
      (thumbnails.maxres && thumbnails.maxres.url) ||
      (thumbnails.high && thumbnails.high.url) ||
      (thumbnails.medium && thumbnails.medium.url) ||
      (thumbnails.default && thumbnails.default.url) || "";

    return respond({
      videoId,
      title: snippet.title || "",
      channelTitle: snippet.channelTitle || "",
      description: snippet.description || "",
      publishedAt: snippet.publishedAt || "",
      thumbnail
    });
  } catch {
    return respond({ error: "Could not contact YouTube right now. Please try again later." }, 502);
  }
}
