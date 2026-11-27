const form = document.getElementById("urlForm");
const input = document.getElementById("videoUrl");
const message = document.getElementById("formMessage");
const year = document.getElementById("year");
const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");

year.textContent = new Date().getFullYear();

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value.trim();
  message.className = "form-hint";

  if (!value) {
    message.textContent = "Please paste a video link first.";
    message.classList.add("error");
    input.focus();
    return;
  }

  if (!isValidHttpUrl(value)) {
    message.textContent = "That link does not look like a valid web URL. Please check it and try again.";
    message.classList.add("error");
    input.focus();
    return;
  }

  const host = new URL(value).hostname.toLowerCase();
  message.textContent = `Link format looks valid (${host}). Video lookup will be connected in a later stage.`;
  message.classList.add("success");
});

menuButton.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

document.addEventListener("click", (event) => {
  if (window.innerWidth <= 700 &&
      sidebar.classList.contains("open") &&
      !sidebar.contains(event.target) &&
      !menuButton.contains(event.target)) {
    sidebar.classList.remove("open");
  }
});
