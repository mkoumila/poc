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
            colorA="#8d00ff"
            colorB="#000"
            title="The Moon"
            sub="Corrupti quis in molestias dicta consectetur laboriosam nemo asperiores sed, quia earum harum ab cil!"
            scale={0.01}
            btnTitle="Join VOID family"
            btnLink="https://void.fr/"
          />
        </SwiperSlide>
        <SwiperSlide>
          <SliderItem
            modelPath="models/toon_thumbs_up.glb"
            colorA="#ffea00"
            colorB="#FF0000"
            title="Thumbs Up"
            sub="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id voluptatum nostrum, ullam fugiat quasi ex fuga ab eos vero quis minus libero odio. Nulla reiciendis sint tenetur itaque iure dolorem."
            scale={0.01}
          />
        </SwiperSlide>
        <SwiperSlide>
          <SliderItem
            modelPath="models/low_five.glb"
            colorA="#FF0000"
            colorB="#342df2"
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
