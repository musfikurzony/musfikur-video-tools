const form = document.getElementById("urlForm");
const input = document.getElementById("videoUrl");
const message = document.getElementById("formMessage");
const button = document.getElementById("lookupButton");
const year = document.getElementById("year");
const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");
const result = document.getElementById("videoResult");

year.textContent = new Date().getFullYear();

function extractYouTubeId(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      let id = url.searchParams.get("v");
      if (!id) {
        const parts = url.pathname.split("/").filter(Boolean);
        if (["shorts", "embed", "live"].includes(parts[0])) id = parts[1];
      }
      return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
  } catch {}
  return null;
}

function setMessage(text, type = "") {
  message.textContent = text;
  message.className = "form-hint" + (type ? ` ${type}` : "");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const value = input.value.trim();
  const videoId = extractYouTubeId(value);
  result.hidden = true;

  if (!value) {
    setMessage("Please paste a YouTube video link first.", "error");
    input.focus();
    return;
  }
  if (!videoId) {
    setMessage("This does not look like a supported YouTube video link. Please check the URL.", "error");
    input.focus();
    return;
  }

  button.disabled = true;
  button.textContent = "Looking up…";
  setMessage("Connecting securely to YouTube…");

  try {
    const response = await fetch(`/api/video?id=${encodeURIComponent(videoId)}`);
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Video lookup failed. Please try again.");

    document.getElementById("videoThumbnail").src = data.thumbnail || "";
    document.getElementById("videoTitle").textContent = data.title || "Title unavailable";
    document.getElementById("videoChannel").textContent = data.channelTitle || "Channel unavailable";
    document.getElementById("videoDescription").textContent = data.description || "No description available.";
    document.getElementById("videoPublished").textContent = data.publishedAt
      ? `Published: ${new Date(data.publishedAt).toLocaleDateString()}`
      : "";
    const openLink = document.getElementById("videoOpen");
    openLink.href = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
    result.hidden = false;
    setMessage("Video information loaded successfully.", "success");
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    setMessage(error.message || "Something went wrong. Please try again.", "error");
  } finally {
    button.disabled = false;
    button.innerHTML = 'Get information <span>→</span>';
  }
});

menuButton.addEventListener("click", () => sidebar.classList.toggle("open"));

document.addEventListener("click", (event) => {
  if (window.innerWidth <= 700 &&
      sidebar.classList.contains("open") &&
      !sidebar.contains(event.target) &&
      !menuButton.contains(event.target)) {
    sidebar.classList.remove("open");
  }
});
