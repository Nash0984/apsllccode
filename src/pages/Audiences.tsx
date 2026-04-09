import { Building2, LayoutGrid, Users } from 'lucide-react';

export function Audiences() {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Header - Compact */}
      <section className="hero-section">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="label-uppercase">Target Audiences</h1>
            <h2>
              Creating systemic impact across sectors.
            </h2>
          </div>
        </div>
      </section>

      {/* Audiences Grid - Compact */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "State & Municipal Agencies",
                desc: "Protecting agency budgets from federal audit penalties through executive policy formulation and rigorous modernization strategy.",
                icon: <Building2 size={24} strokeWidth={1.5} />
              },
              {
                title: "GovTech Vendors",
                desc: "Supplying the exact logical parameters and 'Rules-as-Code' blueprints required to build compliant, auditable public sector software.",
                icon: <LayoutGrid size={24} strokeWidth={1.5} />
              },
              {
                title: "Community Coalitions",
                desc: "Designing service delivery models that eliminate documentation barriers and renewal churn for vulnerable populations.",
                icon: <Users size={24} strokeWidth={1.5} />
              }
            ].map((item, i) => (
              <div key={i} className="card-base card-hover">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-brand-jade mb-8 border border-slate-100 dark:border-slate-700">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-6 tracking-tight">{item.title}</h4>
                <p className="leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Advisory Section */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="container-wide">
          <div className="bg-white dark:bg-slate-800 p-12 md:p-20 rounded-[4rem] border border-slate-200 dark:border-slate-700 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-jade/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            
            <div className="relative grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="label-muted">Trusted Advisory</h2>
                <h3 className="mb-8 tracking-tight leading-tight">Advising the Architects of Digital Infrastructure.</h3>
                <p className="text-xl leading-relaxed mb-10">
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
