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

  const translations = {

    ru: {
      navHome: "Главная",
      navAbout: "О себе",
      navResume: "Профессиональные компетенции",
      navProjects: "Проекты",
      navContact: "Контакты",
      heroTitle: "Привет, я Наталья,",
      btnPortfolio: "Мои работы",
      btnContact: "Связаться со мной",
      aboutTitle: "О себе",
      aboutText: "Люблю превращать идеи в красивые и удобные веб‑страницы с <strong>HTML, CSS, JavaScript и React</strong>.",
      aboutExtra1: "Когда не пишу код, играю с <strong>AI‑инструментами</strong>, экспериментирую с дизайном и наслаждаюсь путешествиями.",
      aboutExtra2: "Давай создадим что-то классное вместе!",
      projectsTitle: "Проекты",
      contactTitle: "← Свяжитесь со мной →",
      contactName: "Имя",
      contactEmail: "Email",
      contactSubject: "Тема",
      contactMessage: "Ваше сообщение",
      contactBtn: "Отправить",
      footerCopy: "© 2026 Natalia Bouhlal",
      footerRole: "Frontend Developer • Built with ❤️",



      skillsTitle: "С чем я работаю",
      skillCatFrontend: "Frontend-разработка",
      skillDescFrontend: "Экосистема React и TypeScript.",
      skillLabelFoundations: "Основы",
      skillCatBackend: "Backend и логика",
      skillDescBackend: "Серверная логика, разработка API и производительность.",
      skillCatDb: "Базы данных",
      skillDescDb: "SQL и NoSQL.",
      skillCatTools: "Инструменты и системы",
      skillDescTools: "Контейнеризация, контроль версий и администрирование.",
      skillCatAi: "Современные инструменты",
      skillTitleAi: "AI-разработка",
      skillDescAi: "Эффективное программирование с Cursor, Copilot и LLM.",
      skillCatSoft: "Гибкие навыки",
      skillDescSoft: "Agile-мышление, командная работа, коммуникация.",
      skillCatUi: "UI / Дизайн",
      skillDescUi: "Figma и адаптивная верстка.",

      accordionBtn: "Подробнее",
      accordionBtnClose: "Скрыть детали",


      // Резюме
      resumeTitle: "Профессиональные компетенции",
      careerTitle: "Профессиональный путь",
      job1Data: "07/2025 — Наст. время",
      job1: "Разработка веб-приложений и интеграция AI-решений",
      job1Place: "IT Career Hub, Berlin",
      job1Task1: "Интенсивное обучение: HTML5, CSS3, JavaScript (ES6+), React, Node.js.",
      job1Task2: "Создание веб-сервисов с интеграцией нейросетей (API OpenAI/другие).",
      job1Task3: "Разработка проектов по современным стандартам IT-рынка Германии.",

      job2: "Изучение языка и интеграция в Германии",
      job2Place: "Академии KEB / CEB, Диллинген/Мерциг",
      job2Task1: "Последовательное изучение немецкого языка в сертифицированных академиях (KEB, CEB, gaertner hkk).",
      job2Task2: "Развитие профессиональной коммуникации и навыков ведения документации для работы в IT.",

      job3: "Старший преподаватель кафедры ИТ",
      job3Place: "Азовский морской институт ОНМА, Мариуполь, Украина",
      job3Task1: "Разработка учебных программ и методических материалов по ИТ.",
      job3Task2: "Проведение лекций и практик (MS Office, Google Workspace, MathCAD).",
      job3Task3: "Автор научных статей и публикаций в профильных изданиях.",
      job3Task4: "Оптимизация учебного процесса через внедрение облачных инструментов.",

      job4: "Старший преподаватель кафедры биомедицинской инженерии",
      job4Place: "Приазовский государственный технический университет, Мариуполь",
      job4Task1: "Лекции по цифровым технологиям, телемедицине и сетям (Python, MATLAB, МИС).",
      job4Task2: "Курирование дипломных проектов и академическое наставничество.",
      job4Task3: "Участие в аккредитации программ: подготовка документации и отчетов.",
      job4Task4: "Член жюри МАН, экспертная оценка работ (Медицина, Биология, Экология).",
      job4Task5: "Внедрение инструментов облачной коллаборации для организации совместной проектной деятельности, оперативной обратной связи и автоматизации контроля знаний.",

      job5: "Семейный период и самообразование в ИТ",
      job5Task1: "Самостоятельное изучение основ IT (HTML, CSS, основы программирования).",
      job5Task2: "Разработка учебных материалов для сферы высшего образования.",

      job6: "Старший преподаватель / Лаборант",
      job6Place: "Приазовский государственный технический университет, Мариуполь",
      job6Task1: "Работа с иностранными студентами: лекции и практики (Python, SQL, LAN, TCP/IP).",
      job6Task2: "Подготовка учебных материалов по информационным технологиям.",
      job6Task3: "Продвижение с позиции лаборанта до преподавателя информатики.",

      educationTitle: "Образование",
      edu1: "Аспирантура",
      edu1Place: "Приазовский государственный технический университет, Мариуполь",
      edu2: "Специалист по информатике и прикладной математике",
      edu2Place: "Приазовский государственный технический университет, Мариуполь",
      edu3: "Бакалавр по прикладной математике",
      edu3Place: "Приазовский государственный технический университет, Мариуполь",
      langTitle: "Языки",
      volTitle: "Волонтерская деятельность",
      extraSkillsTitle: "Дополнительно",
      langBtn: "Владение языками",
      lang1: "Немецкий (B2/C1).",
      lang2: "Английский (B1).",
      lang3: "Укр/Рус (Родной)",
      volBtn: "Социальная деятельность",
      volText: "С 2022 года — активная помощь в организации работы «Gute Zweck Laden», Шмельц, Германия.",


      modalDescTitle: "Описание проекта:",
      modalFeaturesTitle: "Ключевые особенности проекта:",
      projectsTitle: "Проекты",
      btnDetails: "Подробнее →",

      projects: [
        {
          title: "My Pet Shop",
          desc: "Разработала и подготовила к релизу полноценное E-commerce решение для зоомагазина. В ходе работы спроектировала компонентную архитектуру на React, обеспечила бесшовную навигацию и реализовала сложную логику управления товарными запасами в корзине.",
          highlights: [
            "<strong>State Management:</strong> Внедрена технология Redux Toolkit для управления состоянием.",
            "<strong>API Integration:</strong> Оптимизирован процесс получения данных через Axios.",
            "<strong>Routing:</strong> Реализована многоуровневая система маршрутизации.",
            "<strong>Automation:</strong> Автоматизирован процесс валидации форм заказа.",
            "<strong>Performance:</strong> Проведен рефакторинг для ускорения работы приложения."
          ]
        },
        {
          title: "Events Platform",
          desc: "Многостраничная платформа для поиска мероприятий. Реализована сложная система фильтрации и интуитивный пользовательский путь.",
          highlights: [
            "<strong>Фильтрация:</strong> Логика отбора по 4 критериям.",
            "<strong>Архитектура:</strong> Использование методологии БЭМ.",
            "<strong>Карта:</strong> Интеграция Leaflet API для локаций.",
            "<strong>SEO:</strong> Оптимизированная семантическая верстка."
          ]
        },
        {
          title: "HOTSAUCE Conference",
          desc: "Профессиональный лендинг для тех-конференции с акцентом на чистую архитектуру и сложную геометрию верстки.",
          highlights: [
            "<strong>БЭМ:</strong> Строгая модульная структура кода.",
            "<strong>Layout:</strong> Сложная адаптивная сетка (Grid/Flex).",
            "<strong>UI:</strong> Креативные эффекты и интерактивные элементы."
          ]
        }
      ]
    },


    en: {
      navHome: "Home",
      navAbout: "About",
      navResume: "Professional Skills",
      navProjects: "Projects",
      navContact: "Contact",
      heroTitle: "Hi, I'm Natalia,",
      btnPortfolio: "My Work",
      btnContact: "Contact Me",
      aboutTitle: "About Me",
      aboutText: "I love turning ideas into beautiful and user-friendly web pages with <strong>HTML, CSS, JavaScript, and React</strong>.",
      aboutExtra1: "When I'm not coding, I play with <strong>AI tools</strong>, experiment with design, and enjoy traveling.",
      aboutExtra2: "Let's create something awesome together!",
      projectsTitle: "Projects",
      contactTitle: "← Contact Me →",
      contactName: "Name",
      contactEmail: "Email",
      contactSubject: "Subject",
      contactMessage: "Your message",
      contactBtn: "Send",
      footerCopy: "© 2026 Natalia Bouhlal",
      footerRole: "Frontend Developer • Built with ❤️",

      skillsTitle: "What I work with",
      skillCatFrontend: "Frontend Development",
      skillDescFrontend: "React Ecosystem & TypeScript.",
      skillLabelFoundations: "Foundations",
      skillCatBackend: "Backend & Logic",
      skillDescBackend: "Server logic, API development & performance.",
      skillCatDb: "Databases",
      skillDescDb: "SQL & NoSQL.",
      skillCatTools: "Tools & System",
      skillDescTools: "Containerization, Version Control & Administration.",
      skillCatAi: "Modern Tools",
      skillTitleAi: "AI-Driven Development",
      skillDescAi: "Efficient coding with Cursor, Copilot & LLMs.",
      skillCatSoft: "Soft Skills",
      skillDescSoft: "Agile mindset, Teamwork, Communication.",
      skillCatUi: "UI / Design",
      skillDescUi: "Figma & Responsive Design.",


      accordionBtn: "More details",
      accordionBtnClose: "Hide details",

      resumeTitle: "Professional Competencies",
      careerTitle: "Career Path",

      job1Data: "07/2025 — Present",
      job1: "Web Development & AI Integration",
      job1Place: "IT Career Hub, Berlin",
      job1Task1: "Intensive training: HTML5, CSS3, JavaScript (ES6+), React, Node.js.",
      job1Task2: "Developing web services with neural network integration (OpenAI API).",
      job1Task3: "Developing projects according to modern German IT market standards.",

      job2: "Language Study & Integration in Germany",
      job2Place: "KEB / CEB Academies, Dillingen/Merzig",
      job2Task1: "Consistent German language study at certified academies.",
      job2Task2: "Developing professional communication and documentation skills for IT.",

      job3: "Senior Lecturer, IT Department",
      job3Place: "Azov Maritime Institute, Mariupol, Ukraine",
      job3Task1: "Development of curricula and teaching materials for IT disciplines.",
      job3Task2: "Lecturing and practical classes (MS Office, Google Workspace, MathCAD).",
      job3Task3: "Author of scientific articles and publications in professional journals.",
      job3Task4: "Optimizing the educational process through cloud tools integration.",

      job4: "Senior Lecturer, Biomedical Engineering Dept.",
      job4Place: "Pryazovskyi State Technical University, Mariupol",
      job4Task1: "Lectures on digital technologies, telemedicine, and networks (Python, MATLAB).",
      job4Task2: "Supervision of graduation projects and academic mentoring.",
      job4Task3: "Participation in program accreditation: documentation and reports.",
      job4Task4: "Member of the Junior Academy of Sciences jury (Medicine, Biology, Ecology).",
      job4Task5: "Implementation of cloud collaboration tools for organizing joint project activities, real-time feedback, and automation of knowledge assessment.",

      job5: "Family Period & IT Self-education",
      job5Task1: "Self-study of IT basics (HTML, CSS, programming fundamentals).",
      job5Task2: "Development of educational materials for higher education.",

      job6: "Senior Lecturer / Lab Assistant",
      job6Place: "Pryazovskyi State Technical University, Mariupol",
      job6Task1: "Work with international students: lectures and practices (Python, SQL, LAN).",
      job6Task2: "Preparation of teaching materials for information technologies.",
      job6Task3: "Promoted from lab assistant to IT lecturer.",

      educationTitle: "Education",
      edu1: "Postgraduate Studies",
      edu1Place: "Pryazovskyi State Technical University, Mariupol",
      edu2: "Specialist in Computer Science & Applied Math",
      edu2Place: "Pryazovskyi State Technical University, Mariupol",
      edu3: "Bachelor in Applied Mathematics",
      edu3Place: "Pryazovskyi State Technical University, Mariupol",
      langTitle: "Languages",
      volTitle: "Volunteering",
      extraSkillsTitle: "Additional",
      langBtn: "Language Proficiency",
      lang1: "German (B2/C1).",
      lang2: "English (B1).",
      lang3: "Ukr/Rus (Native)",
      volBtn: "Social Activity",
      volText: "Since 2022 — active volunteering at 'Gute Zweck Laden', Schmelz, Germany.",

      modalDescTitle: "Project Description:",
      modalFeaturesTitle: "Key Project Features:",
      projectsTitle: "Projects",
      btnDetails: "Details →",
      projects: [
        {
          title: "My Pet Shop",
          desc: "Developed and prepared for release a full-scale E-commerce solution for a pet store. Designed a component-based architecture using React, ensured seamless navigation, and implemented complex shopping cart inventory management logic.",
          highlights: [
            "<strong>State Management:</strong> Implemented Redux Toolkit for global state management.",
            "<strong>API Integration:</strong> Optimized data fetching via Axios and automated error handling.",
            "<strong>Routing:</strong> Multi-level routing system with dynamic segments.",
            "<strong>Automation:</strong> Automated checkout data collection and validation.",
            "<strong>Performance:</strong> Component refactoring to prevent unnecessary re-renders."
          ]
        },
        {
          title: "Events Platform",
          desc: "Multi-page platform for searching and booking events. Features a complex dynamic filtering system and intuitive user journey.",
          highlights: [
            "<strong>Dynamic Filtering:</strong> Logic for event selection based on 4 criteria.",
            "<strong>Architecture:</strong> Strict BEM methodology for reusable UI components.",
            "<strong>Map:</strong> Integrated Leaflet API for event location visualization.",
            "<strong>SEO:</strong> Optimized semantic HTML5 for better indexing."
          ]
        },
        {
          title: "HOTSAUCE Conference",
          desc: "Professional responsive landing page for the HOTSAUCE tech conference, focused on clean architecture and complex geometric layout.",
          highlights: [
            "<strong>BEM:</strong> Modular code structure for style independence.",
            "<strong>Layout:</strong> Complex adaptive grid for speakers and schedules.",
            "<strong>Interactive UI:</strong> Vanilla JS accordions and smooth CSS animations."
          ]
        }
      ]
    },

    de: {
      navHome: "Startseite",
      navAbout: "Über mich",
      navResume: "Berufliche Kompetenzen",
      navProjects: "Projekte",
      navContact: "Kontakt",
      heroTitle: "Hallo, ich bin Natalia,",
      btnPortfolio: "Meine Arbeiten",
      btnContact: "Kontaktiere mich",
      aboutTitle: "Über mich",
      aboutText: "Ich liebe es, Ideen in schöne und benutzerfreundliche Webseiten mit <strong>HTML, CSS, JavaScript und React</strong> umzusetzen.",
      aboutExtra1: "Wenn ich nicht programmiere, spiele ich mit <strong>KI-Tools</strong>, experimentiere mit Design und genieße das Reisen.",
      aboutExtra2: "Lass uns gemeinsam etwas Großartiges erschaffen!",
      projectsTitle: "Projekte",
      contactTitle: "← Kontaktiere mich →",
      contactName: "Name",
      contactEmail: "Email",
      contactSubject: "Betreff",
      contactMessage: "Ihre Nachricht",
      contactBtn: "Senden",
      footerCopy: "© 2026 Natalia Bouhlal",
      footerRole: "Frontend-Entwickler • Mit ❤️ erstellt",

      skillsTitle: "Womit ich arbeite",
      skillCatFrontend: "Frontend-Entwicklung",
      skillDescFrontend: "React Ecosystem & TypeScript.",
      skillLabelFoundations: "Grundlagen",
      skillCatBackend: "Backend & Logik",
      skillDescBackend: "Serverlogik, API-Entwicklung & Performance.",
      skillCatDb: "Datenbanken",
      skillDescDb: "SQL & NoSQL.",
      skillCatTools: "Tools & System",
      skillDescTools: "Containerisierung, Versionskontrolle & Administration.",
      skillCatAi: "Moderne Tools",
      skillTitleAi: "KI-gestützte Entwicklung",
      skillDescAi: "Effizientes Coding mit Cursor, Copilot & LLMs.",
      skillCatSoft: "Soft Skills",
      skillDescSoft: "Agile Denkweise, Teamarbeit, Kommunikation.",
      skillCatUi: "UI / Design",
      skillDescUi: "Figma & Responsive Design.",


      accordionBtn: "Details anzeigen",
      accordionBtnClose: "Details ausblenden",

      resumeTitle: "Berufliche Kompetenzen",
      careerTitle: "Beruflicher Werdegang",
      job1Data: "07/2025 — Gegenwart",
      job1: "Webentwicklung & KI-Integration",
      job1Place: "IT Career Hub, Berlin",
      job1Task1: "Intensivtraining: HTML5, CSS3, JavaScript (ES6+), React, Node.js.",
      job1Task2: "Webdienste mit Integration von KI-Lösungen (OpenAI API).",
      job1Task3: "Projektentwicklung nach modernen deutschen IT-Marktstandards.",

      job2: "Sprachstudium & Integration в Deutschland",
      job2Place: "KEB / CEB Akademien, Dillingen/Merzig",
      job2Task1: "Konsequentes Deutschlernen in zertifizierten Akademien.",
      job2Task2: "Ausbau beruflicher Kommunikation und Dokumentation für IT.",

      job3: "Senior Dozent, IT-Abteilung",
      job3Place: "Azov Maritime Institute, Mariupol, Ukraine",
      job3Task1: "Entwicklung von Lehrplänen und Lehrmaterialien für IT-Fächer.",
      job3Task2: "Vorlesungen und Übungen (MS Office, Google Workspace, MathCAD).",
      job3Task3: "Autorin wissenschaftlicher Artikel in Fachzeitschriften.",
      job3Task4: "Optimierung des Lehrprozesses durch Cloud-Tools.",

      job4: "Senior Dozent, Biomedizintechnik",
      job4Place: "Pryazovskyi Staatliche Technische Universität, Mariupol",
      job4Task1: "Vorlesungen über digitale Technologien und Telemedizin (Python, MATLAB).",
      job4Task2: "Betreuung von Abschlussprojekten und akademisches Mentoring.",
      job4Task3: "Teilnahme an Akkreditierungen: Dokumentation und Berichte.",
      job4Task4: "Jurymitglied der Kleinen Akademie der Wissenschaften (Medizin, Biologie, Ökologie).",
      job4Task5: "Einführung von Cloud-Collaboration-Tools zur Organisation gemeinsamer Projektaktivitäten, für schnelles Feedback und zur Automatisierung der Lernkontrolle.",

      job5: "Familienzeit & IT-Selbststudium",
      job5Task1: "Selbststudium der IT-Grundlagen (HTML, CSS, Programmierung).",
      job5Task2: "Entwicklung von Lehrmaterialien für die Hochschulbildung.",

      job6: "Senior Dozent / Laborassistent",
      job6Place: "Pryazovskyi Staatliche Technische Universität, Mariupol",
      job6Task1: "Arbeit mit ausländischen Studenten: Vorlesungen und Praktika (Python, SQL).",
      job6Task2: "Erstellung von Lehrmaterialien für Informationstechnologien.",
      job6Task3: "Beförderung von der Laborassistentin zur IT-Dozentin.",

      educationTitle: "Bildung",
      edu1: "Postgraduales Studium",
      edu1Place: "Pryazovskyi Staatliche Technische Universität, Mariupol",
      edu2: "Spezialist für Informatik & Angewandte Mathematik",
      edu2Place: "Pryazovskyi Staatliche Technische Universität, Mariupol",
      edu3: "Bachelor in Angewandter Mathematik",
      edu3Place: "Pryazovskyi Staatliche Technische Universität, Mariupol",
      langTitle: "Sprachen",
      volTitle: "Ehrenamtliche Tätigkeit",
      extraSkillsTitle: "Zusätzlich",
      langBtn: "Sprachkenntnisse",
      lang1: "Deutsch (B2/C1).",
      lang2: "Englisch (B1).",
      lang3: "Ukr/Rus (Muttersprache)",
      volBtn: "Soziale Tätigkeit",
      volText: "Seit 2022 — aktive Freiwilligenarbeit beim 'Gute Zweck Laden', Schmelz, Deutschland.",

      modalDescTitle: "Projektbeschreibung:",
      modalFeaturesTitle: "Wichtigste Projektmerkmale:",
      projectsTitle: "Projekte",
      btnDetails: "Details →",
      projects: [
        {
          title: "My Pet Shop",
          desc: "Entwicklung einer E-Commerce-Lösung für einen Zoofachhandel. Entwurf einer React-Architektur, Gewährleistung nahtloser Navigation und Implementierung komplexer Warenkorb-Logik.",
          highlights: [
            "<strong>State Management:</strong> Redux Toolkit zur globalen Statusverwaltung implementiert.",
            "<strong>API-Integration:</strong> Optimierter Datentransfer über Axios mit Fehlerbehandlung.",
            "<strong>Routing:</strong> Mehrstufiges Routing-System mit dynamischen Segmenten.",
            "<strong>Automatisierung:</strong> Automatisierte Validierung von Bestellformularen.",
            "<strong>Performance:</strong> Refactoring zur Vermeidung unnötiger Renders."
          ]
        },
        {
          title: "Events Platform",
          desc: "Mehrseitige Plattform für die Event-Suche. Implementierung eines dynamischen Filtersystems и Gestaltung einer intuitiven User Journey.",
          highlights: [
            "<strong>Filterung:</strong> Logik zur Event-Auswahl nach 4 Kriterien.",
            "<strong>Architektur:</strong> Strenge BEM-Methodik für UI-Komponenten.",
            "<strong>Karte:</strong> Integration der Leaflet API zur Visualisierung.",
            "<strong>SEO:</strong> Optimiertes semantisches HTML5 für die Indexierung."
          ]
        },
        {
          title: "HOTSAUCE Conference",
          desc: "Professionelle Landingpage für die HOTSAUCE Tech-Konferenz mit Fokus auf saubere Architektur und komplexes Layout.",
          highlights: [
            "<strong>BEM:</strong> Modulare Codestruktur für saubere Stile.",
            "<strong>Layout:</strong> Komplexes adaptives Raster (Grid/Flex).",
            "<strong>UI:</strong> Interaktive FAQ-Akkordeons und CSS-Animationen."
          ]
        }
      ]
    }
  };

  const typingPhrases = {
    de: "Deine zukünftige Webentwicklerin",
    en: "Your future web developer",
    ru: "Твой будущий разработчик сайтов"
  };

  // === 3. ЭФФЕКТ ПЕЧАТИ ===
  function typeEffect() {
    if (!typingEl) return;
    const currentPhrase = typingPhrases[currentLang] || typingPhrases.de;
    typingEl.textContent = isDeleting ? currentPhrase.substring(0, charIndex - 1) : currentPhrase.substring(0, charIndex + 1);
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
    let delta = isDeleting ? 50 : 150;

    if (!isDeleting && charIndex === currentPhrase.length) { isDeleting = true; delta = 2000; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; delta = 500; }

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(typeEffect, delta);
  }

  // === 4. ФУНКЦИЯ СМЕНЫ ЯЗЫКА ===
  function setLanguage(lang) {
    currentLang = lang;
    document.body.setAttribute('data-lang', lang);
    const langData = translations[lang];
    if (!langData) return;

    // 1. Перевод простых элементов по ID
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
    // === ОБНОВЛЕНИЕ ЭЛЕМЕНТОВ С data-key (для бургер-меню) ===
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

    // 2. ОБНОВЛЕННЫЙ БЛОК ПЕРЕВОДА КАРТОЧЕК ПРОЕКТОВ
    const projectCards = document.querySelectorAll(".project-card");
    const projectsTranslations = langData.projects;

    if (projectsTranslations && projectCards.length > 0) {
      projectCards.forEach((card, index) => {
        if (!projectsTranslations[index]) return;

        // 1. Переводим заголовок на карточке
        const titleEl = card.querySelector("h3");
        if (titleEl) titleEl.textContent = projectsTranslations[index].title;

        // 2. Переводим описание (в скрытом блоке)
        const hiddenDesc = card.querySelector(".modal-desc-text");
        if (hiddenDesc) {
          hiddenDesc.innerHTML = projectsTranslations[index].desc;
        }

        // 3. Переводим Highlights (Особенности)
        const highlightsData = card.querySelector(".modal-highlights-data");
        if (highlightsData && projectsTranslations[index].highlights) {
          // КЛЮЧЕВОЙ МОМЕНТ: добавляем класс feature-small, чтобы вернулись оранжевые точки
          highlightsData.innerHTML = projectsTranslations[index].highlights
            .map(h => `<li class="feature-small">${h}</li>`)
            .join('');
        }
      });
    }

    // 3. Синхронизация текста кнопок аккордеона (при смене языка)
    document.querySelectorAll(".lang-accordion-btn").forEach(btn => {
      // 1. Проверяем, открыт ли аккордеон СЕЙЧАС
      const isActive = btn.classList.contains('active');

      // 2. Берем данные из langData (которые переданы в функцию setLanguage)
      const text = isActive ? langData.accordionBtnClose : langData.accordionBtn;

      // 3. Определяем стрелку: если активен — вверх, если нет — вниз
      const arrow = isActive ? '▲' : '▼';

      // 4. Обновляем кнопку, сохраняя правильную стрелку
      btn.innerHTML = `${text} <span class="icon-arrow">${arrow}</span>`;
    });

    // 4. Перезапуск эффекта печати
    charIndex = 0;
    isDeleting = false;
    clearTimeout(typingTimeout);
    typeEffect();
  }

  // === 5. ЛОГИКА АККОРДЕОНА (ЗАЩИЩЕННАЯ ВЕРСИЯ) ===
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.lang-accordion-btn');
    if (!btn) return;

    // Эти две строки убивают конфликты с другими скриптами
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

  // === 6. ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА (UI) ===
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
        const newText = item.getAttribute("data-lang").toUpperCase();

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