// WhyChooseTicketBari.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { FaBus, FaStickyNote } from 'react-icons/fa';
import { IoBookmarks, IoCardOutline } from 'react-icons/io5';
import { MdFlightTakeoff, MdOutlineRateReview } from 'react-icons/md';
import { FcSupport } from 'react-icons/fc';
import { TiVendorAndroid } from 'react-icons/ti';

const reasons = [
  { id: 1, title: 'Easy Booking', description: 'Book bus, train & flight tickets quickly', icon:<IoBookmarks size={40}/> },
  { id: 2, title: 'Multiple Transport', description: 'Choose from bus, train, launch & flights', icon:<FaBus size={40}/>},
  { id: 3, title: 'Flight Deals', description: 'Best offers for air tickets', icon: <MdFlightTakeoff size={50} /> },
  { id: 4, title: 'Secure Payments', description: 'Safe & reliable payment options', icon:<IoCardOutline size={50}/> },
  { id: 5, title: '24/7 Support', description: 'Always here to help you', icon:<FcSupport size={40}/>},
  { id: 6, title: 'Verified Vendors', description: 'Trusted and verified ticket vendors', icon:<TiVendorAndroid size={60}/> },
  { id: 7, title: 'Fast Booking', description: 'Book tickets in seconds', icon:<FaStickyNote size={40}/> },
  { id: 8, title: 'Top Reviews', description: 'Highly rated by travelers',icon:<MdOutlineRateReview size={50}/> },
];

const gradients = [
  'from-purple-500 to-pink-200',
  'from-green-500 to-blue-200',
  'from-yellow-500 to-orange-200',
  'from-indigo-500 to-purple-200',
  'from-pink-500 to-red-200',
  'from-teal-500 to-cyan-200',
  'from-red-500 to-pink-200',
  'from-blue-500 to-indigo-200',
];

const WhyChooseTicketBari = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold  mb-2 bg-gradient-to-r from-[#1581BF] to-[#00B7B5] bg-clip-text text-transparent">Why Choose TicketBari?</h2>
        <p className="text-black text-lg">Discover why millions trust TicketBari for their travel needs</p>
      </div>

      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 1, // super fast for continuous marquee effect
          disableOnInteraction: false,
        }}
        speed={3000} // controls scroll speed
        freeMode={true} // smooth continuous scroll
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Autoplay]}
        className="py-10"
      >
        {reasons.map((reason, index) => (
          <SwiperSlide key={reason.id}>
            <div
              className={`rounded-2xl w-full h-55 shadow-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 bg-gradient-to-r ${gradients[index % gradients.length]} text-white`}
            >
              {/* Image Icon */}
              <div className="w-30 h-30 ">
                <p className="flex justify-center items-center mt-6">{reason.icon}</p>
              </div>
              <h3 className="text-xm md:text-2xl font-bold mb-2">{reason.title}</h3>
              <p className="text-xs md:text-xl">{reason.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default WhyChooseTicketBari;

