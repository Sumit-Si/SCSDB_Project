
import { Link } from "react-router-dom";

function SideNav() {

 

  return (
    <div className="w-[20%] h-full bg-zinc-800 p-5">
      <h3 className="text-white font-bold flex items-center gap-2 text-2xl">
        <i className="text-[#6556cd] ri-tv-fill"></i> <span>SCSDB.</span>
      </h3>

      <nav className="mt-10 mb-5 text-zinc-400 flex flex-col gap-2">
        <h4 className="font-semibold text-lg text-white mb-2">New Feeds</h4>
        {[{name:"Trending",icon:"ri-fire-fill",forwardTo: "/trending"},{name:"Popular",icon:"ri-sparkling-fill",forwardTo: "/popular"},{name:"Movies",icon:"ri-movie-2-fill",forwardTo: "/movie"},{name:"Tv Shows",icon:"ri-tv-2-fill",forwardTo: "/tvshows"},{name:"People",icon:"ri-team-fill",forwardTo: "/people"}].map(
          (navLink) => (
            <Link to={navLink.forwardTo} className="p-4 hover:bg-[#6556cd] rounded-lg hover:text-white duration-300">
              <i className={navLink.icon}></i> {navLink.name}
            </Link>
          )
        )}
      </nav>
      <hr className="bg-zinc-700 rounded-full border-none h-[0.1em]" />

      <nav className="mt-6 text-zinc-400 flex flex-col gap-2">
        <h4 className="font-semibold text-lg text-white mb-2">Website Information</h4>
        {[{name:"About",icon:"ri-information-2-fill"},{name:"Contact Us",icon:"ri-phone-fill"}].map(
          (navLink) => (
            <Link className="p-4 hover:bg-[#6556cd] rounded-lg hover:text-white duration-300">
              <i className={`text-lg ${navLink.icon}`}></i> {navLink.name}
            </Link>
          )
        )}
      </nav>
    </div>
  );
}

export default SideNav;
