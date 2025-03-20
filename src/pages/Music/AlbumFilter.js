import "./AlbumFilter.css";
import React, { useMemo, useCallback } from "react";

const AlbumFilter = ({ selectedAlbum, setSelectedAlbum, setCurrentPage, songs, onFilter }) => {
  const albums = useMemo(() => {
    const albumCount = new Map();

    songs.forEach((song) => {
      song.album.split("|").forEach((a) => {
        const album = a.trim();
        albumCount.set(album, (albumCount.get(album) || 0) + 1);
      });
    });

    return ["All", ...Array.from(albumCount.entries()).sort((a, b) => b[1] - a[1]).map(([album]) => album)];
  }, [songs]);

  const handleAlbumChange = useCallback((e) => {
    const album = e.target.value;
    setSelectedAlbum(album);
    setCurrentPage(1); // 🔥 Reset trang về 1 khi đổi album

    const filtered = album === "All"
      ? songs
      : songs.filter(song => song.album.split(",").some(a => a.trim() === album));

    onFilter(filtered);
  }, [songs, setSelectedAlbum, setCurrentPage, onFilter]);

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
