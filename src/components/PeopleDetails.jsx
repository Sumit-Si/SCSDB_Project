import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncLoadPeople, removePeople } from "../store/actions/PeopleActions";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import noImage from "/No_Image_Available.jpg";

function PeopleDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.people);
  const dispatch = useDispatch();

  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncLoadPeople(id));

    return () => {
      dispatch(removePeople());
    };
  }, [id]);

  console.log(info, "info");

  const date = new Date();
  const { pathname } = useLocation();
  // console.log(pathname)
  return info ? (
    <div className="w-full h-full overflow-y-auto px-[5%]">
      {/* Part 1 : navigation  */}
      <nav className="w-full h-[8vh] items-center flex gap-10 text-xl text-zinc-200">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#6556cd]"
        ></Link>
      </nav>

      <div className="w-full flex">
        {/* Part 2 : left Poster and Details */}
        <div className="w-2/12 text-white">
          <img
            className="h-72 w-full shadow-xl shadow-zinc-900 rounded-lg object-cover"
            src={info.detail.profile_path ? `https://image.tmdb.org/t/p/original${info.detail.profile_path}` : noImage}
            alt=""
          />

          {/* Social Media Links  */}
          <div className="p-3 text-xl text-white border-green-300 flex items-center gap-x-3 justify-center">
            {info.externalId.wikidata_id && (
              <a
                target="_blank"
                href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
              >
                <i className="ri-earth-fill"></i>
              </a>
            )}
            {info.externalId.facebook_id && (
              <a
                target="_blank"
                href={`https://www.facebook.com/${info.externalId.facebook_id}`}
              >
                <i className="ri-facebook-fill"></i>
              </a>
            )}
            {info.externalId.instagram_id && (
              <a
                target="_blank"
                href={`https://www.instagram.com/${info.externalId.instagram_id}`}
              >
                <i className="ri-instagram-fill"></i>
              </a>
            )}
            {info.externalId.twitter_id && (
              <a
                target="_blank"
                href={`https://www.twitter.com/${info.externalId.twitter_id}`}
              >
                <i className="ri-twitter-x-fill"></i>
              </a>
            )}
          </div>

          {/* Personal Information  */}
          <div className="my-3 px-2">
            <h3 className="text-2xl text-zinc-200 font-semibold mb-2">
              Personal Info
            </h3>
            <div className="mb-2">
              <h4 className="text-zinc-300 text-lg font-semibold">Known For</h4>
              <h4 className="text-zinc-300">
                {info.detail.known_for_department || "No Data"}
              </h4>
            </div>
            <div className="mb-2">
              <h4 className="text-zinc-300 text-lg font-semibold">Gender</h4>
              <h4 className="text-zinc-300">
                {info.detail.gender === 2 ? "Male" : "Female"}
              </h4>
            </div>
            <div className="mb-2">
              <h4 className="text-zinc-300 text-lg font-semibold">BirthDay</h4>
              <h4 className="text-zinc-300">{info.detail.birthday || "No Data"}</h4>
            </div>
            <div className="mb-2">
              <h4 className="text-zinc-300 text-lg font-semibold">DeathDay</h4>
              <h4 className="text-zinc-300">
                {info.detail.deathday ? info.detail.deathday : "Still Alive"}
              </h4>
            </div>
            <div className="mb-2">
              <h4 className="text-zinc-300 text-lg font-semibold">
                Place Of Birth
              </h4>
              <h4 className="text-zinc-300">
                {info.detail.place_of_birth ? info.detail.place_of_birth : "No Data"}
              </h4>
            </div>
            <div className="">
              <h4 className="text-zinc-300 text-lg font-semibold">
                Also Known As
              </h4>
              <h4 className="text-zinc-300">
                {info.detail.also_known_as.length > 0
                  ? info.detail.also_known_as.join(", ")
                  : "No Data"}
              </h4>
            </div>
          </div>
        </div>

        {/* Part 3 : right Details and information */}
        <div className="w-10/12 px-8">
          <h1 className="text-6xl text-zinc-200 font-semibold mb-4">
            {info.detail.name ? (
              info.detail.name
            ) : (
              <h3 className="text-zinc-400">Unknown</h3>
            )}
          </h1>

          <div className="text-white ">
            <div className="mb-4">
              <h2 className="text-xl text-zinc-300 mb-1 font-semibold">
                Biography
              </h2>
              <p className="text-zinc-300">
                {info.detail.biography ? (
                  info.detail.biography
                ) : (
                  <h3 className="text-zinc-400">No Data</h3>
                )}
              </p>
            </div>
            <div>
              <h2 className="text-xl text-zinc-300 mb-2 font-semibold">
                Known For
              </h2>
              {/* <p className="text-zinc-300">{info.combinedCredits.cast}</p> */}
              <HorizontalCards data={info.combinedCredits.cast} />
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zinc-300">Acting</h3>
              <Dropdown
                title="Category"
                options={["tv", "movie"]}
                func={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="list-disc text-zinc-400 w-full h-[40vh] mt-5 overflow-x-hidden overflow-y-auto rounded-lg shadow-[0.2em_0.2em_1em_#111]">
              {info[category + "Credits"].cast.length > 0 ? (
                info[category + "Credits"].cast.map((c, i) => (
                  <div
                    key={i}
                    className="hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer"
                  >
                    <Link className="flex gap-3">
                      <div>
                        <img
                          className="w-16 h-16 rounded-xl shadow-md shadow-zinc-700"
                          src={c.backdrop_path ? `https://image.tmdb.org/t/p/original${c.backdrop_path}` : noImage}
                          alt="img"
                        />
                      </div>
                      <div>
                        <span>
                          {c.name ||
                            c.title ||
                            c.original_name ||
                            c.original_title}
                        </span>
                        <span className="block">{c.character}</span>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <h3 className="text-zinc-400">No Data To Show</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default PeopleDetails;
