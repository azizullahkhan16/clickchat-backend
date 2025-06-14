(function () {
  // Create iframe container
  const iframe = document.createElement("iframe");
  iframe.src = "http://localhost:3080/widget/chat-ui.html";
  iframe.style.position = "fixed";
  iframe.style.bottom = "90px";
  iframe.style.right = "20px";
  iframe.style.width = "380px";
  iframe.style.height = "600px";
  iframe.style.border = "none";
  iframe.style.zIndex = "10000";
  iframe.style.borderRadius = "16px";
  iframe.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
  iframe.style.display = "none";
  iframe.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  iframe.style.opacity = "0";
  iframe.style.transform = "scale(0.95)";

  document.body.appendChild(iframe);

  // Create launcher button
  const launcher = document.createElement("div");
  launcher.innerHTML = "💬";
  launcher.style.position = "fixed";
  launcher.style.bottom = "20px";
  launcher.style.right = "20px";
  launcher.style.width = "60px";
  launcher.style.height = "60px";
  launcher.style.background = "linear-gradient(135deg, #007bff, #00c4ff)";
  launcher.style.color = "#fff";
  launcher.style.fontSize = "28px";
  launcher.style.textAlign = "center";
  launcher.style.lineHeight = "60px";
  launcher.style.borderRadius = "50%";
  launcher.style.cursor = "pointer";
  launcher.style.zIndex = "10001";
  launcher.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
  launcher.style.transition = "transform 0.2s ease, box-shadow 0.2s ease";
  launcher.style.animation = "pulse 2s infinite";

  document.body.appendChild(launcher);

  // CSS for pulse animation
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    div:hover { transform: scale(1.05); box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
  `;
  document.head.appendChild(style);

  launcher.onclick = function () {
    if (iframe.style.display === "none") {
      iframe.style.display = "block";
      setTimeout(() => {
        iframe.style.opacity = "1";
        iframe.style.transform = "scale(1)";
      }, 10);
    } else {
      iframe.style.opacity = "0";
      iframe.style.transform = "scale(0.95)";
      setTimeout(() => {
        iframe.style.display = "none";
      }, 300);
    }
  };

  // Auto open on first visit
  window.addEventListener("load", () => {
    const opened = localStorage.getItem("chat_widget_opened");
    if (!opened) {
      iframe.style.display = "block";
      setTimeout(() => {
        iframe.style.opacity = "1";
        iframe.style.transform = "scale(1)";
      }, 10);
      localStorage.setItem("chat_widget_opened", "true");
    }
  });
})();
