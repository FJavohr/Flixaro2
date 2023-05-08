import React from "react";
import "./Home.scss";

import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import HeroBannerHome from "./heroBannerHome/HeroBannerHome";
const Home = () => {
  return (
    <div className="homePage">
      <HeroBannerHome />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
