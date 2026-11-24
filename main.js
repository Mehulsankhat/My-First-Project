import "./style.css";
import { supabase, supabaseConfigured } from "./supabase.js";

const school = {
  name: "Government Secondary School",
  place: "Bildi",
  guName: "સરકારી માધ્યમિક શાળા",
  guPlace: "બિલડી",
};

const translations = {
  en: {
    tagline: "Learning today, leading tomorrow",
    home: "Home", about: "About", facilities: "Facilities", notices: "Notices",
    academics: "Academics", gallery: "Gallery", contact: "Contact",
    welcome: "Welcome to",
    heroTitle: "A place to learn, grow and achieve.",
    heroText: "Building knowledge, confidence and strong values for a brighter future.",
    explore: "Explore our school", latest: "Latest notices", viewAll: "View all",
    noticesSub: "Important announcements and updates",
    notice1: "Welcome to the new academic year",
    notice1d: "Students and parents are requested to check the school notice board for the latest instructions.",
    notice2: "Parent–Teacher Meeting",
    notice2d: "Parents are invited to meet teachers and discuss student progress. Please contact the school for the schedule.",
    notice3: "School activities and celebrations",
    notice3d: "Updates about competitions, cultural activities and school celebrations will be shared here.",
    quick: "Quick access", quickSub: "Find the information you need",
    attendance: "Attendance", attendanceD: "Attendance information",
    homework: "Homework", homeworkD: "Class-wise learning tasks",
    results: "Results", resultsD: "Examination information",
    events: "Events", eventsD: "School events and calendar",
    aboutTitle: "About our school",
    aboutText: "Government Secondary School, Bildi is committed to providing a supportive learning environment where every student can develop knowledge, skills and good values.",
    valuesTitle: "Our focus",
    value1: "Quality education", value2: "Student development", value3: "Safe environment",
    galleryTitle: "School life", gallerySub: "A glimpse of learning and activities at our school",
    galleryNote: "Add your school's real photos to the gallery when they are ready.",
    contactTitle: "Contact the school",
    contactSub: "For official information, please contact the school office.",
    address: "Address", addressValue: "Bildi, Mahuva, Bhavnagar, Gujarat, India",
    phone: "Phone", phoneValue: "9316325467",
    email: "Email", emailValue: "mehulsankhat04@gmail.com",
    footer: "All rights reserved.", demo: "Demo information",
    demoText: "This is a starter website. Notices, attendance, homework and results are sample sections until connected to an authorized school database.",
    menu: "Open menu",
  },
  gu: {
    tagline: "આજે શીખીએ, આવતીકાલે આગળ વધીએ",
    home: "હોમ", about: "શાળા વિશે", facilities: "સુવિધાઓ", notices: "સૂચનાઓ",
    academics: "અભ્યાસ", gallery: "ગેલેરી", contact: "સંપર્ક",
    welcome: "આપનું સ્વાગત છે",
    heroTitle: "શીખવા, વિકાસ કરવા અને સફળતા મેળવવાનું સ્થાન.",
    heroText: "ઉજ્જવળ ભવિષ્ય માટે જ્ઞાન, આત્મવિશ્વાસ અને સારા સંસ્કારોનું નિર્માણ.",
    explore: "શાળા વિશે જાણો", latest: "તાજેતરની સૂચનાઓ", viewAll: "બધી જુઓ",
    noticesSub: "મહત્વપૂર્ણ જાહેરાતો અને અપડેટ્સ",
    notice1: "નવા શૈક્ષણિક વર્ષની શુભ શરૂઆત",
    notice1d: "વિદ્યાર્થીઓ અને વાલીઓને નવીનતમ સૂચનાઓ માટે શાળાના નોટિસ બોર્ડની માહિતી તપાસવા વિનંતી.",
    notice2: "વાલી-શિક્ષક બેઠક",
    notice2d: "વિદ્યાર્થીઓની પ્રગતિ અંગે ચર્ચા કરવા વાલીઓને શિક્ષકોને મળવા આમંત્રણ છે. સમય માટે શાળાનો સંપર્ક કરો.",
    notice3: "શાળાની પ્રવૃત્તિઓ અને ઉજવણીઓ",
    notice3d: "સ્પર્ધાઓ, સાંસ્કૃતિક પ્રવૃત્તિઓ અને શાળાના કાર્યક્રમોની માહિતી અહીં આપવામાં આવશે.",
    quick: "ઝડપી માહિતી", quickSub: "જરૂરી માહિતી સરળતાથી મેળવો",
    attendance: "હાજરી", attendanceD: "હાજરીની માહિતી",
    homework: "ઘરકામ", homeworkD: "ધોરણ મુજબ અભ્યાસ કાર્ય",
    results: "પરિણામ", resultsD: "પરીક્ષાની માહિતી",
    events: "કાર્યક્રમો", eventsD: "શાળાના કાર્યક્રમો અને કેલેન્ડર",
    aboutTitle: "અમારી શાળા વિશે",
    aboutText: "સરકારી માધ્યમિક શાળા, બિલડી દરેક વિદ્યાર્થી જ્ઞાન, કૌશલ્ય અને સારા સંસ્કારો વિકસાવી શકે તેવું સહાયક શૈક્ષણિક વાતાવરણ પૂરું પાડવા પ્રતિબદ્ધ છે.",
    valuesTitle: "અમારું ધ્યેય",
    value1: "ગુણવત્તાસભર શિક્ષણ", value2: "વિદ્યાર્થી વિકાસ", value3: "સુરક્ષિત વાતાવરણ",
    galleryTitle: "શાળાનું જીવન", gallerySub: "અમારી શાળાના અભ્યાસ અને પ્રવૃત્તિઓની ઝલક",
    galleryNote: "શાળાના વાસ્તવિક ફોટા તૈયાર થાય ત્યારે અહીં ઉમેરો.",
    contactTitle: "શાળાનો સંપર્ક કરો",
    contactSub: "સત્તાવાર માહિતી માટે શાળા કાર્યાલયનો સંપર્ક કરો.",
    address: "સરનામું", addressValue: "બિલડી, મહુવા, ભાવનગર, ગુજરાત, ભારત",
    phone: "ફોન", phoneValue: "9316325467",
    email: "ઈમેલ", emailValue: "mehulsankhat04@gmail.com",
    footer: "સર્વાધિકાર સુરક્ષિત.", demo: "ડેમો માહિતી",
    demoText: "આ શરૂઆતની વેબસાઇટ છે. અધિકૃત શાળા ડેટાબેઝ સાથે જોડાય ત્યાં સુધી સૂચનાઓ, હાજરી, ઘરકામ અને પરિણામ વિભાગમાં નમૂનાની માહિતી રહેશે.",
    menu: "મેનુ ખોલો",
  },
};

let currentLanguage = "gu";

const icons = {
  attendance: "✓",
  homework: "▤",
  results: "▥",
  events: "▦",
};

function t(key) {
  return translations[currentLanguage][key] ?? key;
}

function render() {
  if (location.hash === "#admin" || location.hash === "#dashboard") {
    renderPortal();
    return;
  }
  document.documentElement.lang = currentLanguage === "gu" ? "gu" : "en";
  document.title = `${school.name}, ${school.place}`;

  document.querySelector("#app").innerHTML = `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="#home" aria-label="${school.name}">
          <img class="brand-logo" src="/school-logo.jpeg" alt="સરકારી માધ્યમિક શાળા, બિલડીનો લોગો" onerror="this.style.display='none'" />
          <div class="brand-copy">
            <strong>${currentLanguage === "gu" ? school.guName : school.name}</strong>
            <span>${currentLanguage === "gu" ? school.guPlace : school.place}</span>
          </div>
        </a>
        <button class="menu-toggle" id="menuToggle" aria-label="${t("menu")}" aria-expanded="false">☰</button>
        <nav class="main-nav" id="mainNav">
          <a href="#home">${t("home")}</a>
          <a href="#about">${t("about")}</a>
          <a href="#notices">${t("notices")}</a>
          <a href="#quick">${t("academics")}</a>
          <a href="#gallery">${t("gallery")}</a>
          <a href="#public-results">${currentLanguage === "gu" ? "પરિણામ" : "Results"}</a>
          <a href="#contact">${t("contact")}</a>
        </nav>
        <a class="staff-login-link" href="#admin">${currentLanguage === "gu" ? "સ્ટાફ લોગિન" : "Staff Login"}</a>
        <button class="language-btn" id="languageToggle" aria-label="Switch language">
          ${currentLanguage === "gu" ? "English" : "ગુજરાતી"}
        </button>
      </div>
    </header>

    <main>
      <section class="hero" id="home">
        <div class="hero-overlay"></div>
        <div class="container hero-content">
          <span class="eyebrow">${t("welcome")}</span>
          <h1>${currentLanguage === "gu" ? school.guName : school.name}<br><span>${currentLanguage === "gu" ? school.guPlace : school.place}</span></h1>
          <p class="hero-tagline">${t("tagline")}</p>
          <p class="hero-description">${t("heroText")}</p>
          <a class="primary-btn" href="#about">${t("explore")} <span aria-hidden="true">→</span></a>
        </div>
        <div class="hero-bottom container">
          <span class="hero-dot"></span><span class="hero-bottom-text">${t("heroTitle")}</span>
        </div>
      </section>

      <section class="section notices-section" id="notices">
        <div class="container">
          <div class="section-heading">
            <div><span class="section-kicker">${t("notices")}</span><h2>${t("latest")}</h2><p>${t("noticesSub")}</p></div>
            <a class="text-link" href="#contact">${t("viewAll")} <span>→</span></a>
          </div>
          <div class="notice-grid">
            ${[1,2,3].map((n, i) => `
              <article class="notice-card">
                <div class="notice-top"><span class="notice-icon">📢</span><span class="notice-label">${currentLanguage === "gu" ? "સૂચના" : "NOTICE"}</span></div>
                <h3>${t(`notice${n}`)}</h3><p>${t(`notice${n}d`)}</p>
                <span class="notice-date">${currentLanguage === "gu" ? "શાળા કાર્યાલય" : "School Office"}</span>
              </article>`).join("")}
          </div>
        </div>
      </section>

      <section class="section quick-section" id="quick">
        <div class="container">
          <div class="section-heading centered"><div><span class="section-kicker">${t("quick")}</span><h2>${t("quick")}</h2><p>${t("quickSub")}</p></div></div>
          <div class="quick-grid">
            ${[
              ["attendance","attendance","attendanceD"],
              ["homework","homework","homeworkD"],
              ["results","results","resultsD"],
              ["events","events","eventsD"],
            ].map(([id,title,desc]) => `
              <a class="quick-card" href="#contact">
                <span class="quick-icon">${icons[id]}</span>
                <span class="quick-title">${t(title)}</span>
                <span class="quick-desc">${t(desc)}</span>
                <span class="quick-arrow">↗</span>
              </a>`).join("")}
          </div>
        </div>
      </section>

      <section class="section about-section" id="about">
        <div class="container about-layout">
          <div class="about-art" aria-label="School illustration">
            <div class="sun"></div><div class="school-illustration">
              <div class="school-roof"></div><div class="school-building"><div class="school-sign">GSS</div><div class="school-windows"><i></i><i></i><i></i></div><div class="school-door"></div></div>
            </div>
            <span class="art-caption">${currentLanguage === "gu" ? "જ્ઞાન • સંસ્કાર • પ્રગતિ" : "KNOWLEDGE • VALUES • PROGRESS"}</span>
          </div>
          <div class="about-copy">
            <span class="section-kicker">${t("about")}</span><h2>${t("aboutTitle")}</h2>
            <p>${t("aboutText")}</p>
            <h3>${t("valuesTitle")}</h3>
            <ul class="value-list"><li>✓ ${t("value1")}</li><li>✓ ${t("value2")}</li><li>✓ ${t("value3")}</li></ul>
          </div>
        </div>
      </section>

      
<section class="section public-results-section" id="public-results">
  <div class="container">
    <div class="section-heading"><div><span class="section-kicker">${currentLanguage === "gu" ? "વિદ્યાર્થી પરિણામ" : "Student Results"}</span><h2>${currentLanguage === "gu" ? "તમારું પરિણામ શોધો" : "Find your result"}</h2><p>${currentLanguage === "gu" ? "GR નંબર, રોલ નંબર, શૈક્ષણિક વર્ષ અને પરીક્ષા દાખલ કરો." : "Enter GR number, roll number, academic year and exam."}</p></div></div>
    <form id="publicResultForm" class="public-result-form">
      <label>GR Number<input id="publicResultGr" required maxlength="40" autocomplete="off" /></label>
      <label>Roll Number<input id="publicResultRoll" required maxlength="20" autocomplete="off" /></label>
      <label>Academic Year<input id="publicResultYear" required maxlength="12" value="2026-27" /></label>
      <label>Exam Name<input id="publicResultExam" required maxlength="100" placeholder="e.g. First Exam" /></label>
      <button type="submit" class="primary-btn">${currentLanguage === "gu" ? "પરિણામ શોધો" : "Search Result"}</button>
    </form>
    <p class="portal-muted" id="publicResultStatus" role="status" aria-live="polite"></p>
    <div id="publicResultOutput"></div>
    <p class="portal-muted">${currentLanguage === "gu" ? "પરિણામ ફક્ત યોગ્ય વિગતો મળ્યા પછી જ દેખાશે. ફોટો ખાનગી હોવાથી જાહેર પરિણામમાં દેખાડવામાં આવતો નથી." : "Results appear only when details match. Private student photos are not displayed publicly."}</p>
  </div>
</section>
<section class="section gallery-section" id="gallery">
    <div class="container">

        <div class="section-heading">
            <div>
                <span class="section-kicker">${t("gallery")}</span>
                <h2>${t("galleryTitle")}</h2>
                <p>${t("gallerySub")}</p>
            </div>
        </div>

        <!-- Public gallery is read-only. Photo management is available in Staff Login. -->
        <!-- PUBLIC PHOTO GALLERY -->
        <div class="gallery-grid" id="publicGalleryGrid">
            <p class="gallery-note">
                ${currentLanguage === "gu"
                ? "શાળાના ફોટા લોડ થઈ રહ્યા છે..."
                : "Loading school photos..."}
            </p>
        </div>

        <p class="gallery-note">
            ${currentLanguage === "gu"
            ? "શાળાના સ્ટાફ દ્વારા અપલોડ કરેલા ફોટા અહીં દેખાશે."
            : "Photos uploaded by school staff appear here."}
        </p>

    </div>
</section>
      <section class="contact-section" id="contact">
        <div class="container">
          <div class="contact-heading"><span class="section-kicker">${t("contact")}</span><h2>${t("contactTitle")}</h2><p>${t("contactSub")}</p></div>
          <div class="contact-grid">
            <div class="contact-item"><span>⌖</span><div><b>${t("address")}</b><p>${t("addressValue")}</p></div></div>
            <div class="contact-item"><span>☎</span><div><b>${t("phone")}</b><p>${t("phoneValue")}</p></div></div>
            <div class="contact-item"><span>✉</span><div><b>${t("email")}</b><p>${t("emailValue")}</p></div></div>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="container footer-inner">
        <span>© ${new Date().getFullYear()} ${currentLanguage === "gu" ? school.guName : school.name}, ${currentLanguage === "gu" ? school.guPlace : school.place}. ${t("footer")}</span>
        <span class="footer-note">${t("demo")}: ${t("demoText")}</span>
      </div>
    </footer>
  `;

  
// =====================================
// PUBLIC GALLERY - LOAD PHOTOS
// =====================================

async function loadPublicGallery() {

    const grid = document.querySelector("#publicGalleryGrid");

    if (!grid || !supabaseConfigured) return;

    const { data, error } = await supabase
        .from("gallery_items")
        .select("id,title,image_url,caption,created_at")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

    if (error) {
        grid.innerHTML =
            `<p class="gallery-note">${escapeHtml(error.message)}</p>`;
        return;
    }

    grid.innerHTML = data?.length
        ? data.map(item => `
            <article class="gallery-tile gallery-photo">
                <button class="gallery-photo-open" type="button" data-gallery-index="${data.indexOf(item)}" aria-label="View ${escapeHtml(item.title)} full screen">
                  <img src="${escapeHtml(item.image_url)}"
                       alt="${escapeHtml(item.title)}"
                       loading="lazy">
                  <span class="gallery-expand-label">⛶ View photo</span>
                </button>

                <div>
                    <b>${escapeHtml(item.title)}</b>
                    ${item.caption
                        ? `<p>${escapeHtml(item.caption)}</p>`
                        : ""}
                </div>
            </article>
        `).join("")
        : `<p class="gallery-note">
            ${currentLanguage === "gu"
                ? "હજુ કોઈ ફોટા અપલોડ થયા નથી."
                : "No photos uploaded yet."}
           </p>`;


    setupGalleryViewer(data || []);
}


// Public photo lightbox: read-only, keyboard accessible, zoom and next/previous.
function setupGalleryViewer(photos) {
  document.querySelector("#schoolPhotoViewer")?.remove();
  if (!photos.length) return;
  const overlay = document.createElement("div");
  overlay.id = "schoolPhotoViewer";
  overlay.className = "school-photo-viewer";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Gallery photo viewer");
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="photo-viewer-top">
      <span id="photoViewerCounter"></span>
      <div class="photo-viewer-actions">
        <button type="button" data-viewer-action="zoom-out" aria-label="Zoom out">−</button>
        <button type="button" data-viewer-action="zoom-in" aria-label="Zoom in">+</button>
        <button type="button" data-viewer-action="reset" aria-label="Reset zoom">100%</button>
        <button type="button" data-viewer-action="close" aria-label="Close photo viewer">✕</button>
      </div>
    </div>
    <div class="photo-viewer-stage">
      <button type="button" class="photo-viewer-arrow" data-viewer-action="prev" aria-label="Previous photo">❮</button>
      <img id="photoViewerImage" alt="" />
      <button type="button" class="photo-viewer-arrow" data-viewer-action="next" aria-label="Next photo">❯</button>
    </div>
    <div class="photo-viewer-caption"><strong id="photoViewerTitle"></strong><p id="photoViewerCaption"></p></div>`;
  document.body.appendChild(overlay);
  let index = 0;
  let zoom = 1;
  let returnFocus = null;
  const img = overlay.querySelector("#photoViewerImage");
  const update = () => {
    const photo = photos[index];
    img.src = photo.image_url;
    img.alt = photo.title || "School gallery photo";
    overlay.querySelector("#photoViewerTitle").textContent = photo.title || "";
    overlay.querySelector("#photoViewerCaption").textContent = photo.caption || "";
    overlay.querySelector("#photoViewerCounter").textContent = `${index + 1} / ${photos.length}`;
    zoom = 1;
    img.style.transform = "scale(1)";
    overlay.querySelectorAll(".photo-viewer-arrow").forEach(b => { b.hidden = photos.length < 2; });
  };
  const close = () => {
    overlay.hidden = true;
    document.body.classList.remove("photo-viewer-open");
    document.removeEventListener("keydown", onKey);
    returnFocus?.focus();
  };
  const onKey = event => {
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft" && photos.length > 1) { index = (index - 1 + photos.length) % photos.length; update(); }
    if (event.key === "ArrowRight" && photos.length > 1) { index = (index + 1) % photos.length; update(); }
  };
  const open = (nextIndex, trigger) => {
    index = nextIndex;
    returnFocus = trigger;
    update();
    overlay.hidden = false;
    document.body.classList.add("photo-viewer-open");
    overlay.querySelector('[data-viewer-action="close"]').focus();
    document.addEventListener("keydown", onKey);
  };
  document.querySelectorAll("[data-gallery-index]").forEach(button => {
    button.addEventListener("click", () => open(Number(button.dataset.galleryIndex), button));
  });
  overlay.addEventListener("click", event => {
    if (event.target === overlay) close();
    const button = event.target.closest("[data-viewer-action]");
    if (!button) return;
    switch (button.dataset.viewerAction) {
      case "close": close(); break;
      case "prev": index = (index - 1 + photos.length) % photos.length; update(); break;
      case "next": index = (index + 1) % photos.length; update(); break;
      case "zoom-in": zoom = Math.min(3, zoom + 0.25); img.style.transform = `scale(${zoom})`; break;
      case "zoom-out": zoom = Math.max(1, zoom - 0.25); img.style.transform = `scale(${zoom})`; break;
      case "reset": zoom = 1; img.style.transform = "scale(1)"; break;
    }
  });
}

// Public gallery has no upload controls or upload event handlers.
// Authenticated staff upload/edit/delete photos in the staff dashboard.

// =====================================
// INITIALIZE GALLERY
// =====================================

loadPublicGallery();
setupPublicResultSearch();

  document.querySelector("#languageToggle").addEventListener("click", () => {
    currentLanguage = currentLanguage === "gu" ? "en" : "gu";
    render();
  });

  const menuToggle = document.querySelector("#menuToggle");
  const nav = document.querySelector("#mainNav");
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));
}


async function getStaffProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, role, assigned_standard")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

async function staffLoginMessage() {
  const {data,error}=await supabase.rpc('my_staff_approval_status');
  if(error) return 'Account is not approved. Please contact Admin / Principal.';
  if(data==='pending') return 'Approval Pending: Admin અથવા Principal ની મંજૂરી બાકી છે. મંજૂરી પછી જ Login કરી શકશો.';
  if(data==='rejected') return 'Registration rejected. Please contact Admin / Principal.';
  if(data==='removed') return 'Account deleted / access removed by Admin or Principal.';
  return 'Staff account not approved. Contact Admin / Principal.';
}

async function renderPortal() {
  const app = document.querySelector("#app");
  document.documentElement.lang = currentLanguage === "gu" ? "gu" : "en";
  document.title = "Staff Portal | Government Secondary School, Bildi";

  if (!supabaseConfigured) {
    app.innerHTML = `<main class="portal-page"><section class="login-card">
      <img src="/school-logo.jpeg" alt="School logo" class="login-logo" />
      <h1>Supabase setup required</h1>
      <p class="portal-muted">Create a .env file in the project root and add your Supabase Project URL and Publishable Key. See README.md.</p>
      <a class="portal-back" href="#home">← Back to school website</a>
    </section></main>`;
    return;
  }

  // Validate the token with Supabase Auth, not only local storage. A stale or
  // signed-out session must never be used to load protected staff data.
  const { data: { session: storedSession }, error: sessionError } = await supabase.auth.getSession();
  let session = storedSession;
  if (session && !sessionError) {
    const { data: verified, error: verifyError } = await supabase.auth.getUser();
    if (verifyError || !verified?.user || verified.user.id !== session.user.id) {
      session = null;
      await supabase.auth.signOut({ scope: 'local' });
    }
  }
  if (sessionError) {
    app.innerHTML = `<main class="portal-page"><section class="login-card"><h1>Could not check login</h1><p>${escapeHtml(sessionError.message)}</p><a href="#home">Back to website</a></section></main>`;
    return;
  }

  if (!session) {
    app.innerHTML = `
      <main class="portal-page"><a class="portal-back" href="#home">← Back to school website</a>
        <section class="login-card"><img src="/school-logo.jpeg" alt="School logo" class="login-logo" />
          <p class="portal-kicker">GOVERNMENT SECONDARY SCHOOL · BILDI</p><h1>Staff Portal</h1>
          <div id="staffLoginView"><p class="portal-muted">Select your login section</p>
            <div class="staff-role-tabs" role="group" aria-label="Staff login role">
              <button type="button" class="staff-role-tab" data-login-role="admin">Admin</button>
              <button type="button" class="staff-role-tab" data-login-role="principal">Principal</button>
              <button type="button" class="staff-role-tab active" data-login-role="teacher">Teacher</button>
            </div>
            <p id="roleLoginHint" class="portal-muted">Teacher login · approved teachers only</p>
            <form id="staffLoginForm" class="portal-form">
              <label>Email<input id="loginEmail" type="email" required autocomplete="username" /></label>
              <label>Password<div class="staff-password-row"><input id="loginPassword" type="password" required autocomplete="current-password" /><button id="toggleLoginPassword" type="button" class="portal-secondary" aria-label="Show password">Show</button></div></label>
              <button id="forgotStaffPassword" type="button" class="staff-text-button">Forgot password?</button>
              <p id="loginError" class="portal-error" aria-live="polite"></p><button class="portal-primary" type="submit">Sign in as Teacher</button>
            </form>
            <button id="showRegister" class="portal-secondary" type="button">Create teacher account</button>
            <button id="resendStaffApproval" class="portal-secondary" type="button">Resend Approval Request</button>
            <p id="resendApprovalMessage" class="portal-muted" aria-live="polite"></p>
          </div>
          <div id="staffRegisterView" hidden><p class="portal-muted">Teacher registration (Admin or Principal approval required)</p>
            <form id="staffRegisterForm" class="portal-form">
              <label>Full name<input id="regName" required maxlength="100" /></label>
              <label>Email<input id="regEmail" type="email" required /></label>
              <label>Phone<input id="regPhone" type="tel" maxlength="20" /></label>
              <input id="regRole" type="hidden" value="teacher" /><p class="portal-muted">Role: Teacher (Admin and Principal accounts are managed separately.)</p>
              <label>Password<input id="regPassword" type="password" minlength="8" required /></label>
              <label>Confirm password<input id="regConfirm" type="password" minlength="8" required /></label>
              <p id="registerMessage" class="portal-error" aria-live="polite"></p><button class="portal-primary" type="submit">Submit registration</button>
            </form><button id="showLogin" class="portal-secondary" type="button">Back to login</button>
          </div>
          <p class="portal-warning">New Teacher accounts remain pending until an existing Admin OR Principal approves them on this website. Email verification may still be required if enabled in Supabase Auth.</p>
        </section></main>`;
    const loginView=document.querySelector('#staffLoginView'), registerView=document.querySelector('#staffRegisterView');
    let selectedLoginRole='teacher';
    document.querySelectorAll('[data-login-role]').forEach(tab=>tab.addEventListener('click',()=>{
      selectedLoginRole=tab.dataset.loginRole;
      document.querySelectorAll('[data-login-role]').forEach(t=>{t.classList.toggle('active',t===tab);t.setAttribute('aria-pressed',String(t===tab));});
      document.querySelector('#roleLoginHint').textContent=selectedLoginRole==='teacher'?'Teacher login · approved teachers only':'Principal account only · full school management access';
      document.querySelector('#staffLoginForm button[type=submit]').textContent='Sign in as '+selectedLoginRole[0].toUpperCase()+selectedLoginRole.slice(1);
      document.querySelector('#showRegister').hidden=selectedLoginRole!=='teacher';
      document.querySelector('#resendStaffApproval').hidden=selectedLoginRole!=='teacher';
      document.querySelector('#loginError').textContent='';
    }));
    document.querySelector('#toggleLoginPassword').onclick=()=>{
      const password=document.querySelector('#loginPassword');const showing=password.type==='password';password.type=showing?'text':'password';
      document.querySelector('#toggleLoginPassword').textContent=showing?'Hide':'Show';
      document.querySelector('#toggleLoginPassword').setAttribute('aria-label',showing?'Hide password':'Show password');
    };
    document.querySelector('#forgotStaffPassword').onclick=async()=>{
      const email=document.querySelector('#loginEmail').value.trim(),box=document.querySelector('#loginError');
      if(!email){box.textContent='Enter your email address first.';return;}
      const {error}=await supabase.auth.resetPasswordForEmail(email,{redirectTo:window.location.origin+window.location.pathname+'#admin'});
      box.textContent=error?error.message:'If this email has an account, password reset instructions will be sent.';
    };
    document.querySelector('#resendStaffApproval').onclick=async()=>{
      const box=document.querySelector('#resendApprovalMessage'),email=document.querySelector('#loginEmail').value.trim(),password=document.querySelector('#loginPassword').value;
      if(!email||!password){box.textContent='Enter your registered email and password first.';return;}
      const button=document.querySelector('#resendStaffApproval');button.disabled=true;box.textContent='Checking your pending request…';
      try{
        const {error:authError}=await supabase.auth.signInWithPassword({email,password});if(authError)throw authError;
        const {data,error}=await supabase.rpc('resend_my_teacher_approval_request');if(error)throw error;
        box.textContent=data||'Your pending approval request has been refreshed for Principal review.';
      }catch(err){box.textContent=err.message||'Could not resend request. Please contact Principal.';}
      finally{await supabase.auth.signOut();button.disabled=false;}
    };
    document.querySelector('#showRegister').onclick=()=>{loginView.hidden=true;registerView.hidden=false;};
    document.querySelector('#showLogin').onclick=()=>{registerView.hidden=true;loginView.hidden=false;};
    document.querySelector('#staffRegisterForm').addEventListener('submit',async e=>{
      e.preventDefault(); const msg=document.querySelector('#registerMessage'); msg.textContent='Submitting…';
      const password=document.querySelector('#regPassword').value;
      if(password!==document.querySelector('#regConfirm').value){msg.textContent='Passwords do not match.';return;}
      const {error}=await supabase.auth.signUp({email:document.querySelector('#regEmail').value.trim(),password,options:{data:{full_name:document.querySelector('#regName').value.trim(),phone:document.querySelector('#regPhone').value.trim(),requested_role:document.querySelector('#regRole').value}}});
      msg.textContent=error?error.message:'Teacher registration submitted. Your account remains PENDING until an Admin or Principal approves it here. Check your email if verification is enabled.';
      if(!error){e.currentTarget.reset();await supabase.auth.signOut();}
    });
    document.querySelector('#staffLoginForm').addEventListener('submit',async e=>{
      e.preventDefault();const button=e.currentTarget.querySelector('button[type=submit]'),errorBox=document.querySelector('#loginError');button.disabled=true;errorBox.textContent='';
      const {data,error}=await supabase.auth.signInWithPassword({email:document.querySelector('#loginEmail').value.trim(),password:document.querySelector('#loginPassword').value});
      if(error){errorBox.textContent=error.message;button.disabled=false;return;}
      try{
        const profile=await getStaffProfile(data.user.id);
        const validRole=selectedLoginRole==='teacher'?profile.role==='teacher':['admin','principal'].includes(profile.role);
        if(!validRole){await supabase.auth.signOut();errorBox.textContent=selectedLoginRole==='teacher'?'Only approved teachers can use Teacher Login.':'Only the authorized Principal account can use Admin and Principal Login.';button.disabled=false;return;}
        await renderPortal();
      }catch{const message=await staffLoginMessage();await supabase.auth.signOut();errorBox.textContent=message;button.disabled=false;}
    });
    return;
  }

  let profile;
  try {
    profile = await getStaffProfile(session.user.id);
  } catch {
    await supabase.auth.signOut();
    app.innerHTML = `<main class="portal-page"><section class="login-card"><h1>Staff profile not found</h1><p>Ask the school administrator to check your role in the profiles table.</p><a href="#home">Back to website</a></section></main>`;
    return;
  }

  const isAdmin = profile.role === "admin" || profile.role === "principal";
  const assignedStandard = isAdmin ? null : String(profile.assigned_standard || "");
  if (!isAdmin && profile.role !== "teacher") {
    await supabase.auth.signOut();
    app.innerHTML = `<main class="portal-page"><section class="login-card"><h1>Access denied</h1><a href="#home">Back to website</a></section></main>`;
    return;
  }

  const studentQuery = supabase.from("students").select("id,admission_no,full_name,standard,stream,division,roll_no,guardian_name,guardian_phone,status,photo_url");
  const marksQuery = supabase.from("exam_marks").select("id,student_id,academic_year,exam_name,subject,marks_obtained,max_marks,remarks,created_at");
  const [noticeResult, homeworkResult, studentResult, marksResult, galleryResult] = await Promise.all([
    supabase.from("notices").select("id,title,details,created_at").order("created_at", { ascending: false }),
    supabase.from("homework").select("id,class_name,subject,details,created_at,created_by").order("created_at", { ascending: false }),
    (isAdmin ? studentQuery : studentQuery.eq("standard",assignedStandard)).order("standard").order("roll_no"),
    marksQuery.order("created_at",{ascending:false}),
    supabase.from("gallery_items").select("id,title,image_url,caption,is_published,created_by,created_at").order("created_at",{ascending:false})
  ]);
  let registrationRequests=[]; let registrationError=null; let teacherDirectory=[]; let teacherDirectoryError=null;
  if(isAdmin){
    // Refresh a stale token before privileged requests. Never fall back to
    // anon grants for private teacher contact information.
    const { data: currentAuth, error: authCheckError } = await supabase.auth.getUser();
    if (authCheckError || currentAuth?.user?.id !== session.user.id) {
      app.innerHTML = `<main class="portal-page"><section class="login-card"><h1>Session expired</h1><p>Your staff login is no longer valid. Sign in again to manage teacher accounts.</p><button class="portal-primary" id="sessionRelogin" type="button">Return to login</button></section></main>`;
      document.querySelector('#sessionRelogin').onclick = async () => { await supabase.auth.signOut({scope:'local'}); await renderPortal(); };
      return;
    }
    const [rr, directory] = await Promise.all([
      supabase.from("staff_registration_requests").select("id,full_name,email,phone,requested_role,status,created_at").eq("status","pending").eq("requested_role","teacher").order("created_at",{ascending:true}),
      supabase.rpc("list_teacher_accounts_for_management")
    ]);
    registrationRequests=rr.data||[];registrationError=rr.error;
    teacherDirectory=directory.data||[];teacherDirectoryError=directory.error;
  }
  const notices = noticeResult.data || [];
  const homework = homeworkResult.data || [];
  const students = studentResult.data || [];
  // Student images are private; issue short-lived signed URLs only for signed-in staff.
  const studentPhotoUrls = {};
  await Promise.all(students.filter(st => st.photo_url).map(async st => {
    const { data, error } = await supabase.storage.from("student-photos")
      .createSignedUrl(st.photo_url, 3600);
    if (!error && data?.signedUrl) studentPhotoUrls[st.id] = data.signedUrl;
  }));
  const allowedStudentIds = new Set(students.map(st=>String(st.id)));
  const examMarks = isAdmin ? (marksResult.data || []) : (marksResult.data || []).filter(m=>allowedStudentIds.has(String(m.student_id)));
  const galleryItems = galleryResult.data || [];
  const today = new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  // All teacher accounts (including unassigned, pending, rejected and removed)
  // are returned by a role-checked SECURITY DEFINER function.
  app.innerHTML = `
    <main class="portal-page portal-dashboard">
      <header class="portal-topbar"><a class="portal-brand" href="#home"><img src="/school-logo.jpeg" alt="School logo"/><span>GSS Bildi<br><small>Staff Portal</small></span></a><div class="portal-user"><span>${escapeHtml(profile.full_name)}</span><button id="logoutBtn" class="portal-logout">Log out</button></div></header>
      <div class="portal-content"><a class="portal-back" href="#home">← Public website</a>
        <div class="portal-welcome"><div><p class="portal-kicker">STAFF DASHBOARD</p><h1>${isAdmin ? "Principal / Admin Dashboard" : "Teacher Dashboard"}</h1><p class="portal-muted">${isAdmin ? "Manage school announcements and review homework." : "Share homework and class learning updates."}</p></div><span class="role-chip">${profile.role.toUpperCase()}</span></div>
        <div class="portal-stats"><article><span>📢</span><b>${notices.length}</b><small>Notices</small></article><article><span>📘</span><b>${homework.length}</b><small>Homework posts</small></article><article><span>🎓</span><b>${students.length}</b><small>Students</small></article><article><span>🔐</span><b>${isAdmin ? "Full" : `Std ${assignedStandard || "Not assigned"}`}</b><small>Access level</small></article></div>
        ${noticeResult.error ? `<p class="portal-error">Notices: ${escapeHtml(noticeResult.error.message)}</p>` : ""}
        ${homeworkResult.error ? `<p class="portal-error">Homework: ${escapeHtml(homeworkResult.error.message)}</p>` : ""}
        ${isAdmin ? `<section class="portal-panel"><h2>Teacher Registration Approvals</h2><p class="portal-muted">Only one approval is needed: Admin OR Principal. Approval is given here, not in the Supabase Dashboard.</p>${registrationError?`<p class="portal-error">Database access error: ${escapeHtml(registrationError.message)}. Run supabase/FIX-STAFF-PORTAL-PERMISSIONS.sql in Supabase SQL Editor, then refresh.</p>`:registrationRequests.length?`<div class="portal-list">${registrationRequests.map(r=>`<article><div><b>${escapeHtml(r.full_name)}</b><p>${escapeHtml(r.email)} · ${escapeHtml(r.phone||"No phone")} · Requested: ${escapeHtml(r.requested_role.toUpperCase())}</p></div><div class="student-actions"><button class="portal-primary" data-approve-registration="${r.id}">Approve</button><button class="portal-delete" data-reject-registration="${r.id}">Reject</button><button class="portal-delete" data-remove-pending="${r.id}">Delete Account</button></div></article>`).join("")}</div>`:`<p class="portal-muted">No pending registrations.</p>`}</section>` : ""}
        ${isAdmin ? `<section class="portal-panel"><h2>Staff Account Management — All Teachers</h2><p class="portal-muted">Principal / Admin can see all teachers, including Not Assigned, Pending, Rejected and Removed. Deleting teacher access never deletes student records.</p>${teacherDirectoryError?`<p class="portal-error">Database access error: ${escapeHtml(teacherDirectoryError.message)}. Run supabase/FIX-STAFF-PORTAL-PERMISSIONS.sql in Supabase SQL Editor, then refresh.</p>`:teacherDirectory.length?`<div class="portal-list">${teacherDirectory.map(t=>`<article><div><b>${escapeHtml(t.full_name||t.email||"Teacher")}</b><p>${escapeHtml(t.email||"")} · Status: <strong>${escapeHtml(t.account_status)}</strong> · Standard: <strong>${escapeHtml(t.assigned_standard ? "Std "+t.assigned_standard : "Not Assigned")}</strong></p></div><div class="student-actions">${t.account_status==="approved"?`<select data-teacher-standard="${t.auth_user_id}"><option value="">Not Assigned</option>${["9","10","11","12"].map(v=>`<option value="${v}" ${String(t.assigned_standard||"")===v?"selected":""}>Std ${v}</option>`).join("")}</select><button type="button" class="portal-primary" data-save-teacher-standard="${t.auth_user_id}">Save</button>`:""}${t.account_status!=="removed"?`<button type="button" class="portal-delete" data-remove-teacher="${t.auth_user_id}">Delete Account</button>`:`<span class="portal-muted">Access removed</span>`}</div></article>`).join("")}</div>`:`<p class="portal-muted">No teacher accounts found.</p>`}<p id="teacherAssignmentMessage" class="portal-muted"></p></section>` : `<p class="portal-warning">Your assigned standard: ${escapeHtml(assignedStandard || "Not assigned yet. Contact Admin / Principal")}. Only assigned students and their marks are accessible.</p>`}
        ${isAdmin ? `<section class="portal-panel"><h2>Publish a school notice</h2><form id="noticeForm" class="portal-form portal-inline-form"><label>Notice title<input id="noticeTitle" required maxlength="100" /></label><label>Details<textarea id="noticeDetails" required rows="3" maxlength="500"></textarea></label><button class="portal-primary" type="submit">Publish notice</button><p id="noticeError" class="portal-error"></p></form><h3>Saved notices</h3><div class="portal-list">${notices.length ? notices.map(n=>`<article><div><b>${escapeHtml(n.title)}</b><p>${escapeHtml(n.details)}</p></div><button class="portal-delete" data-delete-notice="${n.id}">Delete</button></article>`).join("") : `<p class="portal-muted">No notices added yet.</p>`}</div></section>` : ""}
        ${!isAdmin ? `<section class="portal-panel"><h2>Post class homework</h2><form id="homeworkForm" class="portal-form portal-inline-form"><label>Class<input id="homeworkClass" required placeholder="e.g. Standard 9" /></label><label>Subject<input id="homeworkSubject" required placeholder="e.g. Mathematics" /></label><label>Homework details<textarea id="homeworkDetails" required rows="3"></textarea></label><button class="portal-primary" type="submit">Save homework</button><p id="homeworkError" class="portal-error"></p></form></section>` : ""}
        <section class="portal-panel" id="galleryManagePanel">
          <h2>School Photo Gallery</h2>
          <p class="portal-muted">Upload photos from your logged-in account. Published photos appear automatically on the public website. You can edit or delete your own uploads.</p>
          ${galleryResult.error ? `<p class="portal-error">Run supabase/gallery-media-upgrade.sql: ${escapeHtml(galleryResult.error.message)}</p>` : ""}
          <form id="galleryUploadForm" class="portal-form portal-inline-form">
            <label>Photo title<input id="galleryTitle" required maxlength="100" /></label>
            <label>Caption<input id="galleryCaption" maxlength="250" /></label>
            <label>Choose photo<input id="galleryFile" type="file" accept="image/jpeg,image/png,image/webp" required /></label>
            <button class="portal-primary" type="submit">Upload photo to website</button><p id="galleryUploadError" class="portal-error"></p>
          </form>
          <div class="portal-list">${galleryItems.length ? galleryItems.map(g=>`<article class="gallery-admin-row"><img src="${escapeHtml(g.image_url)}" alt="${escapeHtml(g.title)}"><div><b>${escapeHtml(g.title)}</b><p>${escapeHtml(g.caption||"")}</p><small>${g.is_published ? "Published on website" : "Not published"}</small></div>${g.created_by===session.user.id ? `<div class="student-actions"><button type="button" class="portal-primary" data-edit-gallery="${g.id}">Edit</button><button type="button" class="portal-delete" data-delete-gallery="${g.id}" data-image-url="${encodeURIComponent(g.image_url)}">Delete</button></div>` : ""}</article>`).join("") : `<p class="portal-muted">No photos uploaded yet.</p>`}</div>
        </section>
        <section class="portal-panel" id="examMarksPanel">
          <h2>Examination & Marks Management</h2>
          <p class="portal-muted">Add, edit, delete and download student subject marks. Records are saved in Supabase.</p>
          ${marksResult.error ? `<p class="portal-error">Marks table not ready. Run supabase/exam-marks-management.sql first: ${escapeHtml(marksResult.error.message)}</p>` : ""}
          <form id="examMarksForm" class="portal-form portal-inline-form">
            <input id="markEditId" type="hidden" />
            <label>Student<select id="markStudent" required><option value="">Select student</option>${students.map(st=>`<option value="${st.id}">${escapeHtml(st.full_name)} · GR ${escapeHtml(st.admission_no)} · Std ${escapeHtml(st.standard)}-${escapeHtml(st.division||"A")}</option>`).join("")}</select></label>
            <label>Academic year<input id="markYear" required value="2026-27" maxlength="12" /></label>
            <label>Exam name<input id="markExam" required placeholder="Annual / Unit Test 1" maxlength="80" /></label>
            <label>Subject<input id="markSubject" required placeholder="Gujarati / English / Maths" maxlength="80" /></label>
            <label>Marks obtained<input id="markObtained" type="number" min="0" step="0.01" required /></label>
            <label>Maximum marks<input id="markMaximum" type="number" min="0.01" step="0.01" value="100" required /></label>
            <label>Remarks<input id="markRemarks" maxlength="200" /></label>
            <button class="portal-primary" type="submit" id="saveMarksBtn">Save marks</button>
            <button class="portal-secondary" type="button" id="cancelMarksEdit" hidden>Cancel edit</button>
            <p id="marksError" class="portal-error"></p>
          </form>
          <div class="portal-form portal-inline-form">
            <label>Filter standard<select id="marksFilterStandard"><option value="">All standards</option>${(isAdmin ? ["9","10","11","12"] : [assignedStandard]).filter(Boolean).map(v=>`<option value="${v}">Std ${v}</option>`).join("")}</select></label>
            <label>Filter exam<input id="marksFilterExam" placeholder="Search exam name" /></label>
            <label>Division<select id="marksFilterDivision"><option value="">All divisions</option>${[...new Set(students.map(st=>st.division||"A"))].sort().map(v=>`<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join("")}</select></label>
            <label>Academic year<input id="marksBulkYear" value="2026-27" maxlength="12" /></label>
            <label>Exact exam name<input id="marksBulkExam" placeholder="e.g. First Exam" maxlength="80" /></label>
            <label>Subjects (comma separated)<input id="marksBulkSubjects" value="ગુજરાતી,અંગ્રેજી,હિન્દી,સંસ્કૃત,ગણિત,વિજ્ઞાન,સામાજિક વિજ્ઞાન,IT/ITes" /></label>
            <label>Maximum marks per subject<input id="marksBulkMaximum" type="number" value="50" min="1" step="0.01" /></label>
            <button class="portal-primary" type="button" id="downloadPrefilledMarksCsv">Download Students + Marks CSV Template</button>
            <label>Upload filled marks CSV<input id="marksBulkFile" type="file" accept=".csv,text/csv" /></label>
            <button class="portal-primary" type="button" id="previewMarksCsv">Preview / Validate Marks CSV</button>
            <button class="portal-primary" type="button" id="saveMarksCsv" disabled>Save Validated Marks</button>
            <p class="portal-muted" id="marksBulkStatus" aria-live="polite">Download a CSV with existing students. Fill marks only; do not change student identifiers.</p>
            <div id="marksBulkPreview" class="result-table-wrap"></div>
            <button class="portal-primary" type="button" id="downloadMarksCsv">Download existing marks (Excel CSV)</button>
          </div>
          <div class="portal-list" id="examMarksList">${(()=>{const groups=new Map();examMarks.forEach(m=>{const key=[m.student_id,m.academic_year,m.exam_name].join('|');if(!groups.has(key))groups.set(key,[]);groups.get(key).push(m)});return [...groups.values()].map((group,i)=>{const st=students.find(x=>String(x.id)===String(group[0].student_id));const total=group.reduce((n,m)=>n+Number(m.marks_obtained),0),max=group.reduce((n,m)=>n+Number(m.max_marks),0);return `<article class="student-result-group"><div class="student-result-heading">${studentPhotoUrls[st?.id]?`<img class="result-card-photo" src="${escapeHtml(studentPhotoUrls[st.id])}" alt="Student photo">`:''}<div><b>${escapeHtml(st?.full_name||'Unknown student')}</b><p>GR ${escapeHtml(st?.admission_no||'—')} · Std ${escapeHtml(st?.standard||'—')} · ${escapeHtml(group[0].exam_name)} · ${escapeHtml(group[0].academic_year)}</p></div></div><div class="student-result-stats"><span><small>Total Marks</small><strong>${total.toFixed(2)} / ${max.toFixed(2)}</strong></span><span><small>Percentage</small><strong>${max?(total/max*100).toFixed(2):'0.00'}%</strong></span><span><small>Subjects</small><strong>${group.length}</strong></span></div><button class="portal-primary" type="button" data-view-mark-group="${i}">View Result</button> <button class="portal-secondary" type="button" data-edit-mark-group="${i}">Edit Marks</button><div data-mark-group-detail="${i}" class="student-result-detail" hidden><div class="result-table-wrap"><table class="result-table"><thead><tr><th>Subject</th><th>Obtained</th><th>Maximum</th><th>Actions</th></tr></thead><tbody>${group.map(m=>`<tr><td>${escapeHtml(m.subject)}</td><td>${m.marks_obtained}</td><td>${m.max_marks}</td><td><button type="button" class="portal-primary" data-edit-mark="${m.id}">Edit</button> <button type="button" class="portal-delete" data-delete-mark="${m.id}">Delete</button></td></tr>`).join('')}</tbody></table></div></div></article>`}).join('')||'<p class="portal-muted">No marks added yet.</p>'})()}</div>
          <section class="result-report-panel" id="resultReportPanel">
            <h3>Automatic Result, Percentage & Top 10</h3>
            <p class="portal-muted">Select one standard, academic year and exam. Percentage is calculated from total obtained marks ÷ total maximum marks. A student passes only when every subject meets the pass percentage.</p>
            <div class="portal-form portal-inline-form result-filters">
              <label>Standard<select id="resultStandard"><option value="">Select standard</option>${["9","10","11","12"].map(v=>`<option value="${v}">Std ${v}</option>`).join("")}</select></label>
              <label>Academic year<input id="resultYear" value="2026-27" maxlength="12" /></label>
              <label>Exam name<input id="resultExam" placeholder="Enter exact exam name" /></label>
              <label>Pass percentage (%)<input id="resultPassMark" type="number" min="0" max="100" step="0.01" value="33" /></label>
              <button class="portal-primary" type="button" id="generateResult">Generate result</button>
              <button class="portal-primary" type="button" id="downloadResultCsv" disabled>Download result Excel CSV</button>
              <button class="portal-primary" type="button" id="downloadTop10Csv" disabled>Download Top 10 CSV</button>
            </div>
            <p id="resultReportMessage" class="portal-muted" aria-live="polite">Choose standard and enter exact exam name to generate the result.</p>
            <div class="portal-list" id="resultReportList"></div>
          </section>
        </section>
        <section class="portal-panel">
          <h2>Student Management</h2>
          ${studentResult.error ? `<p class="portal-error">Students table not ready: ${escapeHtml(studentResult.error.message)}. Run the supplied Supabase schema SQL first.</p>` : ""}
          ${`<form id="studentForm" class="portal-form portal-inline-form">
            <label>Admission / GR No.<input id="studentAdmission" required maxlength="30" /></label>
            <label>Student full name<input id="studentName" required maxlength="120" /></label>
            <label>Standard<select id="studentStandard" required><option value="9">Std. 9</option><option value="10">Std. 10</option><option value="11">Std. 11</option><option value="12">Std. 12</option></select></label>
            <label>Stream<select id="studentStream"><option value="General">General</option><option value="Science">Science</option><option value="Commerce">Commerce</option><option value="Arts">Arts</option></select></label>
            <label>Division<input id="studentDivision" value="A" maxlength="5" /></label>
            <label>Roll No.<input id="studentRoll" type="number" min="1" /></label>
            <label>Guardian name<input id="guardianName" required maxlength="120" placeholder="Enter parent / guardian name" /></label>
            <label>Guardian phone<input id="guardianPhone" type="tel" required maxlength="20" placeholder="Enter guardian mobile number" /></label>
            <label>Student photo (optional; JPG, PNG, WebP, max 3 MB)<input id="studentPhotoFile" type="file" accept="image/jpeg,image/png,image/webp" /></label>
            <button class="portal-primary" type="submit">Add student</button><p id="studentError" class="portal-error"></p>
          </form>`}
          <section class="portal-bulk-upload">
            <h3>Bulk Student Upload · Std. 9 to 12</h3>
            <p class="portal-muted">Excel માંથી CSV UTF-8 તરીકે Save કરીને અહીં Upload કરો. પહેલા Standard પસંદ કરો; Std. 11–12 માટે Stream પણ પસંદ કરો.</p>
            <div class="portal-form">
              <label>Upload Standard<select id="bulkStandard"><option value="9">Std. 9</option><option value="10">Std. 10</option><option value="11">Std. 11</option><option value="12">Std. 12</option></select></label>
              <label>Stream<select id="bulkStream"><option value="General">General</option><option value="Science">Science</option><option value="Commerce">Commerce</option><option value="Arts">Arts</option></select></label>
              <button class="portal-primary" type="button" id="downloadStudentTemplate">Download Excel-compatible CSV Template</button>
              <label>Choose CSV file<input id="bulkStudentFile" type="file" accept=".csv,text/csv" /></label>
              <button class="portal-primary" type="button" id="previewStudentUpload">Preview Students</button>
              <p id="bulkStudentStatus" class="portal-muted" aria-live="polite"></p>
              <div id="bulkStudentPreview"></div>
              <button class="portal-primary" type="button" id="confirmStudentUpload" hidden>Upload Previewed Students</button>
            </div>
          </section>
          <label class="student-search-label">Search students<input id="studentSearch" type="search" placeholder="Search by GR number, name, standard or division..." /></label>
          <div class="portal-list" id="studentList">${students.length ? students.map(st=>`<article data-student-row data-search="${escapeHtml([st.admission_no,st.full_name,st.standard,st.stream,st.division,st.roll_no].join(" ").toLowerCase())}"><div class="student-detail-with-photo">${studentPhotoUrls[st.id] ? `<img class="student-profile-photo" src="${escapeHtml(studentPhotoUrls[st.id])}" alt="Photo of ${escapeHtml(st.full_name)}" />` : `<span class="student-profile-placeholder">No photo</span>`}<div><b>${escapeHtml(st.full_name)}</b><p>GR: ${escapeHtml(st.admission_no)} · Std ${escapeHtml(st.standard)}${st.stream && st.stream !== "General" ? " · "+escapeHtml(st.stream) : ""}-${escapeHtml(st.division || "A")} · Roll: ${st.roll_no ?? "—"}</p>${(st.guardian_name || st.guardian_phone) ? `<small>Guardian: ${escapeHtml(st.guardian_name || "—")} · Phone: ${escapeHtml(st.guardian_phone || "—")}</small>` : ""}</div></div><div class="student-actions"> <button type="button" class="portal-primary" data-id-card="${st.id}">Print ID</button>${isAdmin ? `<button type="button" class="portal-primary" data-edit-student="${st.id}">Edit</button><button type="button" class="portal-primary" data-student-photo="${st.id}">${st.photo_url ? "Change Photo" : "Add Photo"}</button>${st.photo_url ? `<button type="button" class="portal-delete" data-remove-student-photo="${st.id}">Remove Photo</button>` : ""}<button class="portal-delete" data-delete-student="${st.id}">Delete</button>` : ""}</div></article>`).join("") : `<p class="portal-muted">No students added yet.</p>`}</div>
        </section>
        <section class="portal-panel" id="attendancePanel">
          <h2>Daily Attendance & Reports</h2>
          <div class="attendance-tools"><label>Attendance date <input id="attendanceDate" type="date" value="${today}" max="${today}" required></label><button type="button" class="portal-primary" id="attendanceSearch">Search date</button><label>Standard <select id="attendanceStandard"><option value="">${isAdmin?'All standards':'Assigned standard'}</option>${[...new Set(students.map(st=>String(st.standard)))].map(v=>`<option value="${escapeHtml(v)}">Std ${escapeHtml(v)}</option>`).join('')}</select></label></div>
          <p id="attendanceError" class="portal-error" role="alert"></p><p id="attendanceSuccess" class="portal-muted" aria-live="polite"></p>
          <div id="attendanceSummary" class="attendance-tools"></div>
          <form id="attendanceForm" class="portal-form"><div id="attendanceList"></div><div class="attendance-tools"><button type="button" class="portal-primary" id="attendanceAll">Mark all present</button><button type="submit" class="portal-primary" id="attendanceSave">Save selected date attendance</button></div></form>
          <div class="attendance-tools"><button type="button" class="portal-primary" id="attendanceCsv">Download Excel (CSV)</button><button type="button" class="portal-primary" id="attendancePrint">Print / Save PDF</button></div>
          <h3>Monthly attendance report</h3><div class="attendance-tools"><label>Month <input type="month" id="attendanceMonth" value="${today.slice(0,7)}" max="${today.slice(0,7)}"></label><button type="button" class="portal-primary" id="attendanceMonthly">Download monthly Excel (CSV)</button></div>
        </section>
        <section class="portal-panel"><h2>${isAdmin ? "Recent homework" : "Saved homework"}</h2><div class="portal-list">${homework.length ? homework.map(h=>`<article><div><b>${escapeHtml(h.class_name)} · ${escapeHtml(h.subject)}</b><p>${escapeHtml(h.details)}</p></div><small>${new Date(h.created_at).toLocaleDateString()}</small></article>`).join("") : `<p class="portal-muted">No homework posted yet.</p>`}</div></section>
      </div>
    </main>`;

  document.querySelectorAll("[data-approve-registration]").forEach(btn=>btn.addEventListener("click",async()=>{btn.disabled=true;const {error}=await supabase.rpc("approve_staff_registration",{request_id:btn.dataset.approveRegistration});if(error){alert(error.message);btn.disabled=false;}else await renderPortal();}));
  document.querySelectorAll("[data-reject-registration]").forEach(btn=>btn.addEventListener("click",async()=>{btn.disabled=true;const {error}=await supabase.rpc("reject_staff_registration",{request_id:btn.dataset.rejectRegistration});if(error){alert(error.message);btn.disabled=false;}else await renderPortal();}));

  // Delete Account revokes website access without deleting any student, marks or history.
  const removeTeacherAccess = async (teacherId, requestId) => {
    if(!confirm('Delete this teacher account access? Student records, marks and results will be preserved. This does not erase the Supabase Auth identity.')) return;
    const {error}=await supabase.rpc('remove_teacher_account_access',{target_teacher_id:teacherId || null,target_request_id:requestId || null});
    if(error) alert('Delete failed: '+error.message); else await renderPortal();
  };
  document.querySelectorAll('[data-remove-teacher]').forEach(b=>b.addEventListener('click',()=>removeTeacherAccess(b.dataset.removeTeacher,null)));
  document.querySelectorAll('[data-remove-pending]').forEach(b=>b.addEventListener('click',()=>removeTeacherAccess(null,b.dataset.removePending)));

  // Upload to private Storage, then link the path to the student row.
  const uploadStudentPhoto = async (studentId, file) => {
    if (!file) return;
    const allowed = {"image/jpeg":"jpg","image/png":"png","image/webp":"webp"};
    if (!allowed[file.type] || file.size > 3 * 1024 * 1024 || file.size === 0)
      throw new Error("Choose a JPG, PNG or WebP photo smaller than 3 MB.");
    const {data: authData, error: authError} = await supabase.auth.getUser();
    if (authError || !authData?.user) throw new Error("Please log in again.");
    const path = `${authData.user.id}/${studentId}/${crypto.randomUUID()}.${allowed[file.type]}`;
    const uploaded = await supabase.storage.from("student-photos")
      .upload(path, file, {contentType:file.type, upsert:false});
    if (uploaded.error) throw uploaded.error;
    const {data:oldRow,error:readError} = await supabase.from("students")
      .select("photo_url").eq("id",studentId).single();
    if (readError) {
      await supabase.storage.from("student-photos").remove([path]);
      throw readError;
    }
    const updated = await supabase.from("students").update({photo_url:path}).eq("id",studentId).select("id");
    if (updated.error || !updated.data?.length) {
      await supabase.storage.from("student-photos").remove([path]);
      throw updated.error || new Error("Student photo update was not permitted.");
    }
    // Old photos may be owned by a different staff member. Do not delete without authorization.
    if (oldRow?.photo_url && oldRow.photo_url !== path) {
      await supabase.storage.from("student-photos").remove([oldRow.photo_url]);
    }
  };
  document.querySelectorAll("[data-save-teacher-standard]").forEach(btn=>btn.addEventListener("click",async()=>{
    const id=btn.dataset.saveTeacherStandard; const selected=document.querySelector(`[data-teacher-standard="${id}"]`).value;
    const out=document.querySelector("#teacherAssignmentMessage");out.textContent="Saving…";
    const {error}=await supabase.rpc("assign_teacher_standard",{teacher_id:id,new_standard:selected||null});
    out.textContent=error?error.message:"Teacher standard saved successfully.";
  }));
  if (document.querySelector("#studentForm")) {
    document.querySelector("#studentForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      const button = event.currentTarget.querySelector("button");
      const errorBox = document.querySelector("#studentError");
      button.disabled = true; errorBox.textContent = "";
      const payload = {
        admission_no: document.querySelector("#studentAdmission").value.trim(),
        full_name: document.querySelector("#studentName").value.trim(),
        standard: document.querySelector("#studentStandard").value.trim(),
        stream: document.querySelector("#studentStandard").value === "9" || document.querySelector("#studentStandard").value === "10" ? "General" : document.querySelector("#studentStream").value,
        division: document.querySelector("#studentDivision").value.trim() || "A",
        roll_no: document.querySelector("#studentRoll").value ? Number(document.querySelector("#studentRoll").value) : null,
        guardian_name: document.querySelector("#guardianName").value.trim(),
        guardian_phone: document.querySelector("#guardianPhone").value.trim()
      };
      if (!payload.guardian_name || !payload.guardian_phone) {
        errorBox.textContent = "Please enter guardian name and phone number.";
        button.disabled = false;
        return;
      }
      const photoFile = document.querySelector("#studentPhotoFile").files[0];
      if (photoFile && (!["image/jpeg","image/png","image/webp"].includes(photoFile.type) || photoFile.size > 3*1024*1024)) {
        errorBox.textContent = "Select JPG, PNG or WebP photo up to 3 MB."; button.disabled=false; return;
      }
      const { data:created, error } = await supabase.from("students").insert(payload).select("id").single();
      if (error) { errorBox.textContent = error.message; button.disabled = false; }
      else {
        try {
          if (photoFile) await uploadStudentPhoto(created.id, photoFile);
          await renderPortal();
        } catch (e) {
          errorBox.textContent = "Student saved, but photo upload failed: " + e.message;
          button.disabled = false;
        }
      }
    });
    const csvEscape = value => `"${String(value ?? "").replaceAll('"','""')}"`;
    const templateHeaders = ["admission_no","full_name","division","roll_no","guardian_name","guardian_phone"];
    document.querySelector("#downloadStudentTemplate")?.addEventListener("click", () => {
      const sample = [templateHeaders.join(","), ["GR001","Student Name","A","1","Parent Name","9999999999"].map(csvEscape).join(",")].join("\r\n");
      const url = URL.createObjectURL(new Blob(["\uFEFF" + sample], {type:"text/csv;charset=utf-8"}));
      const a = document.createElement("a"); a.href=url; a.download="student-upload-template.csv"; a.click(); URL.revokeObjectURL(url);
    });
    const parseCSV = text => {
      const rows=[]; let row=[], cell="", quoted=false;
      for(let i=0;i<text.length;i++){ const c=text[i];
        if(c==='"' && quoted && text[i+1]==='"'){cell+='"';i++;}
        else if(c==='"') quoted=!quoted;
        else if(c===',' && !quoted){row.push(cell.trim());cell="";}
        else if((c==='\n'||c==='\r') && !quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell.trim());if(row.some(x=>x!==""))rows.push(row);row=[];cell="";}
        else cell+=c;
      }
      if(cell.length||row.length){row.push(cell.trim());if(row.some(x=>x!==""))rows.push(row);}
      return rows;
    };
    let bulkRows=[];
    document.querySelector("#previewStudentUpload")?.addEventListener("click", async () => {
      const status=document.querySelector("#bulkStudentStatus"), preview=document.querySelector("#bulkStudentPreview"), file=document.querySelector("#bulkStudentFile").files[0];
      const standard=document.querySelector("#bulkStandard").value, stream=(standard==="9"||standard==="10")?"General":document.querySelector("#bulkStream").value;
      document.querySelector("#confirmStudentUpload").hidden=true; bulkRows=[];
      if(!file){status.textContent="Please select a CSV file first.";return;}
      // Handle UTF-8 BOM, Excel CSV exports, and optional semicolon delimiters.
      const csvText=(await file.text()).replace(/^\uFEFF/,"");
      const firstLine=csvText.split(/\r?\n/,1)[0];
      const delimiter=firstLine.includes(";") && !firstLine.includes(",") ? ";" : ",";
      const rows=parseCSV(delimiter===";" ? csvText.replace(/;/g,",") : csvText);
      if(rows.length<2){status.textContent="CSV has no student rows.";return;}
      const normalizeHeader = h => String(h ?? "").replace(/\uFEFF/g,"").normalize("NFKC")
        .toLowerCase().trim().replace(/[\s-]+/g,"_").replace(/[^a-z0-9_]/g,"").replace(/_+/g,"_");
      const headers=rows[0].map(normalizeHeader);
      const aliases = {
        admission_no: ["admission_no","gr_no","gr_number","gr"],
        full_name: ["full_name","student_name","name"],
        division: ["division","class_division"],
        roll_no: ["roll_no","roll_number","roll"],
        guardian_name: ["guardian_name","guardian","parent_name","father_name","mother_name"],
        guardian_phone: ["guardian_phone","guardian_mobile","parent_phone","parent_mobile","guardian_contact","parent_contact"]
      };
      const index = {};
      for (const [field, names] of Object.entries(aliases)) {
        const found = names.find(name => headers.includes(name));
        if (found !== undefined) index[field] = headers.indexOf(found);
      }
      const required=["admission_no","full_name","division","roll_no","guardian_name","guardian_phone"];
      const missing=required.filter(h=>index[h]===undefined);
      if(missing.length){status.textContent="Missing CSV columns: "+missing.join(", ")+". Detected headers: "+(headers.join(", ")||"(none)")+". Please use the downloaded template.";return;}
      const seen=new Set(); const invalid=[];
      bulkRows=rows.slice(1).map((r,i)=>({
        admission_no:(r[index.admission_no]||"").trim(), full_name:(r[index.full_name]||"").trim(),
        standard, stream, division:(r[index.division]||"A").trim()||"A",
        roll_no:(r[index.roll_no]||"").trim()?Number(r[index.roll_no]):null,
        guardian_name:(r[index.guardian_name]||"").trim(),
        guardian_phone:(r[index.guardian_phone]||"").trim()
      })).filter(x=>x.admission_no||x.full_name);
      bulkRows.forEach((r,i)=>{
        if(!r.admission_no||!r.full_name||(r.roll_no!==null&&(!Number.isInteger(r.roll_no)||r.roll_no<1))) invalid.push(`Row ${i+2}: check GR number, name and roll number`);
        if(!r.guardian_name||!r.guardian_phone) invalid.push(`Row ${i+2}: guardian name and phone are required`);
        if(seen.has(r.admission_no)) invalid.push(`Row ${i+2}: duplicate GR ${r.admission_no} in file`);
        seen.add(r.admission_no);
      });
      if(invalid.length){bulkRows=[];status.textContent=invalid.slice(0,8).join(" | ");return;}
      const ids=bulkRows.map(r=>r.admission_no);
      const {data:existing,error}=await supabase.from("students").select("admission_no").in("admission_no",ids);
      if(error){bulkRows=[];status.textContent=error.message;return;}
      const duplicates=new Set((existing||[]).map(x=>x.admission_no));
      bulkRows=bulkRows.filter(r=>!duplicates.has(r.admission_no));
      status.textContent=`Preview: ${bulkRows.length} new students. ${(ids.length-bulkRows.length)} duplicate GR records will be skipped.`;
      preview.innerHTML=bulkRows.length?`<div class="portal-list">${bulkRows.slice(0,12).map(r=>`<article><div><b>${escapeHtml(r.full_name)}</b><p>GR ${escapeHtml(r.admission_no)} · Std ${r.standard} ${escapeHtml(r.stream)} · ${escapeHtml(r.division)} · Roll ${r.roll_no??"—"}</p><small>Guardian: ${escapeHtml(r.guardian_name)} · Phone: ${escapeHtml(r.guardian_phone)}</small></div></article>`).join("")}</div>${bulkRows.length>12?`<p class="portal-muted">Showing first 12 of ${bulkRows.length} students.</p>`:""}`:"<p class=\"portal-muted\">No new students to upload.</p>";
      document.querySelector("#confirmStudentUpload").hidden=!bulkRows.length;
    });
    document.querySelector("#confirmStudentUpload")?.addEventListener("click", async event=>{
      const button=event.currentTarget, status=document.querySelector("#bulkStudentStatus"); if(!bulkRows.length)return;
      button.disabled=true; status.textContent="Uploading students…";
      const {error}=await supabase.from("students").insert(bulkRows);
      if(error){status.textContent="Upload failed: "+error.message;button.disabled=false;}
      else {status.textContent=`Successfully uploaded ${bulkRows.length} students.`;await renderPortal();}
    });
    document.querySelector("#studentSearch")?.addEventListener("input", event => {
      const q=event.target.value.trim().toLowerCase();
      document.querySelectorAll("[data-student-row]").forEach(row=>row.hidden=!row.dataset.search.includes(q));
    });
    document.querySelectorAll("[data-edit-student]").forEach(button=>button.addEventListener("click", async()=>{
      const st=students.find(x=>String(x.id)===button.dataset.editStudent); if(!st)return;
      const full_name=prompt("Student full name:",st.full_name); if(full_name===null)return;
      const standard=prompt("Standard (9, 10, 11, 12):",st.standard); if(standard===null)return;
      if(!["9","10","11","12"].includes(standard.trim())){alert("Please enter standard 9, 10, 11 or 12.");return;}
      const division=prompt("Division:",st.division||"A"); if(division===null)return;
      const roll=prompt("Roll number:",st.roll_no??""); if(roll===null)return;
      const guardian_name=prompt("Guardian name:",st.guardian_name||""); if(guardian_name===null)return;
      const guardian_phone=prompt("Guardian phone:",st.guardian_phone||""); if(guardian_phone===null)return;

      const stream=standard==="9"||standard==="10"?"General":(prompt("Stream (Science, Commerce, Arts):",st.stream||"Science")||st.stream);
      const {error}=await supabase.from("students").update({full_name:full_name.trim(),standard,stream,division:division.trim()||"A",roll_no:roll.trim()?Number(roll):null,guardian_name:guardian_name.trim()||null,guardian_phone:guardian_phone.trim()||null}).eq("id",st.id);
      if(error)alert(error.message);else await renderPortal();
    }));
    document.querySelectorAll("[data-student-photo]").forEach(button => button.addEventListener("click", () => {
      const id = button.dataset.studentPhoto;
      const picker = document.createElement("input");
      picker.type = "file"; picker.accept = "image/jpeg,image/png,image/webp";
      picker.onchange = async () => {
        if (!picker.files?.[0]) return;
        button.disabled = true;
        try { await uploadStudentPhoto(id, picker.files[0]); await renderPortal(); }
        catch(e) { alert("Photo upload failed: " + e.message); button.disabled = false; }
      };
      picker.click();
    }));
    document.querySelectorAll("[data-remove-student-photo]").forEach(button => button.addEventListener("click", async () => {
      if (!confirm("Remove this student's photo?")) return;
      const st = students.find(x => String(x.id) === button.dataset.removeStudentPhoto);
      if (!st) return;
      button.disabled = true;
      const result = await supabase.from("students").update({photo_url:null}).eq("id",st.id).select("id");
      if (result.error || !result.data?.length) {
        alert(result.error?.message || "Photo removal not permitted."); button.disabled=false; return;
      }
      if (st.photo_url) await supabase.storage.from("student-photos").remove([st.photo_url]);
      await renderPortal();
    }));
    document.querySelectorAll("[data-id-card]").forEach(button=>button.addEventListener("click",()=>{
      const st=students.find(x=>String(x.id)===button.dataset.idCard);if(!st)return;
      const w=window.open("","_blank","width=700,height=500");if(!w){alert("Please allow pop-ups to print the ID card.");return;}
      const photo=studentPhotoUrls[st.id]?`<img src="${escapeHtml(studentPhotoUrls[st.id])}" class="photo">`:`<div class="photo placeholder">PHOTO</div>`;
      const logoUrl = `${window.location.origin}/school-logo.jpeg`;
      w.document.write(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Student ID Card - ${escapeHtml(st.full_name)}</title><style>
        *{box-sizing:border-box}body{margin:0;padding:30px;font-family:Arial,Helvetica,sans-serif;background:#e9eff8;color:#14345c;display:flex;justify-content:center}
        .card{position:relative;isolation:isolate;width:360px;min-height:540px;overflow:hidden;border:2px solid #174e91;border-radius:18px;background:linear-gradient(145deg,#fff 0%,#f0f7ff 100%);box-shadow:0 10px 30px rgba(9,46,94,.16);text-align:center}
        .watermark{position:absolute;z-index:-1;top:49%;left:50%;transform:translate(-50%,-50%);width:265px;height:265px;object-fit:contain;opacity:.085;pointer-events:none}
        .top{background:linear-gradient(115deg,#0d3974,#1976ba);color:white;padding:20px 14px 18px;border-bottom:5px solid #f4bd45}
        .id-school-header{display:flex;align-items:center;justify-content:center;gap:12px}.id-school-logo{width:66px;height:66px;object-fit:contain;background:white;border-radius:50%;padding:5px;border:2px solid #f4bd45}
        .head{font-weight:800;font-size:17px;line-height:1.25;text-align:left}.sub{font-size:12px;margin-top:5px;text-align:left;color:#d8edff}.id-label{font-size:11px;letter-spacing:2px;font-weight:bold;margin-top:14px;color:#fff0b5}
        .body{padding:18px 22px 24px}.photo{display:block;width:100px;height:118px;object-fit:cover;margin:0 auto 12px;border:3px solid #fff;border-radius:10px;box-shadow:0 0 0 2px #2373b4;background:#e5eef8}
        .placeholder{display:flex;align-items:center;justify-content:center;color:#57708e;font-size:13px}.student-name{font-size:20px;font-weight:800;color:#103b76;margin:8px 0 14px;overflow-wrap:anywhere}
        .details{background:rgba(255,255,255,.8);border:1px solid #c9dff3;border-radius:12px;text-align:left;padding:12px 14px;font-size:13px;line-height:1.9}
        .detail{display:flex;justify-content:space-between;gap:10px;border-bottom:1px solid #e4edf6}.detail:last-child{border:0}.detail b{color:#2866a0}.detail span{text-align:right;font-weight:600;overflow-wrap:anywhere}
        .bottom{height:12px;background:linear-gradient(90deg,#f0ad32,#f9d96c,#f0ad32);margin-top:18px}
        @media print{@page{size:auto;margin:10mm}body{background:white;padding:0;display:block;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}.card{box-shadow:none;break-inside:avoid;page-break-inside:avoid}.top,.bottom{ -webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}}
      </style></head><body><div class="card"><img class="watermark" src="${logoUrl}" alt="" aria-hidden="true"><div class="top"><div class="id-school-header"><img class="id-school-logo" src="${logoUrl}" alt="School logo"><div><div class="head">Government Secondary School</div><div class="sub">Bildi, Gujarat</div></div></div><div class="id-label">STUDENT IDENTITY CARD</div></div><div class="body">${photo}<div class="student-name">${escapeHtml(st.full_name)}</div><div class="details"><div class="detail"><b>GR Number</b><span>${escapeHtml(st.admission_no)}</span></div><div class="detail"><b>Standard</b><span>${escapeHtml(st.standard)} ${escapeHtml(st.stream||"")}</span></div><div class="detail"><b>Division</b><span>${escapeHtml(st.division||"A")}</span></div><div class="detail"><b>Roll Number</b><span>${escapeHtml(st.roll_no??"—")}</span></div></div></div><div class="bottom"></div></div><script>window.onload=async()=>{await Promise.all(Array.from(document.images).map(img=>img.complete?Promise.resolve():new Promise(resolve=>{img.onload=resolve;img.onerror=resolve;})));window.print();}<\/script></body></html>`);w.document.close();
    }));
    document.querySelectorAll("[data-delete-student]").forEach(button => button.addEventListener("click", async () => {
      if (!confirm("Delete this student and related attendance/results/fees?")) return;
      const { error } = await supabase.from("students").delete().eq("id", Number(button.dataset.deleteStudent));
      if (error) alert(error.message); else await renderPortal();
    }));
  }

  const marksForm=document.querySelector("#examMarksForm");
  const resetMarksForm=()=>{marksForm?.reset();document.querySelector("#markEditId").value="";document.querySelector("#markYear").value="2026-27";document.querySelector("#markMaximum").value="100";document.querySelector("#saveMarksBtn").textContent="Save marks";document.querySelector("#cancelMarksEdit").hidden=true;};
  marksForm?.addEventListener("submit",async event=>{
    event.preventDefault();
    const btn=document.querySelector("#saveMarksBtn"), errorBox=document.querySelector("#marksError");
    btn.disabled=true;errorBox.textContent="";
    const studentId=document.querySelector("#markStudent").value;
    const obtained=Number(document.querySelector("#markObtained").value), maximum=Number(document.querySelector("#markMaximum").value);
    if(!studentId||!students.some(st=>String(st.id)===String(studentId))||!Number.isFinite(obtained)||!Number.isFinite(maximum)||maximum<=0||obtained<0||obtained>maximum){errorBox.textContent="Select a student and enter valid marks (obtained marks cannot exceed maximum marks).";btn.disabled=false;return;}
    const payload={student_id:studentId,academic_year:document.querySelector("#markYear").value.trim(),exam_name:document.querySelector("#markExam").value.trim(),subject:document.querySelector("#markSubject").value.trim(),marks_obtained:obtained,max_marks:maximum,remarks:document.querySelector("#markRemarks").value.trim()||null,created_by:session.user.id};
    const editId=document.querySelector("#markEditId").value;
    const result=editId?await supabase.from("exam_marks").update(payload).eq("id",Number(editId)):await supabase.from("exam_marks").upsert(payload,{onConflict:"student_id,academic_year,exam_name,subject"});
    if(result.error){errorBox.textContent=result.error.message;btn.disabled=false;return;}
    await renderPortal();
  });
  document.querySelector("#cancelMarksEdit")?.addEventListener("click",resetMarksForm);
  document.querySelectorAll('[data-view-mark-group]').forEach(btn=>btn.addEventListener('click',()=>{const d=document.querySelector(`[data-mark-group-detail="${btn.dataset.viewMarkGroup}"]`);if(d){d.hidden=!d.hidden;btn.textContent=d.hidden?'View Result':'Hide Result'}}));
  document.querySelectorAll('[data-edit-mark-group]').forEach(btn=>btn.addEventListener('click',()=>{const d=document.querySelector(`[data-mark-group-detail="${btn.dataset.editMarkGroup}"]`);if(d){d.hidden=false;d.querySelector('[data-edit-mark]')?.click();document.querySelector('#marksForm')?.scrollIntoView({behavior:'smooth'})}}));
  document.querySelectorAll("[data-edit-mark]").forEach(btn=>btn.addEventListener("click",()=>{
    const m=examMarks.find(x=>String(x.id)===btn.dataset.editMark);if(!m)return;
    document.querySelector("#markEditId").value=m.id;document.querySelector("#markStudent").value=m.student_id;document.querySelector("#markYear").value=m.academic_year;document.querySelector("#markExam").value=m.exam_name;document.querySelector("#markSubject").value=m.subject;document.querySelector("#markObtained").value=m.marks_obtained;document.querySelector("#markMaximum").value=m.max_marks;document.querySelector("#markRemarks").value=m.remarks||"";document.querySelector("#saveMarksBtn").textContent="Update marks";document.querySelector("#cancelMarksEdit").hidden=false;document.querySelector("#examMarksPanel").scrollIntoView({behavior:"smooth"});
  }));
  document.querySelectorAll("[data-delete-mark]").forEach(btn=>btn.addEventListener("click",async()=>{
    if(!confirm("Delete this examination mark record?"))return;
    const {error}=await supabase.from("exam_marks").delete().eq("id",Number(btn.dataset.deleteMark));if(error)alert(error.message);else await renderPortal();
  }));
  const applyMarksFilter=()=>{
    const std=document.querySelector("#marksFilterStandard")?.value||"", exam=(document.querySelector("#marksFilterExam")?.value||"").toLowerCase();
    document.querySelectorAll("[data-mark-row]").forEach(row=>{const text=row.textContent.toLowerCase();const standardMatch=!std||text.includes(`std ${std}`);row.hidden=!(standardMatch&&text.includes(exam));});
  };
  document.querySelector("#marksFilterStandard")?.addEventListener("change",applyMarksFilter);
  document.querySelector("#marksFilterExam")?.addEventListener("input",applyMarksFilter);
  document.querySelector("#downloadMarksCsv")?.addEventListener("click",()=>{
    const rows=[["Academic Year","Exam","Standard","GR No","Student Name","Division","Roll No","Subject","Marks Obtained","Maximum Marks","Percentage","Remarks"]];
    examMarks.forEach(m=>{const st=students.find(x=>String(x.id)===String(m.student_id));if(!st)return;const std=document.querySelector("#marksFilterStandard").value,ex=document.querySelector("#marksFilterExam").value.toLowerCase();if(std&&String(st.standard)!==std)return;if(ex&&!m.exam_name.toLowerCase().includes(ex))return;rows.push([m.academic_year,m.exam_name,st.standard,st.admission_no,st.full_name,st.division||"A",st.roll_no??"",m.subject,m.marks_obtained,m.max_marks,(m.marks_obtained/m.max_marks*100).toFixed(2),m.remarks||""]);});
    const csv=rows.map(row=>row.map(v=>`"${String(v??"").replaceAll('"','""')}"`).join(",")).join("\r\n");
    const url=URL.createObjectURL(new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8"}));const a=document.createElement("a");a.href=url;a.download="school-examination-marks.csv";a.click();URL.revokeObjectURL(url);
  });

  // Bulk marks template: all student rows are prefilled; IDs are validated on import.
  const bulkMarksCsv = (rows, filename) => {
    const csv = rows.map(row => row.map(v => `"${String(v ?? "").replaceAll('"','""')}"`).join(",")).join("\r\n");
    const url=URL.createObjectURL(new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8"}));
    const a=document.createElement("a");a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  const normalizeCsvMatch = value => String(value ?? "").normalize("NFKC").trim().replace(/\s+/g," ").toLocaleLowerCase();
  const normalizeAcademicYear = value => normalizeCsvMatch(value).replace(/[–—−]/g,"-").replace(/\s*[-/]\s*/g,"-");
  const normalizeExam = value => normalizeCsvMatch(value).replace(/[–—−]/g,"-").replace(/\s*[-/]\s*/g,"-");
  const bulkConfig=()=>({
    std:document.querySelector("#marksFilterStandard").value,
    division:document.querySelector("#marksFilterDivision").value,
    year:document.querySelector("#marksBulkYear").value.trim(),
    exam:document.querySelector("#marksBulkExam").value.trim(),
    subjects:document.querySelector("#marksBulkSubjects").value.split(",").map(x=>x.trim()).filter(Boolean),
    maximum:Number(document.querySelector("#marksBulkMaximum").value)
  });
  const bulkStatus=document.querySelector("#marksBulkStatus");
  let validatedMarks=[];
  document.querySelector("#downloadPrefilledMarksCsv")?.addEventListener("click",()=>{
    const c=bulkConfig();
    if(!c.std||!c.year||!c.exam||!c.subjects.length||!Number.isFinite(c.maximum)||c.maximum<=0){bulkStatus.textContent="Select standard, academic year, exact exam, subjects and valid maximum marks first.";return;}
    if(new Set(c.subjects.map(x=>x.toLowerCase())).size!==c.subjects.length){bulkStatus.textContent="Duplicate subject names are not allowed.";return;}
    const matching=students.filter(st=>String(st.standard)===c.std&&(!c.division||(st.division||"A")===c.division));
    if(!matching.length){bulkStatus.textContent="No students found for selected class.";return;}
    const headers=["Student ID","GR Number","Student Name","Standard","Division","Roll Number","Academic Year","Exam",...c.subjects.flatMap(x=>[x+" - Obtained",x+" - Maximum"])];
    const rows=[headers,...matching.map(st=>[st.id,st.admission_no,st.full_name,st.standard,st.division||"A",st.roll_no??"",c.year,c.exam,...c.subjects.flatMap(subject=>{const existing=examMarks.find(m=>String(m.student_id)===String(st.id)&&normalizeAcademicYear(m.academic_year)===normalizeAcademicYear(c.year)&&normalizeExam(m.exam_name)===normalizeExam(c.exam)&&normalizeCsvMatch(m.subject)===normalizeCsvMatch(subject));return [existing?.marks_obtained??"",existing?.max_marks??c.maximum]})])];
    bulkMarksCsv(rows,`marks-std-${c.std}-${c.exam.replace(/[^a-z0-9-]/gi,"-")}.csv`);
    bulkStatus.textContent=`Downloaded ${matching.length} existing students with ${c.subjects.length} subjects. Fill obtained marks; blank marks are skipped.`;
  });
  const parseMarksCsv=text=>{
    const rows=[];let row=[],cell="",quoted=false;
    for(let i=0;i<text.length;i++){const ch=text[i];if(ch==='"'&&quoted&&text[i+1]==='"'){cell+='"';i++;}else if(ch==='"')quoted=!quoted;else if(ch===','&&!quoted){row.push(cell.trim());cell="";}else if((ch==='\r'||ch==='\n')&&!quoted){if(ch==='\r'&&text[i+1]==='\n')i++;row.push(cell.trim());if(row.some(v=>v!==""))rows.push(row);row=[];cell="";}else cell+=ch;}
    if(quoted)throw Error("CSV contains an unclosed quotation mark.");
    if(cell||row.length){row.push(cell.trim());if(row.some(v=>v!==""))rows.push(row);}return rows;
  };
  document.querySelector("#previewMarksCsv")?.addEventListener("click",async()=>{
    validatedMarks=[];document.querySelector("#saveMarksCsv").disabled=true;
    const preview=document.querySelector("#marksBulkPreview");preview.innerHTML="";
    const file=document.querySelector("#marksBulkFile").files[0];if(!file){bulkStatus.textContent="Choose a filled CSV first.";return;}
    try{
      const rows=parseMarksCsv((await file.text()).replace(/^\uFEFF/,""));if(rows.length<2)throw Error("CSV has no student rows.");
      const headers=rows[0].map(x=>x.trim().replace(/^\uFEFF/,""));const required=["Student ID","GR Number","Student Name","Standard","Division","Academic Year","Exam"];
      for(const h of required)if(!headers.includes(h))throw Error("Missing CSV column: "+h);
      const subjectCols=headers.map((h,i)=>({h,i})).filter(x=>x.h.endsWith(" - Obtained"));
      if(!subjectCols.length)throw Error("No subject columns found. Download the provided template.");
      const c=bulkConfig(), errors=[], seen=new Set(), data=[];
      for(let ri=1;ri<rows.length;ri++){
        const vals=rows[ri];const get=h=>vals[headers.indexOf(h)]??"";
        const st=students.find(x=>String(x.id)===get("Student ID"));
        if(!st){errors.push(`Row ${ri+1}: unknown Student ID`);continue;}
        if(String(st.admission_no)!==get("GR Number")||String(st.full_name)!==get("Student Name")||String(st.standard)!==get("Standard")||(st.division||"A")!==get("Division")){errors.push(`Row ${ri+1}: student details do not match the saved student record`);continue;}
        if(c.std&&String(st.standard)!==c.std||c.division&&(st.division||"A")!==c.division){errors.push(`Row ${ri+1}: student outside selected class`);continue;}
        const year=get("Academic Year").trim(),exam=get("Exam").trim();
        if(!year||!exam||normalizeAcademicYear(year)!==normalizeAcademicYear(c.year)||normalizeExam(exam)!==normalizeExam(c.exam)){
          errors.push(`Row ${ri+1}: Academic Year / Exam mismatch. CSV: "${year}" / "${exam}"; Website: "${c.year}" / "${c.exam}". Set the website fields to match the CSV or download a fresh template.`);continue;
        }
        for(const col of subjectCols){const subject=col.h.slice(0,-" - Obtained".length).trim(),raw=vals[col.i]??"";
          if(raw==="")continue;
          const maxHeader=subject+" - Maximum",maxRaw=get(maxHeader);
          if(!headers.includes(maxHeader)||!/^\d+(\.\d+)?$/.test(raw)||!/^\d+(\.\d+)?$/.test(maxRaw)){errors.push(`Row ${ri+1}, ${subject}: marks must be numeric`);continue;}
          const obtained=Number(raw),maximum=Number(maxRaw);
          if(maximum<=0||obtained>maximum){errors.push(`Row ${ri+1}, ${subject}: obtained exceeds maximum or maximum is zero`);continue;}
          const key=`${st.id}|${normalizeAcademicYear(c.year)}|${normalizeExam(c.exam)}|${normalizeCsvMatch(subject)}`;
          if(seen.has(key)){errors.push(`Row ${ri+1}: duplicate marks for ${subject}`);continue;}seen.add(key);
          data.push({student_id:st.id,academic_year:c.year.trim(),exam_name:c.exam.trim(),subject,marks_obtained:obtained,max_marks:maximum,created_by:session.user.id});
        }
      }
      if(errors.length){bulkStatus.textContent=`Validation failed: ${errors.length} error(s). Nothing saved. ${errors.slice(0,12).join(" | ")}`;return;}
      validatedMarks=data;bulkStatus.textContent=`Validated ${data.length} subject marks for ${new Set(data.map(x=>x.student_id)).size} students. Blank marks skipped. Click Save Validated Marks.`;
      preview.innerHTML=`<table class="result-table"><thead><tr><th>Student</th><th>Subject</th><th>Obtained</th><th>Maximum</th></tr></thead><tbody>${data.slice(0,30).map(m=>`<tr><td>${escapeHtml(students.find(x=>String(x.id)===String(m.student_id))?.full_name||"")}</td><td>${escapeHtml(m.subject)}</td><td>${m.marks_obtained}</td><td>${m.max_marks}</td></tr>`).join("")}</tbody></table>`;
      document.querySelector("#saveMarksCsv").disabled=!data.length;
    }catch(err){bulkStatus.textContent="CSV error: "+err.message;}
  });
  document.querySelector("#saveMarksCsv")?.addEventListener("click",async()=>{
    if(!validatedMarks.length)return;
    const btn=document.querySelector("#saveMarksCsv");btn.disabled=true;
    let saved=0;
    for(const mark of validatedMarks){
      const {error}=await supabase.from("exam_marks").upsert(mark,{onConflict:"student_id,academic_year,exam_name,subject"});
      if(error){bulkStatus.textContent=`Saved ${saved} of ${validatedMarks.length}. Error: ${error.message}. You may re-upload safely.`;return;}saved++;
    }
    bulkStatus.textContent=`Successfully saved ${saved} subject marks. Refreshing...`;await renderPortal();
  });
  let generatedResultRows = [];
  const csvDownload = (rows, filename) => {
    const csv = rows.map(row => row.map(v => `"${String(v ?? "").replaceAll('"','""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
  };
  const generateResultReport = () => {
    const standard = document.querySelector("#resultStandard").value;
    const year = document.querySelector("#resultYear").value.trim();
    const exam = document.querySelector("#resultExam").value.trim();
    const passPercent = Number(document.querySelector("#resultPassMark").value);
    const message = document.querySelector("#resultReportMessage");
    const list = document.querySelector("#resultReportList");
    generatedResultRows = [];
    document.querySelector("#downloadResultCsv").disabled = true;
    document.querySelector("#downloadTop10Csv").disabled = true;
    if (!standard || !year || !exam || !Number.isFinite(passPercent) || passPercent < 0 || passPercent > 100) {
      message.textContent = "Please select standard, enter academic year and exact exam name, and set pass percentage from 0 to 100.";
      list.innerHTML = ""; return;
    }
    const filtered = examMarks.filter(m => m.academic_year === year && m.exam_name.toLowerCase() === exam.toLowerCase())
      .map(m => ({ mark:m, student:students.find(st => String(st.id) === String(m.student_id)) }))
      .filter(x => x.student && String(x.student.standard) === standard);
    if (!filtered.length) { message.textContent = "No marks found for this standard, academic year and exam."; list.innerHTML = ""; return; }
    const grouped = new Map();
    filtered.forEach(({mark,student}) => {
      if (!grouped.has(String(student.id))) grouped.set(String(student.id), {student, subjects:[], obtained:0, maximum:0, passed:true});
      const row = grouped.get(String(student.id));
      const obtained = Number(mark.marks_obtained), maximum = Number(mark.max_marks);
      const subjectPercent = maximum > 0 ? obtained / maximum * 100 : 0;
      row.subjects.push({subject:mark.subject, obtained, maximum, percentage:subjectPercent});
      row.obtained += obtained; row.maximum += maximum;
      if (subjectPercent < passPercent) row.passed = false;
    });
    generatedResultRows = [...grouped.values()].map(row => ({
      student:row.student, subjects:row.subjects, obtained:row.obtained, maximum:row.maximum,
      percentage:row.maximum ? row.obtained / row.maximum * 100 : 0,
      result:row.passed ? "PASS" : "FAIL"
    })).sort((a,b) => b.percentage-a.percentage || String(a.student.full_name).localeCompare(String(b.student.full_name)));
    generatedResultRows.forEach((r,i) => r.rank = i+1);
    const passCount = generatedResultRows.filter(r=>r.result==="PASS").length;
    message.textContent = `${generatedResultRows.length} students · ${passCount} PASS · ${generatedResultRows.length-passCount} FAIL · Pass mark ${passPercent}%`;
    list.innerHTML = `<div class="student-result-cards">${generatedResultRows.map(r=>`<article class="student-result-group"><div class="student-result-heading">${studentPhotoUrls[r.student.id]?`<img class="result-card-photo" src="${escapeHtml(studentPhotoUrls[r.student.id])}" alt="Student photo">`:''}<div><b>${escapeHtml(r.student.full_name)}</b><p>GR ${escapeHtml(r.student.admission_no)} · Std ${escapeHtml(r.student.standard)} · ${escapeHtml(exam)} · ${escapeHtml(year)}</p></div><strong class="${r.result==='PASS'?'result-pass':'result-fail'}">${r.result}</strong></div><div class="student-result-stats"><span><small>Total Marks</small><strong>${r.obtained.toFixed(2)} / ${r.maximum.toFixed(2)}</strong></span><span><small>Percentage</small><strong>${r.percentage.toFixed(2)}%</strong></span><span><small>Rank</small><strong>${r.rank}</strong></span></div><div class="student-actions"><button class="portal-primary" type="button" data-view-result="${r.student.id}">View Result</button><button class="portal-secondary" type="button" data-edit-result="${r.student.id}">Edit Marks</button><button class="portal-primary" type="button" data-print-result="${r.student.id}">Print Result</button></div><div class="student-result-detail" data-result-detail="${r.student.id}" hidden><p><b>Roll:</b> ${escapeHtml(String(r.student.roll_no??'—'))} · <b>Division:</b> ${escapeHtml(r.student.division||'A')}</p><div class="result-table-wrap"><table class="result-table"><thead><tr><th>Subject</th><th>Obtained</th><th>Maximum</th><th>Percentage</th></tr></thead><tbody>${r.subjects.map(m=>`<tr><td>${escapeHtml(m.subject)}</td><td>${m.obtained}</td><td>${m.maximum}</td><td>${m.percentage.toFixed(2)}%</td></tr>`).join('')}</tbody></table></div></div></article>`).join('')}</div>`;
    document.querySelector("#downloadResultCsv").disabled = false;
    document.querySelector("#downloadTop10Csv").disabled = false;
  };
  // Print-ready individual report card with private student photo and school logo.
  // The browser's Save as PDF preserves embedded photo and styling; CSV cannot embed images.
  document.querySelector("#resultReportList")?.addEventListener("click", event => {
    const view=event.target.closest('[data-view-result]');
    if(view){const detail=[...document.querySelectorAll('[data-result-detail]')].find(x=>x.dataset.resultDetail===view.dataset.viewResult);if(detail){detail.hidden=!detail.hidden;view.textContent=detail.hidden?'View Result':'Hide Result'}return;}
    const edit=event.target.closest('[data-edit-result]');
    if(edit){const r=generatedResultRows.find(x=>String(x.student.id)===edit.dataset.editResult);const m=r&&examMarks.find(x=>String(x.student_id)===String(r.student.id)&&x.academic_year===document.querySelector('#resultYear').value&&x.exam_name.toLowerCase()===document.querySelector('#resultExam').value.toLowerCase());if(m){const btn=[...document.querySelectorAll('[data-edit-mark]')].find(x=>x.dataset.editMark===String(m.id));btn?.click();document.querySelector('#marksForm')?.scrollIntoView({behavior:'smooth'})}return;}
    const button = event.target.closest("[data-print-result]");
    if (!button) return;
    const r = generatedResultRows.find(item => String(item.student.id) === button.dataset.printResult);
    if (!r) return;
    const w = window.open("", "_blank", "width=900,height=800");
    if (!w) { alert("Please allow pop-ups to print or save the result PDF."); return; }
    const st = r.student;
    const photoUrl = studentPhotoUrls[st.id];
    const photo = photoUrl ? `<img class="student-photo" src="${escapeHtml(photoUrl)}" alt="Student photo">` : `<div class="student-photo missing">PHOTO NOT UPLOADED</div>`;
    const logo = `${window.location.origin}/school-logo.jpeg`;
    const year = document.querySelector("#resultYear").value;
    const exam = document.querySelector("#resultExam").value;
    const standard = document.querySelector("#resultStandard").value;
    const subjectRows = r.subjects.map((m, i) => `<tr><td>${i+1}</td><td>${escapeHtml(m.subject)}</td><td>${escapeHtml(String(m.maximum))}</td><td>${escapeHtml(String(m.obtained))}</td><td>${m.percentage.toFixed(2)}%</td></tr>`).join("");
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Result - ${escapeHtml(st.full_name)}</title>
      <style>
      *{box-sizing:border-box}body{margin:0;background:#e8eef8;color:#14223c;font-family:Arial,sans-serif;padding:22px}
      .sheet{position:relative;overflow:hidden;max-width:780px;margin:auto;background:#fff;border:3px solid #174b91;border-radius:15px;padding:24px 28px 30px;box-shadow:0 5px 20px #0002}
      .watermark{position:absolute;top:34%;left:26%;width:48%;opacity:.065;z-index:0;pointer-events:none}.content{position:relative;z-index:1}
      header{display:flex;align-items:center;gap:16px;border-bottom:4px solid #e9ae36;padding-bottom:14px}
      .logo{width:85px;height:85px;object-fit:contain}.school{font-size:23px;font-weight:800;color:#164a91}.place{font-size:15px;color:#55637a;margin-top:4px}
      h2{text-align:center;background:linear-gradient(100deg,#154c91,#2478bb);color:#fff;border-radius:7px;padding:11px;font-size:18px;margin:20px 0}
      .details{display:grid;grid-template-columns:1fr 115px;gap:18px;align-items:start}.info{display:grid;grid-template-columns:130px 1fr;gap:10px 8px;font-size:14px}.info strong{color:#173d73}
      .student-photo{width:110px;height:135px;object-fit:cover;border:2px solid #174b91;border-radius:6px;background:#f1f5fa}
      .missing{font-size:11px;color:#667;display:flex;align-items:center;justify-content:center;text-align:center;padding:8px}
      table{width:100%;border-collapse:collapse;margin-top:24px;font-size:14px}th{background:#174b91;color:white}td,th{border:1px solid #b4c6db;padding:9px;text-align:left}tbody tr:nth-child(even){background:#f0f5fc}
      .summary{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-top:18px;padding:12px;background:#eaf2ff;border-radius:7px;font-weight:bold}
      .signatures{display:flex;justify-content:space-between;gap:24px;margin-top:65px;font-size:14px;font-weight:bold;text-align:center}.signatures span{min-width:160px;border-top:1px solid #333;padding-top:8px} .rank{font-weight:bold;color:#174b91} .status{color:${r.result === "PASS" ? "#147443" : "#b22a36"}}.footer{text-align:center;color:#617087;margin-top:40px;font-size:12px}
      @media print{@page{size:A4;margin:12mm}body{background:white;padding:0;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}.sheet{max-width:none;box-shadow:none;border-radius:0;break-inside:avoid}.summary,th,h2{print-color-adjust:exact!important;-webkit-print-color-adjust:exact!important}}
      </style></head><body><div class="sheet"><img class="watermark" src="${logo}" alt=""><div class="content"><header><img class="logo" src="${logo}" alt="School logo"><div><div class="school">Government Secondary School</div><div class="place">Bildi, Gujarat</div></div></header>
      <h2>વિદ્યાર્થી પરીક્ષા પરિણામ / STUDENT EXAMINATION RESULT</h2><div class="details"><div class="info">
      <strong>Student Name</strong><span>${escapeHtml(st.full_name)}</span>
      <strong>GR Number</strong><span>${escapeHtml(st.admission_no ?? "—")}</span>
      <strong>Standard / Division</strong><span>${escapeHtml(String(standard))} / ${escapeHtml(st.division || "A")}</span>
      <strong>Roll Number</strong><span>${escapeHtml(String(st.roll_no ?? "—"))}</span>
      <strong>Academic Year</strong><span>${escapeHtml(year)}</span>
      <strong>Exam</strong><span>${escapeHtml(exam)}</span>
      </div>${photo}</div>
      <table><thead><tr><th>No.</th><th>Subject</th><th>Maximum Marks</th><th>Obtained Marks</th><th>Percentage</th></tr></thead><tbody>${subjectRows}</tbody></table>
      <div class="summary"><span>Total: ${r.obtained.toFixed(2)} / ${r.maximum.toFixed(2)}</span><span>Percentage: ${r.percentage.toFixed(2)}%</span><span class="rank">Rank: ${r.rank}</span><span class="status">${r.result}</span></div><div class="signatures"><span>વર્ગશિક્ષકની સહી<br>Class Teacher</span><span>આચાર્યશ્રીની સહી<br>Principal</span></div>
      <div class="footer">Generated from School Management System</div></div></div>
      <script>window.onload=async()=>{await Promise.all(Array.from(document.images).map(img=>img.complete?Promise.resolve():new Promise(resolve=>{img.onload=resolve;img.onerror=resolve})));window.print()};<\/script></body></html>`);
    w.document.close();
  });
  document.querySelector("#generateResult")?.addEventListener("click", generateResultReport);
  document.querySelector("#downloadResultCsv")?.addEventListener("click", () => {
    if (!generatedResultRows.length) return;
    const rows=[["Rank","Academic Year","Exam","Standard","GR No","Student Name","Division","Roll No","Total Obtained","Total Maximum","Percentage","Result","Subject Details"]];
    generatedResultRows.forEach(r=>rows.push([r.rank,document.querySelector("#resultYear").value,document.querySelector("#resultExam").value,document.querySelector("#resultStandard").value,r.student.admission_no,r.student.full_name,r.student.division||"A",r.student.roll_no??"",r.obtained.toFixed(2),r.maximum.toFixed(2),r.percentage.toFixed(2),r.result,r.subjects.map(x=>`${x.subject}: ${x.obtained}/${x.maximum}`).join("; ")]));
    csvDownload(rows,"student-exam-results.csv");
  });
  document.querySelector("#downloadTop10Csv")?.addEventListener("click", () => {
    if (!generatedResultRows.length) return;
    const rows=[["Rank","GR No","Student Name","Standard","Total Obtained","Total Maximum","Percentage","Result"]];
    generatedResultRows.slice(0,10).forEach(r=>rows.push([r.rank,r.student.admission_no,r.student.full_name,document.querySelector("#resultStandard").value,r.obtained.toFixed(2),r.maximum.toFixed(2),r.percentage.toFixed(2),r.result]));
    csvDownload(rows,"student-top-10-ranking.csv");
  });

  const att = id => document.getElementById(id);
  let loadedDate = '', savedAttendance = [], busyAttendance = false, attendanceDirty = false;
  const statuses = ['present','absent','late','leave'];
  const scopedStudents = () => students.filter(st=>!att('attendanceStandard').value || String(st.standard)===att('attendanceStandard').value);
  const dateLabel = d => d.split('-').reverse().join('-');
  const attError = msg => {att('attendanceError').textContent=msg;};
  const attBusy = busy => {busyAttendance=busy; ['attendanceDate','attendanceStandard','attendanceSearch','attendanceAll','attendanceSave','attendanceCsv','attendancePrint','attendanceMonthly','attendanceMonth'].forEach(id=>att(id).disabled=busy); att('attendanceList').querySelectorAll('select').forEach(el=>el.disabled=busy);};
  const fetchAttendance = async (start,end) => {
    const rows=[];
    for(let offset=0;;offset+=500){
      const {data,error}=await supabase.from('attendance').select('id,student_id,attendance_date,status').gte('attendance_date',start).lte('attendance_date',end).order('id').range(offset,offset+499);
      if(error) throw error;
      rows.push(...data.filter(r=>allowedStudentIds.has(String(r.student_id))));
      if(data.length<500) return rows;
    }
  };
  const reportRows = rows => {const byId=new Map(scopedStudents().map(st=>[String(st.id),st])); return rows.filter(r=>byId.has(String(r.student_id))).map(r=>{const st=byId.get(String(r.student_id));return [dateLabel(r.attendance_date),st.admission_no,st.full_name,st.standard,st.division||'A',r.status];});};
  const headings=['Date','GR No','Student Name','Standard','Division','Status'];
  const renderAttendance = () => {
    const saved=new Map(savedAttendance.map(r=>[String(r.student_id),r.status]));
    const visible=scopedStudents().filter(st=>st.status==='active'||saved.has(String(st.id)));
    att('attendanceList').innerHTML=visible.map(st=>`<label class="attendance-row"><span>${escapeHtml(st.full_name)} · Std ${escapeHtml(st.standard)}-${escapeHtml(st.division||'A')} (GR ${escapeHtml(st.admission_no)})</span><select data-att-student="${escapeHtml(st.id)}"><option value="">Not marked</option>${statuses.map(v=>`<option value="${v}" ${saved.get(String(st.id))===v?'selected':''}>${v[0].toUpperCase()+v.slice(1)}</option>`).join('')}</select></label>`).join('')||'<p>No students available.</p>';
    const rows=reportRows(savedAttendance); att('attendanceSummary').textContent=`${dateLabel(loadedDate)} | Saved: ${rows.length} | `+statuses.map(v=>`${v}: ${rows.filter(r=>r[5]===v).length}`).join(' | ');
    att('attendanceSuccess').textContent=rows.length?'Saved attendance loaded.':'No saved attendance for this date.';
    attendanceDirty=false;
  };
  const loadAttendance = async () => {
    if(busyAttendance)return;
    const date=att('attendanceDate').value;
    if(!date||date>today){attError('Select a valid date, not in the future.');return;}
    if(attendanceDirty&&!confirm('Discard unsaved attendance changes?'))return;
    attBusy(true);attError('');loadedDate='';att('attendanceList').innerHTML='';att('attendanceSummary').textContent='';att('attendanceSuccess').textContent='Loading…';
    try{savedAttendance=await fetchAttendance(date,date);loadedDate=date;renderAttendance();}catch(e){attError(e.message);att('attendanceSuccess').textContent='';}finally{attBusy(false);}
  };
  att('attendanceSearch').onclick=loadAttendance;
  att('attendanceList').onchange=()=>{attendanceDirty=true;};
  let previousAttendanceStandard = '';
  att('attendanceStandard').onchange=()=>{if(attendanceDirty&&!confirm('Discard unsaved changes?')){att('attendanceStandard').value=previousAttendanceStandard;return;}previousAttendanceStandard=att('attendanceStandard').value;if(loadedDate)renderAttendance();};
  att('attendanceAll').onclick=()=>{if(loadedDate===att('attendanceDate').value){att('attendanceList').querySelectorAll('select').forEach(el=>el.value='present');attendanceDirty=true;}};
  att('attendanceForm').onsubmit=async event=>{
    event.preventDefault();if(busyAttendance)return;
    if(!loadedDate||loadedDate!==att('attendanceDate').value){attError('Search the selected date first.');return;}
    const records=[...att('attendanceList').querySelectorAll('select')].filter(el=>statuses.includes(el.value)).map(el=>({student_id:el.dataset.attStudent,attendance_date:loadedDate,status:el.value,marked_by:session.user.id}));
    if(!records.length){attError('Mark at least one student.');return;}
    attBusy(true);attError('');try{const {error}=await supabase.from('attendance').upsert(records,{onConflict:'student_id,attendance_date'});if(error)throw error;attendanceDirty=false;savedAttendance=await fetchAttendance(loadedDate,loadedDate);renderAttendance();att('attendanceSuccess').textContent='Attendance saved successfully.';}catch(e){attError(e.message);}finally{attBusy(false);}
  };
  const dailyReport=()=>{if(!loadedDate||loadedDate!==att('attendanceDate').value){attError('Search the selected date first.');return null;}const rows=reportRows(savedAttendance);if(!rows.length){attError('No saved attendance to download.');return null;}return rows;};
  const safeCsv = rows => rows.map(r=>r.map(v=>/^[=+@-]/.test(String(v??''))?"'"+v:v));
  att('attendanceCsv').onclick=()=>{const rows=dailyReport();if(rows)csvDownload(safeCsv([headings,...rows]),`attendance-${loadedDate}.csv`);};
  att('attendancePrint').onclick=()=>{const rows=dailyReport();if(!rows)return;const w=window.open('','_blank');if(!w){attError('Allow pop-ups to print.');return;}w.document.write(`<html><head><meta charset="utf-8"><title>Attendance ${loadedDate}</title><style>body{font:14px Arial,sans-serif}table{border-collapse:collapse;width:100%}td,th{border:1px solid #999;padding:8px}thead{display:table-header-group}</style></head><body><h2>Government Secondary School · Bildi</h2><h3>Attendance report · ${dateLabel(loadedDate)}</h3><p>${escapeHtml(att('attendanceSummary').textContent)}</p><table><thead><tr>${headings.map(v=>`<th>${v}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(v=>`<td>${escapeHtml(v??'')}</td>`).join('')}</tr>`).join('')}</tbody></table></body></html>`);w.document.close();w.focus();w.print();};
  att('attendanceMonthly').onclick=async()=>{const month=att('attendanceMonth').value;if(!/^\d{4}-\d{2}$/.test(month)||month>today.slice(0,7)){attError('Select a valid month.');return;}attBusy(true);attError('');try{const [y,m]=month.split('-').map(Number);const end=month+'-'+new Date(y,m,0).getDate();const rows=reportRows(await fetchAttendance(month+'-01',end));if(!rows.length){attError('No saved attendance for this month.');return;}csvDownload(safeCsv([headings,...rows]),`attendance-${month}.csv`);}catch(e){attError(e.message);}finally{attBusy(false);}};
  void loadAttendance();

  document.querySelector("#logoutBtn").addEventListener("click", async () => {
    await supabase.auth.signOut();
    await renderPortal();
  });

  document.querySelector("#galleryUploadForm")?.addEventListener("submit", async (event) => {
    event.preventDefault(); const form=event.currentTarget; const button=form.querySelector("button[type=submit]"); const errorBox=document.querySelector("#galleryUploadError");
    const file=document.querySelector("#galleryFile").files[0]; errorBox.textContent="";
    if (!file) return; if (file.size > 5*1024*1024) { errorBox.textContent="Maximum photo size is 5 MB."; return; }
    if (!['image/jpeg','image/png','image/webp'].includes(file.type)) { errorBox.textContent="Choose JPG, PNG or WEBP image."; return; }
    button.disabled=true;
    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      const currentUser = authData?.user;
      if (authError || !currentUser) throw new Error("Login session expired. Please logout and login again.");

      const ext = file.name.split(".").pop().toLowerCase();
      const path = `${currentUser.id}/${crypto.randomUUID()}.${ext}`;
      const { error: storageError } = await supabase.storage
        .from("school-gallery")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (storageError) {
        throw new Error(`Photo Storage permission error: ${storageError.message}. Check storage.objects INSERT policy for school-gallery.`);
      }

      const { data: publicData } = supabase.storage.from("school-gallery").getPublicUrl(path);
      const { error: rowError } = await supabase.from("gallery_items").insert({
        title: document.querySelector("#galleryTitle").value.trim(),
        caption: document.querySelector("#galleryCaption").value.trim(),
        image_url: publicData.publicUrl,
        is_published: true,
        created_by: currentUser.id
      });
      if (rowError) {
        await supabase.storage.from("school-gallery").remove([path]);
        throw new Error(`Gallery record permission error: ${rowError.message}. Run supabase/gallery-media-upgrade.sql in the connected Supabase project.`);
      }
      await renderPortal();
    } catch (uploadError) {
      errorBox.textContent = uploadError?.message || "Photo upload failed. Please try again.";
      button.disabled = false;
    }
  });
  document.querySelectorAll("[data-edit-gallery]").forEach(btn=>btn.addEventListener("click",async()=>{const item=galleryItems.find(g=>g.id===Number(btn.dataset.editGallery));if(!item)return;const title=prompt("Edit photo title",item.title);if(title===null)return;const caption=prompt("Edit caption",item.caption||"");if(caption===null)return;const {error}=await supabase.from("gallery_items").update({title:title.trim(),caption:caption.trim()}).eq("id",item.id).eq("created_by",session.user.id);if(error)alert(error.message);else await renderPortal();}));
  document.querySelectorAll("[data-delete-gallery]").forEach(btn=>btn.addEventListener("click",async()=>{if(!confirm("Delete this photo from the website?"))return;const url=decodeURIComponent(btn.dataset.imageUrl);const marker="/storage/v1/object/public/school-gallery/";const path=url.split(marker)[1];const {error}=await supabase.from("gallery_items").delete().eq("id",Number(btn.dataset.deleteGallery)).eq("created_by",session.user.id);if(error){alert(error.message);return;}if(path)await supabase.storage.from("school-gallery").remove([decodeURIComponent(path)]);await renderPortal();}));

  if (isAdmin) {
    document.querySelector("#noticeForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      const button = event.currentTarget.querySelector("button");
      button.disabled = true;
      const title = document.querySelector("#noticeTitle").value.trim();
      const details = document.querySelector("#noticeDetails").value.trim();
      const { error } = await supabase.from("notices").insert({ title, details, created_by: session.user.id });
      if (error) {
        document.querySelector("#noticeError").textContent = error.message;
        button.disabled = false;
      } else {
        await renderPortal();
      }
    });
    document.querySelectorAll("[data-delete-notice]").forEach(button => button.addEventListener("click", async () => {
      const { error } = await supabase.from("notices").delete().eq("id", Number(button.dataset.deleteNotice));
      if (error) alert(error.message);
      else await renderPortal();
    }));
  } else {
    document.querySelector("#homeworkForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      const button = event.currentTarget.querySelector("button");
      button.disabled = true;
      const payload = {
        class_name: document.querySelector("#homeworkClass").value.trim(),
        subject: document.querySelector("#homeworkSubject").value.trim(),
        details: document.querySelector("#homeworkDetails").value.trim(),
        created_by: session.user.id
      };
      const { error } = await supabase.from("homework").insert(payload);
      if (error) {
        document.querySelector("#homeworkError").textContent = error.message;
        button.disabled = false;
      } else {
        await renderPortal();
      }
    });
  }
}

function setupPublicResultSearch() {
  const form = document.querySelector('#publicResultForm');
  if (!form) return;
  const status = document.querySelector('#publicResultStatus');
  const output = document.querySelector('#publicResultOutput');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    output.innerHTML = '';
    status.textContent = 'Searching result…';
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    try {
      if (!supabase) throw new Error('Supabase configuration is missing.');
      const lookup = {
        p_gr: document.querySelector('#publicResultGr').value.trim(),
        p_roll: document.querySelector('#publicResultRoll').value.trim(),
        p_year: document.querySelector('#publicResultYear').value.trim(),
        p_exam: document.querySelector('#publicResultExam').value.trim()
      };
      // The Edge Function checks the result before issuing a short-lived private photo URL.
      const { data, error } = await supabase.functions.invoke('public-result-with-photo', {
        body: lookup
      });
      if (error) throw new Error('Public result service unavailable. Deploy the public-result-with-photo Edge Function first. ' + error.message);
      if (data?.error) throw new Error(data.error);
      if (!data || !data.subjects?.length) { status.textContent = 'No matching result found. Check GR, roll number, year and exam.'; return; }
      const r = data;
      const rows = r.subjects.map((m,i)=>`<tr><td>${i+1}</td><td>${escapeHtml(m.subject)}</td><td>${escapeHtml(m.max_marks)}</td><td>${escapeHtml(m.marks_obtained)}</td></tr>`).join('');
      const photo = r.photo_url
        ? `<img class="public-student-photo" src="${escapeHtml(r.photo_url)}" alt="Student photo" referrerpolicy="no-referrer" />`
        : `<div class="public-student-photo public-student-photo-empty">PHOTO</div>`;
      const card = `<article class="public-result-card" id="publicPrintableResult"><header class="public-result-header"><img src="/school-logo.jpeg" alt="School logo"><div><h3>સરકારી માધ્યમિક શાળા, બિલડી</h3><p>Government Secondary School, Bildi</p><b>વિદ્યાર્થી પરીક્ષા પરિણામ / STUDENT RESULT</b></div></header><div class="public-result-profile"><div class="public-result-meta"><span><b>Student:</b> ${escapeHtml(r.full_name)}</span><span><b>GR:</b> ${escapeHtml(r.admission_no)}</span><span><b>Std:</b> ${escapeHtml(r.standard)} / ${escapeHtml(r.division)}</span><span><b>Roll:</b> ${escapeHtml(r.roll_no)}</span><span><b>Year:</b> ${escapeHtml(r.academic_year)}</span><span><b>Exam:</b> ${escapeHtml(r.exam_name)}</span></div>${photo}</div><div class="result-table-wrap"><table class="result-table"><thead><tr><th>No.</th><th>Subject</th><th>Maximum</th><th>Obtained</th></tr></thead><tbody>${rows}</tbody></table></div><div class="public-result-summary"><b>Total: ${escapeHtml(r.obtained)} / ${escapeHtml(r.maximum)}</b><b>Percentage: ${escapeHtml(r.percentage)}%</b><b>${escapeHtml(r.result)}</b></div><div class="public-result-sign"><span>વર્ગશિક્ષકની સહી<br>Class Teacher</span><span>આચાર્યશ્રીની સહી<br>Principal</span></div></article><button id="publicPrintResult" type="button" class="primary-btn">Print / Save PDF</button>`;
      output.innerHTML = card;
      status.textContent = 'Result found.';
      document.querySelector('#publicPrintResult').addEventListener('click', () => {
        const printable = document.querySelector('#publicPrintableResult').outerHTML;
        const w = window.open('', '_blank', 'width=900,height=800');
        if (!w) { alert('Please allow pop-ups to print the result.'); return; }
        w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Student Result</title><style>${publicResultPrintCss()}</style></head><body>${printable}<script>window.onload=()=>{Promise.all(Array.from(document.images).map(i=>i.complete?Promise.resolve():new Promise(r=>{i.onload=r;i.onerror=r}))).then(()=>window.print())};<\/script></body></html>`);
        w.document.close();
      });
    } catch(e) { status.textContent = e.message; }
    finally { button.disabled = false; }
  });
}
function publicResultPrintCss() {
  return `body{font-family:Arial,sans-serif;color:#16345c;margin:25px}.public-result-card{max-width:800px;margin:auto;border:3px solid #245ca3;padding:25px;background:#fff url('/school-logo.jpeg') center/45% no-repeat}.public-result-header{display:flex;gap:20px;align-items:center;border-bottom:4px solid #e3ad43;padding-bottom:14px}.public-result-header img{width:85px;height:85px;object-fit:contain}.public-result-header h3{margin:0}.public-result-profile{display:flex;gap:18px;align-items:flex-start;margin:22px 0}.public-result-meta{display:grid;grid-template-columns:1fr 1fr;gap:12px;flex:1}.public-student-photo{width:105px;height:125px;object-fit:cover;border:2px solid #245ca3;border-radius:5px}.public-student-photo-empty{display:flex;align-items:center;justify-content:center;color:#64748b;background:#f1f5f9}.result-table{border-collapse:collapse;width:100%}.result-table td,.result-table th{border:1px solid #9aaec9;padding:9px;text-align:left}.result-table th{background:#245ca3;color:white}.public-result-summary{display:flex;justify-content:space-between;background:#e7f0ff;padding:15px;margin-top:20px}.public-result-sign{display:flex;justify-content:space-between;text-align:center;margin-top:80px}.public-result-sign span{border-top:1px solid #333;padding-top:8px}@page{size:A4;margin:12mm}@media print{*{-webkit-print-color-adjust:exact;print-color-adjust:exact}}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

window.addEventListener("hashchange", render);
// Authentication changes are handled by the login/logout handlers above.
// Rendering from onAuthStateChange causes overlapping portal renders during
// sign-in, token refresh and sign-out (and can race privileged requests).
render();
