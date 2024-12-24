import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Dropdown from "./partials/Dropdown";
import TopNav from "./partials/TopNav";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";

function Popular() {
  const navigate = useNavigate();

  const [popular, setPopular] = useState([]);
  const [category, setCategory] = useState("movie");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getPopular = async () => {

    document.title = "SCSDB | Popular";

    try {
      const { data } = await axios.get(
        `${category}/popular?page=${page}`
      );
      // setPopular(data.results);

      if (data.results.length > 0) {
        setPopular((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      getPopular();
    } else {
      setPage(1);
      setPopular([]);
      getPopular();
    }
  };

  useEffect(() => {
    // getPopular();
    refreshHandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className="min-h-screen w-full px-[3%] py-[1%]">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-zinc-400 font-semibold text-xl">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556cd] cursor-pointer"
          ></i>{" "}
          Popular
        </h1>

        <div className="flex items-center w-[80%]">
          <TopNav />
          <Dropdown
            title="Category"
            options={["movie", "tv"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular}
        loader={<h1>Loading...</h1>}
        hasMore={hasMore}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );;
}

export default Popular;
