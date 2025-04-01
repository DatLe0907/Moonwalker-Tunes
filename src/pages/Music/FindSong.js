import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./FindSong.css";

const FindSong = ({ onSearch, songs, scrollToSong }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filteredSongs = songs.filter((song) =>
      song.title.toLowerCase().includes(query)
    );

    setSuggestions(filteredSongs.slice(0, 10)); 
  }, [searchQuery, songs]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    onSearch(searchQuery);
    setSuggestions([]);
  };

  const handleSuggestionClick = (title) => {
    setSearchQuery(title);
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
        onChange={(e) => setSearchQuery(e.target.value)}
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
