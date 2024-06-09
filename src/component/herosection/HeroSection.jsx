import React, { useState, useEffect } from "react";
import { UseContext } from "../../context/Context";
import "./HeroSection.css";
import img2 from "../../assests/photo-1532012197267-da84d127e765 (1).avif";
import loader from "../../assests/Spinner@1x-1.0s-200px-200px (1).gif";
import { Pagination } from "@mui/material";

const HeroSection = () => {
  const { results, loading, addBookToLocalStorage, isBookInLocalStorage } =
    UseContext();
  const [addedBooks, setAddedBooks] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setAddedBooks(storedBooks.map((book) => book.key));
  }, []);

  const handleAddBook = (book) => {
    const bookWithCover = { ...book, coverImage: img2 };
    addBookToLocalStorage(bookWithCover);
    setAddedBooks((prevState) => [...prevState, book.key]);
  };

  return (
    <>
      <div>
        {loading ? (
          <img src={loader} alt="Loading..." />
        ) : results.length > 0 ? (
          <>
            <div className="hero-section">
              {results.map((result, index) => (
                <div key={index} className="book-card">
                  <div>
                    <div className="inner-box1">
                      <img src={img2} alt="Book Cover" />
                      <div style={{ padding: "15px" }}>
                        <h3>Title: {result.title.slice(0, 18) || "N/A"}..</h3>
                        <p>
                          Author:{" "}
                          {result.author_name ? result.author_name[0] : "N/A"}
                        </p>
                        <p>Edition Count: {result.edition_count || "N/A"}</p>
                        <p>
                          Language:{" "}
                          {result.language ? result.language.join(", ") : "N/A"}
                        </p>
                        <p>
                          First Publish Year:{" "}
                          {result.first_publish_year || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="addButton" style={{ padding: "15px" }}>
                    <button
                      onClick={() => handleAddBook(result)}
                      disabled={addedBooks.includes(result.key)}
                    >
                      {addedBooks.includes(result.key)
                        ? "Added"
                        : "Add to Bookshelf"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Pagination count={10} color="primary" />
          </>
        ) : (
          <div>No results found</div>
        )}
      </div>
    </>
  );
};

export default HeroSection;
