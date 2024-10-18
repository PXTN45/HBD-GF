import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

export default () => {
  const images = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
  ];
  return (
    <Swiper
      modules={[EffectCards]}
      effect="cards"
      loop={true}
      spaceBetween={10}
      slidesPerView={1}
      //   onSlideChange={() => console.log("slide change")}
    >
      {/* ทำ loop ผ่านข้อมูล */}
      {images.map((i) => {
        return (
          <SwiperSlide key={i}>
            <img
              src={`../../image/img-gf/gf-${i}.jpg`} // ใช้ภาพใน loop
              className="w-[350px] h-[350px] rounded-lg object-cover"
              alt={`Slide ${i}`}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
