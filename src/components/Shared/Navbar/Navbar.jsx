import Container from '../Container';
import { AiOutlineMenu } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import logo from '../../../../public/download__16_-removebg-preview.png';
import { useNavigate } from "react-router";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const activePath = location.pathname;
  const navigate = useNavigate();

  // theme toggle
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const html = document.querySelector('html')
    html.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const handleChange = (checked) => {
    setTheme(checked ? "night" : "light")
  }

  // Active link + underline helper
  const linkClass = (path) =>
    `relative pb-1 font-semibold transition-all duration-200
     hover:text-[#1581BF] 
     ${activePath === path ? "text-[#1581BF]" : "text-gray-700"}
     after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#1581BF] 
     after:rounded-full after:transition-all after:duration-300
     ${activePath === path ? "after:w-full" : "after:w-0"} 
     hover:after:w-full`;

  return (
    <div className="fixed w-full bg-white/90 backdrop-blur z-50 shadow-lg shadow-blue-100">
      <div className="py-3">
        <Container>
          <div className="flex items-center justify-between">

            {/* Logo Left */}
            <Link to="/" className="flex flex-col items-center gap-2">
              <img src={logo} alt="logo" className="drop-shadow-md w-18 h-18 md:w-28 md:h-28" />
              <div className="flex items-center gap-1 -ml-3">
                <p className="primary-font -mt-8 text-lg md:text-xl font-bold md:-mt-15 bg-gradient-to-r from-[#1581BF] to-[#00B7B5] bg-clip-text text-transparent">
                  Ticket Bari
                </p>
              </div>
            </Link>

            {/* Center Menu (Desktop) */}
            <div className="hidden md:flex items-center gap-10 mx-auto">
              <Link to="/" className={linkClass("/")}>Home</Link>
              <Link to="/all-tickets" className={linkClass("/all-tickets")}>All Tickets</Link>
              
              <span onClick={() => user ? navigate("/dashboard") : navigate("/login")} className={linkClass("/dashboard") + " cursor-pointer"}>Dashboard</span>
            </div>

            {/* Right Side & Responsive Controls */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle (Desktop & Mobile) */}
              <input
                onChange={(e) => handleChange(e.target.checked)}
                type='checkbox'
                defaultChecked={localStorage.getItem('theme') === "night"}
                className='toggle toggle-info sm:toggle-md toggle-sm'
              />

              {/* Login/Signup Buttons (Original Design - Hidden on Mobile) */}
              {!user && (
                <div className="hidden md:flex items-center gap-3">
                  <Link to={"/login"} className="btn">
                    <div className="wrapper">
                      <div className="flower flower1"><div className="petal"></div><div className="petal two"></div></div>
                      <div className="flower flower2"><div className="petal"></div><div className="petal three"></div></div>
                      <div className="flower flower3"><div className="petal"></div><div className="petal four"></div></div>
                      <div className="flower flower4"><div className="petal"></div><div className="petal two"></div></div>
                      <div className="flower flower5"><div className="petal"></div><div className="petal three"></div></div>
                      <div className="flower flower6"><div className="petal"></div><div className="petal four"></div></div>
                      <span className="text">Login</span>
                    </div>
                  </Link>
                  <Link to={"/signup"} className="btn">
                    <div className="wrapper">
                      <div className="flower flower1"><div className="petal"></div><div className="petal two"></div></div>
                      <div className="flower flower2"><div className="petal"></div><div className="petal three"></div></div>
                      <div className="flower flower3"><div className="petal"></div><div className="petal four"></div></div>
                      <div className="flower flower4"><div className="petal"></div><div className="petal two"></div></div>
                      <div className="flower flower5"><div className="petal"></div><div className="petal three"></div></div>
                      <div className="flower flower6"><div className="petal"></div><div className="petal four"></div></div>
                      <span className="text">Signup</span>
                    </div>
                  </Link>
                </div>
              )}

              {/* User Avatar + Name (Visible when logged in - Both Mobile & Desktop) */}
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
                    <span className="font-semibold text-gray-700 text-sm md:text-base">
                      {user.displayName || "User"}
                    </span>
                  </div>

                  {/* Desktop Dropdown (Hidden on Mobile, handled by Hamburger) */}
                  {isOpen && !window.innerWidth < 768 && (
                    <div className="hidden md:block absolute right-0 top-full mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden z-50 border">
                      <Link to="/dashboard/profile" className="block px-4 py-2 hover:bg-gray-100 transition">My Profile</Link>
                      <div onClick={logOut} className="block px-4 py-2 hover:bg-gray-100 transition cursor-pointer text-red-500">Logout</div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Hamburger Icon */}
              <div className="md:hidden relative">
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 border border-gray-300 rounded-full cursor-pointer hover:shadow-md flex items-center transition"
                >
                  <AiOutlineMenu className="text-[#1581BF]" size={20} />
                </div>

                {/* Mobile Dropdown Menu (Shob Link ekhane) */}
                {isOpen && (
                  <div className="absolute right-0 top-12 bg-white rounded-xl shadow-2xl w-[65vw] overflow-hidden flex flex-col text-sm font-semibold border z-[60]">
                    <Link to="/" onClick={() => setIsOpen(false)} className="px-4 py-3 hover:bg-gray-100 border-b">Home</Link>
                    <Link to="/all-tickets" onClick={() => setIsOpen(false)} className="px-4 py-3 hover:bg-gray-100 border-b">All Tickets</Link>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="px-4 py-3 hover:bg-gray-100 border-b">Dashboard</Link>
                    
                    {user ? (
                      <>
                        <Link to="/dashboard/profile" onClick={() => setIsOpen(false)} className="px-4 py-3 hover:bg-gray-100 border-b">My Profile</Link>
                        <div onClick={() => { logOut(); setIsOpen(false); }} className="px-4 py-3 hover:bg-gray-100 transition cursor-pointer text-red-500 font-bold">Logout</div>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setIsOpen(false)} className="px-4 py-3 hover:bg-gray-100 border-b">Login</Link>
                        <Link to="/signup" onClick={() => setIsOpen(false)} className="px-4 py-3 hover:bg-gray-100">Register</Link>
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