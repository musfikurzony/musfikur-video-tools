# Musfikur Video Tools — Stage 1

A static, responsive dashboard starter for Cloudflare Pages.

## What Stage 1 includes

- Responsive dashboard for desktop and mobile
- Video URL input with basic browser-side URL format validation
- Planned feature cards for video information, transcripts, AI scripts and authorized downloads
- No third-party scripts, ads, analytics, cookies, API keys or external dependencies

## Important limitations

Stage 1 is only the user interface. It does **not** fetch YouTube metadata, extract captions, generate AI scripts, or download videos. A valid-looking URL is not proof that the video is accessible or that downloading is permitted.

Only add download functionality for content you own or are authorized to download, and follow the relevant platform terms and copyright rules.

## Deploy to Cloudflare Pages using Git integration

1. Create a GitHub repository named `musfikur-video-tools`.
2. Upload the contents of this project to the repository root. The `public` folder must remain at the root.
3. Sign in to the Cloudflare dashboard.
4. Open **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
5. Authorize GitHub if asked and select `musfikur-video-tools`.
6. Configure the build:
   - Production branch: `main`
   - Framework preset: `None`
   - Build command: leave blank
   - Build output directory: `public`
   - Root directory: `/` (default)
7. Select **Save and Deploy**.
8. When deployment finishes, open the generated `*.pages.dev` address.

## Updating the website

Edit files in GitHub and commit the changes to `main`. Cloudflare Pages will automatically deploy the new version.

## Local preview (optional)

You do not need to install anything on your office PC. For a local preview, any static HTTP server can serve the `public` directory. The deployed Pages site is the main test environment.

## Suggested next stages

- Stage 2: secure metadata lookup through a server-side API
- Stage 3: permitted transcript/caption retrieval
- Stage 4: AI summary/script integration using a protected server-side API key
- Stage 5: authorized media processing through a separate backend (for example, Cloudflare Containers on a suitable paid plan)
- Stage 6: authentication, job history, retention controls and usage limits
