"use client";

import { useEffect, useState, useRef } from "react";
import YouTube from "react-youtube";

export default function MusicPlayer({ socket }) {
  const [songName, setSongName] = useState("");
  const [videoId, setVideoId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState("");
  const playerRef = useRef(null);

  useEffect(() => {
    if (!socket) return;

    const handlePlaySong = ({ id, title }) => {
      setVideoId(id);
      setCurrentlyPlaying(title);
      setIsPlaying(true);

      if (playerRef.current) {
        playerRef.current.loadVideoById(id);
      }
    };

    const handleTogglePlayPause = (status) => {
      setIsPlaying(status);
      if (playerRef.current) {
        if (status) {
          playerRef.current.playVideo();
        } else {
          playerRef.current.pauseVideo();
        }
      }
    };

    socket.on("playSong", handlePlaySong);
    socket.on("togglePlayPause", handleTogglePlayPause);

    return () => {
      socket.off("playSong", handlePlaySong);
      socket.off("togglePlayPause", handleTogglePlayPause);
    };
  }, [socket]);

  const searchAndPlaySong = async () => {
    if (!songName.trim()) return;

    const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(songName)}&key=${API_KEY}&type=video&maxResults=1`;

    try {
      const response = await fetch(searchUrl);
      const data = await response.json();


      if (!data.items || data.items.length === 0) {
        alert("No results found. Try another song.");
        return;
      }

      const firstVideo = data.items[0];
      const videoId = firstVideo.id.videoId;
      const title = firstVideo.snippet.title;

      socket.emit("playSong", { id: videoId, title });

      setVideoId(videoId);
      setCurrentlyPlaying(title);
      setIsPlaying(true);

      if (playerRef.current) {
        playerRef.current.loadVideoById(videoId);
      }
    } catch {
      alert("Error fetching video. Check logs.");
    }
  };

  const togglePlayPause = () => {
    if (!playerRef.current) return;
    const newStatus = !isPlaying;
    setIsPlaying(newStatus);

    if (newStatus) {
      playerRef.current.playVideo();
    } else {
      playerRef.current.pauseVideo();
    }

    socket.emit("togglePlayPause", newStatus);
  };

  return (
    <div className="h-full flex flex-col items-center">
      <h2 className="text-xl font-bold">🎧 Chill Zone</h2>
      <input
        className="border p-2 mt-4 w-64 text-black"
        placeholder="Enter song name..."
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />
      <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded-md" onClick={searchAndPlaySong}>
        ▶ 
      </button>
      {currentlyPlaying && <p className="mt-2 text-lg">🎵 Playing: {currentlyPlaying}</p>}
      <YouTube
        videoId={videoId}
        opts={{
          height: "0",
          width: "0",
          playerVars: { autoplay: 1 },
        }}
        onReady={(event) => {
          playerRef.current = event.target;
        }}
        onEnd={() => {
          setIsPlaying(false);
        }}
        onError={() => {
          alert("Error playing song. Try another one.");
        }}
      />
      {videoId && (
        <button className="bg-gray-700 text-white px-4 py-2 mt-2 rounded-md" onClick={togglePlayPause}>
          {isPlaying ? "⏸" : "⏯"}
        </button>
      )}
    </div>
  );
}