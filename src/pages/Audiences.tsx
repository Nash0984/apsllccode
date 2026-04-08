import { Building2, LayoutGrid, Users } from 'lucide-react';

export function Audiences() {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-sm font-bold uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 mb-6">Target Audiences</h1>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight max-w-3xl">
            Who we work with to create systemic impact.
          </h2>
        </div>
      </section>

      {/* Audiences Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "State & Municipal Agencies",
                desc: "Protecting agency budgets from federal audit penalties and providing executive policy formulation.",
                icon: <Building2 size={24} strokeWidth={1.5} />
              },
              {
                title: "GovTech Vendors",
                desc: "Supplying the exact logical parameters to build compliant and auditable software.",
                icon: <LayoutGrid size={24} strokeWidth={1.5} />
              },
              {
                title: "Community Coalitions",
                desc: "Designing service delivery models that eliminate documentation barriers and renewal churn for vulnerable populations.",
                icon: <Users size={24} strokeWidth={1.5} />
              }
            ].map((item, i) => (
              <div key={i} className="p-12 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] bg-white dark:bg-slate-900 hover:shadow-2xl hover:border-brand-jade/20 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-brand-jade mb-8 border border-slate-100 dark:border-slate-700">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">{item.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Advisory Section */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-800 p-12 md:p-20 rounded-[4rem] border border-slate-200 dark:border-slate-700 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-jade/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            
            <div className="relative grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 mb-6">Trusted Advisory</h2>
                <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight leading-tight">Advising the Architects of Digital Infrastructure.</h3>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
                  Our expertise is sought at the highest levels of federal oversight, ensuring that the next generation of civic technology is built on a foundation of accuracy and equity.
                </p>
                <div className="flex items-center gap-6 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex items-center justify-center text-brand-jade font-bold text-xs text-center p-2">
                    ETAAC Member
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Official Recommendations to the IRS</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Drafting digital tax infrastructure standards for the Commissioner.</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 flex flex-col justify-center items-center text-center">
                  <div className="text-3xl font-bold text-brand-jade mb-2">IRS</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">Advisory</div>
                </div>
                <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 flex flex-col justify-center items-center text-center">
                  <div className="text-3xl font-bold text-brand-jade mb-2">FNS</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">Grantee</div>
                </div>
                <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 flex flex-col justify-center items-center text-center">
                  <div className="text-3xl font-bold text-brand-jade mb-2">DHS</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">Directorate</div>
                </div>
                <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 flex flex-col justify-center items-center text-center">
                  <div className="text-3xl font-bold text-brand-jade mb-2">VITA</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">Integration</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
