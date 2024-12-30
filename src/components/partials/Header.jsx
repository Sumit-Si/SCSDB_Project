import { Link } from "react-router-dom";
import noImage from "/No_Image_Available.jpg";

function Header({ data }) {
  // console.log(data);
  return (
    <div
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7),rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original${
          data ? data.backdrop_path || data.profile_path : noImage
        })`,
      }}
      className="h-[50vh] w-full"
    >
      <div className="content p-8 flex flex-col justify-end w-full h-full items-start">
        <h1 className="text-white font-semibold text-5xl">
          {data.title || data.name || data.original_title || data.original_name}
        </h1>
        <p className="text-white w-2/3 mt-2">
          {data.overview.slice(0, 200)}...
          <Link to={`${data.media_type}/details/${data.id}`} className="text-blue-500">more</Link>
        </p>

        <div className="text-white mt-2 flex gap-5 items-center">
          <p>
            <i className="text-violet-600 ri-megaphone-fill"></i>{" "}
            {data.release_date || "no Information"}
          </p>
          <p>
            <i className="text-violet-600 ri-album-fill"></i>{" "}
            {data.media_type.toUpperCase() || "no Information"}
          </p>
        </div>
        <Link className="border border-rose-800 hover:bg-rose-800 duration-300 mt-4 text-white rounded-xl py-4 px-8">
          Watch Trailer
        </Link>
      </div>
    </div>
  );
}

export default Header;
