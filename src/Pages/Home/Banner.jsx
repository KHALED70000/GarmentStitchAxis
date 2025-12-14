import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ExportImg2 from "../../assets/ExportImg2.jpg"
import ExportImg3 from "../../assets/ExportImg3.webp"
import ExportImg4 from "../../assets/ExportImg4.jpeg"
import ExportImg5 from "../../assets/ExportImg5.jpg"
import ExportImg6 from "../../assets/ExportImg6.webp"
import ExportImg7 from "../../assets/ExportImg7.jpg"
import ExportImg8 from "../../assets/ExportImg8.jpg"
import ExportImg9 from "../../assets/ExportImg9.webp"
import ExportImg10 from "../../assets/ExportImg10.jpg"
import ExportImg11 from "../../assets/ExportImg11.jpg"
import ExportImg12 from "../../assets/ExportImg12.jpg"
import ExportImg13 from "../../assets/ExportImg13.jpg"




import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}  // 🔥 Autoplay MUST be here
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        slidesPerView={1}
        spaceBetween={0}
        className="w-full h-[250px] md:h-[450px] lg:h-[550px]"
      >
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
            <img className="h-full w-full" src={ExportImg13} alt="" />
            <div className="flex absolute flex-col justify-center items-center gap-4 p-10 m-4">

              <h2 className="text-4xl font-bold text-center">
                Where Style Meets Comfort.
              </h2>
              <button className="btn w-10 py-1 px-4 btn-donate text-black font-bold text-[20px] rounded-[10px]">Book Now</button>

            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
            <img className="h-full w-full" src={ExportImg2} alt="" />
            <div className="flex absolute flex-col justify-center items-center gap-4 p-10 m-4">

              <h2 className="text-4xl font-bold text-center">
                Your Dream, Our Display.
              </h2>
              <button className="btn w-10 py-1 px-4 btn-donate text-black font-bold text-[20px] rounded-[10px]">Book Now</button>

            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
            <img className="h-full w-full" src={ExportImg3} alt="" />
            <div className="flex absolute flex-col justify-center items-center gap-4 p-10 m-4">

              <h2 className="text-4xl font-bold text-center">
                Step In, Stand Out.
              </h2>
              <button className="btn w-10 py-1 px-4 btn-donate text-black font-bold text-[20px] rounded-[10px]">Book Now</button>

            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
            <img className="h-full w-full" src={ExportImg4} alt="" />
            <div className="flex absolute flex-col justify-center items-center gap-4 p-10 m-4">

              <h2 className="text-4xl font-bold text-center">
                Quality That Speaks for Itself.
              </h2>
              <button className="btn w-10 py-1 px-4 btn-donate text-black font-bold text-[20px] rounded-[10px]">Book Now</button>

            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
            <img className="h-full w-full" src={ExportImg5} alt="" />
            <div className="flex absolute flex-col justify-center items-center gap-4 p-10 m-4">

              <h2 className="text-4xl font-bold text-center">
                Experience Elegance Every Step.
              </h2>
              <button className="btn w-10 py-1 px-4 btn-donate text-black font-bold text-[20px] rounded-[10px]">Book Now</button>

            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
            <img className="h-full w-full" src={ExportImg6} alt="" />
            <div className="flex absolute flex-col justify-center items-center gap-4 p-10 m-4">

              <h2 className="text-4xl font-bold text-center">
                Showroom of Smiles & Style.
              </h2>
              <button className="btn w-10 py-1 px-4 btn-donate text-black font-bold text-[20px] rounded-[10px]">Book Now</button>

            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
            <img className="h-full w-full" src={ExportImg7} alt="" />
            <div className="flex absolute flex-col justify-center items-center gap-4 p-10 m-4">

              <h2 className="text-4xl font-bold text-center">
                See It. Feel It. Own It.
              </h2>
              <button className="btn w-10 py-1 px-4 btn-donate text-black font-bold text-[20px] rounded-[10px]">Book Now</button>

            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
            <img className="h-full w-full" src={ExportImg8} alt="" />
            <div className="flex absolute flex-col justify-center items-center gap-4 p-10 m-4">

              <h2 className="text-4xl font-bold text-center">
                Turning Spaces into Statements..
              </h2>
              <button className="btn w-10 py-1 px-4 btn-donate text-black font-bold text-[20px] rounded-[10px]">Book Now</button>

            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
            <img className="h-full w-full" src={ExportImg9} alt="" />
            <div className="flex absolute flex-col justify-center items-center gap-4 p-10 m-4">

              <h2 className="text-4xl font-bold text-center">
                Where Every Piece Tells a Story.
              </h2>
              <button className="btn w-10 py-1 px-4 btn-donate text-black font-bold text-[20px] rounded-[10px]">Book Now</button>

            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
            <img className="h-full w-full" src={ExportImg10} alt="" />
            <div className="flex absolute flex-col justify-center items-center gap-4 p-10 m-4">

              <h2 className="text-4xl font-bold text-center">
                Your Style, Our Showcase.
              </h2>
              <button className="btn w-10 py-1 px-4 btn-donate text-black font-bold text-[20px] rounded-[10px]">Book Now</button>

            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
            <img className="h-full w-full" src={ExportImg11} alt="" />
            <div className="flex absolute flex-col justify-center items-center gap-4 p-10 m-4">

              <h2 className="text-4xl font-bold text-center">
                Experience Elegance Every Step.
              </h2>
              <button className="btn w-10 py-1 px-4 btn-donate text-black font-bold text-[20px] rounded-[10px]">Book Now</button>

            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
            <img className="h-full w-full" src={ExportImg12} alt="" />
            <div className="flex absolute flex-col justify-center items-center gap-4 p-10 m-4">

              <h2 className="text-4xl font-bold text-center">
                Where Style Meets Comfort.
              </h2>
              <button className="btn w-10 py-1 px-4 btn-donate text-black font-bold text-[20px] rounded-[10px]">Book Now</button>

            </div>
          </div>
        </SwiperSlide>



      </Swiper>
    </div>
  );
};

export default Banner;
