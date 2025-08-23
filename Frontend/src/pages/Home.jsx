import { Link } from "react-router-dom";
import HeroImg from "../assets/Hero.png";

const Home = () => {
  return (
    <main className="bg-white min-h-[calc(100vh-64px)] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Find the Best Stores, <br className="hidden md:block" /> Rate Your Favorites
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto md:mx-0">
            A community-driven platform to discover and review local businesses.
            Share your experiences and help others make informed decisions.
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4">
            <Link
              to="/signup"
              className="bg-black text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-800 transition"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <img
            src={HeroImg}
            alt="Store Rating Illustration"
            className="w-full max-w-xs md:max-w-sm h-auto object-contain rounded-2xl"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;