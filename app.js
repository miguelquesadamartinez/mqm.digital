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
/* app.js - SPA simple que carga data.json y renderiza secciones. Actualizada UI: chips para skills, tecnologías en experiencia e idiomas en contacto. */

let data = null;
const app = document.getElementById("app");
const loading = document.getElementById("loading");
// i18n
const translations = {
  es: {
    nav: {
      about: "Carta de presentación",
      cover: "Carta de presentación",
      experience: "Experiencia",
      education: "Educación",
      skills: "Habilidades",
      contact: "Contacto",
    },
    section: {
      about: "Acerca",
      cover: "Carta de presentación",
      experience: "Experiencia",
      education: "Educación",
      skills: "Habilidades",
      contact: "Contacto",
      languages: "Idiomas",
    },
    loading: "Cargando currículum…",
    footer: "© 2025 Miguel Quesada Martinez",
    meta: {
      title_home:
        "Miguel Quesada Martínez — Ingeniero de Software / Backend - Frontend",
      desc_home:
        "Currículum de Miguel Quesada Martínez — Senior FullStack (PHP, Laravel, Vue.js). 25+ años de experiencia en desarrollo, administración de bases de datos y liderazgo técnico. Basado en Barcelona.",
      title_cover: "Carta de presentación — Miguel Quesada Martínez",
      desc_cover:
        "Con más de 25 años de experiencia en desarrollo de software y gestión de TI. Senior Laravel Developer con trayectoria en España y Brasil.",
    },
    contactButton: "Contactar",
    location: "Ubicación",
    email: "Email",
    phone: "Teléfono",
    website: "Web",
    databases: "Bases de datos",
    version_control: "Control de versiones",
    cookies: {
      text: "Utilizamos cookies para mejorar tu experiencia de navegación y recordar tus preferencias de idioma. Al continuar navegando, aceptas nuestra política de cookies.",
      accept: "Aceptar",
      reject: "Rechazar",
    },
    contact_form: {
      title: "Envíame un mensaje",
      email_label: "Tu email",
      email_placeholder: "tu@email.com",
      subject_label: "Asunto",
      subject_placeholder: "Escribe el asunto...",
      message_label: "Mensaje",
      message_placeholder: "Escribe tu mensaje...",
      send_button: "Enviar mensaje",
      sending: "Enviando...",
      success: "¡Mensaje enviado correctamente!",
      error: "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
    },
  },
  en: {
    nav: {
      about: "Cover Letter",
      cover: "Cover Letter",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      contact: "Contact",
    },
    section: {
      about: "About",
      cover: "Cover Letter",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      contact: "Contact",
      languages: "Languages",
    },
    loading: "Loading resume…",
    footer: "© 2025 Miguel Quesada Martinez",
    meta: {
      title_home:
        "Miguel Quesada Martinez — Software Engineer / Backend - Frontend",
      desc_home:
        "Resume of Miguel Quesada Martínez — Senior FullStack (PHP, Laravel, Vue.js). 25+ years experience in software development, DB administration and technical leadership. Based in Barcelona.",
      title_cover: "Cover Letter — Miguel Quesada Martínez",
      desc_cover:
        "Senior Laravel Developer with over 25 years of experience in software development and systems leadership. Experience in Spain and Brazil.",
    },
    contactButton: "Contact",
    location: "Location",
    email: "Email",
    phone: "Phone",
    website: "Website",
    databases: "Databases",
    version_control: "Version control",
    cookies: {
      text: "We use cookies to improve your browsing experience and remember your language preferences. By continuing to browse, you accept our cookie policy.",
      accept: "Accept",
      reject: "Reject",
    },
    contact_form: {
      title: "Send me a message",
      email_label: "Your email",
      email_placeholder: "your@email.com",
      subject_label: "Subject",
      subject_placeholder: "Write the subject...",
      message_label: "Message",
      message_placeholder: "Write your message...",
      send_button: "Send message",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "Error sending the message. Please try again.",
    },
  },
  pt: {
    nav: {
      cover: "Carta de apresentação",
      about: "Carta de apresentação",
      experience: "Experiência",
      education: "Educação",
      skills: "Competências",
      contact: "Contato",
    },
    section: {
      cover: "Carta de apresentação",
      about: "Sobre",
      experience: "Experiência",
      education: "Educação",
      skills: "Competências",
      contact: "Contato",
      languages: "Idiomas",
    },
    loading: "Carregando currículo…",
    footer: "© 2025 Miguel Quesada Martinez",
    meta: {
      title_home:
        "Miguel Quesada Martínez — Engenheiro de Software / Backend - Frontend",
      desc_home:
        "Currículo de Miguel Quesada Martínez — Senior FullStack (PHP, Laravel, Vue.js). 25+ anos de experiência em desenvolvimento, administração de BD e liderança técnica. Baseado em Barcelona.",
      title_cover: "Carta de apresentação — Miguel Quesada Martínez",
      desc_cover:
        "Com mais de 25 anos de experiência em desenvolvimento de software e liderança de sistemas. Senior Laravel Developer com experiência em Espanha e Brasil.",
    },
    contactButton: "Contactar",
    location: "Localização",
    email: "Email",
    phone: "Telefone",
    website: "Site",
    databases: "Bancos de dados",
    version_control: "Controle de versão",
    cookies: {
      text: "Utilizamos cookies para melhorar sua experiência de navegação e lembrar suas preferências de idioma. Ao continuar navegando, você aceita nossa política de cookies.",
      accept: "Aceitar",
      reject: "Rejeitar",
    },
    contact_form: {
      title: "Envie-me uma mensagem",
      email_label: "Seu email",
      email_placeholder: "seu@email.com",
      subject_label: "Assunto",
      subject_placeholder: "Escreva o assunto...",
      message_label: "Mensagem",
      message_placeholder: "Escreva sua mensagem...",
      send_button: "Enviar mensagem",
      sending: "Enviando...",
      success: "Mensagem enviada com sucesso!",
      error: "Erro ao enviar a mensagem. Por favor, tente novamente.",
    },
  },
};

let currentLang =
  localStorage.getItem("lang") ||
  (navigator.language && navigator.language.startsWith("en")
    ? "en"
    : navigator.language && navigator.language.startsWith("pt")
    ? "pt"
    : "es");

// detect language from path or from a server-provided initializer (window.INIT_LANG)
(function detectInitialLang() {
  const supported = ["es", "en", "pt"];
  const pathSeg = (location.pathname.split("/")[1] || "").toLowerCase();
  if (window.INIT_LANG && supported.includes(window.INIT_LANG)) {
    currentLang = window.INIT_LANG;
  } else if (supported.includes(pathSeg)) {
    currentLang = pathSeg;
  }
})();

function t(key) {
  if (!key) return "";
  const parts = key.split(".");
  let obj = translations[currentLang] || translations.es;
  for (const p of parts) {
    if (obj && Object.prototype.hasOwnProperty.call(obj, p)) obj = obj[p];
    else return key;
  }
  return obj;
}

function setLang(lang) {
  if (!translations[lang]) lang = "es";
  currentLang = lang;
  localStorage.setItem("lang", lang);
  // update nav and any data-i18n elements
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  // update cookie banner texts
  document.querySelectorAll("[data-i18n-cookie]").forEach((el) => {
    const key = el.dataset.i18nCookie;
    const cookieText = t("cookies." + key);
    if (el.tagName === "P") {
      el.textContent = cookieText;
    } else if (el.tagName === "BUTTON") {
      el.textContent = cookieText;
    }
  });
  // update loading and footer
  const ld = document.getElementById("loading");
  if (ld) ld.textContent = t("loading");
  const footer = document.querySelector(".site-footer .container");
  if (footer) footer.textContent = t("footer");
  // mark active button
  document
    .querySelectorAll(".lang-btn")
    .forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
  // re-render current route so section titles update
  renderRoute();
  // update document title and meta description / og tags based on current route
  updateMetaForRoute();
}

function updateMetaForRoute() {
  const hash = location.hash.replace("#", "") || "about";
  const metaInfo = translations[currentLang] && translations[currentLang].meta;
  let title = metaInfo && metaInfo.title_home;
  let desc = metaInfo && metaInfo.desc_home;
  if (hash === "cover") {
    title = (metaInfo && metaInfo.title_cover) || title;
    desc = (metaInfo && metaInfo.desc_cover) || desc;
  }
  if (title) document.title = title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", desc || "");
  // OG / Twitter updates
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (ogTitle) ogTitle.setAttribute("content", title || "");
  if (ogDesc) ogDesc.setAttribute("content", desc || "");
  if (twTitle) twTitle.setAttribute("content", title || "");
  if (twDesc) twDesc.setAttribute("content", desc || "");

  // Update canonical and hreflang alternate links to use language-specific paths
  try {
    const origin = location.origin.replace(/\/$/, "");
    const basePaths = { es: "/es/", en: "/en/", pt: "/pt/" };
    // canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    const basePath = basePaths[currentLang] || "/es/";
    canonical.setAttribute("href", origin + basePath);

    // alternates
    ["es", "en", "pt"].forEach((lg) => {
      let el = document.querySelector(
        'link[rel="alternate"][hreflang="' + lg + '"]'
      );
      if (!el) {
        el = document.createElement("link");
        el.rel = "alternate";
        el.setAttribute("hreflang", lg);
        document.head.appendChild(el);
      }
      el.setAttribute("href", origin + basePaths[lg]);
    });
  } catch (e) {
    console.warn("Could not update canonical/hreflang dynamically", e);
  }
}

// helpers to read localized data from data.json (falls back to original fields)
function L(key) {
  if (!data) return "";
  const root = data.i18n && data.i18n[currentLang];
  return root &&
    Object.prototype.hasOwnProperty.call(root, key) &&
    root[key] !== undefined
    ? root[key]
    : data[key];
}

function localizedEntry(baseArrayName, index) {
  if (!data || !data.i18n) return null;
  const root = data.i18n[currentLang];
  if (root && root[baseArrayName] && root[baseArrayName][index])
    return root[baseArrayName][index];
  return null;
}

async function loadData() {
  try {
    const res = await fetch("data.json?version=1.6");
    data = await res.json();
    loading && loading.remove();
    // insert/update JSON-LD Person schema using loaded data
    try {
      const ld = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: L("name"),
        jobTitle: L("title"),
        url: "https://mqm.digital/",
        image: "/favicon.svg",
        email: data.contact && data.contact.email,
        telephone: data.contact && data.contact.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: data.contact && data.contact.location,
        },
      };
      // remove existing JSON-LD if present
      const existing = document.querySelector(
        'script[type="application/ld+json"][data-generated="true"]'
      );
      if (existing) existing.remove();
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-generated", "true");
      s.text = JSON.stringify(ld, null, 2);
      document.head.appendChild(s);
    } catch (e) {
      console.warn("Could not insert JSON-LD", e);
    }
    renderRoute();
  } catch (e) {
    console.error("Error cargando data.json", e);
    const msg = String(e && e.message ? e.message : e);
    app.innerHTML = `
      <div class="card">
        <strong>Error cargando currículum.</strong>
        <div style="margin-top:8px">Asegúrate de que <code>data.json</code> está disponible en <code>/data.json</code>.</div>
        <div style="margin-top:8px;color:var(--muted);font-size:0.9rem">Detalle: ${escapeHtml(
          msg
        )}</div>
        <div style="margin-top:8px">Si ves un error CORS (Access-Control-Allow-Origin), sirve los archivos desde el mismo origen o configura el servidor para permitir CORS.</div>
      </div>`;
  }
}

function renderRoute() {
  if (!data) return; // Don't render if data is not loaded yet
  const hash = location.hash.replace("#", "") || "about";
  switch (hash) {
    case "cover":
      // cover now unified into About
      renderAbout();
      break;
    case "experience":
      renderExperience();
      break;
    case "education":
      renderEducation();
      break;
    case "skills":
      renderSkills();
      break;
    case "contact":
      renderContact();
      break;
    default:
      renderAbout();
  }
}

function renderHeader() {
  if (!data) return "";
  return `
    <section class="card header" aria-labelledby="profile-name">
      <div style="display:flex;gap:16px;align-items:center">
        <div class="avatar">
          <img src="MiguelQuesada.PNG" alt="${escapeHtml(L("name"))}" />
        </div>
        <div>
          <div id="profile-name" class="h-name">${escapeHtml(L("name"))}</div>
          <div class="h-title">${escapeHtml(L("title"))}</div>
        </div>
      </div>
    </section>
  `;
}

function renderAbout() {
  app.innerHTML = `
    ${renderHeader()}
    <section class="card" id="about-section">
      <h2 class="section-title">${t("section.cover")}</h2>
        <p>${renderInlineBold(L("summary"))}</p>
        ${(() => {
          const text = L("cover_letter") || "";
          const paragraphs = String(text)
            .split(/\n\s*\n/)
            .map((p) => p.trim())
            .filter(Boolean);
          return paragraphs.length
            ? paragraphs.map((p) => `<p>${renderInlineBold(p)}</p>`).join("")
            : "";
        })()}
      <div class="social-links">
        <a class="social" href="https://github.com/miguelquesadamartinez" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="20" height="20"><path d="M12 0.5C5.37.5 0 5.87 0 12.5c0 5.29 3.438 9.77 8.205 11.36.6.11.82-.26.82-.58 0-.29-.01-1.04-.016-2.04-3.338.73-4.042-1.61-4.042-1.61-.546-1.39-1.333-1.76-1.333-1.76-1.09-.75.083-.74.083-.74 1.205.085 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.487.99.108-.78.418-1.3.76-1.6-2.665-.3-5.466-1.33-5.466-5.92 0-1.31.47-2.38 1.235-3.22-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.6-2.804 5.615-5.476 5.91.43.37.823 1.1.823 2.22 0 1.6-.015 2.88-.015 3.27 0 .32.216.694.825.576C20.565 22.27 24 17.79 24 12.5 24 5.87 18.63.5 12 .5z"/></svg>
        </a>
        <a class="social" href="https://www.linkedin.com/in/miguelquesadamartinez" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="20" height="20"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zM8.5 8h3.84v2.2h.05c.54-1.02 1.87-2.1 3.85-2.1 4.12 0 4.88 2.71 4.88 6.24V24h-4v-7.44c0-1.78-.03-4.07-2.48-4.07-2.48 0-2.86 1.94-2.86 3.95V24h-4V8z"/></svg>
        </a>
      </div>
      <p class="meta about-contact">${t("location")}: ${escapeHtml(
    (data.i18n &&
      data.i18n[currentLang] &&
      data.i18n[currentLang].contact &&
      data.i18n[currentLang].contact.location) ||
      data.contact.location
  )} <span class="sep">·</span> <a class="btn" href="mailto:${
    data.contact.email
  }">${t("contactButton")}</a></p>
      ${
        {
          es: `<h3 class='section-title' style='margin-top:12px;font-size:1rem'>Idiomas</h3>\n<div class='languages'>${(data.i18n &&
          data.i18n.es &&
          data.i18n.es.languages
            ? data.i18n.es.languages
            : data.languages
          )
            .map(
              (l) =>
                `<div class='language'><div class='name'>${escapeHtml(
                  l.name
                )}</div><div class='level'>${escapeHtml(l.level)}</div></div>`
            )
            .join("")}</div>`,
          en: `<h3 class='section-title' style='margin-top:12px;font-size:1rem'>Languages</h3>\n<div class='languages'>${(data.i18n &&
          data.i18n.en &&
          data.i18n.en.languages
            ? data.i18n.en.languages
            : data.languages
          )
            .map(
              (l) =>
                `<div class='language'><div class='name'>${escapeHtml(
                  l.name
                )}</div><div class='level'>${escapeHtml(l.level)}</div></div>`
            )
            .join("")}</div>`,
          pt: `<h3 class='section-title' style='margin-top:12px;font-size:1rem'>Idiomas</h3>\n<div class='languages'>${(data.i18n &&
          data.i18n.pt &&
          data.i18n.pt.languages
            ? data.i18n.pt.languages
            : data.languages
          )
            .map(
              (l) =>
                `<div class='language'><div class='name'>${escapeHtml(
                  l.name
                )}</div><div class='level'>${escapeHtml(l.level)}</div></div>`
            )
            .join("")}</div>`,
        }[currentLang]
      }
      ${renderCVDownloadBtn()}
    </section>
  `;
}

function renderCVDownloadBtn() {
  const btns = {
    es: `<a class='cv-download-btn' href='cvs/Curriculum Miguel Quesada.pdf' download>Descargar CV (PDF)</a>`,
    en: `<a class='cv-download-btn' href='cvs/Resume Miguel Quesada.pdf' download>Download Resume (PDF)</a>`,
    pt: `<a class='cv-download-btn' href='cvs/CV Miguel Quesada.pdf' download>Baixar CV (PDF)</a>`,
  };
  return btns[currentLang] || btns.es;
}

// Insert CV download button at the end of all other main sections
function patchSectionWithCV(html) {
  return html + renderCVDownloadBtn();
}

function renderExperience() {
  app.innerHTML = patchSectionWithCV(`
    ${renderHeader()}
    <section class="card" aria-labelledby="exp-title">
      <h2 id="exp-title" class="section-title">${t("section.experience")}</h2>
      <ul class="list">
        ${data.experience
          .map((exp, i) => {
            const lexp = localizedEntry("experience", i) || {};
            const role = lexp.role || exp.role;
            const company = lexp.company || exp.company;
            const period = exp.period;
            const desc = lexp.desc || exp.desc;
            const highlights = lexp.highlights || exp.highlights;
            const technologies = exp.technologies || [];
            const databases = exp.databases || [];
            const version_control = exp.version_control || "";
            return `
          <li>
            <div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap">
              <div><strong>${escapeHtml(role)}</strong> — ${escapeHtml(
              company
            )}</div>
              <div class="meta">${escapeHtml(period)}</div>
            </div>
            <div class="meta">${escapeHtml(desc)}</div>
            ${
              highlights
                ? '<div class="meta">' +
                  highlights.map((h) => `• ${escapeHtml(h)}`).join("<br/>") +
                  "</div>"
                : ""
            }
            ${
              technologies && technologies.length
                ? '<div class="exp-tech">' +
                  technologies
                    .map((t) => `<span class="chip">${escapeHtml(t)}</span>`)
                    .join(" ") +
                  "</div>"
                : ""
            }
            ${
              databases && databases.length
                ? `<div class="exp-meta">${t("databases")}: ` +
                  databases.map((d) => escapeHtml(d)).join(", ") +
                  "</div>"
                : ""
            }
            ${
              version_control
                ? `<div class="exp-meta">${t("version_control")}: ` +
                  escapeHtml(version_control) +
                  "</div>"
                : ""
            }
          </li>`;
          })
          .join("")}
      </ul>
    </section>
  `);
}

function renderEducation() {
  app.innerHTML = patchSectionWithCV(`
    ${renderHeader()}
    <section class="card">
      <h2 class="section-title">${t("section.education")}</h2>
      <ul class="list">
        ${data.education
          .map((ed, i) => {
            const led = localizedEntry("education", i) || {};
            const degree = led.degree || ed.degree;
            const school = led.school || ed.school;
            const period = ed.period;
            return `<li><strong>${escapeHtml(
              degree
            )}</strong><div class="meta">${escapeHtml(school)} — ${escapeHtml(
              period
            )}</div></li>`;
          })
          .join("")}
      </ul>
    </section>
  `);
}

function renderSkills() {
  app.innerHTML = patchSectionWithCV(`
    ${renderHeader()}
    <section class="card">
      <h2 class="section-title">${t("section.skills")}</h2>
      <div class="chips">${(data.i18n &&
      data.i18n[currentLang] &&
      data.i18n[currentLang].skills
        ? data.i18n[currentLang].skills
        : data.skills
      )
        .map((s) => `<span class="chip">${escapeHtml(s)}</span>`)
        .join("")}</div>
    </section>
  `);
}

function renderContact() {
  app.innerHTML = patchSectionWithCV(`
    ${renderHeader()}
    <section class="card">
      <h2 class="section-title">${t("section.contact")}</h2>
      <p class="meta">${t("email")}: <a href="mailto:${
    data.contact.email
  }">${escapeHtml(data.contact.email)}</a></p>
      <p class="meta">${t("phone")}: ${escapeHtml(data.contact.phone)}</p>
      <p class="meta">${t("website")}: <a href="${
    (data.i18n &&
      data.i18n[currentLang] &&
      data.i18n[currentLang].contact &&
      data.i18n[currentLang].contact.website) ||
    data.contact.website
  }" target="_blank" rel="noopener">${escapeHtml(
    (data.i18n &&
      data.i18n[currentLang] &&
      data.i18n[currentLang].contact &&
      data.i18n[currentLang].contact.website) ||
      data.contact.website
  )}</a></p>
      
      <h3 class="section-title" style="margin-top:24px">${t(
        "contact_form.title"
      )}</h3>
      <form id="contact-form" class="contact-form" action="https://api.web3forms.com/submit" method="POST">
        <input type="hidden" name="access_key" value="07a8eaff-9e4c-40e0-b51c-90eeafcf6367">
        <input type="hidden" name="subject" value="Nuevo mensaje desde mqm.digital">
        <input type="hidden" name="from_name" value="Formulario Web mqm.digital">
        <input type="hidden" name="redirect" value="false">
        
        <div class="form-group">
          <label for="contact-email">${t("contact_form.email_label")}</label>
          <input 
            type="email" 
            id="contact-email" 
            name="email" 
            placeholder="${t("contact_form.email_placeholder")}" 
            required
          />
        </div>
        <div class="form-group">
          <label for="contact-subject">${t(
            "contact_form.subject_label"
          )}</label>
          <input 
            type="text" 
            id="contact-subject" 
            name="custom_subject" 
            placeholder="${t("contact_form.subject_placeholder")}" 
            required
          />
        </div>
        <div class="form-group">
          <label for="contact-message">${t(
            "contact_form.message_label"
          )}</label>
          <textarea 
            id="contact-message" 
            name="message" 
            rows="5" 
            placeholder="${t("contact_form.message_placeholder")}" 
            required
          ></textarea>
        </div>
        <button type="submit" class="submit-btn">${t(
          "contact_form.send_button"
        )}</button>
        <div id="form-status" class="form-status"></div>
      </form>
    </section>
  `);

  // Attach form submit handler
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", handleContactFormSubmit);
  }
}

async function handleContactFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const statusDiv = document.getElementById("form-status");
  const submitBtn = form.querySelector(".submit-btn");

  // Disable submit button and show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = t("contact_form.sending");
  statusDiv.textContent = "";
  statusDiv.className = "form-status";

  try {
    const formData = new FormData(form);
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      form.reset();
      statusDiv.textContent = t("contact_form.success");
      statusDiv.className = "form-status success";

      // Clear success message after 5 seconds
      setTimeout(() => {
        statusDiv.textContent = "";
        statusDiv.className = "form-status";
      }, 5000);
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    console.error("Error:", error);
    statusDiv.textContent = t("contact_form.error");
    statusDiv.className = "form-status error";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = t("contact_form.send_button");
  }
}

function renderCoverLetter() {
  const text = L("cover_letter") || "";
  // split into paragraphs by double newlines
  const paragraphs = String(text)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  app.innerHTML = `
    ${renderHeader()}
    <section class="card">
      <h2 class="section-title">${t("section.cover")}</h2>
      ${paragraphs.map((p) => `<p>${renderInlineBold(p)}</p>`).join("")}
    </section>
  `;
}

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function escapeHtml(s) {
  if (!s) return "";
  return String(s).replace(/[&<>"']/g, function (c) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c];
  });
}

// Render inline bold markers written as **bold text** safely.
function renderInlineBold(input) {
  if (input === null || input === undefined) return "";
  const s = String(input);
  let out = "";
  let i = 0;
  while (i < s.length) {
    const start = s.indexOf("**", i);
    if (start === -1) {
      out += escapeHtml(s.slice(i));
      break;
    }
    // append text before **
    out += escapeHtml(s.slice(i, start));
    const end = s.indexOf("**", start + 2);
    if (end === -1) {
      // no closing marker; treat rest as literal
      out += escapeHtml(s.slice(start));
      break;
    }
    const boldText = s.slice(start + 2, end);
    out += "<strong>" + escapeHtml(boldText) + "</strong>";
    i = end + 2;
  }
  return out;
}

window.addEventListener("hashchange", renderRoute);
window.addEventListener("load", loadData);

// initialize i18n UI once DOM is ready: attach language button handlers and set initial language
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-btn").forEach((b) => {
    b.addEventListener("click", () => setLang(b.dataset.lang));
  });
  // set initial language (this will update nav text and footer)
  setLang(currentLang);
});

// Fix layout: move social links + contact line below cover text and above languages
function normalizeAboutLayout() {
  try {
    const aboutSection = document.querySelector("#about-section");
    if (!aboutSection) return;

    const socialLinks = aboutSection.querySelector(".social-links");
    const aboutContact = aboutSection.querySelector(".about-contact");
    const languagesSection = aboutSection.querySelector(".languages");
    const languagesTitle = aboutSection.querySelector(".section-title[style]");

    if (socialLinks && aboutContact && languagesSection && languagesTitle) {
      // Move social links and contact below the cover text
      aboutSection.appendChild(socialLinks);
      aboutSection.appendChild(aboutContact);

      // Ensure languages title and section remain at the bottom
      aboutSection.appendChild(languagesTitle);
      aboutSection.appendChild(languagesSection);
    }
  } catch (e) {
    console.warn("normalizeAboutLayout error:", e);
  }
}

document.addEventListener("DOMContentLoaded", normalizeAboutLayout);
window.addEventListener("hashchange", normalizeAboutLayout);

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
