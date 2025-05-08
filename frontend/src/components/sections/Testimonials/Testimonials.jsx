import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import styles from './Testimonials.module.css';
import icons from '../../../icons/sprite.svg';

import MainTitle from '../../ui/MainTitle/MainTitle';
import Subtitle from '../../ui/SubTitle/SubTitle';
import { fetchTestimonials } from '../../../redux/testimonials/testimonialsSlice.js';

export default function Testimonials() {
  const dispatch = useDispatch();
  const { items, loading, error, isFetched } = useSelector(
    state => state.testimonials,
  );

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchTestimonials());
    }
  }, [dispatch, isFetched]);

  const testimonialSlides = useMemo(() => {
    return items.map((item, index) => (
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
    ));
  }, [items]);

  return (
    <section className="container">
      <div className={styles.testimonialsSection}>
        <div className={styles.testimonialsWrapper}>
          <Subtitle className={styles.subtitle} text="What our customer say" />
          <MainTitle className={styles.title} text="Testimonials" />
        </div>

        {loading && <p>Loading testimonials...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && !error && items.length > 0 && (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop={items.length > 2}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            className={styles.testimonialsSlider}
          >
            {testimonialSlides}
          </Swiper>
        )}
      </div>
    </section>
  );
}
