import React from "react";
import SliderItem from "./SliderItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/bundle";

const SliderComponent = () => {
  return (
    <div className="slider">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
      >
        <SwiperSlide>
          <SliderItem
            modelPath="models/moon.glb"
            backgroundColor="#2c2c2c"
            title="The Moon"
            sub="Corrupti quis in molestias dicta consectetur laboriosam nemo asperiores sed, quia earum harum ab cil!"
            scale={0.01}
          />
        </SwiperSlide>
        <SwiperSlide>
          <SliderItem
            modelPath="models/toon_thumbs_up.glb"
            backgroundColor="#44c3c3"
            title="Thumbs Up"
            sub="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus voluptates quod qui sint officia incidunt."
            scale={0.01}
          />
        </SwiperSlide>
        <SwiperSlide>
          <SliderItem
            modelPath="models/low_five.glb"
            backgroundColor="#FA9076"
            title="Magical Hands"
            sub="Accusamus voluptates quod qui sint officia incidunt. Corrupti quis in molestias dicta consectetur laboriosam nemo asperiores sed."
            scale={0.01}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SliderComponent;
