import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Read query from URL
  const queryParam = new URLSearchParams(location.search);
  const rawQuery = queryParam.get("q");
  const query = rawQuery?.trim() || "";

  const isValidQuery = query.length >= 2;



  // 🔹 Fetch search results
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
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  // 🔹 Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isValidQuery) {
        fetchSearchResults();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, isValidQuery, fetchSearchResults]);

  // 🔹 Clean URL when query is too short
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (!isValidQuery && params.has("q")) {
      params.delete("q");

      navigate(
        {
          pathname: location.pathname,
          search: params.toString(),
        },
        { replace: true }
      );
    }
  }, [isValidQuery, location.pathname, location.search, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {isValidQuery && (
        <h2 className="text-xl font-semibold mb-4">
          Search results for:{" "}
          <span className="text-green-600">"{query}"</span>
        </h2>
      )}

      {loading && <p className="text-gray-600">Loading results...</p>}

      {error && (
        <p className="text-red-600 bg-red-100 p-2 rounded">{error}</p>
      )}

      {!loading && !error && searchResults.length === 0 && isValidQuery && (
        <p className="text-gray-600">
          No results found for "{query}"
        </p>
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
