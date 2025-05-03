import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Testimonials.module.css';
import MainTitle from '../../sharedTitle/MainTitle/MainTitle';
import Subtitle from '../../sharedTitle/SubTitle/Subtitle';
import { ReactComponent as QuoteIcon } from '../../../icons/quote.svg';
import testimonials from '../../../data/testimonials';

export default function Testimonials() {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.testimonialsSection}>
        <div className={styles.textWrapper}>
          <Subtitle className={styles.subtitle}>What our customer say</Subtitle>
          <MainTitle>Testimonials</MainTitle>
        </div>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
        >
          {testimonials.map(t => (
            <SwiperSlide key={t.author}>
              <div className={styles.slide}>
                <div className={styles.quoteRow}>
                  <QuoteIcon className={styles.icon} />
                  <p className={styles.text}>{t.text}</p>
                </div>
                <p className={styles.author}>{t.author}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
