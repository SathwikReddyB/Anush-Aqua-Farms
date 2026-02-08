import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import Logo from './Logo';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const productLinks = [
  { label: 'Pocket Bottles', href: '/products?category=pocket' },
  { label: 'Small Bottles', href: '/products?category=small' },
  { label: 'Medium Bottles', href: '/products?category=medium' },
  { label: 'Large Bottles', href: '/products?category=large' },
  { label: 'Water Jars', href: '/products?category=jar' },
  { label: 'Dispenser Cans', href: '/products?category=can' },
  { label: 'Bulk Supply', href: '/products?category=bulk' },
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'My Account', href: '/account' },
  { label: 'My Orders', href: '/orders' },
];

export function Footer() {
  const { settings } = useSiteSettings();

  return (
    <footer className="bg-[#1E293B] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <Logo size={45} />
              <div>
                <span className="font-bold text-lg">{settings.site_name || 'Anush Aqua'}</span>
                <span className="block text-xs text-gray-400">Farms</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Pure water, delivered fresh. From our state-of-the-art purification plant to your doorstep.
            </p>
            <div className="flex gap-3">
              {settings.social_facebook && (
                <a href={settings.social_facebook} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#0078D4] transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings.social_instagram && (
                <a href={settings.social_instagram} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#0078D4] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {settings.social_twitter && (
                <a href={settings.social_twitter} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#0078D4] transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-white mb-4">Products</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#0078D4] mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Call for Delivery</p>
                  <a href={`tel:${settings.contact_phone}`} className="text-sm text-white hover:text-[#0078D4] transition-colors">
                    {settings.contact_phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#0078D4] mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Email Inquiry</p>
                  <a href={`mailto:${settings.contact_email}`} className="text-sm text-white hover:text-[#0078D4] transition-colors">
                    {settings.contact_email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0078D4] mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Office Location</p>
                  <p className="text-sm text-gray-300">
                    {settings.address_street}<br />
                    {settings.address_city} - {settings.address_pincode}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {settings.site_name || 'Anush Aqua Farms'}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/about" className="text-gray-400 text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/about" className="text-gray-400 text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
