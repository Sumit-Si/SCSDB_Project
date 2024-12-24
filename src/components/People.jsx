import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import TopNav from "./partials/TopNav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";

function People() {
  document.title = "SCSDB | People";

  const navigate = useNavigate();

  const [people, setPeople] = useState([]);
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getpeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      // setPeople(data.results);

      if (data.results.length > 0) {
        setPeople((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const refreshHandler = () => {
    if (people.length === 0) {
      getpeople();
    } else {
      setPage(1);
      setPeople([]);
      getpeople();
    }
  };

  useEffect(() => {
    // getpeople();
    refreshHandler();
  }, [category]);

  return people.length > 0 ? (
    <div className="min-h-screen w-full px-[3%] py-[1%]">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-zinc-400 font-semibold text-xl">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556cd] cursor-pointer"
          ></i>{" "}
          People
        </h1>

        <div className="flex items-center w-[80%]">
          <TopNav />
          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={people.length}
        next={getpeople}
        loader={<h1>Loading...</h1>}
        hasMore={hasMore}
      >
        <Cards data={people} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );;
}

export default People;
