import PyConKenyaReport from "@/components/report";

const scheduleData = [
  {
    date: "September 26, 2025",
    sessions: [
      {
        time: "08:00am - 09:15am",
        title: "Arrival",
        type: "registration",
        speaker: "",
        duration: "1hr 15 min",
      },
      {
        time: "09:15am - 09:45am",
        title: "Warm Up",
        type: "opening",
        speaker: "",
        duration: "30 min",
      },
      {
        time: "09:45am - 10:15am",
        title: "Keynote",
        type: "keynote",
        speaker: "Dr. Fred Mutisya: Medical Doctor",
        duration: "30 min",
      },
      {
        time: "09:45am - 10:30am",
        title: "Breakout",
        type: "break",
        speaker: "",
        duration: "30 min",
      },
      {
        time: "10:30am - 11:30am",
        title: "Asking questions to your database with LLMs",
        type: "talk",
        speaker: "Nahuel Defossé",
        duration: "60 min",
      },
      {
        time: "11:30am - 11:40am",
        title: "Breakout",
        type: "break",
        speaker: "",
        duration: "30 min",
      },
      {
        time: "11:40am - 12:40pm",
        title:
          "Building an Agentic AI Application with Prompty and Azure AI Foundry",
        type: "talk",
        speaker: "Bethany Jepchumba",
        duration: "60 min",
      },
      {
        time: "11:40am - 12:40pm",
        title: "Getting Started with Polars and Marimo",
        type: "workshop",
        speaker: "Alvin Ithaka",
        duration: "60 min",
      },
      {
        time: "12:40pm - 12:50pm",
        title: "Breakout",
        type: "break",
        speaker: "",
        duration: "10 min",
      },
      {
        time: "12:50pm - 1:35pm",
        title:
          "Automating the Web Workflows: How LLMs are Redefining Data Extraction and Processing",
        type: "talk",
        speaker: "Saurav Jain",
        duration: "45 min",
      },
      {
        time: "12:50pm - 1:35pm",
        title:
          "Confidential Python: Running AI Workloads in Secure Enclaves with Cocos AI",
        type: "workshop",
        speaker: "Sammy Oina",
        duration: "45 min",
      },

      {
        time: "1:35pm - 2:50pm",
        title: "Lunch",
        type: "break",
        speaker: "",
        duration: "60 min",
      },
      {
        time: "2:50pm - 3:35pm",
        title: "From Waveform to Faceform: Voice2Face with GANs in Python",
        type: "talk",
        speaker: "John Gunia",
        duration: "45 min",
      },
      {
        time: "2:50pm - 3:35pm",
        title:
          "Mock less, Test More: Better Integration testing with test containers",
        type: "talk",
        speaker: "Paul Muyero",
        duration: "45 min",
      },
      {
        time: "3:35pm - 3:50pm",
        title: "Break",
        type: "break",
        speaker: "",
        duration: "15 min",
      },

      {
        time: "3:50pm - 4:35pm",
        title: "Fortifying Django: Avoiding DevOps Secrets Pitfalls",
        type: "workshop",
        speaker: "Samuel Macharia",
        duration: "45 min",
      },
      {
        time: "3:50pm - 4:35pm",
        title: "Beyond the Hype: Real-World AI with Python",
        type: "talk",
        speaker: "Lynn Kathomi",
        duration: "45 min",
      },

      {
        time: "4:35pm ",
        title: "Breakout",
        type: "break",
        speaker: "",
        duration: "15 min",
      },

      //   {
      //     time: "05:00pm - 05:30pm",
      //     title: "Closing Remarks",
      //     type: "closing",
      //     speaker: "PyCon Kenya Organizers",
      //     duration: "30 min",
      //   },
    ],
  },
  {
    date: "September 27, 2025",
    sessions: [
      {
        time: "08:00am - 09:00am",
        title: "Arrival",
        type: "registration",
        speaker: "",
        duration: "1hr 15 min",
      },
      {
        time: "09:00am - 09:30am",
        title: "Warm Up",
        type: "opening",
        speaker: "",
        duration: "30 min",
      },
      {
        time: "09:30am - 10:30am",
        title: "Lightening Talks",
        type: "opening",
        speaker: "",
        duration: "60 min",
      },
      {
        time: "10:30pm - 10:45",
        title: "Breakout",
        type: "break",
        speaker: "",
        duration: "15 min",
      },
      {
        time: "10:45am - 11:45am",
        title:
          "Building Intelligent, Async Backends with Django, Celery, and AI APIs",
        type: "talk",
        speaker: "Elizabeth Adhiambo",
        duration: "60 min",
      },
      {
        time: "10:45am - 11:45am",
        title:
          "Implementing an MCP Server for DBMS in Python — YDB’s Experience",
        type: "talk",
        speaker: "Ivan Blinkov",
        duration: "60 min",
      },

      {
        time: "11:45am - 11:55am",
        title: "Breakout",
        type: "break",
        speaker: "",
        duration: "10 min",
      },
      {
        time: "11:55am - 12:55pm",
        title:
          "Scaling Earth Observation with TerraTorch: Geospatial Foundation Models",
        type: "workshop",
        speaker: "Catherine Wanjiru, Reginald Eugene Bryant, Beldine Moturi",
        duration: "60 min",
      },
      {
        time: "11:55am - 12:55pm",
        title: "Scalable Python : Celery, Redis and RabbitMQ",
        type: "workshop",
        speaker: "Mugendi Gitonga",
        duration: "60 min",
      },
      {
        time: "12:55pm - 1:05pm",
        title: "Breakout",
        type: "break",
        speaker: "",
        duration: "10 min",
      },
      {
        time: "1:05pm - 1:50pm",
        title:
          "Building Intelligent Applications With Python, Genkit and the Model Context Protocol",
        type: "workshop",
        speaker: "Brayan Kai Mwanyumba",
        duration: "45 min",
      },
      {
        time: "1:05pm - 1:50pm",
        title:
          "Practical Developer Experience Strategies for Python Developers",
        type: "talk",
        speaker: "Phylis Atieno",
        duration: "45 min",
      },
      {
        time: "1:50pm - 3:05pm",
        title: "Lunch",
        type: "break",
        speaker: "",
        duration: "1h 15min",
      },
      {
        time: "3:05pm - 3:50pm",
        title:
          "Open source Non-Intrusive Load Monitoring with python and micropython",
        type: "workshop",
        speaker: "Felix Gateru, Michael Kimani",
        duration: "45 min",
      },
      {
        time: "3:05pm - 3:50pm",
        title: "Pydantic to the core: Data Validation for Agentic AI Systems",
        type: "workshop",
        speaker: "Daniel Akhabue",
        duration: "45 min",
      },
      {
        time: "3:50pm - 4:00pm",
        title: "Break",
        type: "break",
        speaker: "",
        duration: "10 min",
      },
      {
        time: "4:00pm - 5:00pm",
        title: "PYLADIES",
        type: "talk",
        speaker: "",
        duration: "60 min",
      },
      {
        time: "5:00pm - 5:30pm",
        title: "Closing Remarks",
        type: "closing",
        speaker: "PyCon Kenya Organizers",
        duration: "30 min",
      },
    ],
  },
];

const statistics = {
  totalAttendees: 627,
  speakers: 80,
  workshops: 17,
  talks: 63,
  countries: 7,
  companies: 43,
  students: 339,
  professionals: 288,
  distributionByCountry: [
    { country: "Kenya", attendees: 578, percentage: 92.19 },
    { country: "Uganda", attendees: 23, percentage: 3.67 },
    { country: "Tanzania", attendees: 13, percentage: 2.07 },
    { country: "Nigeria", attendees: 9, percentage: 1.44 },
    { country: "Others", attendees: 4, percentage: 0.64 },
  ],
  statisfactionRate: 94,
  recommendationRate: 84,
  retentionRate: 89,
};

const topicDistribution = [
  { topic: "Data Science & ML", percentage: 37.5, count: 30 },
  { topic: "Others", percentage: 25.0, count: 20 },
  { topic: "Web Development", percentage: 15.0, count: 12 },
  { topic: "DevOps & Cloud", percentage: 11.25, count: 9 },
  { topic: "Community & Career", percentage: 7.5, count: 6 },
  { topic: "IoT & Hardware", percentage: 3.75, count: 3 },
];

const images = [
  "/2025-report/IMG_0027-Enhanced-NR.jpg",
  "/2025-report/IMG_0044.jpg",
  "/2025-report/IMG_0055.jpg",
  "/2025-report/IMG_0333.jpg",
  "/2025-report/IMG_0337.jpg",
  "/2025-report/IMG_0350.jpg",
  "/2025-report/IMG_0387-Enhanced-NR.jpg",
  "/2025-report/IMG_9950.jpg",
  "/2025-report/IMG_0406.jpg",
  "/2025-report/IMG_9979-2.jpg",
  "/2025-report/IMG_9982.jpg",
  "/2025-report/IMG_0007.jpg",
  "/2025-report/IMG_0021-Enhanced-NR.jpg",
  "/2025-report/IMG_0209.jpg",
  "/2025-report/IMG_0257.jpg",
  "/2025-report/IMG_0410.jpg",
  "/2025-report/IMG_0361.jpg",
  "/2025-report/IMG_9792.jpg",
  "/2025-report/IMG_0006.jpg",
  "/2025-report/IMG_0018-Enhanced-NR.jpg",
  "/2025-report/IMG_0076.jpg",
  "/2025-report/IMG_0101.jpg",
  "/2025-report/IMG_0126.jpg",
  "/2025-report/IMG_0139.jpg",
  "/2025-report/IMG_0156.jpg",
  "/2025-report/IMG_0391-Enhanced-NR.jpg",
  "/2025-report/IMG_0167.jpg",
  "/2025-report/IMG_0189.jpg",
  "/2025-report/IMG_9931.jpg",
  "/2025-report/IMG_9891.jpg",
  "/2025-report/IMG_9924-Enhanced-NR.jpg",
  "/2025-report/IMG_9963.jpg",
  "/2025-report/IMG_9993.jpg",
  "/2025-report/IMG_9923-Enhanced-NR.jpg",
  "/2025-report/IMG_0039.jpg",
  "/2025-report/IMG_0077.jpg",
  "/2025-report/IMG_0024.jpg",
  "/2025-report/IMG_9971.jpg",
  "/2025-report/IMG_0413.jpg",
  "/2025-report/IMG_0323.jpg",
  "/2025-report/IMG_0033.jpg",
  "/2025-report/IMG_9998-2.jpg",
];

export default function Page() {
  return (
    <PyConKenyaReport
      year={2025}
      date="September 26-27, 2025"
      venue="Ngong Hill Hotel, Ngong Road"
      schedule={scheduleData}
      statistics={statistics}
      topicDistribution={topicDistribution}
      images={images}
      achievements={[
        "• 🚀 Hosted the first-ever Africa-wide AI + Healthcare keynote",
        "• 💡 Over 40 sessions featuring production-grade projects built by Kenyan startups",
        "• 🧠 Workshops & deep dives on AI, data pipelines, and Python in embedded systems",
        "",
      ]}
      atmosphereTitle="On-the-Ground Vibe"
      atmosphereText={
        "The 2025 conference brought together developers, and startups in a truly collaborative and inclusive space. Attendees praised the high-quality talks, practical workshops, and the strong sense of community throughout the event. PyCon fostered meaningful connections across all experience levels, bridging the gap between academia and industry through real-world Python applications and AI-driven projects. It was a vibrant mix of learning, mentorship, and creativity—proof that when the Python community comes together, ideas turn into impact. 🐍"
      }
    />
  );
}
