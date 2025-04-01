import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import MusicPlayer from "./MusicPlayer";
import FindSong from "./FindSong"
import AlbumFilter from "./AlbumFilter";
import "./Music.css"
import songs from "./songs"

// const songs = [
//   { title: "Thriller", author: "Michael Jackson", album: "Thriller, HIStory", src: "https://www.youtube.com/embed/0JFbiCg-8n4?si=ICb4dAVdczaiP9dE?rel=0&controls=0&modestbranding=1&showinfo=0" },
//   { title: "Billie Jean", author: "Michael Jackson", album: "Thriller, HIStory", src: "https://www.youtube.com/embed/Zi_XLOBDo_Y?rel=0&controls=0&modestbranding=1&showinfo=0" },
//   { title: "Beat It", author: "Michael Jackson", album: "Thriller, HIStory", src: "https://www.youtube.com/embed/oRdxUFDoQe0?rel=0&controls=0&modestbranding=1&showinfo=0" },
// ]

const songsPerPage = 8;

function Music() {
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState("All");
  const [highlightedSong, setHighlightedSong] = useState(null);
  const songRefs = useRef({}); 

  const navigate = useNavigate();
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  useEffect(() => {
    const savedAlbum = params.get("album") || "All";
    const savedPage = parseInt(params.get("page"), 10) || 1;
    setSelectedAlbum(savedAlbum);
    setCurrentPage(savedPage);
  }, [params]);

  useEffect(() => {
    setCurrentPlaying(null); // Reset bài hát đang phát
  }, [selectedAlbum]); // Chạy khi đổi album hoặc trang
  

  // Lọc bài hát theo album ban đầu
  useEffect(() => {
    let sortedSongs = [...songs];
  
    if (selectedAlbum === "Favorite Songs") {
      const likedTitles = JSON.parse(localStorage.getItem("likedSongs")) || [];
      sortedSongs = songs.filter((song) => likedTitles.includes(song.title));
    } else if (selectedAlbum !== "All") {
      sortedSongs = songs.filter((song) =>
        song.album
          .split("|")
          .map((a) => a.trim())
          .includes(selectedAlbum)
      );
    }
  
    setFilteredSongs(sortedSongs); // Cập nhật danh sách bài hát
  }, [selectedAlbum, songs]);

  // Lấy danh sách bài hát theo trang
  const currentSongs = useMemo(() => {
    const start = (currentPage - 1) * songsPerPage;
    return filteredSongs.slice(start, start + songsPerPage);
  }, [filteredSongs, currentPage]);

  useEffect(() => {
    const newParams = new URLSearchParams();
    newParams.set("album", selectedAlbum);
    newParams.set("page", currentPage);
    navigate(`?${newParams.toString()}`, { replace: true });
  }, [currentPage, selectedAlbum, navigate]);

  

  const totalPages = Math.ceil(filteredSongs.length / songsPerPage);

  const handlePlay = (index) => {
    setCurrentPlaying(index);
  };

  const handleNextSong = () => {
    const nextIndex = currentPlaying + 1;
    if (nextIndex < currentSongs.length) {
      setCurrentPlaying(nextIndex);
    } else if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setCurrentPlaying(0);
    } else {
      setCurrentPage(1);
      setCurrentPlaying(0);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
    setCurrentPlaying(null);
  };

  // 🔥 Scroll đến bài hát
  const scrollToSong = (title) => {
    const songElement = songRefs.current[title];
    if (songElement) {
      songElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleSearch = (query) => {
    setCurrentPlaying(null);
  
    // 🔍 Tìm bài hát trong danh sách
    const foundSongIndex = songs.findIndex((song) =>
      song.title.toLowerCase().includes(query.toLowerCase())
    );
  
    if (foundSongIndex !== -1) {
      const newPage = Math.floor(foundSongIndex / songsPerPage) + 1;
  
      // 🔄 Đặt album về "All" để chắc chắn bài hát hiển thị
      setSelectedAlbum("All");
  
      // 🌍 Cập nhật URL trước để đảm bảo điều hướng
      const newParams = new URLSearchParams();
      newParams.set("album", "All");
      newParams.set("page", newPage);
      navigate(`?${newParams.toString()}`, { replace: true });
  
      // ✅ Đợi danh sách cập nhật xong rồi mới cuộn
      setTimeout(() => {
        setCurrentPage(newPage);
        setTimeout(() => {
          const updatedSongIndex = songs.findIndex((s) => s.title.toLowerCase().includes(query.toLowerCase()));
          if (updatedSongIndex !== -1) {
            songRefs.current[songs[updatedSongIndex].title]?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
  
            setTimeout(() => {
              setHighlightedSong(updatedSongIndex);
              setTimeout(() => setHighlightedSong(null), 2000); // Hiệu ứng tồn tại 2s rồi tắt
            }, 300);
          }
        }, 500); // Đợi trang cập nhật xong
      }, 100);
    }
  };
  

  
  

  return (
    <div className="Music">
      <h1 className="Music-heading">Michael Jackson’s Top Songs</h1>

      <div className="Music-control">
        <FindSong 
          songs={songs} 
          onSearch={handleSearch} 
          scrollToSong={scrollToSong} 
          setSelectedAlbum={setSelectedAlbum}
          setCurrentPage={setCurrentPage} 
          navigate={navigate} 
        />


        <AlbumFilter
          songs={songs}
          selectedAlbum={selectedAlbum}
          setSelectedAlbum={setSelectedAlbum}
          onFilter={setFilteredSongs}
          setCurrentPage={setCurrentPage} // ✅ Truyền setCurrentPage
        />
      </div>

      <div className="Music-box">
        {currentSongs.length > 0 ? (
          currentSongs.map((song, index) => {
            const globalIndex = (currentPage - 1) * songsPerPage + index;
            return (
                <MusicPlayer
                  key={song.title} 
                  ref={(el) => (songRefs.current[song.title] = el)}
                  song={song}
                  isPlaying={currentPlaying === index}
                  onPlay={() => handlePlay(index)}
                  onEnd={handleNextSong}
                  isHighlighted={highlightedSong === globalIndex}
                />
            );
          })
        ) : (
          <p className="Music-no-results">No songs found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <ReactPaginate
          previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
          nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          forcePage={currentPage - 1}
          containerClassName={"Music-pagination"}
          activeClassName={"active"}
          previousClassName={"prev"}
          nextClassName={"next"}
          disabledClassName={"disabled"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
        />
      )}
    </div>
  );
}

export default Music;

