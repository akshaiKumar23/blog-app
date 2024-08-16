/* eslint-disable react/prop-types */
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

const Navbar = ({ isAuth, setIsAuth }) => {
  const navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.setItem("isAuth", false);
      setIsAuth(false);
      navigate("/login");
    });
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-white">TechBlog</div>
        <div className="space-x-4 flex items-center">
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            Home
          </Link>

          {!isAuth ? (
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/createpost"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Create Post
              </Link>
              <button
                onClick={signUserOut}
                className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-2 px-4 rounded transition duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
