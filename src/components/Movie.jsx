import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Cards from "./partials/Cards";
import TopNav from "./partials/TopNav";
import Dropdown from "./partials/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";

function Movie() {
  const navigate = useNavigate();

  const [movie, setMovie] = useState([]);
  const [category, setCategory] = useState("now_playing");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getMovie = async () => {

    document.title = "SCSDB | Movie";

    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      // setMovie(data.results);

      if (data.results.length > 0) {
        setMovie((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const refreshHandler = () => {
    if (movie.length === 0) {
      getMovie();
    } else {
      setPage(1);
      setMovie([]);
      getMovie();
    }
  };

  useEffect(() => {
    // getMovie();
    refreshHandler();
  }, [category]);

  return movie.length > 0 ? (
    <div className="min-h-screen w-full px-[3%] py-[1%]">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-zinc-400 font-semibold text-xl">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556cd] cursor-pointer"
          ></i>{" "}
          Movie<small className="pl-1 uppercase text-xs text-zinc-500">({category})</small>
        </h1>

        <div className="flex items-center w-[80%]">
          <TopNav />
          <Dropdown
            title="Category"
            options={["popular", "top_rated","upcoming","now_playing"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={movie.length}
        next={getMovie}
        loader={<h1>Loading...</h1>}
        hasMore={hasMore}
      >
        <Cards data={movie} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Movie;
