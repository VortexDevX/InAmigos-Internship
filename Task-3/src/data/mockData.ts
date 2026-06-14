export interface Cause {
  id: string;
  title: string;
  category: 'education' | 'food' | 'animal' | 'cleanliness';
  description: string;
  raised: number;
  goal: number;
  image: string;
  impactMetric: string;
  location: string;
  volunteersNeeded: number;
  colorClass: string; // Tailwind color class for cards
}

export interface VolunteerOpportunity {
  id: string;
  title: string;
  causeTitle: string;
  skills: string[];
  commitment: string;
  type: 'Remote' | 'On-site';
  spotsLeft: number;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'Volunteer' | 'Donor' | 'Beneficiary';
  quote: string;
  avatar: string;
}

export const mockCauses: Cause[] = [
  {
    id: '1',
    title: 'Smart Classrooms for Rural Kids',
    category: 'education',
    description: 'Providing digital tablets, reliable solar power, and trained instructors to rural community centers.',
    raised: 12500,
    goal: 15000,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600',
    impactMetric: '420 students connected',
    location: 'Rural Villages',
    volunteersNeeded: 5,
    colorClass: 'brand-violet'
  },
  {
    id: '2',
    title: 'Community Kitchen & Feed Drive',
    category: 'food',
    description: 'Serving hot, nutritious meals to homeless families and daily wage earners impacted by urban shifts.',
    raised: 28400,
    goal: 30000,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600',
    impactMetric: '14,200+ Meals Distributed',
    location: 'Metro Downtown',
    volunteersNeeded: 12,
    colorClass: 'brand-orange'
  },
  {
    id: '3',
    title: 'Stray Sanctuary & Medical Care',
    category: 'animal',
    description: 'Rescuing injured stray animals, administering rabies vaccines, and organizing local adoption drives.',
    raised: 9200,
    goal: 12000,
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=600',
    impactMetric: '184 animals treated',
    location: 'North Shelter',
    volunteersNeeded: 8,
    colorClass: 'brand-rose'
  },
  {
    id: '4',
    title: 'Coastal Cleanup & Waste Audits',
    category: 'cleanliness',
    description: 'Clearing ocean waste from local beaches and conducting brand audits on plastic pollution.',
    raised: 4500,
    goal: 6000,
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=600',
    impactMetric: '2.4 tons of waste removed',
    location: 'Golden Shore Beach',
    volunteersNeeded: 20,
    colorClass: 'brand-blue'
  },
  {
    id: '5',
    title: 'Code & Math Literacy Bootcamps',
    category: 'education',
    description: 'Weekly coding and math mentorship programs for youth under protective care.',
    raised: 7100,
    goal: 10000,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600',
    impactMetric: '85 youth certified',
    location: 'Youth Center West',
    volunteersNeeded: 4,
    colorClass: 'brand-violet'
  },
  {
    id: '6',
    title: 'Excess Food Logistics Network',
    category: 'food',
    description: 'Connecting wedding venues and restaurants with local food banks using real-time dispatch.',
    raised: 18500,
    goal: 20000,
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=600',
    impactMetric: '8.5 tons food rescued',
    location: 'City-wide',
    volunteersNeeded: 6,
    colorClass: 'brand-orange'
  }
];

export const mockOpportunities: VolunteerOpportunity[] = [
  {
    id: 'v1',
    title: 'Virtual Code Tutor',
    causeTitle: 'Code & Math Literacy Bootcamps',
    skills: ['Web Support', 'Teaching'],
    commitment: '3 hours/week',
    type: 'Remote',
    spotsLeft: 2,
    description: 'Teach basic HTML/CSS/JS concepts to motivated students via interactive online pair-programming.'
  },
  {
    id: 'v2',
    title: 'Digital Campaign Designer',
    causeTitle: 'Stray Sanctuary & Medical Care',
    skills: ['Design'],
    commitment: 'Flexible',
    type: 'Remote',
    spotsLeft: 3,
    description: 'Create engaging infographics and rescue stories for Instagram and print adoption brochures.'
  },
  {
    id: 'v3',
    title: 'Community Kitchen Captain',
    causeTitle: 'Community Kitchen & Feed Drive',
    skills: ['Fundraising', 'Web Support'],
    commitment: '4 hours/weekend',
    type: 'On-site',
    spotsLeft: 5,
    description: 'Supervise food distribution queues, coordinate with volunteers, and log digital metrics.'
  },
  {
    id: 'v4',
    title: 'Outreach & Donor Relations Helper',
    causeTitle: 'Smart Classrooms for Rural Kids',
    skills: ['Fundraising'],
    commitment: '5 hours/week',
    type: 'Remote',
    spotsLeft: 2,
    description: 'Draft outreach letters to local businesses, set up presentation slides, and manage follow-ups.'
  },
  {
    id: 'v5',
    title: 'Platform Maintenance Engineer',
    causeTitle: 'Excess Food Logistics Network',
    skills: ['Web Support'],
    commitment: '2 hours/week',
    type: 'Remote',
    spotsLeft: 1,
    description: 'Help optimize the Next.js delivery routing portal and handle layout feedback.'
  },
  {
    id: 'v6',
    title: 'Beach Cleanup Area Lead',
    causeTitle: 'Coastal Cleanup & Waste Audits',
    skills: ['Teaching'],
    commitment: 'Saturday morning',
    type: 'On-site',
    spotsLeft: 10,
    description: 'Gather trash bags, brief volunteers on safety guidelines, and log waste types on the checklist.'
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Donor',
    quote: 'Being able to see exactly where my money goes - down to the cost of one tablet or meal - is revolutionary. The real-time tracker keeps me contributing.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't2',
    name: 'David Kim',
    role: 'Volunteer',
    quote: 'I matched with the coding literacy boot camp. It is incredibly rewarding. The onboarding was frictionless, and I know my 3 hours makes a real difference.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't3',
    name: 'Dr. Maria Torres',
    role: 'Beneficiary',
    quote: 'The digital resources provided to our rural shelter completely changed how our students learn. They are building websites and expressing themselves.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150'
  }
];

export const mockFundDistribution = [
  { name: 'Direct Program Costs', value: 72, color: '#f97316', description: 'Meals, learning tablets, medical supplies, cleaning tools' },
  { name: 'Field Operations', value: 15, color: '#0ea5e9', description: 'Local transportation, site safety, inventory logistics' },
  { name: 'Volunteer Resources', value: 8, color: '#8b5cf6', description: 'Volunteer gear, safety equipment, digital coordination tools' },
  { name: 'Admin & Reporting', value: 5, color: '#f43f5e', description: 'Internal reporting and platform upkeep costs' }
];

export const mockMonthlyImpact = [
  { month: 'Jan', meals: 2400, trees: 120, volunteers: 95, funds: 8500 },
  { month: 'Feb', meals: 3800, trees: 210, volunteers: 120, funds: 12000 },
  { month: 'Mar', meals: 6100, trees: 350, volunteers: 165, funds: 17400 },
  { month: 'Apr', meals: 9200, trees: 580, volunteers: 210, funds: 22000 },
  { month: 'May', meals: 11500, trees: 790, volunteers: 260, funds: 25000 },
  { month: 'Jun', meals: 14200, trees: 980, volunteers: 342, funds: 28400 }
];
