import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  // If logged in, render the child route (Outlet).
  // If NOT logged in, redirect to sign-in page.
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
