import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, MapPin, Phone, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import Logo from './Logo';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const getNavLinks = (role?: string) => [
  { label: 'Home', href: role === 'admin' ? '/admin' : '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

import { useAuth } from '@/contexts/AuthContext';

import { useSiteSettings } from '@/hooks/useSiteSettings';

export function Navigation() {
  const { settings } = useSiteSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSearchDialog(false);
      setSearchQuery('');
    }
  };
  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#0078D4] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{settings.address_city || 'Delhi NCR'}</span>
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{settings.contact_phone || '+91 98765 43210'}</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">FREE Delivery on orders above ₹500</span>
            <span className="sm:hidden">FREE Delivery ₹500+</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-[999] transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-white'
          }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to={user?.role === 'admin' ? "/admin" : "/"} className="flex items-center gap-3 group">
              <Logo size={45} />
              <div className="hidden sm:block">
                <span className="font-bold text-lg text-[#1E293B] leading-tight">{settings.site_name || 'Anush Aqua'}</span>
                <span className="block text-xs text-[#64748B]">Farms</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {getNavLinks(user?.role).map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-[#0078D4] ${location.pathname === link.href
                    ? 'text-[#0078D4]'
                    : 'text-[#475569]'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search */}
              <button
                onClick={() => setShowSearchDialog(true)}
                className="p-2 text-[#475569] hover:text-[#0078D4] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Account */}
              {user ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 transition-colors">
                    <img
                      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="hidden sm:block text-sm font-medium text-[#475569]">{user.name.split(' ')[0]}</span>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="p-3 border-b">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    {user.role === 'admin' && (
                      <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                        <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
                      </Link>
                    )}
                    <Link to="/account" className="block px-4 py-2 text-sm hover:bg-gray-50">My Account</Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-50">My Orders</Link>
                    <button
                      onClick={() => { logout(); navigate('/login'); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="p-2 text-[#475569] hover:text-[#0078D4] transition-colors"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}

              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-[#475569] hover:text-[#0078D4] transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#0078D4] text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <button className="p-2 text-[#475569]">
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] bg-white">
                  <div className="flex flex-col gap-4 mt-8">
                    {user && (
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <img
                          src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                          alt={user.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    )}
                    {getNavLinks(user?.role).map((link) => (
                      <Link
                        key={link.label}
                        to={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg font-medium text-[#1E293B] hover:text-[#0078D4] py-2"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <hr className="border-gray-200" />
                    {user ? (
                      <>
                        {user.role === 'admin' && (
                          <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium py-2 flex items-center gap-2">
                            <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
                          </Link>
                        )}
                        <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium py-2">My Account</Link>
                        <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium py-2">My Orders</Link>
                        <button onClick={() => { logout(); setIsMobileMenuOpen(false); navigate('/login'); }} className="text-lg font-medium text-red-600 py-2 text-left">Logout</button>
                      </>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => { setIsMobileMenuOpen(false); }}
                        className="text-lg font-medium text-[#0078D4] py-2 text-left"
                      >
                        Login / Sign Up
                      </Link>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>

      {/* Search Dialog */}
      <Dialog open={showSearchDialog} onOpenChange={setShowSearchDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Search Products</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch} className="mt-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for water bottles, cans, jars..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0078D4] focus:ring-2 focus:ring-[#0078D4]/20"
              />
            </div>
            <Button type="submit" className="w-full mt-4 bg-[#0078D4] hover:bg-[#0063B1] text-white rounded-xl py-3">
              Search
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
