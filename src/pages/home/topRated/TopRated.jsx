import React, { useState } from "react";
import "../trending/Trending.scss";
import Switcher from "../../../components/switcher/Switcher";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Corousel from "../../../components/carousel/Carousel";
// на TMBD этот отдел называется Popular
const TopRated = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/popular`);
  // console.log(endpoint)
  // console.log(loading);
  //почему нельзя передавать switch ?
  // потому что оно зарезвированно, гений.
  const onSwitchChange = (switcher) => {
    setEndpoint(switcher === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="sectionCorousel">
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        {/* В TMDB можно только day and week, поэтому да ..  */}
        <Switcher
          data={["Movies", "TV Shows "]}
          onSwitchChange={onSwitchChange}
        />
      </ContentWrapper>
      <Corousel endpoint={endpoint} data={data?.results} loading={loading} />
    </div>
  );
};

export default TopRated;
