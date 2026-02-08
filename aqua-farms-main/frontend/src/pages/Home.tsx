import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Check,
  Truck,
  Shield,
  Star,
  ArrowRight,
  MapPin,
  Play,
  Leaf,
  Recycle,
  ShoppingCart,
  Factory,
  Users,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products, testimonials, coverageAreas, purificationSteps } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import Logo from '@/components/Logo';
import { useSiteSettings } from '@/hooks/useSiteSettings';

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const { settings } = useSiteSettings();
  const heroRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<{ available: boolean; area?: string } | null>(null);



  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.from('.hero-content', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15
      });

      // Scroll animations
      gsap.utils.toArray<HTMLElement>('.scroll-reveal').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const checkPincode = () => {
    if (pincode.length === 6) {
      // Mock pincode check
      const areas = coverageAreas.flatMap(a => a.pincodes);
      const isAvailable = areas.includes(pincode);
      const area = coverageAreas.find(a => a.pincodes.includes(pincode));
      setPincodeResult({
        available: isAvailable || Math.random() > 0.3,
        area: area?.name || 'Your Area'
      });
    }
  };

  const featuredProducts = products.slice(0, 4);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full min-h-[calc(100vh-5rem)] h-auto py-12 lg:py-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden flex items-center">
        {/* Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="hero-content space-y-6 lg:space-y-8 z-10">
              <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-blue-100 rounded-full px-4 py-2">
                <Logo size={24} />
                <span className="text-sm font-medium text-slate-600">Trusted by 25,000+ Customers</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-slate-900">
                Pure Water,<br />
                <span className="text-[#0078D4]">Delivered Fresh</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-lg leading-relaxed">
                From our state-of-the-art purification plant to your doorstep.
                Experience the difference of truly clean water.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg" className="bg-[#0078D4] text-white hover:bg-[#0063B1] rounded-full px-8 h-12 text-base shadow-lg shadow-blue-500/20 transition-all hover:scale-105">
                    Order Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="ghost" className="text-slate-600 hover:text-[#0078D4] hover:bg-blue-50 rounded-full px-8 h-12 text-base transition-all">
                    <Play className="w-5 h-5 mr-2" />
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">10-Step Purified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">Same Day Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="hero-content relative mt-4 md:mt-0 flex justify-center md:block">
              <div className="relative z-10 transform md:translate-x-0 lg:translate-x-0 xl:translate-x-0">
                <img
                  src="/images/hero-bottle.png"
                  alt="Anush Aqua Water Bottle"
                  className="w-72 sm:w-80 md:w-80 lg:w-96 xl:w-full xl:max-w-md mx-auto drop-shadow-2xl"
                />

                {/* Floating Cards - Optimized for visibility */}
                <div className="absolute top-4 -left-2 sm:top-10 sm:-left-4 md:top-12 md:left-4 lg:top-20 lg:left-8 xl:top-24 xl:left-0 bg-white/90 backdrop-blur-md rounded-2xl p-2 sm:p-2.5 lg:p-3 shadow-xl border border-white/50 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-[#0078D4]" />
                    </div>
                    <div>
                      <p className="text-[10px] lg:text-xs text-slate-500">Quality</p>
                      <p className="text-xs sm:text-sm lg:text-base font-bold text-slate-900">Guaranteed</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-16 -right-2 sm:bottom-20 sm:-right-4 md:bottom-20 md:right-4 lg:bottom-28 lg:right-8 xl:bottom-36 xl:right-0 bg-white/90 backdrop-blur-md rounded-2xl p-2 sm:p-2.5 lg:p-3 shadow-xl border border-white/50 animate-bounce" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-[10px] lg:text-xs text-slate-500">Rating</p>
                      <p className="text-xs sm:text-sm lg:text-base font-bold text-slate-900">4.9/5.0</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blob behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-200/40 to-cyan-100/40 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Our Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto scroll-reveal">
            <span className="text-[#0078D4] font-bold tracking-widest text-sm uppercase mb-3 block">Our Impact</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Spreading the Promise of <span className="text-[#0078D4]">Goodness</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              A symbol of trust, purity, and reliability, {settings.site_name || 'Anush Aqua'} has been a household name in India for decades.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {/* Card 1 */}
            <div className="scroll-reveal bg-white rounded-[2rem] p-6 sm:p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-300 border border-gray-50">
              <div className="w-16 h-16 bg-[#0078D4] rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-blue-500/20">
                <Factory className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-2">150+</h3>
              <p className="text-slate-900 font-bold mb-3">Operational Plants</p>
              <div className="w-12 h-1 bg-blue-100 mx-auto mb-3 rounded-full"></div>
              <p className="text-sm text-slate-500 leading-relaxed">Across India & neighboring countries</p>
            </div>

            {/* Card 2 */}
            <div className="scroll-reveal bg-white rounded-[2rem] p-6 sm:p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-300 border border-gray-50">
              <div className="w-16 h-16 bg-[#0078D4] rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-blue-500/20">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-2">6K+</h3>
              <p className="text-slate-900 font-bold mb-3">Distributors</p>
              <div className="w-12 h-1 bg-blue-100 mx-auto mb-3 rounded-full"></div>
              <p className="text-sm text-slate-500 leading-relaxed">Strong distribution network</p>
            </div>

            {/* Card 3 */}
            <div className="scroll-reveal bg-white rounded-[2rem] p-6 sm:p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-300 border border-gray-50">
              <div className="w-16 h-16 bg-[#0078D4] rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-blue-500/20">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-2">9K+</h3>
              <p className="text-slate-900 font-bold mb-3">Delivery Trucks</p>
              <div className="w-12 h-1 bg-blue-100 mx-auto mb-3 rounded-full"></div>
              <p className="text-sm text-slate-500 leading-relaxed">Ensuring timely delivery</p>
            </div>

            {/* Card 4 */}
            <div className="scroll-reveal bg-white rounded-[2rem] p-6 sm:p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-300 border border-gray-50">
              <div className="w-16 h-16 bg-[#0078D4] rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-blue-500/20">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-2">50+</h3>
              <p className="text-slate-900 font-bold mb-3">Years of Trust</p>
              <div className="w-12 h-1 bg-blue-100 mx-auto mb-3 rounded-full"></div>
              <p className="text-sm text-slate-500 leading-relaxed">Serving purity since 1975</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8 px-1">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Our Products</h2>
              <p className="text-slate-500 mt-2">Hydration solutions for every need</p>
            </div>
            <p className="text-slate-400 text-sm hidden sm:block">Showing {featuredProducts.length} products</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-amber-400 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Image */}
                <div className="aspect-square mb-2 flex items-center justify-center p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {product.tags?.slice(0, 2).map((tag) => (
                    <span key={tag} className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2.5 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Content */}
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-slate-900 leading-tight">{product.name}</h3>
                  <p className="text-sm text-slate-400 font-medium">{product.volume}</p>
                </div>

                <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed h-8">
                  {product.description}
                </p>

                {/* Footer */}
                <div className="flex items-end justify-between mt-3 pt-3 border-t border-slate-50">
                  <div>
                    <span className="text-lg font-bold text-[#0078D4]">₹{product.price}</span>
                    <span className="text-xs text-slate-400 font-medium ml-1">/{product.unit}</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addToCart(product, product.minOrder)}
                    className="bg-[#0078D4] hover:bg-[#0063B1] text-white rounded-full px-4 h-8 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform flex items-center gap-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-semibold">Add</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button variant="outline" className="rounded-full px-8 py-6 border-slate-200 text-slate-600 hover:border-[#0078D4] hover:text-[#0078D4] transition-all">
                View All {products.length} Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 10-Step Purification Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal text-center mb-12">
            <Badge className="bg-blue-100 text-[#0078D4] mb-4">Our Process</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B]">10-Step Purification</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Every drop of {settings.site_name || 'Anush Aqua'} water goes through a rigorous 10-step purification process.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {purificationSteps.map((step) => (
              <div
                key={step.step}
                className="scroll-reveal bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 text-center hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-[#0078D4] text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-3">
                  {step.step}
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">{step.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where We Deliver - Minimal Section */}
      {/* Where We Deliver Section */}
      {/* Where We Deliver Section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              {/* Left Content */}
              <div className="p-6 md:p-8 lg:p-10 space-y-6">
                <div>
                  <span className="text-[#0078D4] font-bold tracking-wide text-xs uppercase bg-blue-50 px-3 py-1 rounded-full">Coverage</span>
                  <h2 className="text-2xl md:text-3xl font-bold mt-4 text-slate-900">Where We Deliver</h2>
                  <p className="text-slate-600 mt-2 text-sm leading-relaxed">
                    We currently serve Delhi NCR. Enter pincode to check availability.
                  </p>
                </div>

                <div className="flex gap-2 w-full max-w-sm">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter pincode"
                    className="flex-1 min-w-0 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0078D4]/20 focus:border-[#0078D4] transition-all"
                  />
                  <Button
                    onClick={checkPincode}
                    className="bg-[#0078D4] text-white hover:bg-[#0063B1] px-6 rounded-lg font-medium shadow-md shadow-blue-500/20 shrink-0"
                  >
                    Check
                  </Button>
                </div>

                {pincodeResult && (
                  <div className={`p-3 rounded-lg text-sm font-medium ${pincodeResult.available ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                    {pincodeResult.available ? '✓ Available in your area!' : '✗ Not available yet'}
                  </div>
                )}

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0078D4]" />
                    <span>Central Delhi</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0078D4]" />
                    <span>North Delhi</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0078D4]" />
                    <span>South Delhi</span>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative h-64 md:h-full min-h-[300px] bg-gradient-to-br from-blue-50 to-slate-50">
                <img
                  src="/images/delivery-partner.png"
                  alt="Delivery Partner"
                  className="absolute inset-0 w-full h-full object-cover object-top mix-blend-normal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent" />

                {/* Compact Floating Badge */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-white/50 flex items-center gap-3">
                  <div className="bg-green-100 p-1.5 rounded-md">
                    <Truck className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Delivery</p>
                    <p className="text-xs font-bold text-slate-900">Same Day Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B]">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="scroll-reveal bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Sustainability Content */}
            <div className="scroll-reveal">
              <Badge className="bg-green-100 text-green-700 mb-4">Sustainability</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B] mb-4">
                Committed to a Greener Future
              </h2>
              <p className="text-gray-600 mb-6">
                At {settings.site_name || 'Anush Aqua'}, we believe in responsible water management. Our returnable bottles
                and recycling programs help reduce plastic waste.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <Recycle className="w-8 h-8 text-green-600 mb-2" />
                  <p className="font-semibold text-gray-900">Returnable Cans</p>
                  <p className="text-sm text-gray-500">20L & 25L dispenser cans</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <Leaf className="w-8 h-8 text-blue-600 mb-2" />
                  <p className="font-semibold text-gray-900">Eco-Friendly</p>
                  <p className="text-sm text-gray-500">BPA-free bottles</p>
                </div>
              </div>
            </div>

            <div className="scroll-reveal">
              <img
                src="/images/sustainability.jpg"
                alt="Sustainability"
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">
            Ready for Pure Water?
          </h2>
          <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
            Experience the difference of premium quality water. Order now and get FREE delivery on orders above ₹500.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products">
              <Button size="lg" className="bg-[#0078D4] text-white hover:bg-[#0063B1] rounded-full px-8 h-12 shadow-lg shadow-blue-500/20 transition-all hover:scale-105">
                Order Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-[#0078D4] rounded-full px-8 h-12">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import { Badge } from '@/components/ui/badge';
