import Container from '../Container';
import { AiOutlineMenu } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import logo from '../../../../public/download__16_-removebg-preview.png';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const activePath = location.pathname;

  // Theme state setup (Default: winter)
const [theme, setTheme] = useState(
  () => localStorage.getItem("theme") === "night" ? "night" : "winter"
);
  

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleChange = (e) => {
    setTheme(e.target.checked ? "night" : "winter");
  };

  // Active link helper
  const linkClass = (path) =>
    `relative pb-1 font-semibold transition-all duration-200
     hover:text-[#1581BF] 
     ${activePath === path ? "text-[#1581BF]" : "text-base-content"}
     after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#1581BF] 
     after:rounded-full after:transition-all after:duration-300
     ${activePath === path ? "after:w-full" : "after:w-0"} 
     hover:after:w-full`;

  return (
    <div className="fixed w-full bg-base-100/90 text-base-content backdrop-blur z-50 shadow-lg">
      <div className="py-2">
        <Container>
          <div className="flex items-center justify-between">

            {/* Logo Left */}
            <Link to="/" className="flex flex-col items-center gap-2">
              <img src={logo} alt="logo" className="drop-shadow-md w-12 h-12 md:w-16 md:h-16" />
              <p className="primary-font text-lg md:text-xl font-bold bg-gradient-to-r from-[#1581BF] to-[#00B7B5] bg-clip-text text-transparent -mt-8">
                Ticket Bari
              </p>
            </Link>

            {/* Center Menu (Desktop) */}
            <div className="hidden md:flex items-center gap-10 mx-auto">
              <Link to="/" className={linkClass("/")}>Home</Link>
              <Link to="/all-tickets" className={linkClass("/all-tickets")}>All Tickets</Link>
              <Link to="/about" className={linkClass("/about")}>About Us</Link>

              {user && (
                <>
                  <Link to="/support" className={linkClass("/support")}>Support</Link>
                  <span 
                    onClick={() => navigate("/dashboard")} 
                    className={linkClass("/dashboard") + " cursor-pointer"}
                  >
                    Dashboard
                  </span>
                </>
              )}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <input
                type="checkbox"
                onChange={handleChange}
                checked={theme === "night"}
                aria-label="Toggle dark mode"
                className="toggle toggle-info toggle-sm sm:toggle-md"
              />

              {/* Login/Signup (Desktop Only) */}
              {!user && (
                <div className="hidden md:flex items-center gap-3">
                  <Link to="/login" className="btn bg-gradient-to-r from-[#1581BF] to-[#00B7B5] text-white">Login</Link>
                  <Link to="/signup" className="btn bg-gradient-to-r from-[#1581BF] to-[#00B7B5] text-white">Signup</Link>
                </div>
              )}

              {/* User Avatar */}
              {user && (
                <div className="relative flex items-center gap-2">
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <img
                      src={user.photoURL || "/images/default-avatar.png"}
                      alt="avatar"
                      className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-[#1581BF]"
                    />
                    <span className="font-semibold text-base-content text-sm md:text-base">
                      {user.displayName || "User"}
                    </span>
                  </div>

                  {isOpen && window.innerWidth >= 768 && (
                    <div className="absolute right-0 top-full mt-2 w-40 bg-base-100 text-base-content shadow-lg rounded-lg overflow-hidden z-50 border ">
                      <Link to="/dashboard/profile" className="block px-4 py-2 hover:bg-gray-100 transition">My Profile</Link>
                      <div onClick={logOut} className="block px-4 py-2 hover:bg-gray-100 transition cursor-pointer text-red-500">Logout</div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Hamburger */}
              <div className="md:hidden relative">
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 border border-gray-300 rounded-full cursor-pointer hover:shadow-md flex items-center transition"
                >
                  <AiOutlineMenu className="text-[#1581BF]" size={20} />
                </div>

                {isOpen && (
                  <div className="absolute right-0 top-12 bg-base-100 text-base-content rounded-xl shadow-2xl w-[65vw] overflow-hidden flex flex-col text-sm font-semibold border border-base-300 z-[60]">
                    <Link to="/" onClick={() => setIsOpen(false)} className="px-4 py-3 hover:bg-base-100 border-b">Home</Link>
                    <Link to="/all-tickets" onClick={() => setIsOpen(false)} className="px-4 py-3 hover:bg-gray-100 border-b">All Tickets</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)} className="px-4 py-3 hover:bg-gray-100 border-b">About Us</Link>

                    {user && (
                      <>
                        <Link to="/support" onClick={() => setIsOpen(false)} className="px-4 py-3 hover:bg-gray-100 border-b">Support</Link>
                        <Link to="/dashboard" onClick={() => setIsOpen(false)} className="px-4 py-3 hover:bg-gray-100 border-b">Dashboard</Link>
                      </>
                    )}

                    {user ? (
                      <>
                        <Link to="/dashboard/profile" onClick={() => setIsOpen(false)} className="px-4 py-3 hover:bg-gray-100 border-b">My Profile</Link>
                        <div onClick={() => { logOut(); setIsOpen(false); }} className="px-4 py-3 hover:bg-gray-100 transition cursor-pointer text-red-500 font-bold">Logout</div>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setIsOpen(false)} className="px-4 py-3 hover:bg-gray-100 border-b">Login</Link>
                        <Link to="/signup" onClick={() => setIsOpen(false)} className="px-4 py-3 hover:bg-gray-100">Signup</Link>
                      </>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;