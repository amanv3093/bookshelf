import React, { useEffect, useState } from "react";
import "./AddBookshelf.css";

const AddBookshelf = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBookshelf(storedBooks);
  }, []);

  const removeBookFromLocalStorage = (bookKey) => {
    const updatedBooks = bookshelf.filter((book) => book.key !== bookKey);
    localStorage.setItem("bookshelf", JSON.stringify(updatedBooks));
    setBookshelf(updatedBooks);
  };

  return (
    <div className="bookshelf-section">
      {bookshelf.length > 0 ? (
        bookshelf.map((book, index) => (
          <div key={index} className="book-card">
            <div>
              <div className="inner-box1">
                <img src={book.coverImage} alt="Book Cover" />
                <div style={{ padding: "15px" }}>
                  <h3>Title: {book.title.slice(0, 18) || "N/A"}..</h3>
                  <p>
                    Author: {book.author_name ? book.author_name[0] : "N/A"}
                  </p>
                  <p>Edition Count: {book.edition_count || "N/A"}</p>
                  <p>
                    Language: {book.language ? book.language.join(", ") : "N/A"}
                  </p>
                  <p>First Publish Year: {book.first_publish_year || "N/A"}</p>
                </div>
              </div>
            </div>
            <div className="deleteButton addButton" style={{ padding: "15px" }}>
              <button onClick={() => removeBookFromLocalStorage(book.key)}>
                Remove from Bookshelf
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="NoBook">No books in bookshelf</div>
      )}
    </div>
  );
};

export default AddBookshelf;
