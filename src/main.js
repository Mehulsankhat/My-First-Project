import "./style.css";

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
  document.documentElement.lang = currentLanguage === "gu" ? "gu" : "en";
  document.title = `${school.name}, ${school.place}`;

  document.querySelector("#app").innerHTML = `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="#home" aria-label="${school.name}">
          <div class="brand-mark">GSS</div>
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
          <a href="#contact">${t("contact")}</a>
        </nav>
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

      <section class="section gallery-section" id="gallery">
        <div class="container">
          <div class="section-heading"><div><span class="section-kicker">${t("gallery")}</span><h2>${t("galleryTitle")}</h2><p>${t("gallerySub")}</p></div></div>
          <div class="gallery-grid">
            <div class="gallery-tile tile-one"><span>📚</span><b>${currentLanguage === "gu" ? "અભ્યાસ" : "Learning"}</b></div>
            <div class="gallery-tile tile-two"><span>🌱</span><b>${currentLanguage === "gu" ? "પ્રકૃતિ" : "Nature"}</b></div>
            <div class="gallery-tile tile-three"><span>🏆</span><b>${currentLanguage === "gu" ? "સિદ્ધિ" : "Achievement"}</b></div>
          </div>
          <p class="gallery-note">${t("galleryNote")}</p>
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

render();
