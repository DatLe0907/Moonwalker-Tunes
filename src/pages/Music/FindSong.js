import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./FindSong.css";

const FindSong = ({ onSearch, songs, scrollToSong }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearchQuery(query);
  
    if (query === "") {
      setSuggestions([]);
    } else {
      const filteredSongs = songs.filter((song) => {
        const words = song.title.toLowerCase().split(" ");
        const firstLetters = words.map(word => word.charAt(0)).join("");

        return (
          song.title.toLowerCase().startsWith(query) ||
          firstLetters.startsWith(query.replace(/\s+/g, ""))
        );
      });

      setSuggestions(filteredSongs.slice(0, 5));
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
    onSearch(searchQuery);
    scrollToSong(searchQuery);
    setSearchQuery(""); // 🔥 Xóa nội dung input sau khi tìm kiếm
    setSuggestions([]);
  };

  const handleSuggestionClick = (title) => {
    setSearchQuery("");
    setSuggestions([]);
    onSearch(title);
    scrollToSong(title);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="Music-search">
      <input
        type="text"
        placeholder="Search for a song..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="search-input"
      />
      <button className="search-button" onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} />
      </button>

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((song, index) => (
            <li key={index} onClick={() => handleSuggestionClick(song.title)}>
              {song.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FindSong;
