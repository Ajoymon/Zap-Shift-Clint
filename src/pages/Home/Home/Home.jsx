import React from 'react';
import Banner from '../Banner/Banner';
import Howitworks from '../Howitworks/Howitworks';
import OurServices from '../OurServices/OurServices';
import Brands from '../Brands/Brands';
import Reviews from '../Reviews/Reviews';
import ParcleTracing from '../ParcleTracing/ParcleTracing';
import Faq from '../Faq/Faq';

const reviewsPromis = fetch('/reviews.json').then(res => res.json());

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Howitworks></Howitworks>
      <OurServices></OurServices>
      <Brands></Brands>
      <ParcleTracing></ParcleTracing>
      <Faq></Faq>
      <Reviews reviewsPromis={reviewsPromis}></Reviews>
    </div>
  );
};

export default Home;
