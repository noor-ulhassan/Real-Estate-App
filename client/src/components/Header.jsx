import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Header() {
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
          <ul className="flex gap-4 text-slate-700 text-sm font-semibold">
            <Link to="/">
              <li className="hidden sm:inline hover:text-slate-400">Home</li>
            </Link>
            <Link to="/about">
              <li className="hover:text-slate-400 hidden sm:inline">About</li>
            </Link>
            <Link to="/sign-up">
              <li className="hover:text-slate-400 ">Get Started</li>
            </Link>
          </ul>
        </div>
      </header>
    </>
  );
}
