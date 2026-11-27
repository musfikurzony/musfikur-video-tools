# Musfikur Video Tools — Stage 2

This update adds public YouTube video information lookup to the existing Cloudflare Pages site.

## Files and folders

- `public/` — website interface, styles and browser JavaScript
- `functions/api/video.js` — server-side Cloudflare Pages Function for YouTube Data API
- `.gitignore`

## Before deploying

In Cloudflare Pages, open the `musfikur-video-tools` project and confirm that `YOUTUBE_API_KEY` is saved as an **encrypted Secret** for the **Production** environment. Never put the key in any file in this repository.

## Deploy by updating the existing GitHub repository

1. Download and extract this ZIP on your computer.
2. Open the existing GitHub repository `musfikur-video-tools`.
3. Replace the existing `public` folder with the `public` folder from this ZIP.
4. Add the `functions` folder from this ZIP at the repository root (same level as `public`).
5. Replace `.gitignore` if GitHub asks.
6. Commit the changes to the `main` branch.
7. Wait for Cloudflare Pages to finish the automatic production deployment.
8. Open `https://musfikur-video-tools.pages.dev/`, paste a public YouTube video URL and click **Get information**.

Important: the repository root must contain both `public/` and `functions/`. Do not put `functions/` inside `public/`.

## Cloudflare Pages build settings

Keep the existing settings:
- Framework preset: None
- Build command: blank
- Build output directory: `public`
- Root directory: `/`

Cloudflare Pages automatically detects the root-level `functions` directory when deploying from Git integration.

## What this stage does

- Supports standard YouTube watch links, youtu.be links, Shorts, embed and live URL formats.
- Retrieves public title, channel, description, publication date and thumbnail.
- Calls YouTube Data API from the server-side Pages Function.
- Reads the encrypted `YOUTUBE_API_KEY` secret from the Production environment.
- Does not download video or audio, bypass restrictions, or retrieve private videos.

## Troubleshooting

- **API key not configured**: confirm `YOUTUBE_API_KEY` is a Secret in the Production environment and redeploy.
- **API request failed**: check that YouTube Data API v3 is enabled, the key is restricted to YouTube Data API v3, and the Google Cloud project has available quota.
- **No public video information found**: the video may be private, removed, age/region restricted or otherwise unavailable through the API.
- **Function not found / 404 on `/api/video`**: confirm `functions/api/video.js` is at repository root, alongside `public`, then commit and redeploy.

Only download content you own or have permission to download, and follow applicable platform terms and copyright rules.
