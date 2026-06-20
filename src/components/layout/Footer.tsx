import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold tracking-tighter">GLAMOURA</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Elevating personal style with curated luxury fashion. 
              Discover the latest trends and timeless classics.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/products?category=new" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="/products?category=women" className="hover:text-white transition-colors">Women's Collection</Link></li>
              <li><Link href="/products?category=men" className="hover:text-white transition-colors">Men's Collection</Link></li>
              <li><Link href="/products?category=accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/shipping-returns" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border border-gray-700 text-white px-4 py-2 w-full focus:outline-none focus:border-white transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-white text-black px-6 py-2 font-medium hover:bg-gray-200 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Glamoura Fashion. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
