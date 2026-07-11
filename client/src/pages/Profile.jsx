import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await axios.get(
        `http://localhost:8080/api/user/listings/${currentUser._id}`,
        { withCredentials: true },
      );

      if (res.data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(res.data);
    } catch (error) {
      setShowListingsError(true);
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-3">
      <h1 className="text-3xl font-bold text-center my-7">My Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="Username"
          className="border rounded-lg p-3 focus:outline-none"
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
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

      <button
        onClick={handleShowListings}
        className="text-green-700 w-full mt-5 hover:underline"
      >
        Show Listings
      </button>
      <p className="text-red-700 mt-5">
        {showListingsError ? "Error showing listings" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold flex-1 hover:underline truncate"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col items-center">
                <button className="text-red-700 uppercase">Delete</button>
                <button className="text-green-700 uppercase">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
