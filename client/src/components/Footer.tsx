import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-primary text-3xl">
                <i className="ri-restaurant-2-fill"></i>
              </div>
              <h2 className="text-xl font-bold font-poppins text-white">LocalFoodie</h2>
            </div>
            <p className="text-neutral-400 mb-4">
              Connecting food lovers with local culinary gems since 2023.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary transition-all">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition-all">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition-all">
                <i className="ri-instagram-fill text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition-all">
                <i className="ri-youtube-fill text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold font-poppins mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-neutral-400 hover:text-primary transition-all">Home</Link></li>
              <li><Link href="/explore" className="text-neutral-400 hover:text-primary transition-all">Explore</Link></li>
              <li><Link href="/how-it-works" className="text-neutral-400 hover:text-primary transition-all">How It Works</Link></li>
              <li><Link href="/restaurants" className="text-neutral-400 hover:text-primary transition-all">Popular Restaurants</Link></li>
              <li><Link href="/join" className="text-neutral-400 hover:text-primary transition-all">Join As Restaurant</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold font-poppins mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-neutral-400 hover:text-primary transition-all">Help Center</Link></li>
              <li><Link href="/faq" className="text-neutral-400 hover:text-primary transition-all">FAQ</Link></li>
              <li><Link href="/contact" className="text-neutral-400 hover:text-primary transition-all">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-neutral-400 hover:text-primary transition-all">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-neutral-400 hover:text-primary transition-all">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold font-poppins mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <i className="ri-map-pin-fill text-primary mt-1"></i>
                <span className="text-neutral-400">123 Main Street, Foodville, CA 92345</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="ri-phone-fill text-primary"></i>
                <span className="text-neutral-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="ri-mail-fill text-primary"></i>
                <span className="text-neutral-400">hello@localfoodie.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-neutral-500 text-sm">
          <p>© 2023 LocalFoodie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
