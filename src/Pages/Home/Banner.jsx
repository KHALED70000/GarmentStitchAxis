import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ExportImg1 from "../../assets/ExportImg1.jpg"
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
import { IoMdArrowRoundForward } from "react-icons/io";

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
                        <img className="h-full w-full" src={ExportImg2} alt="" />

                        <div className="flex gap-2 absolute">

                            <div>
                                <button className="py-1 px-4 bg-primary text-black font-bold text-[20px] rounded-[10px]">Track Your Parcel</button>
                                <button className="p-2 px-2  text-primary bg-black font-bold text-[20px] rounded-full -rotate-45"><IoMdArrowRoundForward size={25} /></button>
                                <button className="py-1 px-4 text-black font-bold text-[20px] rounded-[10px] bg-transparent border-2 border-black">Be A Rider</button>
                            </div>

                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
                        <img className="h-full w-full" src={ExportImg3} alt="" />
                        <div className="flex gap-2 absolute">

                          <div>
                              <button className="py-1 px-4 bg-primary text-black font-bold text-[20px] rounded-[10px]">Track Your Parcel</button>
                            <button className="p-2 px-2  text-primary bg-black font-bold text-[20px] rounded-full -rotate-45"><IoMdArrowRoundForward size={25} /></button>
                            <button className="py-1 px-4 text-black font-bold text-[20px] rounded-[10px] bg-transparent border-2 border-black">Be A Rider</button>
                          </div>

                        </div>
                    </div>

                </SwiperSlide>

                <SwiperSlide>
                    <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
                        <img className="h-full w-full" src={ExportImg4} alt="" />
                        <div className="flex gap-2 absolute">
                            <div>
                                <button className="py-1 px-4 bg-primary text-black font-bold text-[20px] rounded-[10px]">Track Your Parcel</button>
                            <button className="p-2 px-2  text-primary bg-black font-bold text-[20px] rounded-full -rotate-45"><IoMdArrowRoundForward size={25} /></button>
                            <button className="py-1 px-4 text-black font-bold text-[20px] rounded-[10px] bg-transparent border-2 border-black">Be A Rider</button>
                            </div>
                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
                        <img className="h-full w-full" src={ExportImg5} alt="" />
                        <div className="flex gap-2 absolute">
                            <div>
                                <button className="py-1 px-4 bg-primary text-black font-bold text-[20px] rounded-[10px]">Track Your Parcel</button>
                            <button className="p-2 px-2  text-primary bg-black font-bold text-[20px] rounded-full -rotate-45"><IoMdArrowRoundForward size={25} /></button>
                            <button className="py-1 px-4 text-black font-bold text-[20px] rounded-[10px] bg-transparent border-2 border-black">Be A Rider</button>

                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
                        <img className="h-full w-full" src={ExportImg6} alt="" />
                        <div className="flex gap-2 absolute">
                            <div>
                                <button className="py-1 px-4 bg-primary text-black font-bold text-[20px] rounded-[10px]">Track Your Parcel</button>
                            <button className="p-2 px-2  text-primary bg-black font-bold text-[20px] rounded-full -rotate-45"><IoMdArrowRoundForward size={25} /></button>
                            <button className="py-1 px-4 text-black font-bold text-[20px] rounded-[10px] bg-transparent border-2 border-black">Be A Rider</button>
                            </div>

                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
                        <img className="h-full w-full" src={ExportImg7} alt="" />
                        <div className="flex gap-2 absolute">
                            <button className="py-1 px-4 bg-primary text-black font-bold text-[20px] rounded-[10px]">Track Your Parcel</button>
                            <button className="p-2 px-2  text-primary bg-black font-bold text-[20px] rounded-full -rotate-45"><IoMdArrowRoundForward size={25} /></button>
                            <button className="py-1 px-4 text-black font-bold text-[20px] rounded-[10px] bg-transparent border-2 border-black">Be A Rider</button>

                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
                        <img className="h-full w-full" src={ExportImg8} alt="" />
                        <div className="flex gap-2 absolute">
                            <button className="py-1 px-4 bg-primary text-black font-bold text-[20px] rounded-[10px]">Track Your Parcel</button>
                            <button className="p-2 px-2  text-primary bg-black font-bold text-[20px] rounded-full -rotate-45"><IoMdArrowRoundForward size={25} /></button>
                            <button className="py-1 px-4 text-black font-bold text-[20px] rounded-[10px] bg-transparent border-2 border-black">Be A Rider</button>

                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
                        <img className="h-full w-full" src={ExportImg9} alt="" />
                        <div className="flex gap-2 absolute">
                            <button className="py-1 px-4 bg-primary text-black font-bold text-[20px] rounded-[10px]">Track Your Parcel</button>
                            <button className="p-2 px-2  text-primary bg-black font-bold text-[20px] rounded-full -rotate-45"><IoMdArrowRoundForward size={25} /></button>
                            <button className="py-1 px-4 text-black font-bold text-[20px] rounded-[10px] bg-transparent border-2 border-black">Be A Rider</button>

                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
                        <img className="h-full w-full" src={ExportImg10} alt="" />
                        <div className="flex gap-2 absolute">
                            <button className="py-1 px-4 bg-primary text-black font-bold text-[20px] rounded-[10px]">Track Your Parcel</button>
                            <button className="p-2 px-2  text-primary bg-black font-bold text-[20px] rounded-full -rotate-45"><IoMdArrowRoundForward size={25} /></button>
                            <button className="py-1 px-4 text-black font-bold text-[20px] rounded-[10px] bg-transparent border-2 border-black">Be A Rider</button>

                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
                        <img className="h-full w-full" src={ExportImg11} alt="" />
                        <div className="flex gap-2 absolute">
                            <button className="py-1 px-4 bg-primary text-black font-bold text-[20px] rounded-[10px]">Track Your Parcel</button>
                            <button className="p-2 px-2  text-primary bg-black font-bold text-[20px] rounded-full -rotate-45"><IoMdArrowRoundForward size={25} /></button>
                            <button className="py-1 px-4 text-black font-bold text-[20px] rounded-[10px] bg-transparent border-2 border-black">Be A Rider</button>

                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
                        <img className="h-full w-full" src={ExportImg12} alt="" />
                        <div className="flex gap-2 absolute">
                            <button className="py-1 px-4 bg-primary text-black font-bold text-[20px] rounded-[10px]">Track Your Parcel</button>
                            <button className="p-2 px-2  text-primary bg-black font-bold text-[20px] rounded-full -rotate-45"><IoMdArrowRoundForward size={25} /></button>
                            <button className="py-1 px-4 text-black font-bold text-[20px] rounded-[10px] bg-transparent border-2 border-black">Be A Rider</button>

                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-full h-full flex items-center justify-center text-white text-3xl relative">
                        <img className="h-full w-full" src={ExportImg13} alt="" />
                        <div className="flex gap-2 absolute">
                            <button className="py-1 px-4 bg-primary text-black font-bold text-[20px] rounded-[10px]">Track Your Parcel</button>
                            <button className="p-2 px-2  text-primary bg-black font-bold text-[20px] rounded-full -rotate-45"><IoMdArrowRoundForward size={25} /></button>
                            <button className="py-1 px-4 text-black font-bold text-[20px] rounded-[10px] bg-transparent border-2 border-black">Be A Rider</button>

                        </div>
                    </div>
                </SwiperSlide>


            </Swiper>
        </div>
    );
};

export default Banner;
