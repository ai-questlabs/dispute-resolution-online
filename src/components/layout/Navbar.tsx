
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getDashboardLink = (role?: UserRole) => {
    switch (role) {
      case 'admin':
        return '/admin/dashboard';
      case 'consultant':
        return '/consultant/dashboard';
      case 'customer':
        return '/customer/dashboard';
      default:
        return '/';
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-brand-blue">TaxLitigation</span>
              <span className="text-xl font-bold text-brand-gold">Online</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/services" className="text-brand-gray hover:text-brand-blue px-3 py-2 rounded-md text-sm font-medium">
              Services
            </Link>
            <Link to="/about" className="text-brand-gray hover:text-brand-blue px-3 py-2 rounded-md text-sm font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-brand-gray hover:text-brand-blue px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to={getDashboardLink(user?.role)}
                  className="text-brand-blue hover:text-brand-lightblue px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Button 
                  variant="outline" 
                  onClick={logout}
                  className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-brand-gold text-white hover:bg-brand-blue">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-gray hover:text-brand-blue focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/services" 
              className="text-brand-gray hover:text-brand-blue block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/about" 
              className="text-brand-gray hover:text-brand-blue block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="text-brand-gray hover:text-brand-blue block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to={getDashboardLink(user?.role)}
                  className="text-brand-blue hover:text-brand-lightblue block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => { logout(); setIsMenuOpen(false); }}
                  className="w-full mt-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block w-full mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button 
                    variant="outline" 
                    className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                  >
                    Login
                  </Button>
                </Link>
                <Link 
                  to="/register" 
                  className="block w-full mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button 
                    className="w-full bg-brand-gold text-white hover:bg-brand-blue"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
