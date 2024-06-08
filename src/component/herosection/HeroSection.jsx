import { UseContext } from "../../context/Context";
import "./HeroSection.css";
import img2 from "../../assests/photo-1532012197267-da84d127e765 (1).avif";
const HeroSection = () => {
  const { results, loading } = UseContext();

  return (
    <div className="hero-section">
      {loading ? (
        <div className="loading-indicator">Loading...</div>
      ) : results.length > 0 ? (
        results.map((result, index) => (
          <div key={index} className="book-card">
            <div>
              {/* <img src={img2} /> */}
              <h3>Title: {result.title.slice(0, 18) || "N/A"}..</h3>
              <p>
                Author: {result.author_name ? result.author_name[0] : "N/A"}
              </p>
              <p>Edition Count: {result.edition_count || "N/A"}</p>
              <p>
                Language: {result.language ? result.language.join(", ") : "N/A"}
              </p>
              <p>First Publish Year: {result.first_publish_year || "N/A"}</p>
            </div>
            <div className="addButton">
              <button>Add to Bookshelf</button>
            </div>
          </div>
        ))
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
};

export default HeroSection;
