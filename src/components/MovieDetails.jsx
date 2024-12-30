import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncLoadMovie, removeMovie } from "../store/actions/MovieActions";
import Loading from "./Loading";
import TopNav from "./partials/TopNav";
import HorizontalCards from "./partials/HorizontalCards";

function MovieDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncLoadMovie(id));

    return () => {
      dispatch(removeMovie());
    };
  }, [id]);

  console.log(info, "info");

  const date = new Date();
  const { pathname } = useLocation();
  // console.log(pathname)

  return info ? (
    <div
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7),rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original${info.detail.backdrop_path})`,
      }}
      className="min-h-screen w-full px-[3%] py-[1%]"
    >
      {/* Part 1 : navigation  */}
      <nav className="w-full h-[8vh] items-center flex gap-10 text-xl text-zinc-200">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#6556cd]"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalId.imdb_id}`}
        >
          imdb
        </a>
      </nav>

      {/* Part 2 : Poster & Details  */}
      <div className="flex mt-3 mb-16">
        <div className="flex flex-col h-96 flex-shrink-0">
          <img
            className="h-96 shadow-xl shadow-zinc-900 rounded-lg object-cover"
            src={`https://image.tmdb.org/t/p/original${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt=""
          />

          {/* Part 3 : Available on Platform  */}
          <div className="mb-4">
            <div className="mt-5 w-[85%] flex gap-3 flex-col">
              {info.watchProviders && info.watchProviders.flatrate && (
                <div className="flex gap-2 flex-col mb-2">
                  <h4 className="text-zinc-400 font-semibold">
                    Available On Platform
                  </h4>
                  <div className="flex gap-2">
                    {info.watchProviders.flatrate.map((dt) => (
                      <img
                        className="h-10 w-10 rounded-md shadow-lg shadow-zinc-700"
                        src={`https://image.tmdb.org/t/p/original${dt.logo_path}`}
                        alt="img"
                      />
                    ))}
                  </div>
                </div>
              )}

              {info.watchProviders && info.watchProviders.rent && (
                <div className="flex gap-2 flex-col mb-2">
                  <h4 className="text-zinc-400 font-semibold">
                    Available For Rent
                  </h4>
                  <div className="flex gap-2">
                    {info.watchProviders.rent.map((dt) => (
                      <img
                        className="h-10 w-10 rounded-md shadow-lg shadow-zinc-700"
                        src={`https://image.tmdb.org/t/p/original${dt.logo_path}`}
                        alt="img"
                      />
                    ))}
                  </div>
                </div>
              )}

              {info.watchProviders && info.watchProviders.buy && (
                <div className="flex gap-2 flex-col mb-1">
                  <h4 className="text-zinc-400 font-semibold">
                    Available To Buy
                  </h4>
                  <div className="flex gap-2">
                    {info.watchProviders.buy.map((dt) => (
                      <img
                        className="h-10 w-10 rounded-md shadow-lg shadow-zinc-700"
                        src={`https://image.tmdb.org/t/p/original${dt.logo_path}`}
                        alt="img"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="content ml-10 w-full text-white">
          <h1 className="text-5xl flex items-center gap-1 text-white mb-3 font-bold leading-tight">
            {info.detail.title ||
              info.detail.name ||
              info.detail.original_title ||
              info.detail.original_name}

            <small className="text-2xl text-zinc-200">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center text-white">
              <span className="bg-yellow-600 w-12 h-12 font-semibold flex justify-center items-center rounded-full">
                {(info.detail.vote_average * 10).toFixed()}%
              </span>
              <h3 className="w-[20%] font-semibold text-lg">User Score</h3>
              <h3 className="text-zinc-300 font-semibold text-lg">
                {info.detail.runtime}min
              </h3>
              <h3 className="w-[20%] text-zinc-300 text-center font-semibold text-lg">
                {info.detail.release_date}
              </h3>
            </div>
            <div className="flex items-center my-2 gap-1">
              {info.detail.genres.map((dt) => (
                <h3 className="bg-orange-700 text-zinc-300 font-semibold text-sm rounded-full px-5 py-1 hover:bg-opacity-90 duration-200 shadow-lg shadow-orange-700">
                  {dt.name}
                </h3>
              ))}
            </div>

            <h3 className="text-xl italic mb-3 text-zinc-200 font-semibold">
              {info.detail.tagline}
            </h3>

            <div className="mb-3">
              <h3 className="text-lg">Overview</h3>
              <p className="text-zinc-300 w-5/6">{info.detail.overview}</p>
            </div>

            <Link
              to={`${pathname}/trailer`}
              className="mb-5 py-3 px-10 w-fit rounded-lg border-[0.1em] border-red-700 font-semibold hover:border-red-800 bg-transparent shadow-lg shadow-red-900"
            >
              <i className="ri-play-large-fill text-red-700 text-xl"></i> Play
              Trailer
            </Link>

            <div>
              <h3 className="text-lg mb-2">Movie Translated</h3>
              <p className="text-zinc-300 w-5/6 flex gap-x-3 gap-y-2 flex-wrap">
                {info.translations.map((t) => (
                  <span className="py-1 px-5 text-xs bg-violet-700 hover:bg-violet-800 duration-200 cursor-pointer font-semibold rounded-full">
                    {t.name || t.english_name}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Part 4 : Recommendation & Similar Stuff  */}
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
    </div>
  ) : (
    <Loading />
  );
}

export default MovieDetails;