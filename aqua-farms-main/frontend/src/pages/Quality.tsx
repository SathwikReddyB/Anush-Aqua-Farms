import { Beaker, CheckCircle, Award, FileCheck, Microscope, Droplets } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const qualityStandards = [
  {
    icon: Beaker,
    title: 'pH Balanced',
    value: '7.0 - 7.5',
    description: 'Optimal pH level for healthy hydration'
  },
  {
    icon: Microscope,
    title: 'TDS Level',
    value: '< 150 ppm',
    description: 'Low total dissolved solids for pure taste'
  },
  {
    icon: Droplets,
    title: 'Chlorine Free',
    value: '0 mg/L',
    description: 'No added chlorine or chemical treatment'
  },
  {
    icon: CheckCircle,
    title: 'Bacteria Free',
    value: '100%',
    description: 'UV treated and microbiologically safe'
  }
];

const certifications = [
  { name: 'ISO 22000', description: 'Food Safety Management' },
  { name: 'BIS Certified', description: 'Bureau of Indian Standards' },
  { name: 'FSSAI', description: 'Food Safety License' },
  { name: 'WHO Guidelines', description: 'Drinking Water Quality' }
];

const processSteps = [
  {
    step: 1,
    title: 'Source Protection',
    description: 'Water sourced from protected natural springs with regular environmental monitoring.'
  },
  {
    step: 2,
    title: 'Multi-Stage Filtration',
    description: 'Advanced filtration removes particles, impurities, and unwanted minerals.'
  },
  {
    step: 3,
    title: 'UV Treatment',
    description: 'Ultraviolet light eliminates harmful bacteria and microorganisms.'
  },
  {
    step: 4,
    title: 'Quality Testing',
    description: 'Every batch is lab-tested for purity, pH, TDS, and microbiological safety.'
  },
  {
    step: 5,
    title: 'Sealed Packaging',
    description: 'Hygienic bottling with tamper-evident seals ensures safety until delivery.'
  }
];

export function Quality() {
  return (
    <main className="min-h-screen bg-[#F4F6FA] pt-24 lg:pt-28">
      <div className="px-6 lg:px-[7vw] pb-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-[#0C8DE8]/10 text-[#0C8DE8] mb-4">Our Standards</Badge>
          <h1 className="text-[clamp(36px,4vw,56px)] font-bold text-[#101827] mb-4">
            Water Quality You Can Trust
          </h1>
          <p className="text-[#6B7280] text-lg">
            Every drop of water from Anush Aqua Farms undergoes rigorous testing and quality control. 
            We believe clean water isn't a luxury—it's a standard.
          </p>
        </div>

        {/* Quality Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {qualityStandards.map((standard) => (
            <div key={standard.title} className="bg-white rounded-2xl p-6 card-shadow text-center">
              <div className="w-14 h-14 rounded-full bg-[#0C8DE8]/10 flex items-center justify-center mx-auto mb-4">
                <standard.icon className="w-6 h-6 text-[#0C8DE8]" />
              </div>
              <p className="text-2xl font-bold text-[#0C8DE8] mb-1">{standard.value}</p>
              <p className="font-medium text-[#101827] mb-1">{standard.title}</p>
              <p className="text-sm text-[#6B7280]">{standard.description}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl p-8 card-shadow mb-16">
          <h2 className="text-xl font-semibold text-[#101827] mb-6 text-center">Our Certifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <div key={cert.name} className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <p className="font-semibold text-[#101827]">{cert.name}</p>
                <p className="text-sm text-[#6B7280]">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-16">
          <h2 className="text-[clamp(28px,3vw,42px)] font-bold text-[#101827] text-center mb-10">
            Our Purification Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="bg-white rounded-2xl p-6 card-shadow h-full">
                  <div className="w-10 h-10 rounded-full bg-[#0C8DE8] text-white flex items-center justify-center font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-[#101827] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#6B7280]">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-[#0C8DE8]" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lab Testing Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl overflow-hidden card-shadow">
            <img
              src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=500&fit=crop"
              alt="Lab testing"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#0C8DE8]/10 flex items-center justify-center">
                  <FileCheck className="w-5 h-5 text-[#0C8DE8]" />
                </div>
                <h3 className="font-semibold text-[#101827]">Daily Lab Testing</h3>
              </div>
              <p className="text-[#6B7280]">
                Our in-house laboratory conducts over 50 tests daily on water samples from every batch. 
                Results are recorded and available upon request for complete transparency.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden card-shadow">
            <img
              src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&h=500&fit=crop"
              alt="Water source"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#0C8DE8]/10 flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-[#0C8DE8]" />
                </div>
                <h3 className="font-semibold text-[#101827]">Protected Source</h3>
              </div>
              <p className="text-[#6B7280]">
                Our water comes from natural springs located in pollution-free zones. 
                The source is protected by a 5-kilometer buffer zone with regular environmental monitoring.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-[#0C8DE8] rounded-2xl p-10 card-shadow">
            <h2 className="text-2xl font-bold text-white mb-4">
              Want to see our test reports?
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              We're transparent about our water quality. Contact us to request the latest lab test reports 
              for your peace of mind.
            </p>
            <a
              href="mailto:quality@anushaqua.com"
              className="inline-flex items-center gap-2 bg-white text-[#0C8DE8] px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              <FileCheck className="w-5 h-5" />
              Request Test Report
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
