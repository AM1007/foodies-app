import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import Subtitle from '../../sharedTitle/SubTitle/Subtitle';
import MainTitle from '../../sharedTitle/MainTitle/MainTitle';
import axios from 'axios';

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await axios.get('/api/testimonials'); // змінити на реальний endpoint

        // Перевірка, чи data — масив, якщо ні — використовуємо заглушку
        if (Array.isArray(data)) {
          setTestimonials(data);
        } else {
          setTestimonials([
            { text: 'This is a great platform!', author: 'Olena K.' },
            { text: 'Easy recipes, big taste!', author: 'Ivan P.' },
          ]);
        }
      } catch (error) {
        console.error('Failed to load testimonials', error);
        // Заглушка при помилці
        setTestimonials([
          { text: 'This is a great platform!', author: 'Olena K.' },
          { text: 'Easy recipes, big taste!', author: 'Ivan P.' },
        ]);
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <section className="py-10 text-center">
      <Subtitle>What our customers say</Subtitle>
      <MainTitle>TESTIMONIALS</MainTitle>

      <div className="max-w-3xl mx-auto mt-8 px-4">
        <Slider {...settings}>
          {testimonials.map((item, idx) => (
            <div key={idx}>
              <blockquote className="italic text-lg text-gray-700">
                “{item.text}”
              </blockquote>
              <p className="mt-4 font-bold uppercase">{item.author}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
