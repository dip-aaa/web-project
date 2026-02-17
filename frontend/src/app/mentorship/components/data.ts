export interface MentorProfile {
  id: string;
  name: string;
  year: string;
  branch: string;
  role: "mentor" | "mentee" | "both";
  skills: string[];
  lookingFor: string[];
  bio: string;
  rating: number;
  sessions: number;
  reviewCount?: number;
  followers: number;
  online: boolean;
  badges: string[];
  linkedinStyle?: string; // their "headline"
  achievements: string[];
  openFor: string[]; // what they're open for
  fee: number; // per session in coins
  verified: boolean;
}

export interface CalloutPost {
  id: string;
  authorId: string;
  type: "opportunity" | "request" | "event" | "collab";
  title: string;
  description: string;
  tags: string[];
  spots?: number;
  spotsLeft?: number;
  deadline?: string;
  timestamp: string;
  likes: number;
  responses: number;
}

export const MOCK_MENTORS: MentorProfile[] = [
  {
    id: "m1",
    name: "Arjun Sharma",
    year: "4th Year",
    branch: "Computer Science",
    role: "mentor",
    skills: ["React", "Node.js", "System Design", "Python"],
    lookingFor: ["1st Year", "2nd Year"],
    bio: "Final year CS student who survived 3 internships and a startup. I can help you crack DSA, web dev, and campus placements. Let's brew success together ☕",
    rating: 4.8,
    sessions: 34,
    followers: 142,
    online: true,
    badges: ["Top Mentor", "5-Star", "Interview Cracker"],
    linkedinStyle: "SDE Intern @ Google · CS Senior · Open Source Contributor",
    achievements: ["Google STEP Intern", "ACM ICPC Regionalist", "Built app with 10k+ users"],
    openFor: ["1-on-1 mentoring", "Mock interviews", "Project guidance", "Resume review"],
    fee: 50,
    verified: true,
  },
  {
    id: "m2",
    name: "Priya Nair",
    year: "3rd Year",
    branch: "Design",
    role: "both",
    skills: ["UI/UX Design", "Figma", "User Research", "Graphic Design"],
    lookingFor: ["1st Year", "2nd Year"],
    bio: "Design-obsessed 3rd year. I mentor on UX while still being a mentee for product strategy. Bridging art and logic is my superpower.",
    rating: 4.9,
    sessions: 22,
    followers: 210,
    online: true,
    badges: ["Design Star", "Most Creative"],
    linkedinStyle: "Product Design Intern @ Swiggy · Figma Wizard",
    achievements: ["National Design Award Runner-up", "Swiggy Design Intern"],
    openFor: ["Portfolio reviews", "Figma workshops", "UX careers talk"],
    fee: 40,
    verified: true,
  },
  {
    id: "m3",
    name: "Rahul Mehta",
    year: "Alumni",
    branch: "Electronics",
    role: "mentor",
    skills: ["Machine Learning", "Embedded Systems", "Python", "Research"],
    lookingFor: ["3rd Year", "4th Year"],
    bio: "Now at IIT for MS, but still connected to campus roots. Guiding juniors through research papers, ML projects, and grad school applications.",
    rating: 4.7,
    sessions: 58,
    followers: 320,
    online: false,
    badges: ["Alumni Legend", "Research Guide", "Top 5%"],
    linkedinStyle: "MS @ IIT Bombay · ML Research · Ex-TCS Innovation Lead",
    achievements: ["Published in NeurIPS workshop", "TCS Innovation Award", "GATE AIR 45"],
    openFor: ["Grad school SOP", "Research mentoring", "ML project reviews"],
    fee: 80,
    verified: true,
  },
  {
    id: "m4",
    name: "Sneha Gupta",
    year: "2nd Year",
    branch: "Computer Science",
    role: "both",
    skills: ["Data Science", "Statistics", "Python", "Content Writing"],
    lookingFor: ["1st Year"],
    bio: "2nd year exploring data science and always learning. Happy to help freshers settle in and find their path.",
    rating: 4.5,
    sessions: 8,
    followers: 67,
    online: true,
    badges: ["Rising Star"],
    linkedinStyle: "Data Science Enthusiast · Club Lead · Helping freshers thrive",
    achievements: ["College Data Science Hackathon Winner", "Analytics Club Lead"],
    openFor: ["Python basics", "College navigation", "Data science intro"],
    fee: 20,
    verified: false,
  },
  {
    id: "m5",
    name: "Kabir Bose",
    year: "4th Year",
    branch: "MBA",
    role: "mentor",
    skills: ["Product Management", "Marketing", "Finance", "Public Speaking"],
    lookingFor: ["2nd Year", "3rd Year"],
    bio: "Future PM with a business lens. Placed at a top startup. I help students understand product thinking, case interviews, and B-school prep.",
    rating: 4.6,
    sessions: 19,
    followers: 188,
    online: false,
    badges: ["PM Expert", "Case Study Pro"],
    linkedinStyle: "Product Intern @ Razorpay · MBA Final Year · Case Competitions",
    achievements: ["Razorpay PM Intern", "IIM Case Comp Finalist", "TEDx Speaker"],
    openFor: ["PM interviews", "Case study prep", "Startup ideas feedback"],
    fee: 60,
    verified: true,
  },
  {
    id: "m6",
    name: "Divya Krishnan",
    year: "3rd Year",
    branch: "Computer Science",
    role: "mentee",
    skills: ["Android Dev", "Java", "Firebase"],
    lookingFor: ["Alumni", "4th Year"],
    bio: "Looking for a mentor who can help me crack Android interviews and transition to product roles.",
    rating: 0,
    sessions: 0,
    followers: 12,
    online: true,
    badges: [],
    linkedinStyle: "Android Developer · CS 3rd Year · Aspiring PM",
    achievements: ["Published 2 apps on Play Store"],
    openFor: ["Need guidance on PM transition"],
    fee: 0,
    verified: false,
  },
];

export const MOCK_CALLOUTS: CalloutPost[] = [
  {
    id: "c1",
    authorId: "m1",
    type: "opportunity",
    title: "Looking for 2 mentees for Google STEP prep batch",
    description: "I'm running a structured 6-week batch to help 1st/2nd year students crack the Google STEP internship. We'll cover DSA, system design basics, and mock interviews. Limited spots!",
    tags: ["DSA", "Google", "Internship", "System Design"],
    spots: 2,
    spotsLeft: 1,
    deadline: "Feb 20",
    timestamp: "2h ago",
    likes: 34,
    responses: 12,
  },
  {
    id: "c2",
    authorId: "m2",
    type: "event",
    title: "Free Figma Portfolio Workshop — This Saturday",
    description: "Hosting a 2-hour Figma portfolio session for design beginners. Bring your laptop. We'll build 2 case study pages from scratch. First 8 students only.",
    tags: ["Figma", "Design", "Portfolio", "Workshop"],
    spots: 8,
    spotsLeft: 3,
    deadline: "Feb 15",
    timestamp: "5h ago",
    likes: 52,
    responses: 28,
  },
  {
    id: "c3",
    authorId: "m6",
    type: "request",
    title: "Seeking mentor for PM transition from Android Dev background",
    description: "I have 2 Android apps on Play Store and want to move into product. Looking for someone who's made this transition or is in PM roles. Happy to help with dev tasks in return!",
    tags: ["Product Management", "Android Dev", "Career Switch"],
    timestamp: "1d ago",
    likes: 14,
    responses: 7,
  },
  {
    id: "c4",
    authorId: "m5",
    type: "collab",
    title: "Building an EdTech startup — looking for tech co-founder",
    description: "I have the PM + business side covered. Need a passionate developer (React + Node) to co-found a student learning platform. Equity-based. Let's talk.",
    tags: ["Startup", "React", "Node.js", "EdTech", "Co-founder"],
    timestamp: "2d ago",
    likes: 41,
    responses: 19,
  },
  {
    id: "c5",
    authorId: "m3",
    type: "opportunity",
    title: "1 spot open: Research Mentoring for ML Paper",
    description: "Guiding one motivated student through writing and submitting an ML research paper to a workshop. Must be comfortable with Python and linear algebra. 3-month commitment.",
    tags: ["Research", "Machine Learning", "NLP", "Publication"],
    spots: 1,
    spotsLeft: 1,
    deadline: "Feb 25",
    timestamp: "3d ago",
    likes: 67,
    responses: 31,
  },
];

export const MOCK_SESSIONS = [
  { id: "s1", mentor: "Arjun Sharma", topic: "System Design Basics", date: "Feb 14, 3 PM", status: "upcoming" },
  { id: "s2", mentor: "Priya Nair", topic: "UX Portfolio Review", date: "Feb 12, 5 PM", status: "completed", rating: 5 },
  { id: "s3", mentor: "Kabir Bose", topic: "PM Case Interview Prep", date: "Feb 18, 4 PM", status: "upcoming" },
];

// Helper to get current user profile from localStorage
export const getMyProfile = (): MentorProfile => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        return {
          id: userData.id?.toString() || "me",
          name: userData.name || "User",
          year: "Student",
          branch: userData.department || "Not specified",
          role: "both",
          skills: [],
          lookingFor: [],
          bio: `Student from ${userData.department || 'the college'}`,
          rating: 0,
          sessions: 0,
          followers: 0,
          online: true,
          badges: [],
          linkedinStyle: `${userData.department || 'Student'} · ${userData.email || ''}`,
          achievements: [],
          openFor: [],
          fee: 0,
          verified: false,
        };
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }

  // Fallback for server-side rendering or missing user
  return {
    id: "me",
    name: "User",
    year: "Student",
    branch: "Not specified",
    role: "both",
    skills: [],
    lookingFor: [],
    bio: "Student profile",
    rating: 0,
    sessions: 0,
    followers: 0,
    online: true,
    badges: [],
    linkedinStyle: "Student",
    achievements: [],
    openFor: [],
    fee: 0,
    verified: false,
  };
};

// For backward compatibility, export as MY_PROFILE
export const MY_PROFILE = getMyProfile();

