import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./FindSong.css";

const FindSong = ({ onSearch, songs, scrollToSong }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionRefs = useRef([]);

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
    scrollToSong(searchQuery); // Cuộn đến bài hát
    setSearchQuery(""); // Làm trống input
    setSuggestions([]); // Xóa gợi ý
  };

  const handleSuggestionClick = (title) => {
    setSearchQuery(""); // Làm trống input
    setSuggestions([]); // Xóa gợi ý
    onSearch(title);
    scrollToSong(title); // Cuộn đến bài hát
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prevIndex) => {
        const newIndex = prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0;
        scrollToSelected(newIndex); // Cuộn đến mục được chọn
        return newIndex;
      });
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prevIndex) => {
        const newIndex = prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1;
        scrollToSelected(newIndex); // Cuộn đến mục được chọn
        return newIndex;
      });
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        handleSuggestionClick(suggestions[selectedIndex].title);
      } else {
        handleSearch();
      }
    }
  };

  const scrollToSelected = (index) => {
    if (suggestionRefs.current[index]) {
      suggestionRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
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
         <li
           key={index}
           ref={(el) => (suggestionRefs.current[index] = el)} // Gán ref cho từng mục
           onClick={() => handleSuggestionClick(song.title)}
           className={index === selectedIndex ? "selected" : ""}
         >
           {song.title}
         </li>
       ))}
     </ul>
      )}
    </div>
  );
};

export default FindSong;
