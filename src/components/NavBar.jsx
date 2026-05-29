import { Link } from 'react-router-dom'
import { Heart, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-primary-600 font-bold text-xl hover:text-primary-700 transition-colors">
            <Heart className="w-6 h-6" />
            <span>Stray Animal Rescue</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">
              Home
            </Link>
            <Link to="/report" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">
              Report Emergency
            </Link>
            <Link to="/rescue-centers" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">
              Find Centers
            </Link>
            <Link to="/about" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium">
              Contact
            </Link>
            <Link to="/dashboard" className="btn-secondary text-sm">
              Rescue Teams
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-neutral-200">
            <div className="flex flex-col gap-3 mt-4">
              <Link
                to="/"
                className="text-neutral-700 hover:text-primary-600 transition-colors font-medium px-3 py-2"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/report"
                className="text-neutral-700 hover:text-primary-600 transition-colors font-medium px-3 py-2"
                onClick={toggleMenu}
              >
                Report Emergency
              </Link>
              <Link
                to="/rescue-centers"
                className="text-neutral-700 hover:text-primary-600 transition-colors font-medium px-3 py-2"
                onClick={toggleMenu}
              >
                Find Centers
              </Link>
              <Link
                to="/about"
                className="text-neutral-700 hover:text-primary-600 transition-colors font-medium px-3 py-2"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-neutral-700 hover:text-primary-600 transition-colors font-medium px-3 py-2"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Link
                to="/dashboard"
                className="btn-secondary text-sm px-3 py-2"
                onClick={toggleMenu}
              >
                Rescue Teams
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
