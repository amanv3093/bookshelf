import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import debounce from "lodash.debounce";

export const Context = createContext(null);

export const UseContext = () => {
  return useContext(Context);
};

export const ContextProvider = (props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=YOUR_QUERY&limit=10&page=1`
      );
      setResults(response.data.docs);
    } catch (error) {
      console.error("Error fetching all data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchSearchResults = async (value) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${value}&limit=10&page=1`
      );
      setResults(response.data.docs);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchSearchResults = useCallback(
    debounce(fetchSearchResults, 300),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      debouncedFetchSearchResults(value);
    } else if (value.length === 0) {
      fetchAllData();
    }
  };

  const addBookToLocalStorage = (book) => {
    const existingBooks = JSON.parse(localStorage.getItem("bookshelf")) || [];
    const updatedBooks = [...existingBooks, book];
    localStorage.setItem("bookshelf", JSON.stringify(updatedBooks));
  };

  const isBookInLocalStorage = (book) => {
    const existingBooks = JSON.parse(localStorage.getItem("bookshelf")) || [];
    return existingBooks.some((b) => b.key === book.key);
  };

  const removeBookFromLocalStorage = (bookKey) => {
    const existingBooks = JSON.parse(localStorage.getItem("bookshelf")) || [];
    const updatedBooks = existingBooks.filter((book) => book.key !== bookKey);
    localStorage.setItem("bookshelf", JSON.stringify(updatedBooks));
  };

  return (
    <Context.Provider
      value={{
        query,
        setQuery,
        results,
        setResults,
        handleSearch,
        loading,
        addBookToLocalStorage,
        isBookInLocalStorage,
        removeBookFromLocalStorage,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
