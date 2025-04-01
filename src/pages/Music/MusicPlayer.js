import { useState, useRef, useEffect, useCallback } from "react";
import "./MusicPlayer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function MusicPlayer({ song, isPlaying, onPlay, onEnd, isHighlighted }) {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(240);
  const [isReplay, setIsReplay] = useState(false);
  const [likedSongs, setLikedSongs] = useState(() => {
    return JSON.parse(localStorage.getItem("likedSongs")) || []; // Lấy danh sách từ localStorage
  });

  const isLiked = likedSongs.includes(song.title);

  const toggleLike = () => {
    let updatedLikedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];
  
    if (isLiked) {
      // Nếu bài hát đã thích, xóa khỏi danh sách
      updatedLikedSongs = updatedLikedSongs.filter((title) => title !== song.title);
    } else {
      // Nếu bài hát chưa thích, thêm vào danh sách
      updatedLikedSongs.push(song.title);
    }
  
    setLikedSongs(updatedLikedSongs); // Cập nhật state
    localStorage.setItem("likedSongs", JSON.stringify(updatedLikedSongs)); // Lưu vào localStorage
  };
  

  const getYouTubeId = (url) => url.match(/embed\/([a-zA-Z0-9_-]+)/)?.[1] || null;

  useEffect(() => {
    if (!isPlaying) return;

    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.onload = () => window.YT && loadVideo();
      document.body.appendChild(script);
    } else {
      loadVideo();
    }
  }, [isPlaying, isReplay]);

  const loadVideo = useCallback(() => {
    const videoId = getYouTubeId(song.src);
    if (!videoId || !playerRef.current) return;

    if (player) {
      player.destroy();
    }

    const newPlayer = new window.YT.Player(playerRef.current, {
      videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        disablekb: 1,
        loop: isReplay ? 1 : 0,
        playlist: videoId,
      },
      events: {
        onReady: (event) => {
          setPlayer(event.target);
          setVideoDuration(event.target.getDuration() || 240);
          event.target.playVideo();
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            isReplay ? event.target.seekTo(0) : onEnd();
            event.target.playVideo();
          }
        },
      },
    });

    setPlayer(newPlayer);
  }, [song.src, playerRef, player, isReplay, onEnd]);

  useEffect(() => {
    if (!player) return;
    let animationFrame;
    const updateProgress = () => {
      if (player.getCurrentTime) {
        const time = player.getCurrentTime();
        setCurrentTime(time);
        setProgress((time / videoDuration) * 100);
      }
      animationFrame = requestAnimationFrame(updateProgress);
    };
    updateProgress();
    return () => cancelAnimationFrame(animationFrame);
  }, [player, videoDuration]);

  useEffect(() => () => player?.destroy(), [player]);

  const handlePlay = () => {
    player ? player.playVideo() : loadVideo();
    onPlay();
  };

  const handleSeekEnd = () => {
    if (player) {
      player.seekTo(currentTime, true);
    }
  };

  const handleClickOnProgress = (e) => {
    if (!player) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const newTime = ((clientX - rect.left) / rect.width) * videoDuration;
    setCurrentTime(newTime);
    setProgress((newTime / videoDuration) * 100);
    player.seekTo(newTime, true);
  };

  return (
    <div className={`music-card ${isHighlighted ? "highlight" : ""}`}>
      {isPlaying ? (
        <>
          <div className="music-player">
            <div ref={playerRef} className="music-video"></div>
          </div>
          <div className="controls">
            <div className="progress-container" onClick={handleClickOnProgress}>
              <input
                type="range"
                min="0"
                max={videoDuration}
                value={currentTime}
                onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
                onMouseUp={handleSeekEnd}
                onTouchEnd={handleSeekEnd}
                className="progress-slider"
                style={{ "--progress": `${progress}%` }}
              />
            </div>
            <button
              className={`replay-button ${isReplay ? "active" : ""}`}
              onClick={() => setIsReplay(!isReplay)}
            >
              <FontAwesomeIcon icon={faRepeat} />
            </button>
          </div>
        </>
      ) : (
        <div className="thumbnail" onClick={handlePlay}>
          <img
            src={`https://img.youtube.com/vi/${getYouTubeId(song.src)}/hqdefault.jpg`}
            alt={song.title}
            className="thumbnail-image"
          />
          <button className="play-button">▶</button>
        </div>
      )}
      <div className="song-info">
        <h3 className="song-title">{song.title}</h3>
        <p
          className="song-album"
          dangerouslySetInnerHTML={{
            __html: `Album: ${song.album.replace(/\|/g, ' <strong style = "color: #fff">|</strong> ')}`,
          }}
        ></p>
      </div>

      <button
        className={`like-button ${isLiked ? "active" : ""}`}
        onClick={toggleLike}
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>
    </div>
  );
}
