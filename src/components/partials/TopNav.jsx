import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import noImage from "/No_Image_Available.jpg";

function TopNav() {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
      // console.log(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    <div className="w-full h-[10vh] relative flex pl-20 gap-4 items-center">
      <i className="text-zinc-200 font-semibold text-xl ri-search-2-line"></i>
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        className="w-[50%] rounded-lg py-3 px-5 hover:text-white text-zinc-200 bg-transparent border-none outline-none"
        placeholder="Enter anything"
        name=""
        value={query}
        id=""
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-zinc-200 cursor-pointer font-semibold text-xl ri-close-large-fill"
        ></i>
      )}

      <div className="w-[50%] max-h-[40vh] z-[100] absolute top-[90%] bg-zinc-900 rounded-lg overflow-auto">
        {query.length > 0 &&
          searches.map((sRes, index) => (
            <div
              key={index}
              className="flex items-center bg-zinc-800 w-full py-5 px-4 text-zinc-200 hover:bg-zinc-500"
            >
              <img
                className="w-20 shadow-md shadow-zinc-900 object-cover h-20 mr-5 rounded-2xl"
                src={
                  sRes.backdrop_path || sRes.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        sRes.backdrop_path || sRes.profile_path
                      }`
                    : noImage
                }
                alt=""
              />

              <h4>
                {sRes.title ||
                  sRes.name ||
                  sRes.original_title ||
                  sRes.original_name}
              </h4>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TopNav;
