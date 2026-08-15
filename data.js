/* ============================================================
   All content below is sourced directly from Abdulaziz's CV and
   from inspecting the actual GitHub repositories — nothing here
   is invented. Update this file, not index.html, to change content.
   ============================================================ */

const EXPERIENCE = [
  {
    role: "Full Stack Development Intern",
    org: "DigitHub",
    period: "Jun 2026 — Present",
    points: [
      "Developing full-stack web applications using HTML, CSS, JavaScript, Node.js and MongoDB.",
      "Building and integrating RESTful APIs.",
      "Collaborating on real-world projects using Git and GitHub workflows.",
      "Applying frontend and backend development best practices."
    ]
  },
  {
    role: "Data Analyst & Systems Engineer",
    org: "Tempo Glass",
    period: "Jun 2025 — May 2026",
    points: [
      "Built dashboards and KPI tracking systems using Power BI and Looker Studio.",
      "Conducted data analysis and visualization to support decision-making.",
      "Developed and optimized SQL queries for large datasets.",
      "Automated reporting workflows and supported IT infrastructure operations."
    ]
  },
  {
    role: "Software Developer Intern",
    org: "Telepaty Holding",
    period: "Aug 2024 — Oct 2024",
    points: [
      "Developed RESTful APIs using Node.js and Express.js.",
      "Optimized MongoDB and MySQL backend queries.",
      "Assisted with authentication and API validation workflows.",
      "Contributed to technical documentation and backend improvements."
    ]
  }
];

const EDUCATION = [
  {
    role: "Graduate Professional Diploma — Artificial Intelligence & Data Science",
    org: "American University of Beirut (AUB)",
    period: "Aug 2025 — May 2026",
    points: [
      "Coursework: Machine Learning, Deep Learning, Data Science, AI Ethics, Business Analytics, NLP, Arabic NLP, LLMs, Predictive Analytics."
    ]
  },
  {
    role: "Bachelor of Science — Computer Science",
    org: "Lebanese American University (LAU)",
    period: "Sep 2022 — May 2025",
    points: [
      "Full Merit Higher Education Scholarship (HES), funded by USAID."
    ]
  }
];

const CERTIFICATIONS = [
  {
    title: "AI & LLM Bootcamp",
    org: "May 2025",
    desc: "Prompt Engineering, LLM Integration, AI Application Deployment."
  },
  {
    title: "Fundamentals of Accelerated Computing with CUDA C/C++",
    org: "October 2024",
    desc: "GPU-accelerated programming fundamentals with CUDA C/C++."
  }
];

const SKILLS = [
  { group: "Programming", items: ["Python", "Java", "C", "C++", "JavaScript", "TypeScript", "PHP", "SQL", "HTML5", "CSS3"] },
  { group: "Frontend", items: ["React.js", "Tailwind CSS", "Bootstrap", "Responsive Design", "AJAX"] },
  { group: "Backend", items: ["Node.js", "Express.js", "REST APIs", "Socket.IO", "JWT Auth", "Real-Time Systems"] },
  { group: "AI / Machine Learning", items: ["Deep Learning", "NLP", "Arabic NLP", "LLMs", "RAG", "Prompt Engineering", "Sentiment Analysis", "Classification", "Clustering", "Predictive Analytics"] },
  { group: "Frameworks & Libraries", items: ["TensorFlow", "PyTorch", "Scikit-learn", "Transformers", "NumPy", "Pandas", "Matplotlib", "Streamlit", "FastAPI", "OpenAI API"] },
  { group: "Data & Analytics", items: ["Power BI", "Looker Studio", "Excel Analytics", "Data Cleaning", "Data Visualization", "KPI Reporting"] },
  { group: "Databases", items: ["MongoDB", "MySQL", "Database Design", "Query Optimization"] },
  { group: "DevOps & Tools", items: ["Git", "GitHub", "Docker", "Firebase", "CI/CD Fundamentals", "Linux"] }
];

/* Project categories used for filtering */
const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI / ML" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "backend", label: "Backend" },
  { id: "data", label: "Data" },
  { id: "systems", label: "Systems" }
];

const PROJECTS = [
  {
    id: "arabic-ai-assistant",
    title: "Arabic Virtual AI Assistant",
    tagline: "Multi-task Arabic NLP assistant combining traditional NLP with LLM-based reasoning.",
    categories: ["ai"],
    tech: ["Python", "Streamlit", "OpenAI GPT-4o-mini", "Transformers", "Sentence-Transformers", "MarianMT"],
    github: "https://github.com/AbdulazizAlSayyed/arabic-ai-assistant",
    featured: true,
    status: "Solo project",
    overview: "A comprehensive Arabic AI assistant combining traditional Arabic NLP techniques with modern LLM-based approaches across five tasks, served through a Streamlit interface.",
    problem: "General-purpose NLP tooling is often weaker for Arabic, and most assistant demos only cover a single task rather than a coherent multi-task pipeline.",
    solution: "A modular assistant that routes input through task-specific components — machine translation, sentiment analysis, dialect identification, summarization, and RAG-based question answering — behind one interface.",
    architecture: "A preprocessing module handles Arabic text normalization. Task-specific models handle translation (MarianMT), sentiment (a hybrid ML + rule-based classifier), and dialect detection (pattern-based matching), while summarization and RAG question-answering run through an LLM. The RAG pipeline embeds documents with a multilingual MiniLM sentence-transformer, retrieves relevant chunks from a vector store, and generates grounded answers.",
    features: [
      "Arabic ↔ English translation via MarianMT",
      "Hybrid ML + rule-based sentiment analysis (Arabic & English)",
      "Dialect identification via pattern matching",
      "LLM-based summarization of Arabic text",
      "RAG question answering over a custom knowledge base",
      "Streamlit interface with automatic language detection"
    ],
    notes: "Documented next steps include fine-tuning an Arabic-specific transformer (e.g. AraBERT), improving dialect classification with deep learning, and adding speech-to-text support.",
    repoIncludes: "Includes a recorded demo video and a written project report in the repository."
  },
  {
    id: "craftsmen",
    title: "Craftsmen Network Platform",
    tagline: "Real-time marketplace connecting craftsmen with clients, with an AI-assisted recommendation layer.",
    categories: ["fullstack", "ai"],
    tech: ["Node.js", "Express.js", "MongoDB", "Socket.IO", "Python", "Scikit-learn", "Docker"],
    github: "https://github.com/AbdulazizAlSayyed/craftsmen",
    featured: true,
    status: "Solo project",
    overview: "A marketplace platform connecting craftsmen with clients, with real-time communication and an AI-assisted layer for job recommendations and moderation.",
    problem: "Connecting independent craftsmen with clients typically means fragmented channels, no structured way to communicate in real time, and no help matching jobs to the right craftsman.",
    solution: "A full-stack marketplace with authenticated profiles, real-time chat and notifications via Socket.IO, and a Python machine-learning classifier integrated into the Node.js backend for job recommendation and moderation.",
    architecture: "Node.js/Express REST API backend with JWT and bcrypt authentication, MongoDB for data storage, Socket.IO for real-time chat/notifications, and email delivery via Nodemailer. A separate Python ML module (scikit-learn classifier, trained and serialized with joblib) is called from the backend to support job recommendations. A Vite-based frontend consumes the API. The project is containerized with Docker.",
    features: [
      "Craftsman and client profiles with authentication (JWT + bcrypt)",
      "Real-time chat and notifications (Socket.IO)",
      "AI-assisted job recommendation and moderation via a trained classifier",
      "Email notifications (Nodemailer)",
      "Dockerized for consistent setup"
    ],
    notes: null,
    repoIncludes: null
  },
  {
    id: "cvision",
    title: "CVision — AI Resume Critique Tool",
    tagline: "LLM-powered resume analysis with structured, category-weighted scoring.",
    categories: ["ai"],
    tech: ["Python", "Streamlit", "OpenAI API", "PyMuPDF"],
    github: "https://github.com/mona-jamal/CVision-LLM-engineering",
    featured: true,
    status: "Team project (6 members) — contributed OpenAI GPT-3.5 integration and structured prompt handling",
    overview: "A web application that evaluates and critiques resumes using OpenAI's GPT-3.5, giving structured, category-weighted feedback.",
    problem: "Job seekers often have no structured way to know what's actually weak in their resume beyond generic advice.",
    solution: "Users upload a PDF or paste resume text; the tool extracts and sends the content to GPT-3.5 with a structured prompt, then renders scores across five weighted evaluation categories with visual indicators and improvement suggestions.",
    architecture: "A Streamlit frontend (app.py) handles upload/input and result rendering; a dedicated module (llm_integration.py) manages the OpenAI GPT-3.5 interaction and prompt structure; PyMuPDF extracts text from uploaded PDFs.",
    features: [
      "PDF upload or direct text input",
      "Scoring across 5 weighted categories: Structure & Formatting (25%), Grammar & Spelling (20%), Clarity & Readability (20%), Achievements & Impact (20%), Technical Skill Relevance (15%)",
      "Visual score indicators and detailed, LLM-generated improvement suggestions",
      "Custom-styled Streamlit UI"
    ],
    notes: "Built as a team project for a course; my contribution centered on the GPT-3.5 integration and structured prompt handling, alongside a teammate.",
    repoIncludes: null
  },
  {
    id: "evcharging",
    title: "ChargeHub — EV Charging Reservation Platform",
    tagline: "Multi-station EV charging reservation system with duration-aware booking and a live scheduling optimizer.",
    categories: ["fullstack", "backend"],
    tech: ["Next.js", "TypeScript", "MongoDB Atlas", "Tailwind CSS"],
    github: "https://github.com/AyaSulyman/EVCharging-System",
    featured: true,
    status: "Team course project",
    overview: "A multi-station EV charging reservation platform where drivers book a charger for the exact duration they need, secure it with a deposit, and are managed through a full reservation lifecycle by station staff and operators.",
    problem: "Fixed time-slot EV charging reservations don't reflect how long drivers actually need a charger, and don't give operators tools to handle no-shows, overstays, or incidents.",
    solution: "A duration-aware booking system (15–120 minute reservations on a 15-minute grid) enforced conflict-free at the database level, with a full reservation lifecycle, a deposit-based hold system, a multi-request scheduling optimizer with waitlisting, and dedicated staff/operator tooling.",
    architecture: "Two separate Next.js applications — a server-rendered client and a headless API service — over MongoDB Atlas, built in TypeScript with Tailwind CSS. The client has no direct database access; every read and write crosses the API boundary.",
    features: [
      "Duration-aware reservations enforced conflict-free by a database constraint",
      "An 11-state reservation lifecycle (pending payment through completed, late, at-risk, no-show, etc.)",
      "Deposit holds with a simulated payment gateway and a documented refund policy",
      "Flexible booking with a multi-request greedy scheduling optimizer and waitlist",
      "Staff tooling: station board, incident reporting, QR-code check-in"
    ],
    notes: "Deliberately out of scope per the project's own documentation: no real payment processing (mock gateway only, no card data), no energy metering, no hardware or live vehicle telemetry integration, and no LLM component — the in-app assistant runs real database queries only.",
    repoIncludes: null
  },
  {
    id: "unihub",
    title: "UniHub — University Management System",
    tagline: "Role-based academic portal for Admin, Professor and Student — MERN stack.",
    categories: ["fullstack"],
    tech: ["React 18", "Vite", "Tailwind CSS", "React Router v6", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/AbdulazizAlSayyed/university-management-system",
    featured: true,
    status: "In progress — frontend complete on mock data, backend implementation ongoing",
    overview: "A full-stack university management system with three role-based portals — Admin, Professor, and Student.",
    problem: "Academic administration spans very different workflows per role (grading, enrollment, attendance, announcements) that are hard to unify in one clean interface.",
    solution: "A React/Tailwind frontend with fully separate, clickable portals per role, backed by a planned role-guarded REST API (JWT auth + RBAC middleware) with shared Mongoose models across modules.",
    architecture: "Frontend: React 18 + Vite + React Router v6 + Tailwind, currently running on in-memory mock data. Backend: Node/Express/MongoDB, organized by role (admin, professor, student) with shared models (User, Course, Enrollment, Assignment, Grade, Exam, Attendance, etc.), JWT authentication and role-based middleware — folder structure is in place, implementation is in progress and not yet connected to the frontend.",
    features: [
      "Three fully clickable role-based portals (Admin / Professor / Student)",
      "Demo login accounts for quick access to each role",
      "Shared, role-aware data model spanning courses, enrollment, grading, attendance and announcements",
      "Planned JWT + role-guard authentication layer on the backend"
    ],
    notes: "Honest status, per the project itself: frontend is done and runnable but on mock data; backend is scaffolded with implementation in progress; the two are not yet connected, and it isn't deployed.",
    repoIncludes: null
  },
  {
    id: "restaurant-assistant",
    title: "AI Restaurant Assistant",
    tagline: "RAG + OCR + LLM function-calling assistant for conversational restaurant ordering, prototyped in a notebook.",
    categories: ["ai"],
    tech: ["Python", "LangChain", "OpenAI GPT-4o-mini", "ChromaDB", "EasyOCR"],
    github: "https://github.com/AbdulazizAlSayyed/Restaurant-Virtual-Assistant",
    featured: true,
    status: "Solo project — notebook prototype",
    overview: "A conversational restaurant assistant that combines retrieval-augmented generation, OCR-based menu image understanding, and LLM function calling to handle ordering, reservations, complaints and catering requests.",
    problem: "A restaurant chatbot needs to do more than free-text chat — it needs to reliably turn conversation into structured actions (orders, reservations, complaints) and understand menu images, in more than one language.",
    solution: "A RAG pipeline over restaurant/menu data answers open questions, while LLM function calling with Pydantic schemas (OrderSummary, ReservationRequest, ComplaintForm, CateringInquiry) extracts structured data from natural language. Uploaded menu/receipt images are read with OCR and fed into the same reasoning pipeline.",
    architecture: "Restaurant and menu data (Kaggle's Uber Eats dataset) is chunked and embedded with a MiniLM sentence-transformer into a ChromaDB vector store for semantic retrieval via LangChain. EasyOCR handles English and Arabic text extraction from images. OpenAI GPT-4o-mini reasons over retrieved context and OCR output, and returns either a chat response or a structured object depending on detected intent.",
    features: [
      "RAG-based Q&A over menu items, prices, ingredients, allergens and policies",
      "Structured order, reservation, complaint and catering extraction via LLM function calling",
      "OCR menu/receipt image understanding (English & Arabic, via EasyOCR)",
      "Automatic English/Arabic response language detection"
    ],
    notes: "Implemented and delivered as a Jupyter notebook plus a written report; the repository does not include a standalone deployed app.",
    repoIncludes: null
  },

  /* Secondary projects — no case-study modal, shown as compact cards */
  {
    id: "football-api",
    title: "Football Club Management API",
    tagline: "REST API for managing clubs, players, matches, stadiums and transfers.",
    categories: ["backend"],
    tech: ["Node.js", "Express.js", "MongoDB", "Mongoose"],
    github: "https://github.com/AbdulazizAlSayyed/MongoDB-Express.js-CRUD-API-System",
    featured: false,
    status: "Solo project"
  },
  {
    id: "file-sharing",
    title: "Advanced File Sharing System",
    tagline: "Multithreaded TCP file server with a Flask web interface and integrity checks.",
    categories: ["systems"],
    tech: ["Python", "Sockets (TCP)", "Flask", "MySQL"],
    github: "https://github.com/AbdulazizAlSayyed/advanced-file-sharing-system",
    featured: false,
    status: "Team project (4 members) — LAU Computer Networks course"
  },
  {
    id: "lenet5",
    title: "LeNet-5 Parallel Optimization",
    tagline: "LeNet-5 CNN accelerated with OpenMP, CUDA and MPI, with comparative benchmarking.",
    categories: ["ai", "systems"],
    tech: ["C/C++", "CUDA", "OpenMP", "MPI"],
    github: "https://github.com/AbdulazizAlSayyed/LeNet5_CNN",
    featured: false,
    status: "Team project (3 members)"
  },
  {
    id: "restaurant-rec",
    title: "Restaurant Recommendation System",
    tagline: "Clustering-based restaurant recommender on Yelp data.",
    categories: ["data", "ai"],
    tech: ["Python", "Scikit-learn", "DBSCAN", "K-Means"],
    github: "https://github.com/AbdulazizAlSayyed/Restaurant-Recommendation-System",
    featured: false,
    status: "Solo project — 0.9974 silhouette score with DBSCAN"
  },
  {
    id: "creativehub",
    title: "CreativeHub Blog Platform",
    tagline: "PHP/MySQL blogging platform with user, admin and post management.",
    categories: ["fullstack"],
    tech: ["PHP", "MySQL", "JavaScript"],
    github: "https://github.com/Abedsay/CreativeHub-BlogPlatform",
    featured: false,
    status: "Solo project"
  },
  {
    id: "clinic-backend",
    title: "Clinic App — Backend & Messaging Server",
    tagline: "PHP backend and a Java socket-based chat server for a mobile clinic app.",
    categories: ["backend"],
    tech: ["PHP", "MySQL", "Java (Sockets)"],
    github: "https://github.com/Abedsay/Capstone-Project-Backend",
    demo: "https://youtu.be/9Y9SfvGGSII",
    featured: false,
    status: "Capstone team project — backend component"
  }
];