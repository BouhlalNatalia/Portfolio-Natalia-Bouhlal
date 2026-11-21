document.addEventListener("DOMContentLoaded", () => {

  const select = document.getElementById("languageSwitcher");
  const selected = select?.querySelector(".selected");
  const options = select?.querySelector(".options");
  const optionItems = options?.querySelectorAll("li");
  const typingEl = document.getElementById("typing");

  let currentLang = "de";
  let charIndex = 0;
  let isDeleting = false;
  let typingTimeout;

  // ===================== ПЕРЕВОДЫ / TRANSLATIONS =====================
  // Немецкий (de) — язык по умолчанию. Тот же текст стоит в index.html.
  const translations = {

    de: {
      navHome: "Start",
      navAbout: "Über mich",
      navResume: "Lebenslauf",
      navProjects: "Projekte",
      navContact: "Kontakt",
      heroTitle: "Hallo, ich bin Natalia,",
      btnPortfolio: "Meine Projekte",
      btnContact: "Kontakt aufnehmen",
      aboutTitle: "Über mich",
      aboutText: "Ich setze Ideen gern in übersichtliche und benutzerfreundliche Webseiten um – mit <strong>HTML, CSS, JavaScript und React</strong>.",
      aboutExtra1: "Vor meinem Wechsel in die Webentwicklung habe ich über 10 Jahre an der Universität unterrichtet. Privat probiere ich gern <strong>KI-Tools</strong> aus, experimentiere mit Design und reise.",
      aboutExtra2: "Ich freue mich auf neue Projekte und die Arbeit im Team.",
      projectsTitle: "Projekte",
      contactTitle: "← Schreiben Sie mir →",
      contactName: "Name",
      contactEmail: "E-Mail",
      contactSubject: "Betreff",
      contactMessage: "Ihre Nachricht",
      contactBtn: "Nachricht senden",
      contactConsent: 'Ich habe die <a href="datenschutz.html" target="_blank" rel="noopener">Datenschutzerklärung</a> gelesen und bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verwendet werden.',
      footerCopy: "© 2026 Natalia Bouhlal",
      footerRole: "Junior Full-Stack-Entwicklerin • Mit ❤️ erstellt",

      skillsTitle: "Womit ich arbeite",
      skillCatFrontend: "Frontend",
      skillDescFrontend: "Benutzeroberflächen mit React und TypeScript.",
      skillLabelFoundations: "Grundlagen",
      skillCatBackend: "Backend",
      skillDescBackend: "Server-Logik und REST-APIs mit Node.js und Express.",
      skillCatDb: "Datenbanken",
      skillDescDb: "SQL und NoSQL: MySQL und MongoDB.",
      skillCatTools: "Tools",
      skillDescTools: "Git und GitHub, Docker und Linux-Grundlagen.",
      skillCatAi: "Moderne Tools",
      skillTitleAi: "KI-gestützte Entwicklung",
      skillDescAi: "Programmieren mit ChatGPT, Claude und Gemini.",
      skillCatSoft: "Soft Skills",
      skillDescSoft: "Teamarbeit, Kommunikation, Arbeit mit Jira.",
      skillCatUi: "UI / Design",
      skillDescUi: "Figma, Canva und responsive Webseiten.",

      accordionBtn: "Details anzeigen",
      accordionBtnClose: "Details ausblenden",

      resumeTitle: "Lebenslauf",
      careerTitle: "Beruflicher Werdegang",

      jobPracticeTitle: "Webentwicklerin (Praktikum)",
      jobPracticePlace: "New Life – New Beginning e.V., Rüsselsheim (remote)",
      jobPracticeTask1: "Frontend-Entwicklung im Team der digitalen Plattform SIDL (Social Innovation & Digital Lab).",
      jobPracticeTask2: "Eigenständige Entwicklung eines neuen CoursesBlock nach Figma-Design, mit Datenfeldern in Payload CMS und TypeScript-Typen.",
      jobPracticeTask3: "Analyse bestehender Frontend-Komponenten und Überarbeitung nach technischem Review.",
      jobPracticeTask4: "Arbeit mit GitHub: Pull Requests, Zusammenführung des Entwicklungsstandes, Lösung von Merge-Konflikten.",
      jobPracticeTask5: "Mitarbeit im UI/UX-Team: Informationsarchitektur, Seiten- und Navigationsstruktur, User Flows.",
      jobPracticeTask6: "Dokumentation von Aufgaben und Ergebnissen in Jira, Abstimmung mit den Projekt Leads.",

      job1: "Weiterbildung Webentwicklung mit KI",
      job1Place: "IT Career Hub GmbH, Berlin",
      job1Task1: "1.520 Unterrichtseinheiten, AZAV-zertifiziert. Zertifikat vom 22.05.2026.",
      job1Task2: "Inhalte: HTML, CSS, JavaScript, React, Node.js, TypeScript, Docker und Cloud-Technologien.",
      job1Task3: "Projekte: ICHGram, My Pet Shop, Events Platform und HOTSAUCE Conference. Fachmodule mit „sehr gut“ bestanden.",

      jobBew: "Bewerbungsphase",

      job2: "Deutschkurse und Integration",
      job2Place: "KEB Dillingen, CEB Akademie Merzig, gaertner hkk Dillingen",
      job2Task1: "Integrationskurs und Deutschkurse bis Niveau B2.",
      job2Task2: "Berufliche Orientierung für den IT-Arbeitsmarkt.",

      job3: "Dozentin (Senior Lecturer), Abteilung für Ingenieurwesen und Technologie",
      job3Place: "Asowsches Maritimes Institut der Nationalen Universität „Odessa Maritime Academy“, Mariupol (Ukraine)",
      job3Task1: "Lehre im Fach Informationstechnologie (Access, Excel, Google Workspace, MathCAD).",
      job3Task2: "Erstellung von Studien- und Lehrplänen und von Lehrmaterial.",
      job3Task3: "Prüferin bei Examen. Autorin von Fachartikeln.",
      job3Task4: "Einsatz von Google Workspace und MS Office in der Lehre für die gemeinsame Arbeit der Studierenden.",

      job4: "Dozentin (Senior Lecturer), Lehrstuhl für Biomedizinische Technik",
      job4Place: "Pryazovskyi State Technical University (Staatliche Technische Universität Asow-Gebiet), Mariupol (Ukraine)",
      job4Task1: "Lehre: Telemedizinische Systeme, diagnostische und therapeutische Gerätetechnik, Mikroprozessortechnik, Netzwerktechnik, Python, MATLAB.",
      job4Task2: "Betreuung von Abschlussarbeiten und Mentoring von Studierenden.",
      job4Task3: "Eigenverantwortliche Vorbereitung der Unterlagen für die Akkreditierung und Zertifizierung von Studiengängen.",
      job4Task4: "Jurymitglied der Kleinen Akademie der Wissenschaften (Medizin, Biologie, Ökologie).",
      job4Task5: "Einführung von Cloud-Tools für Projektarbeit, schnelles Feedback und Wissenskontrolle.",
      job4Task6: "Stellvertretende Dekanin für Studierendenangelegenheiten, Fakultät für Informationstechnologien.",

      job5: "Familienphase und IT-Selbststudium",
      job5Task1: "Selbststudium der IT-Grundlagen (HTML, CSS, Programmieren).",
      job5Task2: "Erstellung von Lehrmaterial für die Arbeit an der Hochschule.",

      job6: "Oberlaborantin, später Dozentin für Informatik",
      job6Place: "Pryazovskyi State Technical University, Mariupol (Ukraine)",
      job6Task1: "Praktika und Vorlesungen für internationale Studierende (Python, Access, SQL, Excel, LAN, TCP/IP).",
      job6Task2: "Erstellung von Lehrmaterial für Informatik.",
      job6Task3: "Aufstieg von der Laborantin zur Dozentin für Informatik.",

      educationTitle: "Ausbildung",
      edu1: "Doktorandenstudium (Aspirantur), nicht abgeschlossen",
      edu1Place: "Pryazovskyi State Technical University, Mariupol (Ukraine)",
      edu2: "Spezialistin für Informatik und angewandte Mathematik",
      edu2Place: "Pryazovskyi State Technical University, Mariupol (Ukraine) · Diplom mit Auszeichnung; laut ZAB-Bewertung auf Master-Niveau",
      edu3: "Bachelor in angewandter Mathematik",
      edu3Place: "Pryazovskyi State Technical University, Mariupol (Ukraine)",

      langTitle: "Sprachen",
      extraSkillsTitle: "Weitere Angaben",
      langBtn: "Sprachkenntnisse",
      lang1: "Deutsch: B2 (telc Deutsch-Test für den Beruf, 06/2024)",
      lang2: "Englisch: B1",
      lang3: "Ukrainisch und Russisch: Muttersprache",

      jobVolunteerDate: "Seit 11/2026",
      jobVolunteerTitle: "Webentwicklerin (ehrenamtlich)",
      jobVolunteerPlace: "New Life – New Beginning e.V.",
      jobVolunteerTask1: "Nach dem Praktikum arbeite ich ehrenamtlich an den Webprojekten des Vereins weiter.",

      volSocialDate: "Seit 06/2022",
      volBtn: "Soziales Engagement",
      volText: "Ich helfe ehrenamtlich im „Gute Zweck Laden“ in Schmelz (Kommunikation und Organisation).",

      modalDescTitle: "Projektbeschreibung:",
      modalFeaturesTitle: "Wichtigste Merkmale:",

      metaTitle: "Natalia Bouhlal | Webentwicklerin",
      metaDescription: "Portfolio von Natalia Bouhlal, Junior Full-Stack-Entwicklerin aus Eppelborn (Saarland). Projekte mit React, TypeScript, Node.js und MongoDB, Lebenslauf und Kontakt.",
      ariaPrev: "Vorheriges Projekt",
      ariaNext: "Nächstes Projekt",
      liveLabel: "Live-Demo",

      projects: [
        {
          title: "ICHGram",
          desc: "Soziales Netzwerk zum Teilen von Fotos, entwickelt als Full-Stack-Anwendung mit React, TypeScript und Node.js. Nutzer legen ein Profil an, posten Fotos, liken, kommentieren, folgen anderen und chatten in Echtzeit.",
          highlights: [
            "<strong>Anmeldung:</strong> Registrierung, Login und JWT-Authentifizierung. Passwörter werden mit bcrypt gehasht.",
            "<strong>Soziale Funktionen:</strong> Profile, Foto-Beiträge, Likes, Kommentare, Follower und Benachrichtigungen.",
            "<strong>Echtzeit-Chat:</strong> Nachrichten und Chat-Updates in Echtzeit mit Socket.IO.",
            "<strong>Bilderspeicher:</strong> Beitragsfotos und Profilbilder liegen in Cloudinary.",
            "<strong>Deployment:</strong> Die App läuft auf Render, die Daten liegen in MongoDB Atlas."
          ]
        },
        {
          title: "My Pet Shop",
          desc: "Online-Shop für ein Zoofachgeschäft, gebaut mit React. Mit Produktkatalog, Warenkorb, Favoriten und Filtern.",
          highlights: [
            "<strong>State Management:</strong> Globaler Zustand mit Redux Toolkit (Warenkorb, Favoriten, Filter).",
            "<strong>API-Anbindung:</strong> Datenabruf mit Axios, Interceptors und Fehlerbehandlung.",
            "<strong>Routing:</strong> Mehrere Seiten mit React Router, auch dynamische Produktseiten.",
            "<strong>Formulare:</strong> Prüfung der Bestelldaten mit Formik und Yup.",
            "<strong>Performance und UX:</strong> Weniger unnötige Renders. Die Oberfläche passt sich allen Bildschirmgrößen an."
          ]
        },
        {
          title: "Events Platform",
          desc: "Mehrseitige Webseite zum Suchen und Buchen von Veranstaltungen, mit interaktiver Karte und Filtern.",
          highlights: [
            "<strong>Filter:</strong> Veranstaltungen nach vier Kriterien: Typ, Format (Entfernung), Kategorie und Datum.",
            "<strong>BEM:</strong> Klare Benennung der CSS-Klassen für wiederverwendbare Komponenten.",
            "<strong>Build:</strong> SCSS und Gulp für eine schnelle, saubere Entwicklung.",
            "<strong>Karte:</strong> Orte der Veranstaltungen auf einer Leaflet-Karte.",
            "<strong>SEO:</strong> Semantisches HTML5 und responsive Layouts für Smartphone und Desktop."
          ]
        },
        {
          title: "HOTSAUCE Conference",
          desc: "Responsive Landingpage für eine Tech-Konferenz mit Bereichen für Sprecher, Programm, Preise und FAQ.",
          highlights: [
            "<strong>BEM:</strong> Modularer CSS-Code mit unabhängigen Komponenten.",
            "<strong>Layout:</strong> Raster für Sprecher und Programm mit CSS Grid und Flexbox.",
            "<strong>Gestaltung:</strong> Ticket-Effekt mit Pseudo-Elementen (::before, ::after) und SVG.",
            "<strong>Interaktion:</strong> FAQ-Akkordeon und Hinweise mit JavaScript und CSS-Animationen.",
            "<strong>Responsive:</strong> Getestet für fünf Bildschirmgrößen (390 bis 1920 px). Gulp, SCSS und semantisches HTML5."
          ]
        },
        {
          title: "ICHGram",
          desc: "Soziales Netzwerk zum Teilen von Fotos, entwickelt als Full-Stack-Anwendung mit React, TypeScript und Node.js. Nutzer legen ein Profil an, posten Fotos, liken, kommentieren, folgen anderen und chatten in Echtzeit.",
          highlights: [
            "<strong>Anmeldung:</strong> Registrierung, Login und JWT-Authentifizierung. Passwörter werden mit bcrypt gehasht.",
            "<strong>Soziale Funktionen:</strong> Profile, Foto-Beiträge, Likes, Kommentare, Follower und Benachrichtigungen.",
            "<strong>Echtzeit-Chat:</strong> Nachrichten und Chat-Updates in Echtzeit mit Socket.IO.",
            "<strong>Bilderspeicher:</strong> Beitragsfotos und Profilbilder liegen in Cloudinary.",
            "<strong>Deployment:</strong> Die App läuft auf Render, die Daten liegen in MongoDB Atlas."
          ]
        }
      ]
    },

    en: {
      navHome: "Home",
      navAbout: "About",
      navResume: "CV",
      navProjects: "Projects",
      navContact: "Contact",
      heroTitle: "Hi, I'm Natalia,",
      btnPortfolio: "My projects",
      btnContact: "Get in touch",
      aboutTitle: "About me",
      aboutText: "I enjoy turning ideas into clear, user-friendly websites with <strong>HTML, CSS, JavaScript and React</strong>.",
      aboutExtra1: "Before moving into web development, I taught at a university for over 10 years. In my free time I try out <strong>AI tools</strong>, experiment with design and travel.",
      aboutExtra2: "I look forward to new projects and working in a team.",
      projectsTitle: "Projects",
      contactTitle: "← Get in touch →",
      contactName: "Name",
      contactEmail: "Email",
      contactSubject: "Subject",
      contactMessage: "Your message",
      contactBtn: "Send message",
      contactConsent: 'I have read the <a href="datenschutz.html" target="_blank" rel="noopener">privacy policy</a> (in German) and agree that my details are used to process my request.',
      footerCopy: "© 2026 Natalia Bouhlal",
      footerRole: "Junior Full-Stack Developer • Built with ❤️",

      skillsTitle: "What I work with",
      skillCatFrontend: "Frontend",
      skillDescFrontend: "User interfaces with React and TypeScript.",
      skillLabelFoundations: "Foundations",
      skillCatBackend: "Backend",
      skillDescBackend: "Server logic and REST APIs with Node.js and Express.",
      skillCatDb: "Databases",
      skillDescDb: "SQL and NoSQL: MySQL and MongoDB.",
      skillCatTools: "Tools",
      skillDescTools: "Git and GitHub, Docker and Linux basics.",
      skillCatAi: "Modern tools",
      skillTitleAi: "AI-assisted development",
      skillDescAi: "Coding with ChatGPT, Claude and Gemini.",
      skillCatSoft: "Soft skills",
      skillDescSoft: "Teamwork, communication, working with Jira.",
      skillCatUi: "UI / Design",
      skillDescUi: "Figma, Canva and responsive websites.",

      accordionBtn: "Show details",
      accordionBtnClose: "Hide details",

      resumeTitle: "CV",
      careerTitle: "Career",

      jobPracticeTitle: "Web Developer (internship)",
      jobPracticePlace: "New Life – New Beginning e.V., Rüsselsheim (remote)",
      jobPracticeTask1: "Frontend development in the team of the digital platform SIDL (Social Innovation & Digital Lab).",
      jobPracticeTask2: "Independently developed a new CoursesBlock based on a Figma design, with data fields in Payload CMS and TypeScript types.",
      jobPracticeTask3: "Analysed existing frontend components and reworked them after a technical review.",
      jobPracticeTask4: "Worked with GitHub: pull requests, merging the latest code, resolving merge conflicts.",
      jobPracticeTask5: "Contributed to the UI/UX team: information architecture, page and navigation structure, user flows.",
      jobPracticeTask6: "Documented tasks and results in Jira and coordinated my work with the project leads.",

      job1: "Web Development with AI (professional training)",
      job1Place: "IT Career Hub GmbH, Berlin",
      job1Task1: "1,520 teaching units, AZAV-certified. Certificate dated 22.05.2026.",
      job1Task2: "Topics: HTML, CSS, JavaScript, React, Node.js, TypeScript, Docker and cloud technologies.",
      job1Task3: "Projects: ICHGram, My Pet Shop, Events Platform and HOTSAUCE Conference. Core modules passed with “sehr gut” (very good).",

      jobBew: "Job search",

      job2: "German courses and integration",
      job2Place: "KEB Dillingen, CEB Akademie Merzig, gaertner hkk Dillingen",
      job2Task1: "Integration course and German courses up to level B2.",
      job2Task2: "Career orientation for the IT job market.",

      job3: "Lecturer (Senior Lecturer), Department of Engineering and Technology",
      job3Place: "Azov Maritime Institute of the National University “Odesa Maritime Academy”, Mariupol (Ukraine)",
      job3Task1: "Taught information technology (Access, Excel, Google Workspace, MathCAD).",
      job3Task2: "Created curricula, study plans and teaching materials.",
      job3Task3: "Examiner. Author of articles in professional journals.",
      job3Task4: "Introduced Google Workspace and MS Office into teaching to support students' collaboration.",

      job4: "Lecturer (Senior Lecturer), Department of Biomedical Engineering",
      job4Place: "Pryazovskyi State Technical University, Mariupol (Ukraine)",
      job4Task1: "Taught telemedicine systems, diagnostic and therapeutic equipment, microprocessor technology, network technology, Python and MATLAB.",
      job4Task2: "Supervised final theses and mentored students.",
      job4Task3: "Prepared, on my own responsibility, the documents for accreditation and certification of study programmes.",
      job4Task4: "Jury member of the Junior Academy of Sciences (medicine, biology, ecology).",
      job4Task5: "Introduced cloud tools for project work, quick feedback and knowledge assessment.",
      job4Task6: "Deputy Dean for Student Affairs, Faculty of Information Technologies.",

      job5: "Family period and IT self-study",
      job5Task1: "Self-study of IT basics (HTML, CSS, programming).",
      job5Task2: "Created teaching materials for university work.",

      job6: "Senior lab assistant, later lecturer in computer science",
      job6Place: "Pryazovskyi State Technical University, Mariupol (Ukraine)",
      job6Task1: "Practical classes and lectures for international students (Python, Access, SQL, Excel, LAN, TCP/IP).",
      job6Task2: "Created teaching materials for computer science.",
      job6Task3: "Moved from lab assistant to lecturer in computer science.",

      educationTitle: "Education",
      edu1: "Doctoral studies (postgraduate), not completed",
      edu1Place: "Pryazovskyi State Technical University, Mariupol (Ukraine)",
      edu2: "Specialist in Computer Science and Applied Mathematics",
      edu2Place: "Pryazovskyi State Technical University, Mariupol (Ukraine) · Diploma with distinction; rated Master's level by ZAB",
      edu3: "Bachelor in Applied Mathematics",
      edu3Place: "Pryazovskyi State Technical University, Mariupol (Ukraine)",

      langTitle: "Languages",
      extraSkillsTitle: "Additional",
      langBtn: "Language skills",
      lang1: "German: B2 (telc Deutsch-Test für den Beruf, 06/2024)",
      lang2: "English: B1",
      lang3: "Ukrainian and Russian: native",

      jobVolunteerDate: "Since 11/2026",
      jobVolunteerTitle: "Web Developer (volunteer)",
      jobVolunteerPlace: "New Life – New Beginning e.V.",
      jobVolunteerTask1: "After the internship, I keep working on the association's web projects as a volunteer.",

      volSocialDate: "Since 06/2022",
      volBtn: "Community work",
      volText: "I volunteer at the “Gute Zweck Laden” in Schmelz (communication and organisation).",

      modalDescTitle: "Project description:",
      modalFeaturesTitle: "Key features:",

      metaTitle: "Natalia Bouhlal | Web Developer",
      metaDescription: "Portfolio of Natalia Bouhlal, junior full-stack developer from Eppelborn (Saarland, Germany). Projects with React, TypeScript, Node.js and MongoDB, CV and contact.",
      ariaPrev: "Previous project",
      ariaNext: "Next project",
      liveLabel: "Live Demo",

      projects: [
        {
          title: "ICHGram",
          desc: "A photo-sharing social network built as a full-stack app with React, TypeScript and Node.js. Users create a profile, post photos, like, comment, follow others and chat in real time.",
          highlights: [
            "<strong>Login:</strong> Registration, login and JWT authentication. Passwords are hashed with bcrypt.",
            "<strong>Social features:</strong> Profiles, photo posts, likes, comments, followers and notifications.",
            "<strong>Real-time chat:</strong> Messages and chat updates in real time with Socket.IO.",
            "<strong>Image storage:</strong> Post photos and profile pictures are stored in Cloudinary.",
            "<strong>Deployment:</strong> The app runs on Render, the data is stored in MongoDB Atlas."
          ]
        },
        {
          title: "My Pet Shop",
          desc: "An online shop for a pet store, built with React. It has a product catalogue, a cart, favourites and filters.",
          highlights: [
            "<strong>State management:</strong> Global state with Redux Toolkit (cart, favourites, filters).",
            "<strong>API connection:</strong> Data fetching with Axios, interceptors and error handling.",
            "<strong>Routing:</strong> Several pages with React Router, including dynamic product pages.",
            "<strong>Forms:</strong> Validation of order data with Formik and Yup.",
            "<strong>Performance and UX:</strong> Fewer unnecessary re-renders. The interface adapts to all screen sizes."
          ]
        },
        {
          title: "Events Platform",
          desc: "A multi-page website for finding and booking events, with an interactive map and filters.",
          highlights: [
            "<strong>Filters:</strong> Events by four criteria: type, format (distance), category and date.",
            "<strong>BEM:</strong> Clear CSS class naming for reusable components.",
            "<strong>Build:</strong> SCSS and Gulp for fast, clean development.",
            "<strong>Map:</strong> Event locations shown on a Leaflet map.",
            "<strong>SEO:</strong> Semantic HTML5 and responsive layouts for smartphone and desktop."
          ]
        },
        {
          title: "HOTSAUCE Conference",
          desc: "A responsive landing page for a tech conference with sections for speakers, schedule, prices and FAQ.",
          highlights: [
            "<strong>BEM:</strong> Modular CSS with independent components.",
            "<strong>Layout:</strong> Speaker and schedule grid with CSS Grid and Flexbox.",
            "<strong>Design:</strong> Ticket effect with pseudo-elements (::before, ::after) and SVG.",
            "<strong>Interaction:</strong> FAQ accordion and notices with JavaScript and CSS animations.",
            "<strong>Responsive:</strong> Tested for five screen sizes (390 to 1920 px). Gulp, SCSS and semantic HTML5."
          ]
        },
        {
          title: "ICHGram",
          desc: "A photo-sharing social network built as a full-stack app with React, TypeScript and Node.js. Users create a profile, post photos, like, comment, follow others and chat in real time.",
          highlights: [
            "<strong>Login:</strong> Registration, login and JWT authentication. Passwords are hashed with bcrypt.",
            "<strong>Social features:</strong> Profiles, photo posts, likes, comments, followers and notifications.",
            "<strong>Real-time chat:</strong> Messages and chat updates in real time with Socket.IO.",
            "<strong>Image storage:</strong> Post photos and profile pictures are stored in Cloudinary.",
            "<strong>Deployment:</strong> The app runs on Render, the data is stored in MongoDB Atlas."
          ]
        }
      ]
    },

    ru: {
      navHome: "Главная",
      navAbout: "О себе",
      navResume: "Резюме",
      navProjects: "Проекты",
      navContact: "Контакты",
      heroTitle: "Привет, я Наталья,",
      btnPortfolio: "Мои работы",
      btnContact: "Связаться со мной",
      aboutTitle: "О себе",
      aboutText: "Люблю превращать идеи в красивые и удобные веб‑страницы с <strong>HTML, CSS, JavaScript и React</strong>.",
      aboutExtra1: "Перед переходом в веб-разработку я более 10 лет преподавала в университете. В свободное время пробую <strong>AI‑инструменты</strong>, экспериментирую с дизайном и путешествую.",
      aboutExtra2: "Буду рада новым проектам и работе в команде.",
      projectsTitle: "Проекты",
      contactTitle: "← Свяжитесь со мной →",
      contactName: "Имя",
      contactEmail: "Email",
      contactSubject: "Тема",
      contactMessage: "Ваше сообщение",
      contactBtn: "Отправить",
      contactConsent: 'Я прочитал(а) <a href="datenschutz.html" target="_blank" rel="noopener">политику конфиденциальности</a> (на немецком) и согласен(на) на использование моих данных для ответа на запрос.',
      footerCopy: "© 2026 Natalia Bouhlal",
      footerRole: "Junior Full-Stack Developer • Built with ❤️",

      skillsTitle: "С чем я работаю",
      skillCatFrontend: "Frontend",
      skillDescFrontend: "Интерфейсы на React и TypeScript.",
      skillLabelFoundations: "Основы",
      skillCatBackend: "Backend",
      skillDescBackend: "Серверная логика и REST API на Node.js и Express.",
      skillCatDb: "Базы данных",
      skillDescDb: "SQL и NoSQL: MySQL и MongoDB.",
      skillCatTools: "Инструменты",
      skillDescTools: "Git и GitHub, Docker, основы Linux.",
      skillCatAi: "Современные инструменты",
      skillTitleAi: "AI-разработка",
      skillDescAi: "Программирование с ChatGPT, Claude и Gemini.",
      skillCatSoft: "Гибкие навыки",
      skillDescSoft: "Командная работа, коммуникация, работа в Jira.",
      skillCatUi: "UI / Дизайн",
      skillDescUi: "Figma, Canva и адаптивная вёрстка.",

      accordionBtn: "Подробнее",
      accordionBtnClose: "Скрыть детали",

      resumeTitle: "Резюме",
      careerTitle: "Профессиональный путь",

      jobPracticeTitle: "Веб-разработчица (практика)",
      jobPracticePlace: "New Life – New Beginning e.V., Рюссельсхайм (удалённо)",
      jobPracticeTask1: "Frontend-разработка в команде цифровой платформы SIDL (Social Innovation & Digital Lab).",
      jobPracticeTask2: "Самостоятельная разработка нового блока CoursesBlock по макету Figma, с полями данных в Payload CMS и типами TypeScript.",
      jobPracticeTask3: "Анализ существующих frontend-компонентов и доработка после технического ревью.",
      jobPracticeTask4: "Работа с GitHub: Pull Requests, объединение актуальной версии кода, решение merge-конфликтов.",
      jobPracticeTask5: "Участие в работе UI/UX-команды: информационная архитектура, структура страниц и навигации, User Flows.",
      jobPracticeTask6: "Документирование задач и результатов в Jira, согласование работы с Project Leads.",

      job1: "Курс веб-разработки с AI",
      job1Place: "IT Career Hub GmbH, Берлин",
      job1Task1: "1 520 академических часов, аккредитация AZAV. Сертификат от 22.05.2026.",
      job1Task2: "Темы: HTML, CSS, JavaScript, React, Node.js, TypeScript, Docker и облачные технологии.",
      job1Task3: "Проекты: ICHGram, My Pet Shop, Events Platform и HOTSAUCE Conference. Профильные модули сданы на «sehr gut» (отлично).",

      jobBew: "Поиск работы",

      job2: "Курсы немецкого и интеграция",
      job2Place: "KEB Dillingen, CEB Akademie Merzig, gaertner hkk Dillingen",
      job2Task1: "Интеграционный курс и курсы немецкого до уровня B2.",
      job2Task2: "Профессиональная ориентация на рынке труда IT.",

      job3: "Старший преподаватель, кафедра ИТ",
      job3Place: "Приазовский морской институт Национального университета «Одесская морская академия», Мариуполь, Украина",
      job3Task1: "Преподавание информационных технологий (Access, Excel, Google Workspace, MathCAD).",
      job3Task2: "Разработка учебных планов, программ и методических материалов.",
      job3Task3: "Экзаменатор. Автор научных статей в профильных изданиях.",
      job3Task4: "Внедрение Google Workspace и MS Office в учебный процесс для совместной работы студентов.",

      job4: "Старший преподаватель кафедры биомедицинской инженерии",
      job4Place: "Приазовский государственный технический университет, Мариуполь, Украина",
      job4Task1: "Преподавание: телемедицинские системы, диагностическая и лечебная аппаратура, микропроцессорная техника, сетевые технологии, Python, MATLAB.",
      job4Task2: "Руководство дипломными работами и наставничество студентов.",
      job4Task3: "Самостоятельная подготовка документации для аккредитации и сертификации образовательных программ.",
      job4Task4: "Член жюри Малой академии наук (медицина, биология, экология).",
      job4Task5: "Внедрение облачных инструментов для проектной работы, обратной связи и контроля знаний.",
      job4Task6: "Заместитель декана по воспитательной работе, факультет информационных технологий.",

      job5: "Семейный период и самообразование в IT",
      job5Task1: "Самостоятельное изучение основ IT (HTML, CSS, основы программирования).",
      job5Task2: "Разработка учебных материалов для работы в вузе.",

      job6: "Старший лаборант, затем преподаватель информатики",
      job6Place: "Приазовский государственный технический университет, Мариуполь, Украина",
      job6Task1: "Практические занятия и лекции для иностранных студентов (Python, Access, SQL, Excel, LAN, TCP/IP).",
      job6Task2: "Подготовка учебных материалов по информатике.",
      job6Task3: "Путь от лаборанта до преподавателя информатики.",

      educationTitle: "Образование",
      edu1: "Аспирантура (не завершена)",
      edu1Place: "Приазовский государственный технический университет, Мариуполь, Украина",
      edu2: "Специалист по информатике и прикладной математике",
      edu2Place: "Приазовский государственный технический университет, Мариуполь, Украина · диплом с отличием; по оценке ZAB соответствует магистру",
      edu3: "Бакалавр прикладной математики",
      edu3Place: "Приазовский государственный технический университет, Мариуполь, Украина",

      langTitle: "Языки",
      extraSkillsTitle: "Дополнительно",
      langBtn: "Владение языками",
      lang1: "Немецкий: B2 (telc Deutsch-Test für den Beruf, 06/2024)",
      lang2: "Английский: B1",
      lang3: "Украинский и русский: родные",

      jobVolunteerDate: "С 11/2026",
      jobVolunteerTitle: "Веб-разработчица (волонтёр)",
      jobVolunteerPlace: "New Life – New Beginning e.V.",
      jobVolunteerTask1: "После практики продолжаю работать над веб-проектами объединения на добровольной основе.",

      volSocialDate: "С 06/2022",
      volBtn: "Социальная деятельность",
      volText: "Помогаю на добровольной основе в «Gute Zweck Laden» в Шмельце (коммуникация и организация).",

      modalDescTitle: "Описание проекта:",
      modalFeaturesTitle: "Ключевые особенности проекта:",

      metaTitle: "Natalia Bouhlal | Веб-разработчица",
      metaDescription: "Портфолио Натальи Бухляль, junior full-stack разработчицы из Эппельборна (Саар, Германия). Проекты на React, TypeScript, Node.js и MongoDB, резюме и контакты.",
      ariaPrev: "Предыдущий проект",
      ariaNext: "Следующий проект",
      liveLabel: "Демо",

      projects: [
        {
          title: "ICHGram",
          desc: "Социальная сеть для обмена фотографиями, разработанная как full-stack приложение на React, TypeScript и Node.js. Пользователи создают профиль, публикуют фото, ставят лайки, комментируют, подписываются на других и общаются в чате в реальном времени.",
          highlights: [
            "<strong>Вход в систему:</strong> регистрация, логин и JWT-аутентификация. Пароли хешируются с помощью bcrypt.",
            "<strong>Социальные функции:</strong> профили, публикации фото, лайки, комментарии, подписки и уведомления.",
            "<strong>Чат в реальном времени:</strong> сообщения и обновление чатов через Socket.IO.",
            "<strong>Хранение изображений:</strong> фото публикаций и аватары хранятся в Cloudinary.",
            "<strong>Развёртывание:</strong> приложение размещено на Render, данные хранятся в MongoDB Atlas."
          ]
        },
        {
          title: "My Pet Shop",
          desc: "Интернет-магазин для зоомагазина на React: каталог товаров, корзина, избранное и фильтры.",
          highlights: [
            "<strong>State Management:</strong> глобальное состояние на Redux Toolkit (корзина, избранное, фильтры).",
            "<strong>Работа с API:</strong> получение данных через Axios, перехватчики (interceptors) и обработка ошибок.",
            "<strong>Маршрутизация:</strong> несколько страниц на React Router, в том числе динамические карточки товаров.",
            "<strong>Формы:</strong> проверка данных заказа с помощью Formik и Yup.",
            "<strong>Производительность и UX:</strong> меньше лишних рендеров, интерфейс адаптирован под все размеры экранов."
          ]
        },
        {
          title: "Events Platform",
          desc: "Многостраничный сайт для поиска и бронирования мероприятий с интерактивной картой и фильтрами.",
          highlights: [
            "<strong>Фильтры:</strong> отбор мероприятий по четырём критериям: тип, формат (расстояние), категория и дата.",
            "<strong>БЭМ:</strong> понятные названия CSS-классов для переиспользуемых компонентов.",
            "<strong>Сборка:</strong> SCSS и Gulp для быстрой и аккуратной разработки.",
            "<strong>Карта:</strong> места мероприятий на карте Leaflet.",
            "<strong>SEO:</strong> семантический HTML5 и адаптивная вёрстка для смартфонов и десктопа."
          ]
        },
        {
          title: "HOTSAUCE Conference",
          desc: "Адаптивный лендинг для технологической конференции: спикеры, программа, цены и FAQ.",
          highlights: [
            "<strong>БЭМ:</strong> модульный CSS с независимыми компонентами.",
            "<strong>Layout:</strong> сетка для спикеров и расписания на CSS Grid и Flexbox.",
            "<strong>Оформление:</strong> эффект «билета» на псевдоэлементах (::before, ::after) и SVG.",
            "<strong>Интерактив:</strong> FAQ-аккордеон и уведомления на JavaScript с CSS-анимациями.",
            "<strong>Адаптивность:</strong> проверено на пяти размерах экрана (от 390 до 1920 px). Gulp, SCSS и семантический HTML5."
          ]
        },
        {
          title: "ICHGram",
          desc: "Социальная сеть для обмена фотографиями, разработанная как full-stack приложение на React, TypeScript и Node.js. Пользователи создают профиль, публикуют фото, ставят лайки, комментируют, подписываются на других и общаются в чате в реальном времени.",
          highlights: [
            "<strong>Вход в систему:</strong> регистрация, логин и JWT-аутентификация. Пароли хешируются с помощью bcrypt.",
            "<strong>Социальные функции:</strong> профили, публикации фото, лайки, комментарии, подписки и уведомления.",
            "<strong>Чат в реальном времени:</strong> сообщения и обновление чатов через Socket.IO.",
            "<strong>Хранение изображений:</strong> фото публикаций и аватары хранятся в Cloudinary.",
            "<strong>Развёртывание:</strong> приложение размещено на Render, данные хранятся в MongoDB Atlas."
          ]
        }
      ]
    }
  };

  const typingPhrases = {
    de: "Deine Webentwicklerin",
    en: "Your web developer",
    ru: "Твоя веб-разработчица"
  };

  // === ЭФФЕКТ ПЕЧАТИ ===
  function typeEffect() {
    if (!typingEl) return;

    const currentPhrase = typingPhrases[currentLang] || typingPhrases.de;

    typingEl.textContent = isDeleting
      ? currentPhrase.substring(0, charIndex - 1)
      : currentPhrase.substring(0, charIndex + 1);

    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

    let delta = isDeleting ? 50 : 150;

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      delta = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      delta = 500;
    }

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(typeEffect, delta);
  }

  // === СМЕНА ЯЗЫКА ===
  function setLanguage(lang) {
    currentLang = lang;
    document.body.setAttribute('data-lang', lang);
    document.documentElement.lang = lang;

    const langData = translations[lang];
    if (!langData) return;

    // 1. Тексты по id
    for (const key in langData) {
      if (key === 'projects') continue;

      const el = document.getElementById(key);

      if (el) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = langData[key];
        } else {
          el.innerHTML = langData[key];
        }
      }
    }

    // 2. Пункты меню (data-key)
    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.getAttribute("data-key");

      if (langData[key]) {
        const link = el.querySelector("a");

        if (link) {
          link.textContent = langData[key];
        } else {
          el.textContent = langData[key];
        }
      }
    });

    // 3. Заголовок страницы, описание, aria-подписи
    document.title = langData.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', langData.metaDescription);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', langData.metaTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', langData.metaDescription);
    const prevBtnEl = document.getElementById('prevBtn');
    const nextBtnEl = document.getElementById('nextBtn');
    if (prevBtnEl) prevBtnEl.setAttribute('aria-label', langData.ariaPrev);
    if (nextBtnEl) nextBtnEl.setAttribute('aria-label', langData.ariaNext);

    // 4. Карточки проектов
    const projectCards = document.querySelectorAll(".project-card");
    const projectsTranslations = langData.projects;

    if (projectsTranslations && projectCards.length > 0) {
      projectCards.forEach((card, index) => {
        if (!projectsTranslations[index]) return;

        const liveBtn = card.querySelector(".btn-live");
        if (liveBtn) liveBtn.textContent = langData.liveLabel;

        const titleEl = card.querySelector("h3");
        if (titleEl) titleEl.textContent = projectsTranslations[index].title;

        const hiddenDesc = card.querySelector(".modal-desc-text");
        if (hiddenDesc) hiddenDesc.innerHTML = projectsTranslations[index].desc;

        const highlightsData = card.querySelector(".modal-highlights-data");
        if (highlightsData && projectsTranslations[index].highlights) {
          highlightsData.innerHTML = projectsTranslations[index].highlights
            .map(h => `<li class="feature-small">${h}</li>`)
            .join('');
        }
      });
    }

    // 5. Кнопки аккордеона
    document.querySelectorAll(".lang-accordion-btn").forEach(btn => {
      const isActive = btn.classList.contains('active');
      const text = isActive ? langData.accordionBtnClose : langData.accordionBtn;
      const arrow = isActive ? '▲' : '▼';

      btn.innerHTML = `${text} <span class="icon-arrow">${arrow}</span>`;
    });

    // 6. Перезапуск эффекта печати
    charIndex = 0;
    isDeleting = false;
    clearTimeout(typingTimeout);
    typeEffect();
  }

  // === АККОРДЕОН ===
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.lang-accordion-btn');
    if (!btn) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    const content = btn.nextElementSibling;
    const isNowActive = btn.classList.toggle('active');

    content.classList.toggle('is-visible', isNowActive);

    const langData = translations[currentLang] || translations['de'];
    const text = isNowActive ? langData.accordionBtnClose : langData.accordionBtn;
    const arrow = isNowActive ? '▲' : '▼';

    btn.innerHTML = `${text} <span class="icon-arrow">${arrow}</span>`;
  }, true);

  // === ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА (UI) ===
  if (selected && optionItems) {
    selected.onclick = (e) => {
      e.stopPropagation();
      select.classList.toggle("open");
    };

    optionItems.forEach(item => {
      item.onclick = () => {
        optionItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const lang = item.getAttribute("data-lang");

        const newImgSrc = item.querySelector('img').src;
        const newText = lang.toUpperCase();

        selected.querySelector('.flag-img').src = newImgSrc;
        selected.querySelector('.lang-code').textContent = newText;

        setLanguage(lang);
        select.classList.remove("open");
      };
    });
  }

  document.addEventListener('click', () => select?.classList.remove("open"));

  setLanguage("de");
});
