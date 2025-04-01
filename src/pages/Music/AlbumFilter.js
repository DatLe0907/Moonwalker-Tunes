import "./AlbumFilter.css";
import React, { useMemo, useCallback, useState, useEffect } from "react";

const AlbumFilter = ({ selectedAlbum, setSelectedAlbum, setCurrentPage, songs, onFilter }) => {
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  // Lấy danh sách bài hát đã thích từ localStorage
  useEffect(() => {
    const likedTitles = JSON.parse(localStorage.getItem("likedSongs")) || [];
    // Lọc danh sách bài hát đầy đủ dựa trên title đã thích
    const likedSongs = songs.filter(song => likedTitles.includes(song.title));
    setFavoriteSongs(likedSongs);
  }, [songs]);

  const albums = useMemo(() => {
    const albumCount = new Map();

    songs.forEach((song) => {
      song.album.split("|").forEach((a) => {
        const album = a.trim();
        albumCount.set(album, (albumCount.get(album) || 0) + 1);
      });
    });

    return ["All", "Favorite Songs", ...Array.from(albumCount.keys()).sort()];
  }, [songs]);

  const handleAlbumChange = useCallback((e) => {
    const album = e.target.value;
    setSelectedAlbum(album);
    setCurrentPage(1);

    const filtered =
      album === "All"
        ? songs
        : album === "Favorite Songs"
        ? favoriteSongs // 🔥 Lấy danh sách bài hát đã thích
        : songs.filter((song) => song.album.split("|").some((a) => a.trim() === album));

    onFilter(filtered);
  }, [songs, setSelectedAlbum, setCurrentPage, onFilter, favoriteSongs]);

  return (
    <select className="Music-filter" value={selectedAlbum} onChange={handleAlbumChange}>
      {albums.map((album) => (
        <option key={album} value={album}>
          {album}
        </option>
      ))}
    </select>
  );
};

export default AlbumFilter;
