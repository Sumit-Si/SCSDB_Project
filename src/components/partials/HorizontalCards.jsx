import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

function HorizontalCards({ data }) {
  return (
    data && (
        <div className="w-full px-5 flex gap-3 overflow-y-hidden">
          {data.map((d, i) => (
            <div
              key={i}
              className="bg-zinc-900 rounded-lg overflow-hidden  mb-5 min-w-[25%]"
            >
              <img
                className="w-full h-[55%] object-cover"
                src={`https://image.tmdb.org/t/p/original${
                  d.backdrop_path || d.profile_path
                }`}
                alt=""
              />
              <div className="text-white p-3 py-2 h-[45%]">
                <h1 className="text-lg mb-1 font-semibold leading-tight">
                  {d.title || d.name || d.original_title || d.original_name}
                </h1>
                <p className="text-zinc-400 text-sm">
                  {d.overview.slice(0, 45)}...
                  <Link className="text-blue-500">more</Link>
                </p>
              </div>
            </div>
          ))}
        </div>
    )
  );
}

export default HorizontalCards;