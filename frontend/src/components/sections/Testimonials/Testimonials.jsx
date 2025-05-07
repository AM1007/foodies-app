import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import icons from '../../../icons/sprite.svg';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Testimonials.module.css';

import MainTitle from '../../ui/MainTitle/MainTitle';
import Subtitle from '../../ui/SubTitle/SubTitle';
import { fetchTestimonials } from '../../../redux/testimonials/testimonialsSlice.js';

export default function Testimonials() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.testimonials);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);
  console.log('Testimonials component is rendering. Items:', items);
  return (
    <section className="container">
      <div className={styles.testimonialsSection}>
        <div className={styles.testimonialsWrapper}>
          <Subtitle className={styles.subtitle} text="What our customer say" />
          <MainTitle className={styles.title} text="Testimonials" />
        </div>

        {loading && <p>Loading testimonials...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && !error && (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop={items.length > 2}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            className={styles.testimonialsSlider}
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <div className={styles.testimonialCard}>
                  <svg width="24" height="24" className={styles.icon}>
                    <use href={`${icons}#quote`} />
                  </svg>
                  <p className={styles.text}>{item.testimonial}</p>
                  <p className={styles.author}>
                    {item.user ? item.user.name : 'Anonymous'}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
