import { motion } from 'motion/react';
import { Mail, Linkedin, MapPin, MessageSquare, ArrowRight, Bot } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { ChatWidget } from '../components/ChatWidget';

export function Contact() {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      <Helmet>
        <title>Contact | Applied Policy Systems</title>
        <meta name="description" content="Get in touch with Applied Policy Systems for strategic consulting on platform architecture and public sector modernization." />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-wide">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="label-uppercase">Consultation</h1>
              <h2 className="mb-10">
                Start the conversation.
              </h2>
              <p className="text-2xl leading-relaxed">
                Whether you're a government agency looking to modernize or a technology vendor seeking policy alignment, our architectural experts are ready to consult.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Chat Interface */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                  <Bot className="text-brand-jade" />
                  Consult with our AI Assistant
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Our specialized consulting assistant can help triage your needs and provide immediate architectural insights.
                </p>
              </div>
              <ChatWidget embedded={true} />
            </motion.div>

            {/* Direct Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-12"
            >
              <div>
                <h3 className="label-muted mb-8">Direct Channels</h3>
                <div className="grid gap-6">
                  <a 
                    href="mailto:graham.oneill@gmail.com" 
                    className="group card-base card-hover flex items-center gap-6"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-brand-jade/10 flex items-center justify-center text-brand-jade group-hover:bg-brand-jade group-hover:text-white transition-all">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">graham.oneill@gmail.com</p>
                    </div>
                  </a>

                  <a 
                    href="https://www.linkedin.com/company/applied-policy-systems" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group card-base card-hover flex items-center gap-6"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-brand-jade/10 flex items-center justify-center text-brand-jade group-hover:bg-brand-jade group-hover:text-white transition-all">
                      <Linkedin size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">LinkedIn</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">Applied Policy Systems</p>
                    </div>
                  </a>

                  <div className="card-base flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-brand-jade/10 flex items-center justify-center text-brand-jade">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Location</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">Washington, D.C. Metro Area</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 bg-brand-jade rounded-card text-white shadow-2xl shadow-brand-jade/20">
                <h4 className="text-2xl font-bold mb-4">Ready for a deep dive?</h4>
                <p className="opacity-90 mb-8 leading-relaxed">
                  Our team is available for formal architectural reviews, statutory mapping workshops, and modernization strategy sessions.
                </p>
                <button className="w-full py-4 bg-white text-brand-jade font-bold rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                  Schedule a Session
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
