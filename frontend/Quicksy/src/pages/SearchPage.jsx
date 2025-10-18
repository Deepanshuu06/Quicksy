import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

// Optional: use a loader spinner
// import Loader from "../components/Loader";

const SearchPage = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryParam = new URLSearchParams(location.search);

  const query = queryParam.get("q")?.trim() || "";

  const fetchSearchResults = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:7777/api/v1/public/search?search=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results.");
      }

      const data = await response.json();
      setSearchResults(data?.data?.products || []);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  // Debounce: delay search until user stops typing for 300ms
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 2) {
        fetchSearchResults();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, fetchSearchResults]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Search results for: <span className="text-green-600">"{query}"</span>
      </h2>

      {loading && (
        <p className="text-gray-600">Loading results...</p>
        // Or show a spinner here instead of text
        // <Loader />
      )}

      {error && (
        <p className="text-red-600 bg-red-100 p-2 rounded">{error}</p>
      )}

      {!loading && !error && searchResults.length === 0 && query.length > 2 && (
        <p className="text-gray-600">No results found for "{query}"</p>
      )}

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {searchResults.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
