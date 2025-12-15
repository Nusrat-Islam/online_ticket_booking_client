import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Container from "../Shared/Container";

const Banner = () => {
  return (
   <Container>
     <div className="w-full mt-20">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="rounded-xl overflow-hidden"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative">
            <img
              src="/bus.jpg"
              className="w-full h-[450px] object-cover"
              alt="Flight 1"
            />
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
                Book Your Ticket Easily
              </h1>
              <p className="text-white mt-3 text-lg max-w-xl">
                Fast — Secure — Hassle-free Ticket Booking With Ticket Bari
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative">
            <img
              src="/pexels-137666-747079.jpg"
              className="w-full h-[450px] object-cover"
              alt="Flight 2"
            />
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Fly Anywhere — Anytime
              </h1>
              <p className="text-blue-200 mt-3 text-lg max-w-xl">
                Compare prices from top airlines & get the best deal instantly!
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative">
            <img
              src="/train2.jpg"
              className="w-full h-[450px] object-cover"
              alt="Flight 3"
            />
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Your Journey Starts Here
              </h1>
              <p className="text-blue-200 mt-3 text-lg max-w-xl">
                Trusted online ticket booking platform for smart travelers.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
   </Container>
  );
};

export default Banner;
