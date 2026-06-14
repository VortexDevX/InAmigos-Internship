'use client';

import React, { useState } from 'react';
import { mockOpportunities, VolunteerOpportunity } from '../data/mockData';
import { Search, MapPin, Calendar, Compass, UserCheck, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VolunteerMatcher() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modeFilter, setModeFilter] = useState<'All' | 'Remote' | 'On-site'>('All');
  const [applyingOpportunity, setApplyingOpportunity] = useState<VolunteerOpportunity | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const allSkills = ['Teaching', 'Design', 'Fundraising', 'Web Support'];

  const getSkillColorClass = (skill: string, active: boolean) => {
    if (!active) return 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200';
    switch (skill) {
      case 'Teaching': return 'bg-amber-500 text-white border-amber-500 shadow-md';
      case 'Design': return 'bg-rose-500 text-white border-rose-500 shadow-md';
      case 'Fundraising': return 'bg-orange-500 text-white border-orange-500 shadow-md';
      case 'Web Support': return 'bg-sky-500 text-white border-sky-500 shadow-md';
      default: return 'bg-slate-500 text-white';
    }
  };

  const getSkillTagClass = (skill: string) => {
    switch (skill) {
      case 'Teaching': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Design': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Fundraising': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Web Support': return 'bg-sky-50 text-sky-700 border-sky-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    );
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setApplyingOpportunity(null);
      setFormData({ name: '', email: '', message: '' });
    }, 3500);
  };

  const filteredOpportunities = mockOpportunities.filter(opp => {
    const matchesSkills = selectedSkills.length === 0 || 
      opp.skills.some(skill => selectedSkills.includes(skill));
    
    const matchesSearch = searchQuery === '' || 
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.causeTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMode = modeFilter === 'All' || opp.type === modeFilter;

    return matchesSkills && matchesSearch && matchesMode;
  });

  return (
    <div className="space-y-8" id="volunteer-section">
      <div className="glass-panel p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold font-heading text-primary">
              Find Your Match
            </h3>
            <p className="text-sm text-text-muted mt-1">
              Select your skills or search keywords to view matching active tasks.
            </p>
          </div>
          
          {/* Skill Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {allSkills.map(skill => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${getSkillColorClass(skill, isSelected)}`}
                >
                  {skill}
                </button>
              );
            })}
            {selectedSkills.length > 0 && (
              <button 
                onClick={() => setSelectedSkills([])}
                className="text-xs text-brand-orange hover:underline px-2 cursor-pointer font-mono font-semibold"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Search & Mode Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="sm:col-span-8 relative">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search roles or campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-primary placeholder-text-muted focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all font-sans"
            />
          </div>
          
          <div className="sm:col-span-4 flex bg-slate-100 rounded-xl p-1 border border-slate-200">
            {(['All', 'Remote', 'On-site'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setModeFilter(mode)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer text-center ${
                  modeFilter === mode
                    ? 'bg-white text-brand-orange shadow-sm'
                    : 'text-text-muted hover:text-primary'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Results */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredOpportunities.map(opp => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key={opp.id}
              className="bg-white border border-slate-100 shadow-sm p-6 rounded-2xl flex flex-col justify-between hover:border-brand-orange/45 hover:shadow-md transition-all duration-300 relative group"
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                    opp.type === 'Remote' 
                      ? 'bg-sky-50 text-sky-700 border border-sky-100' 
                      : 'bg-amber-50 text-amber-700 border border-amber-100'
                  }`}>
                    {opp.type}
                  </span>
                  
                  <span className="text-xs text-brand-orange font-mono flex items-center gap-1 font-bold">
                    <Compass className="w-3.5 h-3.5" />
                    {opp.spotsLeft} {opp.spotsLeft === 1 ? 'spot' : 'spots'} left
                  </span>
                </div>

                <h4 className="text-lg font-bold font-heading text-primary group-hover:text-brand-orange transition-colors">
                  {opp.title}
                </h4>
                <p className="text-xs text-text-muted mt-1 font-medium">
                  Campaign: {opp.causeTitle}
                </p>

                <p className="text-sm text-text-muted mt-3 leading-relaxed">
                  {opp.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {opp.skills.map(skill => (
                    <span 
                      key={skill} 
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        selectedSkills.includes(skill)
                          ? 'bg-brand-orange text-white border-brand-orange shadow-sm'
                          : getSkillTagClass(skill)
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-text-muted" />
                    {opp.commitment}
                  </span>

                  <button
                    onClick={() => setApplyingOpportunity(opp)}
                    className="px-4 py-2 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors flex items-center gap-1 shadow-sm"
                  >
                    Apply Now &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredOpportunities.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white border border-slate-200 rounded-2xl shadow-sm">
            <Compass className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h5 className="text-base font-bold font-heading text-primary">
              No matching tasks found
            </h5>
            <p className="text-sm text-text-muted mt-1 max-w-md mx-auto px-4">
              Try removing some skill filters or changing search terms to view other ways to support.
            </p>
            <button
              onClick={() => { setSelectedSkills([]); setSearchQuery(''); setModeFilter('All'); }}
              className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-brand-orange font-bold rounded-xl text-xs cursor-pointer transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </motion.div>

      {/* Application Slide-over/Modal */}
      <AnimatePresence>
        {applyingOpportunity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setApplyingOpportunity(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-filter backdrop-blur-sm"
            />
            
            {/* Modal Body */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 max-w-md w-full rounded-3xl overflow-hidden shadow-2xl relative z-10"
            >
              <button 
                onClick={() => setApplyingOpportunity(null)}
                className="absolute right-4 top-4 p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6">
                {!formSubmitted ? (
                  <>
                    <span className="text-xs font-mono text-brand-orange tracking-widest uppercase block mb-1">
                      // JOIN CAMPAIGN
                    </span>
                    <h4 className="text-xl font-bold font-heading text-primary">
                      {applyingOpportunity.title}
                    </h4>
                    <p className="text-xs text-text-muted mt-1">
                      Campaign: {applyingOpportunity.causeTitle}
                    </p>

                    <form onSubmit={handleApplySubmit} className="space-y-4 mt-6">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Jane Doe"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm text-primary placeholder-slate-400 focus:outline-none focus:border-brand-orange transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="jane.doe@example.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm text-primary placeholder-slate-400 focus:outline-none focus:border-brand-orange transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Why do you want to help?
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          placeholder="Tell us a little bit about your interest..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm text-primary placeholder-slate-400 focus:outline-none focus:border-brand-orange transition-all resize-none"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-sm cursor-pointer transition-colors shadow-md flex items-center justify-center gap-1.5"
                        >
                          <UserCheck className="w-4.5 h-4.5" />
                          Submit Application
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="py-8 text-center flex flex-col items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-3 bg-amber-50 rounded-full border border-amber-100 mb-4"
                    >
                      <CheckCircle2 className="w-12 h-12 text-brand-orange" />
                    </motion.div>
                    <h4 className="text-lg font-bold font-heading text-primary">
                      Application Submitted!
                    </h4>
                    <p className="text-sm text-text-muted mt-2 max-w-xs mx-auto">
                      Thank you, {formData.name}. Our campaign coordinators will verify your application and reply within 24 hours.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
