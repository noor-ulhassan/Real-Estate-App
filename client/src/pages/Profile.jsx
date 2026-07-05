import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="max-w-6xl mx-auto p-3">
      <h1 className="text-3xl font-bold text-center my-7">My Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="border rounded-lg p-3 focus:outline-none"
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="border rounded-lg p-3 focus:outline-none"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="border rounded-lg p-3 focus:outline-none"
        />
        <Button
          type="submit"
          variant="default"
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
        >
          Update
        </Button>
        <Link
          to="/create-listing"
          className="bg-green-700 text-white rounded-lg p-3 uppercase text-center hover:opacity-95"
        >
          Create Listing
        </Link>
      </form>
    </div>
  );
}
