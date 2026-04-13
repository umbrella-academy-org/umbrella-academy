/**
 * Dashboard Static Data
 * 
 * Centralized static content and videos for dashboard components
 * to make management easier and maintain consistency across the application.
 */

export interface DashboardVideo {
  id: string;
  title: string;
  speaker: string;
  role: string;
  duration: string;
  image: string;
  views: string;
  videoId: string;
  description?: string;
  category?: string;
}

export interface DashboardCourse {
  id: string;
  title: string;
  company: string;
  duration: string;
  students: string;
  rating: number;
  level: string;
  price: string;
  image: string;
  description?: string;
  field?: string;
}

export interface DashboardStat {
  label: string;
  value: string;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface DashboardFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

// Featured videos for dashboard
export const dashboardVideos: DashboardVideo[] = [
  {
    id: 'vid-1',
    title: 'From Beginner to Tech Professional',
    speaker: 'James Chen',
    role: 'Full-Stack Developer at TechCorp',
    duration: '5:32',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=225&fit=crop&crop=center',
    views: '2.4K views',
    videoId: 'dQw4w9WgXcQ',
    description: 'Learn how James transitioned from beginner to professional developer',
    category: 'Career Journey'
  },
  {
    id: 'vid-2',
    title: 'My Creative Journey in Film & Video',
    speaker: 'Zara Mohamed',
    role: 'Video Producer at Creative Studios',
    duration: '6:45',
    image: 'https://images.unsplash.com/photo-1596724686228-3a9f7b0bb3b1?w=400&h=225&fit=crop&crop=center',
    views: '1.8K views',
    videoId: 'jNQXAC9IVRw',
    description: 'Discover Zara\'s path to becoming a video producer',
    category: 'Creative Arts'
  },
  {
    id: 'vid-3',
    title: 'Building My Dream Career in Tech',
    speaker: 'Aisha Patel',
    role: 'DevOps Engineer at CloudTech',
    duration: '4:28',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop&crop=center',
    views: '3.1K views',
    videoId: '9bZkp7q19f0',
    description: 'Aisha shares her journey into DevOps and cloud engineering',
    category: 'Tech Career'
  }
];

// Featured courses for dashboard
export const dashboardCourses: DashboardCourse[] = [
  {
    id: 'course-1',
    title: 'Full-Stack Web Development',
    company: 'Dreamize Africa',
    duration: '12 weeks',
    students: '150+ enrolled',
    rating: 4.9,
    level: 'Beginner to Advanced',
    price: '$299',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&crop=center',
    description: 'Complete full-stack development with modern frameworks',
    field: 'Technology'
  },
  {
    id: 'course-2',
    title: 'DevOps & Cloud Architecture',
    company: 'Dreamize Africa',
    duration: '10 weeks',
    students: '120+ enrolled',
    rating: 4.8,
    level: 'Intermediate',
    price: '$349',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop&crop=center',
    description: 'Master DevOps practices and cloud architecture',
    field: 'Technology'
  },
  {
    id: 'course-3',
    title: 'Mobile App Development',
    company: 'Dreamize Africa',
    duration: '8 weeks',
    students: '90+ enrolled',
    rating: 4.7,
    level: 'Intermediate',
    price: '$279',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1ac587c9c?w=400&h=250&fit=crop&crop=center',
    description: 'Build native and cross-platform mobile applications',
    field: 'Technology'
  },
  {
    id: 'course-4',
    title: 'Video Production Mastery',
    company: 'Green Land Film & TV',
    duration: '6 weeks',
    students: '75+ enrolled',
    rating: 4.9,
    level: 'Beginner',
    price: '$199',
    image: 'https://images.unsplash.com/photo-1596724686228-3a9f7b0bb3b1?w=400&h=250&fit=crop&crop=center',
    description: 'Learn professional video production techniques',
    field: 'Visual Communication'
  }
];

// Dashboard statistics
export const dashboardStats: DashboardStat[] = [
  { label: 'Active Learners', value: '500+', trend: 'up' },
  { label: 'Expert Mentors', value: '50+', trend: 'up' },
  { label: 'Success Rate', value: '95%', trend: 'up' },
  { label: 'Courses Completed', value: '1.2K', trend: 'up' },
  { label: 'Hours of Learning', value: '10K+', trend: 'up' },
  { label: 'Career Placements', value: '200+', trend: 'up' }
];

// Dashboard features
export const dashboardFeatures: DashboardFeature[] = [
  {
    id: 'feat-1',
    title: 'Industry-recognized certificates',
    description: 'Get certificates valued by top employers',
    icon: 'award',
    color: 'green'
  },
  {
    id: 'feat-2',
    title: '1-on-1 mentorship',
    description: 'Personalized guidance from industry experts',
    icon: 'users',
    color: 'blue'
  },
  {
    id: 'feat-3',
    title: 'Job placement assistance',
    description: 'Career support and job placement services',
    icon: 'briefcase',
    color: 'purple'
  },
  {
    id: 'feat-4',
    title: 'Flexible learning schedule',
    description: 'Learn at your own pace, on your schedule',
    icon: 'clock',
    color: 'orange'
  },
  {
    id: 'feat-5',
    title: 'Real-world projects',
    description: 'Build portfolio-worthy projects',
    icon: 'code',
    color: 'indigo'
  },
  {
    id: 'feat-6',
    title: 'Community support',
    description: '24/7 support from peers and mentors',
    icon: 'message-circle',
    color: 'pink'
  }
];

// Learning journey steps
export const learningJourneySteps = [
  {
    id: 'step-1',
    title: 'Choose Your Field',
    description: 'Select from technology, visual communication, or other specializations.',
    color: 'from-gray-50 to-white',
    borderColor: 'border-gray-200',
    iconBg: 'bg-gradient-to-br from-black to-gray-800 text-white',
    hoverBg: 'hover:from-gray-100 hover:to-gray-50',
    icon: 'target'
  },
  {
    id: 'step-3',
    title: 'Meet Your Mentor',
    description: 'Connect with experienced professionals who guide your learning.',
    color: 'from-gray-50 to-white',
    borderColor: 'border-gray-200',
    iconBg: 'bg-gradient-to-br from-black to-gray-800 text-white',
    hoverBg: 'hover:from-gray-100 hover:to-gray-50',
    icon: 'book-open'
  },
  {
    id: 'step-4',
    title: 'Master Your Skills',
    description: 'Gain practical expertise through mentored projects and real-world challenges.',
    color: 'from-gray-50 to-white',
    borderColor: 'border-gray-200',
    iconBg: 'bg-gradient-to-br from-black to-gray-800 text-white',
    hoverBg: 'hover:from-gray-100 hover:to-gray-50',
    icon: 'zap'
  }
];

// Navigation items
export const dashboardNavigation = {
  main: [
    { href: '#journey', label: 'Journey' },
    { href: '#fields', label: 'Fields' },
    { href: '#courses', label: 'Courses' },
    { href: '#features', label: 'Features' },
    { href: '#testimonials', label: 'Reviews' },
    { href: '#videos', label: 'Videos' }
  ],
  auth: [
    { href: '/auth/login', label: 'Sign In', variant: 'text' },
    { href: '/auth/signup', label: 'Start Learning', variant: 'primary' }
  ]
};

// Hero section content
export const heroContent = {
  badge: {
    text: 'Transform Your Future',
    icon: 'sparkles'
  },
  title: 'Learn from Industry Experts',
  subtitle: 'Discover world-class learning programs across technology, visual communication, and more. Connect with expert mentors and accelerate your growth.',
  ctas: [
    {
      href: '/auth/signup',
      label: 'Explore Programs',
      variant: 'primary',
      icon: 'arrow-right'
    },
    {
      href: '/auth/signup',
      label: 'Watch Demo',
      variant: 'secondary'
    }
  ]
};

// Export all data as a single object for easy importing
export const dashboardData = {
  videos: dashboardVideos,
  courses: dashboardCourses,
  stats: dashboardStats,
  features: dashboardFeatures,
  journeySteps: learningJourneySteps,
  navigation: dashboardNavigation,
  hero: heroContent
};
