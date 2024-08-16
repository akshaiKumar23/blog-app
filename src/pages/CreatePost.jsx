import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const postsCollectionRef = collection(db, "posts");
  const navigate = useNavigate();
  const post = {
    title: title,
    postText: postText,
    author: {
      name: auth.currentUser?.displayName,
      id: auth.currentUser?.uid,
    },
  };
  const createPost = async (e) => {
    console.log(title, postText);
    e.preventDefault();
    await addDoc(postsCollectionRef, post);
    navigate("/");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Post</h1>

        <form onSubmit={createPost}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Title:</label>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              placeholder="Title..."
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Post:</label>
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Post..."
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="6"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
