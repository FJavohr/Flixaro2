/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import {useDispatch } from "react-redux";
import { fetchDataFromApi } from "./config/api";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/header/index.jsx";
import Footer from "./components/footer/index.jsx";
import Auth from "./auth/Auth";
import Home from "./pages/home/Home.jsx";
import Details from "./pages/details/Details.jsx";
import Explore from "./pages/explore/Explore";
// import pageNotFound from "./pages/404/pageNotFound.jsx";
import SearchResult from "./pages/searchResult/SearchResult.jsx";
import Upcoming from "./pages/upcoming/Upcoming";
import PageNotFound from "./pages/404/PageNotFound";
import StartPage from "./pages/startPage/StartPage";
const App = () => {
  const dispatch = useDispatch();
  // console.log(url);

  useEffect(() => {
    fetchApiConfig();
    genresCall()
  }, []);
  // console.log(useParams)
  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }
      
      dispatch(getApiConfiguration(url));
      // console.log(res);
    });
  };

  // ansync cause of loading from the client side and query from back side
  const genresCall = async () => {
    let promises = []
    let endPoint = ["tv", "movie"]
    let allGenres = {}

    endPoint.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })
    //all - возвращает массив значений от всех промисов, которые были ему переданы
    const data = await Promise.all(promises)
    // console.log(data)
    data.map(({genres}) => {
      return genres.map((item) => (allGenres[item.id] = item))
    })

    dispatch(getGenres(allGenres))

  }


  return (
    <BrowserRouter> 
      <Header/>
      <Routes>

        <Route path="/auth" element={<Auth/>}/>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/movie/upcoming" element={<Upcoming />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>

  );
};

export default App;
