import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TopNav from './partials/TopNav';
import Dropdown from './partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';
import Loading from './Loading';

function TvShows() {

    document.title = "SCSDB | Tv Shows";

    const navigate = useNavigate();

    const [tv, setTv] = useState([]);
    const [category, setCategory] = useState("airing_today");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
  
    const getTv = async () => {
      try {
        const { data } = await axios.get(`/tv/${category}?page=${page}`);
        // setTv(data.results);
  
        if (data.results.length > 0) {
          setTv((prevState) => [...prevState, ...data.results]);
          setPage(page + 1);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    const refreshHandler = () => {
      if (tv.length === 0) {
        getTv();
      } else {
        setPage(1);
        setTv([]);
        getTv();
      }
    };
  
    useEffect(() => {
      // getTv();
      refreshHandler();
    }, [category]);

  return tv.length > 0 ? (
    <div className="min-h-screen w-full px-[3%] py-[1%]">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-zinc-400 font-semibold text-xl">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556cd] cursor-pointer"
          ></i>{" "}
          TV<small className="pl-1 uppercase text-xs text-zinc-500">({category})</small>
        </h1>

        <div className="flex items-center w-[80%]">
          <TopNav />
          <Dropdown
            title="Category"
            options={["on_the_air","popular", "top_rated","airing_today"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={getTv}
        loader={<h1>Loading...</h1>}
        hasMore={hasMore}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default TvShows