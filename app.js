/* app.js - Todo el contenido está escrito en el HTML (index.html = ES, en.html, pt.html).
   Este script solo: menú móvil, mostrar la página según el #hash, cambio de idioma y cookies. */

// Hamburguesa: lógica para abrir/cerrar menú en móvil con overlay
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");
  const overlay = document.querySelector(".menu-overlay");
  function closeMenu() {
    nav && nav.classList.remove("open");
    overlay && overlay.classList.remove("open");
    menuBtn && menuBtn.setAttribute("aria-expanded", "false");
  }
  if (menuBtn && nav && overlay) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      overlay.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    overlay.addEventListener("click", closeMenu);
    // Cierra el menú al hacer click en un link
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", closeMenu);
    });
  }
});

// Páginas: cada <div class="page" id="page-xxx"> se muestra según el #hash.
// #drone-architecture, #drone-status... muestran la página del dron y bajan hasta esa tarjeta.
const defaultTitle = document.title;

function showPage(scrollToAnchor = true) {
  let hash = location.hash.replace("#", "") || "about";
  if (hash === "cover") hash = "about"; // ruta antigua
  const pageId = hash.indexOf("drone") === 0 ? "drone" : hash;
  let page = document.getElementById("page-" + pageId);
  if (!page) page = document.getElementById("page-about");

  document.querySelectorAll(".page").forEach((p) => {
    p.hidden = p !== page;
  });
  document.title = page.dataset.title || defaultTitle;

  // pestaña activa en la navegación del dron
  document.querySelectorAll(".drone-jumpnav a").forEach((a) => {
    const active =
      a.getAttribute("href") === "#" + hash ||
      (hash === "drone" && a.getAttribute("href") === "#drone-architecture");
    a.classList.toggle("active", active);
    a.setAttribute("aria-selected", active ? "true" : "false");
  });

  if (scrollToAnchor && hash.indexOf("drone-") === 0) {
    requestAnimationFrame(() => {
      const target = document.getElementById(hash);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

// Cambio de idioma: conserva la página actual (#hash) al saltar a otro idioma
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-btn").forEach((a) => {
    a.addEventListener("click", (ev) => {
      ev.preventDefault();
      location.href = a.getAttribute("href") + location.hash;
    });
  });
  showPage(true);
});
window.addEventListener("hashchange", () => showPage(true));

// Cookie Consent GDPR
(function initCookieConsent() {
  const COOKIE_CONSENT_KEY = "cookieConsent";
  const GA_MEASUREMENT_ID = "G-BSVNN0HTNW";
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const rejectBtn = document.getElementById("cookie-reject");

  if (!banner || !acceptBtn || !rejectBtn) return;

  // Function to load Google Analytics and custom analytics script
  function loadGoogleAnalytics() {
    // Load gtag.js script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      cookie_flags: "SameSite=None;Secure",
    });

    // Load custom analytics.js script
    const analyticsScript = document.createElement("script");
    analyticsScript.src = "/analytics.js";
    analyticsScript.defer = true;
    document.body.appendChild(analyticsScript);
  }

  // Function to disable Google Analytics
  function disableGoogleAnalytics() {
    // Set opt-out flag
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;

    // Clear any existing GA cookies
    const cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
      const [name] = cookie.split("=");
      if (name.trim().startsWith("_ga") || name.trim().startsWith("_gid")) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });
  }

  // Check if user has already made a choice
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);

  if (consent === "accepted") {
    // User previously accepted, load GA
    loadGoogleAnalytics();
  } else if (consent === "rejected") {
    // User previously rejected, disable GA
    disableGoogleAnalytics();
  } else {
    // No decision yet, show banner
    setTimeout(() => {
      banner.classList.add("show");
    }, 1000);
  }

  function hideBanner() {
    banner.classList.remove("show");
    setTimeout(() => {
      banner.style.display = "none";
    }, 300);
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    loadGoogleAnalytics();
    hideBanner();
  });

  rejectBtn.addEventListener("click", () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    disableGoogleAnalytics();
    hideBanner();
  });
})();
