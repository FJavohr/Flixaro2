import React, { useState, useEffect } from "react";
import "./HeroBannerHome.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBannerHome = () => {
  const [background, setBackground] = useState("");
  const [counter, setCounter] = useState(0);
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  const controlCounter = () => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter + 1) % 20);
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  };

  useEffect(() => {
    controlCounter();
  }, []);

  useEffect(() => {
    if (data?.results && data.results.length > 0) {
      const bg = url.backdrop + data.results[counter]?.backdrop_path;
      setBackground(bg);
    }
  }, [counter, data, url.backdrop]);

  useEffect(() => {
    if (background !== "") {
      const blurredBackground = `url(${background}) blur(5px)`;
      document.querySelector(".backdrop-img").style.backgroundImage =
        blurredBackground;
    }
  }, [background]);

  return (
    <div className="heroBanner">
      {/* загрузка изображений  */}
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title-home">Welcome to Home page!</span>
          <span className="subTitle">
            Discover the Latest News, Reviews, and Top Movies Across Genres. Our
            Convenient Search Helps You Find Films by Title, Actors, or
            Directors. Stay Updated with Premieres, Release Dates, and Movie
            Descriptions. Enjoy Watching Movies with Us!
          </span>
        </div>
      </ContentWrapper>

      <div className="opacity-layer"></div>
    </div>
  );
};

export default HeroBannerHome;
