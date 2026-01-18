import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import banner1 from "../../../assets/banner/banner1.png";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.png";

const Banner = () => {
  return (
   <Carousel className="mt-[30px]" showThumbs={false} showStatus={false}>
  {[banner1, banner2, banner3].map((img, i) => (
    <div key={i} className="relative">
      <img src={img} alt="banner" />

      <div className="absolute bottom-12 left-7 flex gap-3">
        <button className="px-6 py-2 bg-primary text-secondary rounded-full">
          Get Started
        </button>
        <button className="px-6 py-2 border border-secondary text-secondary rounded-lg">
          Be A Rider
        </button>
      </div>
    </div>
  ))}
</Carousel>
  );
};

export default Banner;
