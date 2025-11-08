import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-dark-900 text-white mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-base font-medium mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-light-600 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-sm text-light-600 hover:text-white transition-colors"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-sm text-light-600 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/investors"
                  className="text-sm text-light-600 hover:text-white transition-colors"
                >
                  Investors
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-medium mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/men"
                  className="text-sm text-light-600 hover:text-white transition-colors"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  to="/women"
                  className="text-sm text-light-600 hover:text-white transition-colors"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  to="/kids"
                  className="text-sm text-light-600 hover:text-white transition-colors"
                >
                  Kids
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="text-sm text-light-600 hover:text-white transition-colors"
                >
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-medium mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help"
                  className="text-sm text-light-600 hover:text-white transition-colors"
                >
                  Get Help
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="text-sm text-light-600 hover:text-white transition-colors"
                >
                  Order Status
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-sm text-light-600 hover:text-white transition-colors"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-sm text-light-600 hover:text-white transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/payment"
                  className="text-sm text-light-600 hover:text-white transition-colors"
                >
                  Payment Options
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-medium mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:support@nike.com"
                  className="text-sm text-light-600 hover:text-white transition-colors"
                >
                  support@nike.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="text-sm text-light-600 hover:text-white transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="text-sm text-light-600">
                Mon - Fri: 9:00 AM - 6:00 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-light-600">
                © {new Date().getFullYear()} Nike inc, All rights reserved
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link
                to="/guides"
                className="text-sm text-light-600 hover:text-white transition-colors"
              >
                Guides
              </Link>
              <Link
                to="/terms-of-sale"
                className="text-sm text-light-600 hover:text-white transition-colors"
              >
                Terms of Sale
              </Link>
              <Link
                to="/terms-of-use"
                className="text-sm text-light-600 hover:text-white transition-colors"
              >
                Terms of Use
              </Link>
              <Link
                to="/privacy-policy"
                className="text-sm text-light-600 hover:text-white transition-colors"
              >
                Nike Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
