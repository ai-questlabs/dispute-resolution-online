
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand-blue text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-xl font-bold text-white">TaxLitigation</span>
              <span className="text-xl font-bold text-brand-gold">Online</span>
            </Link>
            <p className="text-sm opacity-80 mb-4">
              Expert tax litigation services connecting you with consultants who can help resolve your tax disputes.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-gold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services/income-tax" className="hover:text-brand-gold">Income Tax Disputes</Link></li>
              <li><Link to="/services/gst" className="hover:text-brand-gold">GST Litigation</Link></li>
              <li><Link to="/services/corporate-tax" className="hover:text-brand-gold">Corporate Tax Issues</Link></li>
              <li><Link to="/services/international-tax" className="hover:text-brand-gold">International Taxation</Link></li>
              <li><Link to="/services/tax-appeals" className="hover:text-brand-gold">Tax Appeals</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-gold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-brand-gold">About Us</Link></li>
              <li><Link to="/consultants" className="hover:text-brand-gold">Our Consultants</Link></li>
              <li><Link to="/contact" className="hover:text-brand-gold">Contact Us</Link></li>
              <li><Link to="/careers" className="hover:text-brand-gold">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-brand-gold">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-gold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="hover:text-brand-gold">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-gold">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="hover:text-brand-gold">Cookie Policy</Link></li>
              <li><Link to="/disclaimer" className="hover:text-brand-gold">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-70">
            &copy; {new Date().getFullYear()} TaxLitigationOnline. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-white hover:text-brand-gold" aria-label="LinkedIn">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#" className="text-white hover:text-brand-gold" aria-label="Twitter">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="text-white hover:text-brand-gold" aria-label="Facebook">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
