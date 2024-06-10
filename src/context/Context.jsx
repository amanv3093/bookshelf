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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAllData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=YOUR_QUERY&limit=10&page=${page}`
      );
      setResults(response.data.docs);
      setTotalPages(Math.ceil(response.data.numFound / 10)); 
    } catch (error) {
      console.error("Error fetching all data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData(page);
  }, [page]);

  const fetchSearchResults = async (value, page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${value}&limit=10&page=${page}`
      );
      setResults(response.data.docs);
      setTotalPages(Math.ceil(response.data.numFound / 10));
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
    setPage(1);
    if (value.length > 1) {
      debouncedFetchSearchResults(value, 1);
    } else if (value.length === 0) {
      fetchAllData(1);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    if (query.length > 1) {
      fetchSearchResults(query, value);
    } else {
      fetchAllData(value);
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
        page,
        setPage,
        totalPages,
        handlePageChange,
        addBookToLocalStorage,
        isBookInLocalStorage,
        removeBookFromLocalStorage,
        fetchAllData,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
