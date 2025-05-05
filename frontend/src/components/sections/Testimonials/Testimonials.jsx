import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import icons from '../../../icons/sprite.svg';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Testimonials.module.css';

import MainTitle from '../../ui/MainTitle/MainTitle';
import Subtitle from '../../ui/SubTitle/SubTitle';
import testimonials from '../../../data/testimonials.js';

export default function Testimonials() {
  return (
    <section className="container">
      <div className={styles.testimonialsSection}>
        <div className={styles.testimonialsWrapper}>
          <Subtitle className={styles.subtitle} text="What our customer say" />
          <MainTitle className={styles.title} text="Testimonials" />
        </div>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          className={styles.testimonialsSlider}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={styles.testimonialCard}>
                <svg width="24" height="24" className={styles.icon}>
                  <use href={`${icons}#quote`} />
                </svg>
                <p className={styles.text}>{item.text}</p>
                <p className={styles.author}>{item.author}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
