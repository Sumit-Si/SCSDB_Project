import axios from "../utils/axios";
import Loading from "./Loading";
import Dropdown from "./partials/Dropdown";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import SideNav from "./partials/SideNav";
import TopNav from "./partials/TopNav";
import { useEffect, useState } from "react";

function Home() {
  document.title = "SCSDB | Home";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomData =
        data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(randomData);
      // console.log(randomData);
    } catch (err) {
      console.log(err);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    !wallpaper && getHeaderWallpaper();
    getTrending();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <SideNav />
      <div className="w-[80%] h-full">
        <TopNav />
        <Header data={wallpaper} />
        <div className="p-5 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-zinc-400">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    // <h1 className="text-4xl text-white">Loading...</h1>
    <Loading />
  );
}

export default Home;
