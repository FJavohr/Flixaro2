import React, { useState, useEffect } from "react";
import "./HeroBannerHome.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBannerHome = () => {
  // ахалай махалай с бэкграудом | добовляем бэкграунд
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  // console.log(background);
  const { url } = useSelector((state) => state.home);

  const navigate = useNavigate();

  const { data, loading } = useFetch("/movie/upcoming");
  // console.log(loading)
  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
    console.log(data?.results[Math.floor(Math.random() * 20)].original_title)
  }, [data?.results, url.backdrop]);

  //обработка запроса при условиях 
  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0  ) {
      navigate(`/search/${query}`);
      // console.log("rhuma");
    }
    // console.log("rhuma");
  };
  const searchButton = () => {
    if(query.length > 0){
    navigate(`/search/${query}`);
    }
  }
  return (
    <div className="heroBanner">
      {/* загрузка изображений  */}
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <ContentWrapper>
        <div className="heroBannerHomeContent">
          <span className="title">  Welcome to Home page!</span>
          <span className="subTitle">
          Discover the Latest News, Reviews, and Top Movies Across Genres. Our Convenient Search Helps You Find Films by Title, Actors, or Directors. Stay Updated with Premieres, Release Dates, and Movie Descriptions. Enjoy Watching Movies with Us!
          </span>
          <span className="subTitle">
          </span>
        </div>
      </ContentWrapper>
      
        <div className="opacity-layer"></div>

    </div>
  );
};

export default HeroBannerHome;
