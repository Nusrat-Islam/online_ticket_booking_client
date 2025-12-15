import Container from '../Container';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdDirectionsBus } from "react-icons/md";
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


  //theme togggle
  const [theme, setTheme]= useState(localStorage.getItem ("theme") || "light");
  useEffect(() => {
const html = document.querySelector('html')
 html.setAttribute("data-theme", theme)
 localStorage.setItem("theme",theme)
  },[theme])
  const handleChange =(checked)=> {
  setTheme(checked? "night" : "light")  
   
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
              <img src={logo} alt="logo"className="drop-shadow-md w-28 h-28" />
              <div className="flex items-center gap-1 -ml-3">
                
                <p className="primary-font text-xl font-bold -mt-15 bg-gradient-to-r from-[#1581BF] to-[#00B7B5] bg-clip-text text-transparent">
                  Ticket Bari
                </p>
              </div>
            </Link>

          {/* Center Menu */}
<div className="hidden md:flex items-center gap-10 mx-auto">
  <Link to="/" className={linkClass("/")}>Home</Link>

  {/* All Tickets always visible */}
  <span
    onClick={() => {
      if (user) {
        navigate("/all-tickets");
      } else {
        navigate("/login");
      }
    }}
    className={linkClass("/all-tickets") + " cursor-pointer"}
  >
    All Tickets
  </span>

  {/* Dashboard visible only if user logged in */}
  <span
    onClick={() => {
      if (user) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }}
    className={linkClass("/dashboard") + " cursor-pointer"}
  >
    Dashboard
  </span>
</div>

 {/* Right Side: Login/Register or Avatar */}

            <div className="hidden md:flex items-center gap-3">
              <input
              onChange={(e)=>handleChange(e.target.checked)}
              type= 'checkbox'
              defaultChecked={localStorage.getItem('theme') === "dark"}
              className='toggle'
              ></input>
              {!user && (
                <>
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
    
                </>
              )}

        {user && (
  <div className="relative flex items-center gap-2">
    {/* Avatar + Name */}
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center gap-2 cursor-pointer"
    >
      <img
        src={user.photoURL || "/images/default-avatar.png"}
        alt="avatar"
        className="w-9 h-9 rounded-full border"
      />
      <span className="font-semibold text-gray-700">{user.displayName || "User"}</span>
    </div>

    {/* Dropdown */}
    {isOpen && (
      <div className="absolute right-0 top-full mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden z-50">
        <Link
          to="/profile"
          className="block px-4 py-2 hover:bg-gray-100 transition"
        >
          My Profile
        </Link>
        <div
          onClick={logOut}
          className="block px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
        >
          Logout
        </div>
      </div>
    )}
  </div>
)}

            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 border border-gray-300 rounded-full cursor-pointer hover:shadow-md flex gap-3 items-center transition"
              >
                <AiOutlineMenu className="text-[#1581BF]" size={22} />
              </div>

              {isOpen && (
                <div className="absolute right-0 top-12 bg-white rounded-xl shadow-lg w-[60vw] overflow-hidden flex flex-col text-sm font-semibold">
                  <Link to="/" onClick={() => setIsOpen(false)} className="px-4 py-3 hover:bg-gray-100 transition">Home</Link>
                  {user && <Link to="/all-tickets" onClick={() => setIsOpen(false)} className="px-4 py-3 hover:bg-gray-100 transition">All Tickets</Link>}
                  {user && <Link to="/dashboard" onClick={() => setIsOpen(false)} className="px-4 py-3 hover:bg-gray-100 transition">Dashboard</Link>}
                  {user && <Link to="/my-profile" onClick={() => setIsOpen(false)} className="px-4 py-3 hover:bg-gray-100 transition">My Profile</Link>}

                  {!user && <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="px-4 py-3 hover:bg-gray-100 transition">Login</Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)} className="px-4 py-3 hover:bg-gray-100 transition">Register</Link>
                  </>}

                  {user && <div onClick={() => { logOut(); setIsOpen(false); }} className="px-4 py-3 hover:bg-gray-100 transition cursor-pointer">Logout</div>}
                </div>
              )}
            </div>

          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;

