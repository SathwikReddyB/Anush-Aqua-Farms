import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { faqs } from '@/data/mockData';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export function Contact() {
  const { settings } = useSiteSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 text-slate-900 py-20 relative overflow-hidden">
        {/* Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60" />
        </div>

        <div className="container-main text-center relative z-10">
          <h1 className="heading-1 mb-6 text-slate-900">Get in Touch</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Have questions about our water delivery service? We're here to help you stay hydrated.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-main max-w-6xl">
          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Phone,
                title: 'Call Us',
                value: settings.contact_phone || '+91 98765 43210',
                description: 'Mon-Sat, 7 AM - 9 PM',
                action: `tel:${settings.contact_phone}`,
                color: 'bg-blue-100 text-[#0078D4]'
              },
              {
                icon: MessageCircle,
                title: 'WhatsApp',
                value: settings.contact_phone || '+91 98765 43210',
                description: 'Quick responses',
                action: `https://wa.me/${settings.contact_phone?.replace(/[^0-9]/g, '')}`,
                color: 'bg-green-100 text-green-600'
              },
              {
                icon: Mail,
                title: 'Email Us',
                value: settings.contact_email || 'sales@anushaqua.com',
                description: 'For bulk orders & partnerships',
                action: `mailto:${settings.contact_email}`,
                color: 'bg-amber-100 text-amber-600'
              }
            ].map((method) => (
              <a
                key={method.title}
                href={method.action}
                className="card bg-white p-6 text-center hover:shadow-lg transition-shadow group"
              >
                <div className={`w-14 h-14 ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110`}>
                  <method.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{method.title}</h3>
                <p className="text-lg font-medium text-[#0078D4] mb-1">{method.value}</p>
                <p className="text-sm text-slate-500">{method.description}</p>
              </a>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="card bg-white p-8 shadow-sm border border-slate-100">
                <h2 className="font-semibold text-slate-900 mb-6 flex items-center gap-2 text-xl">
                  <Send className="w-5 h-5 text-[#0078D4]" />
                  Send us a Message
                </h2>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Message Sent!</h3>
                    <p className="text-slate-500">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="input focus:ring-[#0078D4]"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="input focus:ring-[#0078D4]"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input focus:ring-[#0078D4]"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="input focus:ring-[#0078D4]"
                      >
                        <option value="">Select a subject</option>
                        <option value="order">Order Inquiry</option>
                        <option value="delivery">Delivery Issue</option>
                        <option value="quality">Quality Concern</option>
                        <option value="bulk">Bulk Order</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="input resize-none focus:ring-[#0078D4]"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-[#0078D4] hover:bg-[#0063B1] text-white py-4 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Office Location */}
              <div className="card bg-white p-6 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#0078D4]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Office Location</h3>
                    <p className="text-sm text-slate-500">Visit our facility</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-2 pl-13">
                  {settings.address_street || 'No. 45, Aqua Industrial Park'}<br />
                  {settings.address_city || 'New Delhi'} - {settings.address_pincode || '110001'}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500 mt-4 pt-4 border-t border-slate-50">
                  <Clock className="w-4 h-4 text-[#0078D4]" />
                  <span>Mon-Sat, 8 AM - 6 PM</span>
                </div>
              </div>

              {/* FAQs */}
              <div className="card bg-white p-6 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Freq. Asked Questions</h3>
                </div>
                <div className="space-y-3">
                  {faqs.slice(0, 4).map((faq, index) => (
                    <div key={index} className="border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full text-left flex items-start justify-between gap-2 group"
                      >
                        <span className="text-sm font-medium text-slate-700 group-hover:text-[#0078D4] transition-colors">{faq.question}</span>
                        <span className="text-[#0078D4] text-lg leading-none font-bold">
                          {expandedFaq === index ? '−' : '+'}
                        </span>
                      </button>
                      {expandedFaq === index && (
                        <p className="text-sm text-slate-500 mt-2 animate-fade-in pl-1">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
