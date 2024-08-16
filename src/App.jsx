import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const authState = localStorage.getItem("isAuth") === "true";
    setIsAuth(authState);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
        localStorage.setItem("isAuth", true);
      } else {
        setIsAuth(false);
        localStorage.setItem("isAuth", false);
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Routes>
            <Route path="/" element={<Home isAuth={isAuth} />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
