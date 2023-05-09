import React, { FC, useState } from "react";
import "./ThumbsGallery.scss";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { MovieTabsNames } from "src/utils/@globalTypes";
import { SingleMovieImage, SingleMovieVideos } from "src/redux/sagas/@types";
import { Theme, useThemeContext } from "src/Context/Theme/Context";
import { imageSize } from "src/utils/constants";

type ThumbsGalleryProps = {
  videos?: SingleMovieVideos[];
  images?: SingleMovieImage[];
  activeTab: MovieTabsNames;
};

const ThumbsGallery: FC<ThumbsGalleryProps> = ({
  videos,
  images,
  activeTab,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const { theme } = useThemeContext();

  return (
    <div
      className={classNames("movie-gallery", {
        "movie-galleryLight": theme === Theme.Light,
      })}
    >
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {activeTab === MovieTabsNames.Videos &&
          videos?.map((item, index) => {
            if (index < 3) {
              return (
                <SwiperSlide key={item.id}>
                  <h3>{item.name}</h3>
                  <div className="videoWrapper">
                    <iframe
                      width="90%"
                      height="500px"
                      src={item.url}
                      title={item.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </SwiperSlide>
              );
            }
          })}
        {activeTab === MovieTabsNames.Images &&
          images?.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <img src={item.url} />
              </SwiperSlide>
            );
          })}
      </Swiper>
      {activeTab === MovieTabsNames.Images && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          modules={[FreeMode, Thumbs]}
          className="mySwiper"
        >
          {images?.map((item) => {
            const newImg = item.url.replace(imageSize, "w300");
            return (
              <SwiperSlide key={item.id}>
                <img src={newImg} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

export default ThumbsGallery;
