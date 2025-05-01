import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Testimonials.module.css';
import MainTitle from '../../sharedTitle/MainTitle/MainTitle';
import Subtitle from '../../sharedTitle/SubTitle/Subtitle';
import { ReactComponent as QuoteIcon } from '../../../icons/quote.svg';

const testimonials = [
  {
    text: 'Thank you for the wonderful recipe for feta pasta with tomatoes and basil. It turned out to be not only tasty, but also incredibly colorful. This has become a favorite family meal!',
    author: 'LARRY PAGEIM',
  },
  {
    text: 'Amazing experience! The flavors were perfect and it was so easy to make.',
    author: 'JANE DOE',
  },
  {
    text: 'My kids loved it! And it’s now our go-to recipe for family dinners.',
    author: 'JOHN SMITH',
  },
];

export default function Testimonials() {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.testimonialsSection}>
        <div className={styles.textWrapper}>
          <Subtitle className={styles.subtitle}>What our customer say</Subtitle>
          <MainTitle>TESTIMONIALS</MainTitle>
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
