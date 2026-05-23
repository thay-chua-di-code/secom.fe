import React from "react";
import Banner from "../../components/layouts/Banner";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.avif";
import banner3 from "../../assets/images/banner3.avif";
const Home = () => {
  return (
    <div className="home-page">
      <Banner images={[banner1, banner2, banner3]} />
    </div>
  );
};

export default Home;
