import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "@/redux/user/userSlice";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // If nothing changed in the form, do nothing
    if (Object.keys(formData).length === 0) return;

    try {
      dispatch(updateUserStart());
      setUpdateSuccess(false);

      const res = await axios.put(
        `/api/user/update/${currentUser._id}`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success === false) {
        dispatch(updateUserFailure(res.data.message));
        return;
      }

      dispatch(updateUserSuccess(res.data.user));
      setUpdateSuccess(true);
    } catch (err) {
      dispatch(updateUserFailure(err.response?.data?.message || err.message));
    }
  };

  const handleDeleteUser = async () => {
    // Ask the user for confirmation before deleting
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;

    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(
        `/api/user/delete/${currentUser._id}`,
        { withCredentials: true }
      );

      if (res.data.success === false) {
        dispatch(deleteUserFailure(res.data.message));
        return;
      }

      dispatch(deleteUserSuccess());
      navigate("/sign-in");
    } catch (err) {
      dispatch(deleteUserFailure(err.response?.data?.message || err.message));
    }
  };

  const handleSignOut = async () => {
    try {
      await axios.get("/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(signOut());
      navigate("/sign-in");
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await axios.get(
        `/api/user/listings/${currentUser._id}`,
        { withCredentials: true }
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

  const handleListingDelete = async (listingId) => {
    try {
      const res = await axios.delete(
        `/api/listing/delete/${listingId}`,
        { withCredentials: true }
      );
      if (res.data.success === false) {
        console.log(res.data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-bold text-center my-7">My Profile</h1>

      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        {/* Avatar */}
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        {/* Username */}
        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="Username"
          className="border rounded-lg p-3 focus:outline-none"
          onChange={handleChange}
        />

        {/* Email */}
        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="Email"
          className="border rounded-lg p-3 focus:outline-none"
          onChange={handleChange}
        />

        {/* Password */}
        <input
          type="password"
          id="password"
          placeholder="New Password (leave blank to keep current)"
          className="border rounded-lg p-3 focus:outline-none"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Updating..." : "Update"}
        </button>

        <Link
          to="/create-listing"
          className="bg-green-700 text-white rounded-lg p-3 uppercase text-center hover:opacity-95"
        >
          Create Listing
        </Link>
      </form>

      {/* Bottom Actions */}
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer hover:underline"
        >
          Delete account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-700 cursor-pointer hover:underline"
        >
          Sign out
        </span>
      </div>

      {/* Feedback Messages */}
      {error && <p className="text-red-700 mt-3 text-center">{error}</p>}
      {updateSuccess && (
        <p className="text-green-700 mt-3 text-center">
          Profile updated successfully!
        </p>
      )}

      {/* Show Listings */}
      <button
        onClick={handleShowListings}
        className="text-green-700 w-full mt-5 hover:underline"
      >
        Show Listings
      </button>
      <p className="text-red-700 mt-2 text-sm">
        {showListingsError ? "Error showing listings" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4 mt-4">
          <h1 className="text-center text-2xl font-semibold">Your Listings</h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain rounded"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold flex-1 hover:underline truncate"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase text-sm hover:underline"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase text-sm hover:underline">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
