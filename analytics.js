/************************************
 * Google Analytics – Auto Tracking
 * Versión para webs estáticas S3 + CloudFront
 ************************************/

// >>> Cambia por tu propio ID de Google Analytics <<<
const GA_ID = "G-BSVNN0HTNW";

// Cargar Google Analytics
(function () {
  let gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    dataLayer.push(arguments);
  };
  gtag("js", new Date());
  gtag("config", GA_ID);
})();

/************************************
 * 1. TRACKING: Clicks en botones
 ************************************/
document.addEventListener("click", function (e) {
  let element = e.target.closest("button, .btn");

  if (element) {
    gtag("event", "button_click", {
      button_text: element.innerText.trim().substring(0, 50),
    });
  }
});

/************************************
 * 2. TRACKING: Enlaces externos
 ************************************/
document.addEventListener("click", function (e) {
  let link = e.target.closest("a");
  if (!link) return;

  let href = link.href;

  // Detecta si el enlace es externo
  if (href.startsWith("http") && !href.includes(location.hostname)) {
    gtag("event", "external_link_click", {
      url: href,
    });
  }
});

/************************************
 * 3. TRACKING: Descarga de archivos
 ************************************/
document.addEventListener("click", function (e) {
  let link = e.target.closest("a");
  if (!link) return;

  let url = link.href;
  let extensiones = ["pdf", "zip", "rar", "doc", "docx", "xls", "xlsx"];

  let extension = url.split(".").pop().toLowerCase();

  if (extensiones.includes(extension)) {
    gtag("event", "file_download", {
      file_url: url,
      file_type: extension,
    });
  }
});

/************************************
 * 4. TRACKING: Scroll al 50% y 90%
 ************************************/
let scroll50 = false;
let scroll90 = false;

window.addEventListener("scroll", function () {
  let porcentaje =
    (window.scrollY + window.innerHeight) / document.body.scrollHeight;

  if (!scroll50 && porcentaje >= 0.5) {
    scroll50 = true;
    gtag("event", "scroll_50", { description: "Usuario llegó al 50%" });
  }

  if (!scroll90 && porcentaje >= 0.9) {
    scroll90 = true;
    gtag("event", "scroll_90", { description: "Usuario llegó al 90%" });
  }
});

/************************************
 * 5. TRACKING: Envío de formularios
 ************************************/
document.addEventListener("submit", function (e) {
  let form = e.target;

  gtag("event", "form_submit", {
    form_id: form.id || "sin_id",
    form_action: form.action,
  });
});
