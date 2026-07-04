import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "@/redux/user/userSlice";
import axios from "axios";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/auth/logout", {
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
          <form className="bg-slate-100 rounded-lg flex items-center p-2">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <FaSearch className="text-slate-600 cursor-pointer" />
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
                      src={currentUser.avatar}
                      alt="profile"
                      className="rounded-full h-7 w-7 object-cover cursor-pointer"
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
