import React, { useState, useEffect, useRef } from 'react';
import PublicHeader, { PublicFooter } from '../../components/PublicHeader.jsx';

// Reveal Component for scroll animations
function Reveal({ children, delay = 0, className = '', direction = 'up' }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  let transformClass = 'translate-y-12';
  if (direction === 'left') transformClass = '-translate-x-12';
  if (direction === 'right') transformClass = 'translate-x-12';
  if (direction === 'scale') transformClass = 'scale-95';

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : `opacity-0 ${transformClass}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const Icons = {
  Check: (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"></polyline></svg>
};

export default function Education() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-white font-sans">
      <PublicHeader />

      <main className="overflow-x-hidden">
        {/* ======================================= */}
        {/* SECTION 2: EDUCATION */}
        {/* ======================================= */}
        <section className="w-full bg-brand-950 text-white">
          <div className="flex flex-col-reverse lg:flex-row w-full">
            <div className="hidden lg:block w-full lg:w-1/2 min-h-[500px] relative flex-shrink-0">
              <img src="https://www.lackawanna.edu/wp-content/uploads/2024/08/college-students.webp" alt="Salesian Education" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="w-full lg:w-1/2 p-6 sm:p-10 md:p-16 lg:p-24 flex flex-col justify-center">
              <Reveal direction="left">
                <h2 className="text-[28px] font-extrabold mb-8 text-white">Salesian Education</h2>
                <p className="text-xl text-slate-300 leading-relaxed mb-6">
                  Salesian education originates from the educational experience of Don Bosco, who developed his educational work primarily for young people, especially those facing poverty, abandonment, or social disadvantage.
                </p>
                <p className="text-xl text-slate-300 leading-relaxed mb-10">
                  The aim of Salesian education is <strong className="text-white">integral formation</strong>—supporting the human, social, moral, professional, and spiritual development of young people.
                </p>
                
                <div className="bg-brand-900/50 border border-brand-700/50 rounded-3xl p-6 sm:p-10 text-center shadow-xl backdrop-blur-sm">
                  <h4 className="text-brand-300 font-bold uppercase tracking-widest text-sm mb-4">Educational Vision</h4>
                  <p className="text-4xl font-serif font-medium mb-6">“Good Christians and upright citizens.”</p>
                  <p className="text-white/80 leading-relaxed text-lg">
                    Education should prepare young people not only for employment or academic success, but also for responsible participation in society and the development of their full human potential.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="w-full bg-white py-16 sm:py-20 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-24">
          <Reveal direction="up">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-[28px] font-extrabold text-brand-950 mb-12 text-center">Educational Method & Areas</h3>
              
              <div className="grid lg:grid-cols-2 gap-16 mb-20">
                <div className="space-y-8">
                  <h4 className="text-2xl font-bold text-brand-900">The Preventive System</h4>
                  <p className="text-lg text-slate-600">Instead of relying primarily on punishment or repression, the method developed by Don Bosco seeks to:</p>
                  <ul className="space-y-6">
                    {[
                      "Prevent harmful situations before they occur.",
                      "Build trust between educators and young people.",
                      "Encourage personal responsibility.",
                      "Create a welcoming and family-like environment.",
                      "Maintain an active and friendly presence among young people."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0 mt-1">
                          <Icons.Check className="w-4 h-4 text-brand-600" />
                        </div>
                        <span className="text-lg text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-6 sm:p-8 bg-slate-50 border-l-4 border-slate-300 rounded-r-2xl italic text-base sm:text-lg text-slate-600">
                    "Don Bosco's Oratory remains the permanent model for Salesian educational and pastoral activity: a home that welcomes, a parish that evangelizes, a school that prepares for life, and a playground where friends meet and enjoy themselves."
                  </div>
                </div>
                
                <div>
                  <h4 className="text-2xl font-bold text-brand-900 mb-8">Main Areas of Activity</h4>
                  <div className="space-y-4">
                    {[
                      { area: "School", purpose: "General education and personal development" },
                      { area: "Higher Education", purpose: "Academic, professional, research, and social development" },
                      { area: "Parishes", purpose: "Faith formation, pastoral care, and community building" },
                      { area: "Social Work", purpose: "Protection, rehabilitation, inclusion, and social development" },
                      { area: "Oratories & Youth Centres", purpose: "Informal education, faith formation, recreation, and youth development" },
                      { area: "VTC (Vocational Training Centres)", purpose: "Practical skills and preparation for employment" }
                    ].map((item, i) => (
                      <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="font-extrabold text-brand-900 text-lg w-1/3">{item.area}</div>
                        <div className="text-slate-600 w-2/3">{item.purpose}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Higher Ed Dashboard Cards */}
              <div className="bg-brand-50 rounded-3xl sm:rounded-[40px] p-6 sm:p-10 md:p-16 border border-brand-100">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h3 className="text-[28px] font-extrabold text-brand-950 mb-6">Salesian Higher Education (IUS)</h3>
                  <p className="text-xl text-slate-600">
                    A global network of 97 institutions promoting academic collaboration, research, innovation, and social impact while maintaining its connection with the Salesian mission.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-16">
                  <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm text-center transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="text-3xl sm:text-5xl font-black text-brand-600 mb-1 sm:mb-2">97</div>
                    <div className="text-[10px] sm:text-sm font-bold text-slate-500 uppercase tracking-wider sm:tracking-widest">Institutions</div>
                  </div>
                  <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm text-center transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="text-3xl sm:text-5xl font-black text-brand-600 mb-1 sm:mb-2">21</div>
                    <div className="text-[10px] sm:text-sm font-bold text-slate-500 uppercase tracking-wider sm:tracking-widest">Countries</div>
                  </div>
                  <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm text-center transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="text-3xl sm:text-5xl font-black text-brand-600 mb-1 sm:mb-2">160K</div>
                    <div className="text-[10px] sm:text-sm font-bold text-slate-500 uppercase tracking-wider sm:tracking-widest">Students</div>
                  </div>
                  <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm text-center transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="text-3xl sm:text-5xl font-black text-brand-600 mb-1 sm:mb-2">8.1K</div>
                    <div className="text-[10px] sm:text-sm font-bold text-slate-500 uppercase tracking-wider sm:tracking-widest">Professors</div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-100 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-center shadow-sm text-sm sm:text-base">
                  <span className="font-extrabold text-slate-400 uppercase tracking-widest text-[10px] sm:text-xs w-full sm:w-auto mb-2 sm:mb-0">Core Principles:</span>
                  <span className="text-brand-900 font-bold">Reason</span> <span className="text-brand-400">→</span>
                  <span className="text-brand-900 font-bold">Religion</span> <span className="text-brand-400">→</span>
                  <span className="text-brand-900 font-bold">Loving-Kindness</span> <span className="text-brand-400">→</span>
                  <span className="text-brand-900 font-bold">Integral Formation</span> <span className="text-brand-400">→</span>
                  <span className="text-brand-600 font-black bg-brand-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mt-2 sm:mt-0 w-full sm:w-auto">Good Christians & Upright Citizens</span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

      </main>

      <PublicFooter />
    </div>
  );
}
