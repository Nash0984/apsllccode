import { BookOpen } from 'lucide-react';

export function Research() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-sm font-bold uppercase tracking-[0.4em] text-slate-400 mb-6">Research & Insights</h1>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-3xl">
            Insights to improve service delivery and policy fidelity.
          </h2>
        </div>
      </section>

      {/* Research Content */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-xl text-slate-600 leading-relaxed mb-12">
                Our methodology is rooted in rigorous data analysis and historical context. We publish frameworks that bridge the gap between legislative intent and administrative reality.
              </p>
                {/* Research Documents List */}
                <div className="space-y-6" role="list" aria-label="Research documents and frameworks">
                  {[
                    "Rules as Code (RaC) Implementation Frameworks",
                    "SNAP Payment Error Rate Mitigation Strategies",
                    "VITA Infrastructure Integration Models"
                  ].map((doc, i) => (
                    <div 
                      key={i} 
                      role="listitem"
                      tabIndex={0}
                      aria-label={`Read document: ${doc}`}
                      className="flex items-center gap-4 p-6 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-jade/5 flex items-center justify-center text-brand-jade group-hover:bg-brand-jade group-hover:text-white transition-all" aria-hidden="true">
                        <BookOpen size={20} strokeWidth={1.5} />
                      </div>
                      <span className="font-bold text-slate-900 text-lg">{doc}</span>
                    </div>
                  ))}
                </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-slate-50 border border-slate-100 rounded-[3rem] p-12 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="h-2 w-24 bg-brand-jade/20 rounded-full" />
                  <div className="h-2 w-48 bg-slate-200 rounded-full" />
                  <div className="h-2 w-32 bg-slate-200 rounded-full" />
                </div>
                <div className="flex justify-end">
                  <div className="w-32 h-32 border-2 border-brand-jade/10 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 border border-brand-jade/20 rounded-full animate-ping" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-full bg-slate-100 rounded-full" />
                  <div className="h-2 w-2/3 bg-slate-100 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
