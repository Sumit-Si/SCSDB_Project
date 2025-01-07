import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

function Trailer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytVideo = useSelector((state) => state[category].info.videos);
  // console.log(pathname, ytVideo,category);

  return (
    <div className="absolute bg-[rgba(0,0,0,0.85)] text-white flex items-center justify-center top-0 left-0 h-screen w-screen">
      <Link
        to={navigate(-1)}
        className="absolute top-[4%] font-bold text-2xl left-[4%] ri-close-fill hover:text-[#6556cd]"
      />
      {ytVideo ? (
        <ReactPlayer
          controls
          height={550}
          width={1100}
          url={`https://www.youtube.com/watch?v=${ytVideo.key}`}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default Trailer;
