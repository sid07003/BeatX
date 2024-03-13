import React, { useState, useEffect, createContext } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Tabs/Home";
import Artist from "./Tabs/Artist";
import MusicPlayer from "./Components/MusicPlayer";
import song_data from "./Song_data.json";
import LikedSongs from "./Tabs/Liked_Songs";
import Search from "./Tabs/Search";
import Playlists from "./Tabs/Playlists";
import Playlist_songs from "./Tabs/Playlist_songs";
import Add_Songs from "./Tabs/Add_Songs";

export const context_music = createContext();

function App() {
  // ------------------------------------------------------------------------------------
  const songArray = Object.values(song_data);
  const initialLikedSongs = JSON.parse(localStorage.getItem("beatx_json")) ||
    Array.from({ length: Object.keys(song_data).length }, () => false);

  const [liked, setLiked] = useState(initialLikedSongs);
  const [musicClicked, setMusicClicked] = useState("false");
  const [likedSongs, setLikedSongs] = useState([])
  const [musicPlayer, setMusicPlayer] = useState(false);
  const [myMusic, setmyMusic] = useState({});
  const [headerSong, setHeaderSong] = useState({});
  const [musicinprogress, setMusicinprogress] = useState(Array.from({ length: Object.keys(song_data).length }, () => false));
  const [whichPlaylist, setWhichPlaylist] = useState();
  const [allPlaylists, setAllPlaylists] = useState({})

  useEffect(() => {
    const apiUrl = "http://localhost:3001/readLikedSongs";
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setLikedSongs(data.content);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <context_music.Provider value={{
          myMusic, setmyMusic, liked, setLiked, likedSongs,
          setLikedSongs, musicPlayer, setMusicPlayer, headerSong, setHeaderSong, musicinprogress, setMusicinprogress, 
          whichPlaylist, setWhichPlaylist, allPlaylists, setAllPlaylists
        }}>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/artist/:artistData"
              element={
                <Artist
                  setMusicClicked={setMusicClicked}
                />
              }
            ></Route>
            <Route
              path="/LikedSongs"
              element={
                <LikedSongs musicClicked={musicClicked}
                  setMusicClicked={setMusicClicked} />
              }
            ></Route>
            <Route
              path="/SearchSongs"
              element={
                <Search setMusicClicked={setMusicClicked} />
              }
            ></Route>
            <Route
              path="/myPlaylist"
              element={
                <Playlists />
              }
            ></Route>
            <Route
              path="/addSongs"
              element={
                <Add_Songs />
              }
            ></Route>
            <Route
              path="/:playlistName"
              element={
                <Playlist_songs setMusicClicked={setMusicClicked}/>
              }
            ></Route>
          </Routes>
          <MusicPlayer
            musicClicked={musicClicked}
            setMusicClicked={setMusicClicked}
          />
        </context_music.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
