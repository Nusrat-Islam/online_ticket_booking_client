import { Link } from "react-router";
import logo from "../../../../public/download__16_-removebg-preview.png";
import { FaAmazonPay, FaCcMastercard, FaCcStripe } from "react-icons/fa";
import { BsPaypal } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#b5d7e8] to-[#33adea] text-gray-800 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-18 font-semibold">

        {/* Column 1 – Logo + Short Description */}
        <div>
          <Link to="/" className="flex flex-col items-center ">
            <img src={logo} alt="logo" className="w-30 h-30" />
            <p className="-mt-10 primary-font text-2xl font-bold bg-gradient-to-r from-[#1581BF] to-[#00B7B5] bg-clip-text text-transparent">
              Ticket Bari
            </p>
          </Link>

          <p className="mt-3 text-sm font-medium leading-6 text-gray-700">
            Book bus, train, launch & flight tickets easily with a fast,
            secure and user-friendly platform.
          </p>
        </div>

  
         {/* Column 2 – Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-[#1c1f1c]">Quick Links</h3>
          <ul className="space-y-2 text-sm font-semibold">
            <li><Link to="/" className="hover:text-[#1581BF] duration-200">Home</Link></li>
            <li><Link to="/all-tickets" className="hover:text-[#1581BF] duration-200">All Tickets</Link></li>
            <li><Link to="/contact" className="hover:text-[#1581BF] duration-200">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-[#1581BF] duration-200">About</Link></li>
          </ul>
        </div>

        {/* Column 3 – Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-[#1c1f1c]">Contact Info</h3>
          <ul className="space-y-2 text-sm font-semibold">
            <li>Email: support@ticketbari.com</li>
            <li>Phone: +880 1700-000000</li>
            <li>
              <a href="#" className="hover:text-[#1581BF] duration-200">Facebook Page</a>
            </li>
          </ul>
        </div>

        {/* Column 4 – Payment Methods */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-[#1c1f1c]">Payment Methods</h3>
          <div className="flex items-center gap-3 mt-2">
           <p><FaCcStripe size={30}/></p>
           <p><BsPaypal size={30}/></p>
           <p><FaCcMastercard size={30}/></p>
           <p><FaAmazonPay size={30}/></p>
          </div>
        </div>
     </div>

   

      {/* Bottom Bar */}
      <div className="border-t bg-white/40 backdrop-blur py-4 text-center text-sm font-semibold text-gray-700">
        © 2025 TicketBari. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

