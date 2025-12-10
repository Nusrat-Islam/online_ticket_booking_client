// FlightDeals.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { FaPlane } from 'react-icons/fa';

const flightDeals = [
  { id: 1, airline: 'Biman Bangladesh', route: 'Dhaka → Chittagong', price: 120, discount: 15, type: 'Direct', image: 'https://images.pexels.com/photos/1157255/pexels-photo-1157255.jpeg' },
  { id: 2, airline: 'US-Bangla', route: 'Dhaka → Sylhet', price: 100, discount: 10, type: 'Direct', image: 'https://i.pinimg.com/736x/d2/1d/34/d21d3443daab53691bbfc02f61164e05.jpg' },
  { id: 3, airline: 'Novoair', route: 'Dhaka → Cox’s Bazar', price: 140, discount: 20, type: 'Direct', image: 'https://images.pexels.com/photos/585004/pexels-photo-585004.jpeg' },
  { id: 4, airline: 'Biman Bangladesh', route: 'Dhaka → Rajshahi', price: 110, discount: 12, type: 'Connecting', image: 'https://i.pinimg.com/1200x/a3/27/87/a327878568d7b3a0c0a6fb30c14523c1.jpg' },
  { id: 5, airline: 'US-Bangla', route: 'Dhaka → Khulna', price: 130, discount: 18, type: 'Direct', image: 'https://i.pinimg.com/736x/da/2e/43/da2e43409f50d02f3540702981e774be.jpg' },
  { id: 6, airline: 'Novoair', route: 'Dhaka → Barishal', price: 115, discount: 15, type: 'Direct', image: 'https://i.pinimg.com/736x/ce/d6/62/ced662f30a06e2d08a42f68407abdd7e.jpg' },
  { id: 7, airline: 'Biman Bangladesh', route: 'Dhaka → Rangpur', price: 125, discount: 10, type: 'Direct', image: 'https://i.pinimg.com/1200x/ff/52/68/ff5268f1b28d5c889b5b1335ac07935c.jpg' },
  { id: 8, airline: 'US-Bangla', route: 'Dhaka → Comilla', price: 105, discount: 8, type: 'Connecting', image: 'https://i.pinimg.com/736x/2a/b0/bb/2ab0bbab204bc375ef927a703d8d285d.jpg' },
];

const FlightDeals = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 primary-font bg-gradient-to-r from-[#1581BF] to-[#00B7B5] bg-clip-text text-transparent">
          Top Flight Deals
        </h2>
        <p className="text-lg md:text-xl text-black mb-12 drop-shadow-md">
          Grab the best offers for your next journey — fly smart, save more!
        </p>

        {/* Swiper Cards */}
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {flightDeals.map((flight) => (
            <SwiperSlide key={flight.id} className="w-80">
              <div className="relative rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 overflow-hidden">
                {/* Card BG Image + Transparent Overlay */}
                <div
                  className="bg-white/20 backdrop-blur-md h-full flex flex-col justify-end rounded-2xl"
                  style={{
                    backgroundImage: `url(${flight.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Text Overlay */}
                  <div className="p-6 text-center text-white drop-shadow-lg">
                    <div className="flex items-center justify-center text-blue-600 text-5xl mb-3 animate-bounce">
                    
                    </div>
                    <h3 className="text-xl font-bold">{flight.route}</h3>
                    <p className="text-sm font-medium">{flight.airline} | {flight.type}</p>
                    <p className="text-green-700 font-semibold text-xl">${flight.price}</p>
                    <p className="text-red-600 text-sm font-bold">-{flight.discount}% Off</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FlightDeals;



