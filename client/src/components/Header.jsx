import { FaSearch } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "@/redux/user/userSlice";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  // Sync search box value from URL when navigating to /search directly
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchTerm);
    navigate(`/search?${urlParams.toString()}`);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/auth/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(signOut());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className=" bg-slate-200 shadow-md ">
        <div className="flex justify-between items-center mx-auto max-w-6xl p-3">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-500">Noor</span>
              <span className="text-slate-700">Estate</span>
            </h1>
          </Link>
          <form
            onSubmit={handleSubmit}
            className="bg-slate-100 rounded-lg flex items-center p-2"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <FaSearch className="text-slate-600 cursor-pointer" />
            </button>
          </form>
          <ul className="flex items-center gap-4 text-slate-700 text-sm font-semibold">
            <Link to="/">
              <li className="hidden sm:inline hover:text-slate-400">Home</li>
            </Link>
            <Link to="/about">
              <li className="hover:text-slate-400 hidden sm:inline">About</li>
            </Link>

            {currentUser ? (
              <>
                <li className="list-none">
                  <button
                    className="cursor-pointer text-red-600 hover:text-red-400 transition-colors duration-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
                <li className="list-none">
                  <Link to="/profile">
                    <img
                      src={currentUser.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB50zAP_Uk13XEU9M2G_gVZ2z7P9mfJIucQZpmLwNwCQ&s=10"}
                      alt="profile"
                      className="rounded-full h-7 w-7 object-cover cursor-pointer"
                      onError={(e) => {
                        e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB50zAP_Uk13XEU9M2G_gVZ2z7P9mfJIucQZpmLwNwCQ&s=10";
                      }}
                    />
                  </Link>
                </li>
              </>
            ) : (
              <Link to="/sign-up">
                <li className="hover:text-slate-400">Get Started</li>
              </Link>
            )}
          </ul>
        </div>
      </header>
    </>
  );
}

