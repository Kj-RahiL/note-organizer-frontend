import { IoArrowBack, IoHome } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Error number */}
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Page not found</h2>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist anymore.
        </p>

        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <IoArrowBack className="-ml-1 mr-2 h-5 w-5" />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <IoHome className="-ml-1 mr-2 h-5 w-5" />
            Go Home
          </button>
        </div>
      </div>

      {/* Optional: Search bar */}
      <div className="mt-10 w-full max-w-md">
        <label htmlFor="search" className="sr-only">Search</label>
        <div className="relative">
          <input
            id="search"
            name="search"
            className="block w-full rounded-md border-gray-300 pl-4 pr-12 py-3 text-base shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search our site..."
            type="search"
          />
          <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            <button className="inline-flex items-center rounded px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;