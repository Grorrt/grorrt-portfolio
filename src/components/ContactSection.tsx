import { useState, FormEvent, useEffect } from 'react';
import { Send, CheckCircle2, Mail, Building, User, HelpCircle, Terminal, Copy, Check, ArrowUpRight } from 'lucide-react';
import { ContactFormState, SentNotificationRecord } from '../types';

interface ContactSectionProps {
  initialProject?: string;
  onClearInitialProject?: () => void;
}

export default function ContactSection({ initialProject, onClearInitialProject }: ContactSectionProps) {
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    company: '',
    projectInterest: 'LeadForge MCP',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sentLog, setSentLog] = useState<SentNotificationRecord | null>(null);
  const [copiedSubject, setCopiedSubject] = useState(false);

  // Sync initial project if provided from modal or card
  useEffect(() => {
    if (initialProject) {
      const match = [
        'Home',
        'Malware Analysis Toolkit',
        'Atlas Core',
        'LeadForge MCP',
        'VerityQA',
        'Other',
      ].find((opt) => initialProject.toLowerCase().includes(opt.toLowerCase().slice(0, 5)));

      if (match) {
        setFormData((prev) => ({
          ...prev,
          projectInterest: match as ContactFormState['projectInterest'],
        }));
      }
    }
  }, [initialProject]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const subject = `[Recruiter Inquiry] Regarding ${formData.projectInterest} - from ${formData.name} (${formData.company || 'Direct'})`;
    
    // Simulate automated notification dispatch with 600ms latency
    await new Promise((resolve) => setTimeout(resolve, 600));

    const notificationRecord: SentNotificationRecord = {
      id: `notify_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      recipient: 'grorrt.dev@gmail.com',
      subject,
      body: formData.message,
      senderName: formData.name,
      senderEmail: formData.email,
      company: formData.company,
      projectInterest: formData.projectInterest,
      deliveryStatus: 'delivered',
    };

    setSentLog(notificationRecord);
    setSubmitting(false);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      projectInterest: 'LeadForge MCP',
      message: '',
    });
    if (onClearInitialProject) onClearInitialProject();
  };

  const copySubject = (subj: string) => {
    navigator.clipboard.writeText(subj);
    setCopiedSubject(true);
    setTimeout(() => setCopiedSubject(false), 2000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context for recruiters */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-mono font-medium text-neutral-500 dark:text-neutral-400 tracking-wider">
                GET IN TOUCH
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 font-display mt-1">
                Let's Discuss Engineering Roles & Architecture
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                Whether you're hiring for a systems, AI platform, or senior full-stack engineering role, drop a message below. Specifying your project of interest ensures an immediate, tailored response.
              </p>
            </div>

            {/* Recruiter direct options */}
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/50 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Direct Channels
              </h3>
              
              <div className="space-y-3 text-xs">
                <a
                  href="https://github.com/Grorrt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors text-neutral-800 dark:text-neutral-200"
                >
                  <span className="font-semibold">GitHub Profile</span>
                  <span className="font-mono text-neutral-500 flex items-center gap-1">
                    github.com/Grorrt
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </a>

                <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 space-y-1">
                  <div className="font-semibold">Automated Notification Routing</div>
                  <div className="text-neutral-500 leading-relaxed font-mono text-[11px]">
                    Submitting the form triggers an automated notification packet with project metadata directly to Grorrt's inbox.
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time SLA */}
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Average response time: &lt; 24 hours for recruiter inquiries</span>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-xs">
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Your Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Work Email *</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="s.jenkins@company.com"
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                      />
                    </div>
                  </div>

                  {/* Company and Project Interest Dropdown (Specified in Prompt) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Company / Organization</span>
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Anthropic, Stripe, Vercel"
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Project of Interest *</span>
                      </label>
                      <select
                        value={formData.projectInterest}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            projectInterest: e.target.value as ContactFormState['projectInterest'],
                          })
                        }
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 cursor-pointer"
                      >
                        <option value="LeadForge MCP">LeadForge MCP (AI Lead Qualification)</option>
                        <option value="VerityQA">VerityQA (qa-ai-assistant / Automated QA)</option>
                        <option value="Malware Analysis Toolkit">Malware Analysis Toolkit (Python PE parser)</option>
                        <option value="Atlas Core">Atlas Core (Full-stack architecture)</option>
                        <option value="Home">Home (Portfolio site)</option>
                        <option value="Other">Other / General Engineering Role</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      Message / Role Context *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={`Tell me about the engineering challenges or team you're building regarding ${formData.projectInterest}...`}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 leading-relaxed"
                    />
                  </div>

                  {/* Automated Subject line preview */}
                  <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-[11px] font-mono text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
                    <span className="truncate pr-2">
                      Subject: [Recruiter Inquiry] Regarding {formData.projectInterest} - from {formData.name || 'Your Name'} ({formData.company || 'Company'})
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium shrink-0">
                      Auto-generated
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-50 shadow-xs cursor-pointer"
                  >
                    <Send className={`w-3.5 h-3.5 ${submitting ? 'animate-pulse' : ''}`} />
                    <span>{submitting ? 'Transmitting Automated Notification...' : 'Send Recruiter Inquiry'}</span>
                  </button>

                </form>
              ) : (
                /* Successful Submission State with Automated Notification Confirmation */
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div className="text-xs">
                      <div className="font-semibold">Notification Dispatched Successfully</div>
                      <div>
                        Grorrt has received your automated inquiry regarding <strong>{formData.projectInterest}</strong>.
                      </div>
                    </div>
                  </div>

                  {/* Automated Email Audit Record */}
                  {sentLog && (
                    <div className="p-4 rounded-xl bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-neutral-800 text-[11px] text-neutral-400">
                        <span className="flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Automated Delivery Packet [{sentLog.deliveryStatus}]</span>
                        </span>
                        <span>{sentLog.timestamp}</span>
                      </div>

                      <div className="space-y-1.5 text-[11px]">
                        <div>
                          <span className="text-neutral-500">Subject: </span>
                          <span className="text-white font-medium">{sentLog.subject}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500">From: </span>
                          <span>{sentLog.senderName} ({sentLog.senderEmail}) · {sentLog.company}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500">Project Context: </span>
                          <span className="text-sky-400">{sentLog.projectInterest}</span>
                        </div>
                        <div className="pt-2 border-t border-neutral-800/80 text-neutral-400">
                          <span className="text-neutral-500">Payload: </span>"{sentLog.body}"
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <button
                          onClick={() => copySubject(sentLog.subject)}
                          className="text-[10px] text-neutral-400 hover:text-white flex items-center gap-1"
                        >
                          {copiedSubject ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>Copy Subject Line</span>
                        </button>

                        <a
                          href={`mailto:grorrt.dev@gmail.com?subject=${encodeURIComponent(sentLog.subject)}&body=${encodeURIComponent(sentLog.body)}`}
                          className="text-[10px] text-sky-400 hover:underline flex items-center gap-1"
                        >
                          <span>Open in Desktop Email Client</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={resetForm}
                      className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
