'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  mockCauses, 
  mockTestimonials, 
  mockFundDistribution
} from '../data/mockData';
import { 
  Heart, 
  Leaf, 
  Users, 
  Utensils, 
  BookOpen, 
  Trash2, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  ShieldCheck,
  Menu,
  X,
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VolunteerMatcher = dynamic(() => import('../components/VolunteerMatcher'), { ssr: false });

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'education' | 'food' | 'animal' | 'cleanliness'>('all');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '', role: 'Volunteer' });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter causes
  const filteredCauses = selectedCategory === 'all' 
    ? mockCauses 
    : mockCauses.filter(cause => cause.category === selectedCategory);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', message: '', role: 'Volunteer' });
    }, 4000);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'education': return { bg: 'bg-violet-50', border: 'border-violet-100', text: 'text-violet-700', fill: 'bg-violet-500' };
      case 'food': return { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-700', fill: 'bg-orange-500' };
      case 'animal': return { bg: 'bg-rose-50', border: 'border-rose-100', text: 'text-rose-700', fill: 'bg-rose-500' };
      case 'cleanliness': return { bg: 'bg-sky-50', border: 'border-sky-100', text: 'text-sky-700', fill: 'bg-sky-500' };
      default: return { bg: 'bg-slate-50', border: 'border-slate-100', text: 'text-slate-700', fill: 'bg-slate-500' };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'education': return <BookOpen className="w-4 h-4" />;
      case 'food': return <Utensils className="w-4 h-4" />;
      case 'animal': return <Heart className="w-4 h-4" />;
      case 'cleanliness': return <Trash2 className="w-4 h-4" />;
      default: return null;
    }
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex-1 flex flex-col relative bg-background text-slate-800">
      {/* Decorative ambient color splashes */}
      <div className="absolute top-0 right-0 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-orange-100/40 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none max-w-full" />
      <div className="absolute top-[800px] left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-sky-100/30 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none max-w-full" />
      <div className="absolute top-[2000px] right-0 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-violet-100/25 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none max-w-full" />

      {/* Floating Header */}
      <nav className="fixed top-4 left-4 right-4 z-40 glass-panel rounded-2xl py-3.5 px-6 flex items-center justify-between shadow-sm max-w-7xl mx-auto border border-slate-200/60">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img 
            src="/logo.png" 
            alt="ImpactPulse Logo" 
            className="w-8 h-8 rounded-xl object-cover shadow-md shadow-orange-500/10" 
          />
          <span className="font-heading font-black text-lg tracking-tight text-slate-800 flex items-center gap-0.5">
            Impact<span className="text-brand-orange">Pulse</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <button onClick={() => scrollTo('dashboard')} className="text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">Impact</button>
          <button onClick={() => scrollTo('causes')} className="text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">Campaigns</button>
          <button onClick={() => scrollTo('transparency')} className="text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">Transparency</button>
          <button onClick={() => scrollTo('volunteer')} className="text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">Volunteer Match</button>
          <button onClick={() => scrollTo('testimonials')} className="text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">Stories</button>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button 
            onClick={() => scrollTo('contact')} 
            className="px-5 py-2.5 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors shadow-sm"
          >
            Get Involved
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-4 right-4 z-40 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-lg md:hidden flex flex-col gap-3 border border-slate-200"
          >
            <button onClick={() => scrollTo('dashboard')} className="text-left py-2 text-slate-600 hover:text-slate-800 transition-colors font-semibold border-b border-slate-100">Impact</button>
            <button onClick={() => scrollTo('causes')} className="text-left py-2 text-slate-600 hover:text-slate-800 transition-colors font-semibold border-b border-slate-100">Campaigns</button>
            <button onClick={() => scrollTo('transparency')} className="text-left py-2 text-slate-600 hover:text-slate-800 transition-colors font-semibold border-b border-slate-100">Transparency</button>
            <button onClick={() => scrollTo('volunteer')} className="text-left py-2 text-slate-600 hover:text-slate-800 transition-colors font-semibold border-b border-slate-100">Volunteer Match</button>
            <button onClick={() => scrollTo('testimonials')} className="text-left py-2 text-slate-600 hover:text-slate-800 transition-colors font-semibold border-b border-slate-100">Stories</button>
            <button 
              onClick={() => scrollTo('contact')}
              className="mt-2 w-full py-3 bg-brand-orange text-white font-bold rounded-xl text-center cursor-pointer shadow-sm"
            >
              Get Involved
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 pt-24 md:pt-32 pb-16 space-y-16 md:space-y-32">
        
        {/* 1. HERO SECTION */}
        <section className="relative py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-50 text-brand-orange border border-orange-100 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Empowering communities with trust and action
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-800 leading-[1.15]">
              Track Impact.<br />
              Build Trust.<br />
              <span className="text-brand-orange bg-gradient-to-r from-brand-orange to-brand-amber bg-clip-text text-transparent">Mobilize</span> Volunteers.
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              We connect kind hearts with community campaigns. See exactly where resources go, discover local needs, and share your unique skills to create direct, visible change.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={() => scrollTo('causes')}
                className="px-6 py-3.5 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-2xl text-sm transition-colors shadow-md shadow-orange-500/10 flex items-center justify-center gap-2 cursor-pointer group"
              >
                Explore Campaigns
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => scrollTo('volunteer')}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold border border-slate-200 rounded-2xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                Become a Volunteer
              </button>
            </div>

            {/* Micro proof points */}
            <div className="pt-8 border-t border-slate-100 grid grid-cols-3 gap-6">
              <div>
                <p className="text-2xl font-black text-brand-orange font-heading">100%</p>
                <p className="text-xs text-slate-500 font-semibold mt-1">Transparent Allocation</p>
              </div>
              <div>
                <p className="text-2xl font-black text-brand-blue font-heading">14,200+</p>
                <p className="text-xs text-slate-500 font-semibold mt-1">Meals Distributed</p>
              </div>
              <div>
                <p className="text-2xl font-black text-brand-rose font-heading">340+</p>
                <p className="text-xs text-slate-500 font-semibold mt-1">Actions Registered</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px] aspect-[9/18] rounded-[48px] border-[8px] sm:border-[10px] border-slate-250 bg-white overflow-hidden shadow-2xl">
              {/* Phone notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-slate-200 flex items-center justify-center z-10">
                <div className="w-16 h-4 bg-white rounded-full" />
              </div>
              
              {/* Mock App Screen */}
              <div className="absolute inset-0 pt-8 px-4 pb-4 flex flex-col justify-between overflow-y-auto bg-slate-50/50">
                <div className="mt-2 flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-[10px] font-bold text-slate-500">Live Campaign Tracker</span>
                  <span className="w-2 h-2 rounded-full bg-brand-rose animate-pulse" />
                </div>
                
                {/* Visual Activity Card 1 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-3.5 space-y-2 shadow-sm">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                    <span className="text-brand-blue uppercase">Cleanliness Drive</span>
                    <span>10m ago</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">2.4 Tons Trash Sorted</h4>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[80%] h-full bg-brand-blue rounded-full" />
                  </div>
                </div>

                {/* Visual Activity Card 2 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-3.5 space-y-2 shadow-sm">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                    <span className="text-brand-orange uppercase">Food Rescue</span>
                    <span>2h ago</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">150 Meals Distributed</h4>
                  <span className="text-[10px] bg-orange-50 text-brand-orange px-2 py-0.5 rounded font-bold self-start inline-block">Verified by Shelter Lead</span>
                </div>

                {/* Visual Activity Card 3 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-3.5 space-y-2 shadow-sm">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                    <span className="text-brand-violet uppercase">Education</span>
                    <span>Yesterday</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">5 Digital Tablets Sourced</h4>
                  <span className="text-[10px] text-brand-violet font-semibold block">Rural Center West</span>
                </div>

                <div className="mt-4 p-3 bg-brand-orange rounded-xl text-center shadow-sm">
                  <p className="text-white font-bold text-xs">Explore Local Needs</p>
                </div>
              </div>
            </div>
            {/* Ambient visual background highlights */}
            <div className="absolute -inset-4 bg-orange-100/50 rounded-[54px] blur-2xl -z-10" />
          </div>
        </section>

        {/* 2. IMPACT DASHBOARD */}
        <section id="dashboard" className="scroll-mt-24 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono text-brand-orange tracking-widest uppercase block font-bold">
              // CURRENT OUTPUTS
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-800">
              Our Verified Community Footprint
            </h2>
            <p className="text-sm text-slate-500">
              Real outcomes recorded across our four main active campaign modules. Every record is verified by on-site project coordinators.
            </p>
          </div>

          {/* Friendly Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                label: 'Meals Distributed', 
                value: '14,200+', 
                icon: <Utensils className="w-5 h-5 text-brand-orange" />, 
                detail: 'Providing hot dinners to local daily-wage worker shelters.',
                bgClass: 'bg-orange-50',
                borderClass: 'border-orange-100/80',
                textClass: 'text-brand-orange'
              },
              { 
                label: 'Trees Planted', 
                value: '980+', 
                icon: <Leaf className="w-5 h-5 text-brand-amber" />, 
                detail: 'Restoring local parks and urban school boundaries.',
                bgClass: 'bg-amber-50',
                borderClass: 'border-amber-100/80',
                textClass: 'text-brand-amber'
              },
              { 
                label: 'Active Helpers', 
                value: '342 volunteers', 
                icon: <Users className="w-5 h-5 text-brand-blue" />, 
                detail: 'Sharing tutoring, logistics, design, and technical skills.',
                bgClass: 'bg-sky-50',
                borderClass: 'border-sky-100/80',
                textClass: 'text-brand-blue'
              },
              { 
                label: 'Budget Allocated', 
                value: '$28,400', 
                icon: <DollarSign className="w-5 h-5 text-brand-rose" />, 
                detail: '100% of receipts made public for open visual verification.',
                bgClass: 'bg-rose-50',
                borderClass: 'border-rose-100/80',
                textClass: 'text-brand-rose'
              }
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className={`bg-white border rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300 ${stat.borderClass}`}
              >
                <div className="space-y-4">
                  <div className={`p-3 rounded-2xl self-start inline-block ${stat.bgClass}`}>
                    {stat.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-800 leading-none">{stat.value}</h3>
                    <p className={`text-sm font-bold mt-1 ${stat.textClass}`}>{stat.label}</p>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed pt-1">{stat.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Human-Friendly Explainer Grid (replacing charts) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-brand-amber" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">How We Maintain Open Trust</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                We know people care about honesty. ImpactPulse operates differently than traditional systems. We break campaigns down into clear physical batches. You do not just donate to "food needs"; you fund a specific community drive where output metrics are publicly reported by the kitchen coordinators.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2 font-mono text-[10px] text-slate-500">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="font-bold text-slate-800 mb-1">01. BATCH</p>
                  Create specific local target goals
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="font-bold text-slate-800 mb-1">02. DELIVER</p>
                  Distribute goods or set up classrooms
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="font-bold text-slate-800 mb-1">03. REPORT</p>
                  Log receipt photos for public reporting
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-violet-50 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-brand-violet" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Our Public Reporting Routine</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Every project has an assigned coordinator who uploads weekly progress reports, attendance sheets, and invoice stamps. These updates go straight to our main feed, keeping the platform transparent, active, and free of hidden costs.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-4 border-t border-slate-100">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-rose animate-pulse" /> Live Reporting Loop</span>
                <span>Reporting Period: 30-Day Cycles</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CAUSES / CAMPAIGNS */}
        <section id="causes" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-brand-orange tracking-widest uppercase block font-bold mb-1">
                // ACTIVE CAMPAIGNS
              </span>
              <h2 className="text-3xl font-black tracking-tight text-slate-800">
                Support Active Campaigns
              </h2>
              <p className="text-sm text-slate-500 mt-1 max-w-xl">
                Explore real projects helping people. Use filters below to search categories and view specific goals.
              </p>
            </div>

            {/* Category Selector */}
            <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start">
              {([
                { id: 'all', label: 'All Projects' },
                { id: 'education', label: 'Education' },
                { id: 'food', label: 'Food Drives' },
                { id: 'animal', label: 'Animal Welfare' },
                { id: 'cleanliness', label: 'Cleanliness' }
              ] as const).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-white text-brand-orange shadow-sm'
                      : 'text-slate-500 hover:text-slate-850'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Campaigns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredCauses.map((cause) => {
                const percent = Math.min(100, Math.round((cause.raised / cause.goal) * 100));
                const colors = getCategoryColor(cause.category);
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={cause.id}
                    className="bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-md hover:border-slate-200/80 transition-all duration-300 flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      {/* Image header with fallback */}
                      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                        <img 
                          src={cause.image} 
                          alt={cause.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=600';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
                        <span className={`absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${colors.bg} ${colors.text} ${colors.border}`}>
                          {getCategoryIcon(cause.category)}
                          {cause.category}
                        </span>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="space-y-1">
                          <h3 className="text-lg font-bold text-slate-800 leading-snug">
                            {cause.title}
                          </h3>
                          <p className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                            {cause.location}
                          </p>
                        </div>

                        <p className="text-sm text-slate-500 leading-relaxed">
                          {cause.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 space-y-4">
                      {/* Budget Progression */}
                      <div className="space-y-2 pt-4 border-t border-slate-100">
                        <div className="flex justify-between items-end text-xs font-semibold">
                          <span className="text-slate-500">Collected: ${cause.raised.toLocaleString()}</span>
                          <span className={`${colors.text}`}>{percent}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${colors.fill}`} 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                          <span>Target: ${cause.goal.toLocaleString()}</span>
                          <span>{cause.volunteersNeeded} Helpers needed</span>
                        </div>
                      </div>

                      {/* Output metric tag */}
                      <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between text-xs border border-slate-150">
                        <span className="text-slate-500 font-semibold">Goal Output:</span>
                        <span className="font-bold text-slate-800">{cause.impactMetric}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* 4. FUND TRANSPARENCY (PROGRESS BARS FOR COMMON PEOPLE) */}
        <section id="transparency" className="scroll-mt-24 py-4 relative">
          <div className="bg-white border border-slate-250/80 p-8 md:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center shadow-sm">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono text-brand-orange tracking-widest uppercase block font-bold">
                // OUR ACCOUNTABILITY
              </span>
              <h2 className="text-3xl font-black tracking-tight text-slate-800">
                Where Do Your Donations Go?
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                We believe in complete financial openness. We do not bury our numbers in complicated spreadsheets. Here is the direct breakdown of every dollar spent on our projects.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Direct Delivery</h4>
                    <p className="text-xs text-slate-500">Every donation directly buys materials, meal ingredients, or learning tablets.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Receipt Verification</h4>
                    <p className="text-xs text-slate-500">All vendors submit digital receipts which are uploaded directly to our transaction feed.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-4 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4.5 h-4.5 text-brand-rose" />
                  Transparency Practices
                </span>
              </div>
            </div>

            {/* Simple colorful progress bars for common people */}
            <div className="lg:col-span-6 space-y-6 bg-slate-50/70 p-6 rounded-3xl border border-slate-200/60">
              <h3 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-200/60 flex items-center justify-between">
                <span>Fund Allocation Breakdown</span>
                <span className="text-xs text-slate-400 font-mono">Total Allocated: 100%</span>
              </h3>

              <div className="space-y-5">
                {mockFundDistribution.map((fund, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-slate-700">{fund.name}</span>
                      <span className="font-bold text-slate-800" style={{ color: fund.color }}>{fund.value}%</span>
                    </div>
                    <div className="h-3 bg-slate-200/80 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500" 
                        style={{ width: `${fund.value}%`, backgroundColor: fund.color }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal">{fund.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. VOLUNTEER MATCHING */}
        <section id="volunteer" className="scroll-mt-24 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono text-brand-orange tracking-widest uppercase block font-bold">
              // VOLUNTEER MATCHING
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-800">
              Match Your Skills to Campaigns
            </h2>
            <p className="text-sm text-slate-500">
              Select your specific skill below to view matches. From physical assistance to virtual mentoring, every help is appreciated.
            </p>
          </div>

          <VolunteerMatcher />
        </section>

        {/* 6. TESTIMONIALS / STORIES */}
        <section id="testimonials" className="scroll-mt-24 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono text-brand-orange tracking-widest uppercase block font-bold">
              // COMMUNITY VOICES
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-800">
              Voices of our Community
            </h2>
            <p className="text-sm text-slate-500">
              Real reflections from partners, donors, volunteers, and beneficiaries of our campaign drives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockTestimonials.map((t, idx) => {
              const borderColors = ['border-orange-100', 'border-sky-100', 'border-rose-100'];
              return (
                <div 
                  key={t.id} 
                  className={`bg-white border rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300 ${borderColors[idx % 3]}`}
                >
                  <p className="text-sm text-slate-600 italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  
                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 relative flex-shrink-0 border border-slate-200">
                      <img 
                        src={t.avatar} 
                        alt={t.name}
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150';
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{t.name}</h4>
                      <span className={`text-[10px] font-bold uppercase ${
                        t.role === 'Donor' ? 'text-brand-orange' : t.role === 'Volunteer' ? 'text-brand-blue' : 'text-brand-rose'
                      }`}>
                        {t.role}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. CONTACT / JOIN FORM */}
        <section id="contact" className="scroll-mt-24 max-w-4xl mx-auto">
          <div className="bg-white border border-slate-250 p-8 md:p-12 rounded-3xl shadow-sm relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 space-y-4">
                <span className="text-xs font-mono text-brand-orange tracking-widest uppercase block font-bold">
                  // ENGAGEMENT HUB
                </span>
                <h2 className="text-2xl font-black tracking-tight text-slate-800">
                  Contact Us
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Have questions about our transparency policy, receipts, corporate partnership packages, or general campaigns? Reach out to us.
                </p>
                
                <div className="pt-4 space-y-2 text-xs font-bold text-slate-500">
                  <p>Email: [EMAIL_ADDRESS]</p>
                  <p>Phone: [Country Code] [Phone Number] </p>
                  <p>Office: [Office Address]</p>
                </div>
              </div>

              <div className="md:col-span-7">
                {!contactSubmitted ? (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-650 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Alex Mercer"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm text-primary placeholder-slate-400 focus:outline-none focus:border-brand-orange transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-650 mb-1">
                          Role
                        </label>
                        <select
                          value={contactForm.role}
                          onChange={(e) => setContactForm(prev => ({ ...prev, role: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm text-primary focus:outline-none focus:border-brand-orange transition-all"
                        >
                          <option value="Volunteer">Volunteer</option>
                          <option value="Donor">Donor</option>
                          <option value="Auditor">Partner</option>
                          <option value="Other">General Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-650 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="alex@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm text-primary placeholder-slate-400 focus:outline-none focus:border-brand-orange transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-650 mb-1">
                        Message Content
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Type your message here..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm text-primary placeholder-slate-400 focus:outline-none focus:border-brand-orange transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-sm cursor-pointer transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                ) : (
                  <div className="py-12 text-center flex flex-col items-center justify-center">
                    <div className="p-3 bg-amber-50 rounded-full border border-amber-100 mb-4">
                      <CheckCircle2 className="w-12 h-12 text-brand-orange" />
                    </div>
                    <h3 className="text-xl font-bold font-heading text-primary">
                      Message Dispatched!
                    </h3>
                    <p className="text-sm text-text-muted mt-2 max-w-sm mx-auto">
                      Thank you, {contactForm.name}. Your message is registered. A representative will contact you at {contactForm.email} shortly.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-12 mt-32 text-xs text-text-muted">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img 
                src="/logo.png" 
                alt="ImpactPulse Logo" 
                className="w-7 h-7 rounded-lg object-cover shadow-sm" 
              />
              <span className="font-heading font-black text-sm tracking-tight text-slate-800">
                ImpactPulse
              </span>
            </div>
            <p className="leading-relaxed max-w-sm">
              ImpactPulse is a transparent non-profit platform providing real-time impact metrics, budget reports, and custom skill-based volunteer matchmaking.
            </p>
          </div>
          
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 uppercase font-heading text-[10px] tracking-wider">NAVIGATE</h4>
              <ul className="space-y-1.5 font-semibold">
                <li><button onClick={() => scrollTo('dashboard')} className="hover:text-slate-850 cursor-pointer">Impact</button></li>
                <li><button onClick={() => scrollTo('causes')} className="hover:text-slate-850 cursor-pointer">Campaigns</button></li>
                <li><button onClick={() => scrollTo('transparency')} className="hover:text-slate-850 cursor-pointer">Transparency</button></li>
                <li><button onClick={() => scrollTo('volunteer')} className="hover:text-slate-850 cursor-pointer">Volunteer Match</button></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 uppercase font-heading text-[10px] tracking-wider">RESOURCES</h4>
              <ul className="space-y-1.5 font-semibold">
                <li><a href="#transparency" className="hover:text-slate-850 cursor-pointer">Transparency Practices</a></li>
                <li><a href="#volunteer" className="hover:text-slate-850 cursor-pointer">Skill Directory</a></li>
                <li><a href="#contact" className="hover:text-slate-850 cursor-pointer">Partner Portal</a></li>
                <li><a href="#" className="hover:text-slate-850 cursor-pointer">Security Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-slate-800 uppercase font-heading text-[10px] tracking-wider">TRANSPARENCY PRACTICES</h4>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 shadow-sm">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-brand-orange" />
                Public Reporting Process
              </div>
              <p className="leading-normal text-slate-500">
                Weekly progress updates supported by demo impact data.
              </p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-semibold text-[10px] text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} ImpactPulse Foundation. Platform source code licensed under the MIT License.
            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-650 border border-slate-200/50 font-bold text-[9px]">
              Demo Project / Sample Data
            </span>
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">GitHub</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
