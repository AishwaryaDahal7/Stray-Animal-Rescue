import { Heart, Mail } from "lucide-react";
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Stray Animal Rescue Connect</h3>
            <p className="text-neutral-400 text-sm">
              Protecting and rescuing stray animals through community action and collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-neutral-400 hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/report" className="text-neutral-400 hover:text-primary-400 transition-colors">Report Emergency</Link></li>
              <li><Link to="/rescue-centers" className="text-neutral-400 hover:text-primary-400 transition-colors">Find Centers</Link></li>
              <li><Link to="/about" className="text-neutral-400 hover:text-primary-400 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>Email: info@strayrescue.com</li>
              <li>Emergency: 24/7 Hotline</li>
              <li>Website Feedback</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <Heart className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <Heart className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <Heart className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
            <p>&copy; {currentYear} Stray Animal Rescue Connect. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
