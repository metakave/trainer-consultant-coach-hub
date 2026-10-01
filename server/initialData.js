const initialProfiles = [
  {
    id: "exp-1",
    name: "Dr. Aris Thorne",
    title: "Chief AI Strategy Advisor & Enterprise AI Trainer",
    headline: "Transforming Enterprise Workforce with Generative AI & LLM Systems",
    category: "AI Trainer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    location: "San Francisco, CA & Remote",
    rating: 4.98,
    reviewsCount: 84,
    hourlyRate: "$450 - $800 / hr",
    bio: "Dr. Aris Thorne is a leading pioneer in Enterprise AI adoption. With over 12 years of machine learning experience and executive consulting, he has trained over 25,000 corporate professionals on GenAI workflows, prompt engineering, and LLM implementation. He helps Fortune 500 leadership bridge technical innovation with operational ROI.",
    clients: ["NVIDIA", "Microsoft", "Snowflake", "Adobe", "Salesforce"],
    specialties: [
      "Enterprise Generative AI",
      "LLM Integration Strategy",
      "AI Prompt Engineering",
      "AI Governance & Ethics",
      "Executive AI Readiness"
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/aris-thorne-ai",
      facebook: "https://facebook.com/aristhorne.ai",
      youtube: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      podcast: "https://podcasts.apple.com/us/podcast/ai-leadership-frontier",
      website: "https://aristhorne.ai"
    },
    featuredMedia: {
      youtubeVideoId: "2ePf9rue1Ao",
      podcastTitle: "Episode 42: Building AI-Native Enterprises",
      podcastUrl: "https://open.spotify.com/episode/ai-native-enterprise"
    },
    verified: true,
    featured: true,
    claimed: true,
    sourceUrl: "https://aristhorne.ai"
  },
  {
    id: "exp-2",
    name: "Jonathan Sterling",
    title: "Senior Executive Coach & C-Suite Transition Partner",
    headline: "Advising CEOs, Founders & Boards on High-Stakes Leadership & Scaling",
    category: "Executive Coach",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    location: "New York, NY & London",
    rating: 4.95,
    reviewsCount: 62,
    hourlyRate: "$600 - $1,200 / hr",
    bio: "Jonathan Sterling works exclusively with C-suite executives, board members, and high-growth founders undergoing major organizational transitions. Former McKinsey partner and executive psychologist, Jonathan brings deep strategic foresight combined with behavioral science to unlock executive resilience.",
    clients: ["Goldman Sachs", "McKinsey & Co.", "J.P. Morgan", "Apple", "Morgan Stanley"],
    specialties: [
      "C-Suite Onboarding",
      "Executive Presence",
      "Boardroom Communication",
      "Crisis Leadership",
      "Strategic Visioning"
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/jonathan-sterling-exec",
      facebook: "https://facebook.com/sterlingexecutive",
      youtube: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      podcast: "https://podcasts.apple.com/us/podcast/the-c-suite-mindset",
      website: "https://sterlingexecutive.com"
    },
    featuredMedia: {
      youtubeVideoId: "l_NYrWqUR40",
      podcastTitle: "Mastering C-Suite Influence in Uncertain Times",
      podcastUrl: "https://open.spotify.com/episode/c-suite-influence"
    },
    verified: true,
    featured: true,
    claimed: true,
    sourceUrl: "https://sterlingexecutive.com"
  },
  {
    id: "exp-3",
    name: "Marcus Vance",
    title: "Global Corporate Trainer & Team Performance Architect",
    headline: "Empowering Cross-Functional Teams with Agile Excellence & Resilience",
    category: "Corporate Trainer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    location: "Chicago, IL & Remote",
    rating: 4.92,
    reviewsCount: 110,
    hourlyRate: "$350 - $650 / hr",
    bio: "Marcus Vance has delivered interactive corporate training workshops to over 100 enterprise clients across North America and Europe. Specializing in high-performance team dynamics, agile transformation, and psychological safety in hybrid workplaces.",
    clients: ["Google", "Microsoft", "Accenture", "IBM", "Deloitte"],
    specialties: [
      "Agile & Scrum Bootcamps",
      "Hybrid Team Dynamics",
      "Psychological Safety",
      "Cross-Functional Scaling",
      "Conflict Resolution"
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/marcusvance-trainer",
      facebook: "https://facebook.com/marcusvancetraining",
      youtube: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      podcast: "https://podcasts.apple.com/us/podcast/agile-leadership-lab",
      website: "https://marcusvancetraining.com"
    },
    featuredMedia: {
      youtubeVideoId: "dQw4w9WgXcQ",
      podcastTitle: "Building High-Trust Teams in a Distributed World",
      podcastUrl: "https://open.spotify.com/episode/high-trust-teams"
    },
    verified: true,
    featured: false,
    claimed: true,
    sourceUrl: "https://marcusvancetraining.com"
  },
  {
    id: "exp-4",
    name: "Dr. Elena Rostova",
    title: "Corporate Culture Coach & Leadership Psychologist",
    headline: "Fostering Sustainable Culture & Preventing Burnout in Enterprise Organizations",
    category: "Corporate Coach",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    location: "Boston, MA & Remote",
    rating: 4.96,
    reviewsCount: 75,
    hourlyRate: "$400 - $750 / hr",
    bio: "Dr. Elena Rostova works with enterprise executive teams to redesign organizational culture, elevate psychological well-being, and drive sustainable innovation without burnout. Author of 'The Resilient Enterprise' and frequent keynote speaker.",
    clients: ["Amazon", "Salesforce", "Meta", "HubSpot", "Novartis"],
    specialties: [
      "Corporate Culture Transformation",
      "Executive Resilience",
      "Burnout Prevention Strategy",
      "Emotional Intelligence",
      "Manager Coaching"
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/drelenarostova",
      facebook: "https://facebook.com/elenarostovacoaching",
      youtube: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      podcast: "https://podcasts.apple.com/us/podcast/the-resilient-leader",
      website: "https://elenarostova.com"
    },
    featuredMedia: {
      youtubeVideoId: "l_NYrWqUR40",
      podcastTitle: "Designing Workplace Cultures Where Talent Thrives",
      podcastUrl: "https://open.spotify.com/episode/workplace-culture-thrive"
    },
    verified: true,
    featured: true,
    claimed: true,
    sourceUrl: "https://elenarostova.com"
  },
  {
    id: "exp-5",
    name: "Sophia Lin",
    title: "Management & Digital Transformation Consultant",
    headline: "Scaling Growth & Streamlining Enterprise Operations for Global Tech Leaders",
    category: "Consultant",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    location: "Seattle, WA & Austin, TX",
    rating: 4.94,
    reviewsCount: 54,
    hourlyRate: "$500 - $900 / hr",
    bio: "Sophia Lin provides strategic consulting to growth-stage and Fortune 500 technology enterprises. Specializing in digital transformation, process optimization, and go-to-market execution.",
    clients: ["BCG", "PwC", "Uber", "Tesla", "Stripe"],
    specialties: [
      "Digital Transformation",
      "Go-To-Market Strategy",
      "Operational Efficiency",
      "Change Management",
      "Product-Led Growth"
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/sophia-lin-consulting",
      facebook: "https://facebook.com/sophialinconsulting",
      youtube: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      podcast: "https://podcasts.apple.com/us/podcast/scale-strategy-daily",
      website: "https://sophialinstrategy.com"
    },
    featuredMedia: {
      youtubeVideoId: "2ePf9rue1Ao",
      podcastTitle: "Navigating Multi-Market Digital Transformations",
      podcastUrl: "https://open.spotify.com/episode/digital-transformation"
    },
    verified: true,
    featured: false,
    claimed: true,
    sourceUrl: "https://sophialinstrategy.com"
  },
  {
    id: "exp-6",
    name: "Maya Patel",
    title: "AI Leadership Coach & Human-AI Integration Strategist",
    headline: "Coaching Leaders to Drive Enterprise Value through AI Adaptation",
    category: "AI Trainer",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    location: "San Jose, CA & Remote",
    rating: 4.97,
    reviewsCount: 41,
    hourlyRate: "$420 - $750 / hr",
    bio: "Maya Patel guides enterprise executive teams through the human side of AI adoption. Her framework enables companies to combine AI technical capabilities with high-trust human leadership.",
    clients: ["IBM Watson", "Cisco", "Adobe", "Workday", "Intuit"],
    specialties: [
      "Human-AI Workforce Strategy",
      "AI Executive Coaching",
      "Change Enablement for AI",
      "Generative AI Workflows"
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/mayapatel-aicoach",
      facebook: "https://facebook.com/mayapatelaicoach",
      youtube: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      podcast: "https://podcasts.apple.com/us/podcast/human-ai-leadership",
      website: "https://mayapatel.ai"
    },
    featuredMedia: {
      youtubeVideoId: "dQw4w9WgXcQ",
      podcastTitle: "Coaching Leaders to Embrace AI without Fear",
      podcastUrl: "https://open.spotify.com/episode/ai-leadership"
    },
    verified: true,
    featured: true,
    claimed: true,
    sourceUrl: "https://mayapatel.ai"
  }
];

module.exports = { initialProfiles };
