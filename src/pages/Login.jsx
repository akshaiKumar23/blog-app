/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        console.log("Navigation to home");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <p className="mb-4 text-lg font-semibold text-center">
          Sign in with Google to continue
        </p>
        <button
          onClick={signInWithGoogle}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
