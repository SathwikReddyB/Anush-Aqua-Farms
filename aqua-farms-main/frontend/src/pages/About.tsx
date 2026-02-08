import { useSiteSettings } from '@/hooks/useSiteSettings';
import {
  Shield,
  Award,
  Users,
  Truck,
  Heart,
  CheckCircle,
  Beaker,
  Leaf
} from 'lucide-react';
import { companyStats } from '@/data/mockData';

export function About() {
  const { settings } = useSiteSettings();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 text-slate-900 py-20 relative overflow-hidden">
        {/* Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60" />
        </div>
        <div className="container-main text-center relative z-10">
          <h1 className="heading-1 mb-6 text-slate-900">About {settings.site_name || 'Anush Aqua Farms'}</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {settings.about_subtitle || `Bringing pure, safe drinking water to every home and office in ${settings.address_city || 'Delhi NCR'} since 2009.`}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-24">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-teal-600 font-medium mb-2">Our Mission</p>
              <h2 className="heading-3 text-slate-900 mb-6">
                Clean Water Isn't a Luxury, It's a Standard
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {settings.about_mission || `At ${settings.site_name || 'Anush Aqua Farms'}, we believe that every person deserves access to pure, safe drinking water. Our mission is to deliver the highest quality mineral water to homes, offices, and institutions.`}
              </p>
              <p className="text-slate-600 leading-relaxed">
                {settings.about_vision || 'With state-of-the-art purification technology and rigorous quality control, we maintain the highest standards in water safety and taste.'}
              </p>
            </div>
            <div className="relative">
              <img
                src="/images/purification-plant.jpg"
                alt="Our Water Purification Plant"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center">
                    <Award className="w-7 h-7 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-teal-600">15+</p>
                    <p className="text-sm text-slate-500">Years of Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: companyStats.dailyDeliveries.toLocaleString(), label: 'Daily Deliveries', suffix: '+' },
              { value: companyStats.happyCustomers.toLocaleString(), label: 'Happy Customers', suffix: '+' },
              { value: companyStats.yearsInBusiness.toString(), label: 'Years of Trust', suffix: '' },
              { value: companyStats.qualityScore.toString(), label: 'Quality Score', suffix: '%' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl lg:text-5xl font-bold text-teal-600 mb-2">
                  {stat.value}{stat.suffix}
                </p>
                <p className="text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-teal-600 font-medium mb-2">Why Choose Us</p>
            <h2 className="heading-3 text-slate-900">The Anush Aqua Difference</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Beaker,
                title: '10-Step Purification',
                description: 'Advanced RO, UV, and ozonation technology ensures 99.9% pure water.'
              },
              {
                icon: Shield,
                title: 'Quality Certified',
                description: 'ISO 22000, BIS, and FSSAI certified for complete peace of mind.'
              },
              {
                icon: Truck,
                title: 'Timely Delivery',
                description: 'Same-day delivery with real-time tracking for your convenience.'
              },
              {
                icon: Users,
                title: 'Expert Team',
                description: 'Trained professionals handling every step from purification to delivery.'
              },
              {
                icon: Heart,
                title: 'Customer First',
                description: '24/7 customer support and easy returns for complete satisfaction.'
              },
              {
                icon: Leaf,
                title: 'Eco-Friendly',
                description: 'Sustainable practices and recyclable packaging for a greener future.'
              }
            ].map((feature, index) => (
              <div key={index} className="card bg-white p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-teal-600 font-medium mb-2">Certifications</p>
            <h2 className="heading-3 text-slate-900">Trusted & Certified</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'ISO 22000', desc: 'Food Safety Management' },
              { name: 'BIS Certified', desc: 'Bureau of Indian Standards' },
              { name: 'FSSAI', desc: 'Food Safety License' },
              { name: 'WHO Guidelines', desc: 'Drinking Water Quality' }
            ].map((cert, index) => (
              <div key={index} className="text-center p-6 bg-slate-50 rounded-2xl">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="font-semibold text-slate-900">{cert.name}</p>
                <p className="text-sm text-slate-500">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#0078D4] font-medium mb-2">Sustainability</p>
              <h2 className="heading-3 mb-6 text-slate-900">Committed to a Greener Future</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                We're dedicated to reducing our environmental footprint through sustainable practices,
                recyclable packaging, and responsible water sourcing.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                  <p className="text-3xl font-bold mb-1 text-green-700">{companyStats.plasticSaved.toLocaleString()}+</p>
                  <p className="text-green-600 text-sm">Kg Plastic Saved</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                  <p className="text-3xl font-bold mb-1 text-blue-700">{(companyStats.waterPurified / 1000000).toFixed(1)}M+</p>
                  <p className="text-blue-600 text-sm">Litres Purified</p>
                </div>
              </div>
            </div>
            <div>
              <img
                src="/images/sustainability.jpg"
                alt="Sustainability"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-teal-600 font-medium mb-2">Our Team</p>
            <h2 className="heading-3 text-slate-900">Meet the People Behind Anush Aqua</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(function () {
              let team = [];
              try {
                team = settings.about_team ? JSON.parse(settings.about_team) : [];
              } catch (e) {
                team = [];
              }
              return team.map((member: any, index: number) => (
                <div key={index} className="text-center group">
                  <div className="w-48 h-48 mx-auto mb-6 relative overflow-hidden rounded-full shadow-md border-4 border-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl bg-gray-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`;
                      }}
                    />
                  </div>
                  <h3 className="font-bold text-slate-900 text-xl mb-1">{member.name}</h3>
                  <p className="text-[#0078D4] font-medium">{member.role}</p>
                </div>
              ));
            })()}
          </div>
        </div>
      </section>
    </main>
  );
}
