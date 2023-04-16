import React, { FC, ReactNode, useEffect, useState } from "react";
import "./ThumbsGallery.scss";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { logoutUser } from "src/redux/reducers/authSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { MovieTabsNames } from "src/utils/@globalTypes";
import { SingleMovieImage, SingleMovieVideos } from "src/redux/sagas/@types";

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

  return (
    <div className="movie-gallery">
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
            return (
              <SwiperSlide key={item.id}>
                <img src={item.url} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

export default ThumbsGallery;
