import React, { useContext, useEffect, useState } from "react";
import { context_music } from "../App.js";
import "../SCSS/MusicPlayer.scss";
import axios from "axios";
import song_data from "../Song_data.json";
import playlist from "../playlist.json"

export default function MusicPlayer(props) {
  const [mute, setMute] = useState("false");
  const [val, setVal] = useState(0);
  const songArray = Object.values(song_data);
  const playlist_array=Object.values(playlist)

  const [played, setPlayed] = useState("false")
  const { musicPlayer, setMusicPlayer, myMusic, setmyMusic, liked, setLiked, likedSongs, setLikedSongs, musicinprogress, setMusicinprogress } = useContext(context_music);

  // ----------------------------------------------------------------------------

  useEffect(() => {
    liked.forEach((element, index) => {
      const apiUrl = "http://localhost:3001/readLikedSongs";

      return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          setLikedSongs(data.content);
          if (data.content.includes(index + 1)) {
            liked[index] = true;
          }
          else {
            liked[index] = false;
          }
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    })
  }, [])

  useEffect(() => {
    fetch("http://localhost:3001/readPlayingMusic")
      .then(response => response.json())
      .then(data => {
        if (Object.values(data.content).length === 1) {
          setMusicPlayer(true);
          setmyMusic(songArray[data.content.Id-1]);
        }
        else {
          setMusicPlayer(false);
        }
      })
  }, [])

  useEffect(() => {
    const arr = [...musicinprogress];
    arr.fill(false);
    arr[myMusic.Id - 1] = true;
    setMusicinprogress(arr);
  }, [myMusic])

  useEffect(() => {
    if (props.musicClicked === "true") {
      let music = document.querySelector("#music");
      let progress = document.querySelector("#progress");
      music.play();
      progress.value = 0;
      music.currentTime = 0;
      props.setMusicClicked("false");
      setPlayed("true");
    }
  }, [props.musicClicked]);

  useEffect(() => {
    let progress = document.querySelector("#progress");
    let music = document.querySelector("#music");
    let sound = document.querySelector("#sound_progress");

    music.onloadedmetadata = function () {
      progress.max = music.duration;
      progress.value = music.currentTime;
    };

    if (played === "true") {
      const interval = setInterval(() => {
        progress.value = music.currentTime;
      }, 500);
      return () => clearInterval(interval);
    }

    progress.onchange = () => {
      music.currentTime = progress.value;
    };

    sound.addEventListener("input", () => {
      music.volume = sound.value / 100;
      if (sound.value / 100 === 0) {
        setMute("true");
      } else {
        setMute("false");
      }
    });
  }, [played]);

  // --------------------------------------------------------------------------------

  function reload_song() {
    let progress = document.querySelector("#progress");
    let music = document.querySelector("#music");

    music.currentTime = 0;
    progress.value = 0;
  }

  const play_music = () => {
    let music = document.querySelector("#music");
    music.play();
    setPlayed("true")
  };

  // ---------------------------------------------------------------------------------------------

  const pause_music = () => {
    let music = document.querySelector("#music");
    music.pause();
    setPlayed("false");
  };

  const mute_speaker = () => {
    let music = document.querySelector("#music");
    let sound = document.querySelector("#sound_progress");
    setVal(sound.value);
    setMute("true");
    sound.value = 0;
    music.volume = 0;
  }

  const unmute_speaker = () => {
    let music = document.querySelector("#music");
    let sound = document.querySelector("#sound_progress");
    setMute("false");
    sound.value = val;
    music.volume = val / 100;
  }

  // ----------------------------------------------------------------------------------

  const toggleLikedStatus = (index) => {
    const updatedLiked = [...liked];
    updatedLiked[index] = !updatedLiked[index];
    setLiked(updatedLiked);
    localStorage.setItem("beatx_json", JSON.stringify(updatedLiked));
  };

  function addSong(song) {
    const arr = [...likedSongs];
    arr.push(song.Id);
    setLikedSongs(arr);
    axios.post("http://localhost:3001/readLikedSongs", arr)
      .then(response => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function removeSong(song) {
    const arr = [...likedSongs];
    const newarr = arr.filter(item => item !== song.Id);
    setLikedSongs(newarr);
    axios.post("http://localhost:3001/readLikedSongs", newarr)
      .then(response => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function next_song(element){
    const index=playlist_array.indexOf(element);
    axios.post("http://localhost:3001/readPlayingMusic", {"Id":playlist_array[index+1]});
    setmyMusic(songArray[playlist_array[index+1]-1]);
    props.setMusicClicked("true");
  }

  function prevous_song(element){
    const index=playlist_array.indexOf(element);
    axios.post("http://localhost:3001/readPlayingMusic", {"Id":playlist_array[index-1]});
    setmyMusic(songArray[playlist_array[index-1]-1]);
    props.setMusicClicked("true");
  }

  return (
    <div
      id="music_player"
      style={
        musicPlayer
          ? { visibility: "visible" }
          : { visibility: "hidden" }
      }
    >
      <audio
        controls
        src={myMusic.Songs}
        type="audio/mp3"
        id="music"
        onEnded={()=>{next_song(myMusic.Id)}}
      ></audio>
      <div id="left_part">
        <div>
          <img src={"../Images/Song_Images/" + myMusic.Image} alt={myMusic.Name}></img>
        </div>
        <div style={{ color: "white", overflow: "hidden", width: "200px", height: "55px" }}>
          {myMusic.Name && (
            <p style={{ height: "30px", fontSize: "20px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "left" }}>
              {myMusic.Name.replace(/_/g, " ")}
            </p>
          )}
          {myMusic.Name && (
            <p style={{ opacity: "50%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: "-20px", textAlign: "left" }}>
              {myMusic.singers}
            </p>
          )}
        </div>
        <div id="likes" style={{ cursor: "pointer" }} onClick={() => toggleLikedStatus(myMusic.Id - 1)}>
          {
            !liked[myMusic.Id - 1]
              ?
              <i className="fa-regular fa-heart" style={{ color: "#ffffff" }} onClick={() => addSong(myMusic)}></i>
              :
              <i className="fa-solid fa-heart" style={{ color: "#ffffff" }} onClick={() => removeSong(myMusic)}></i>
          }
        </div>
      </div>
      <div id="middle_part">
        <div id="music_controllers">
          <div>
            <i
              className="fa-solid fa-backward"
              style={{ color: "#ffffff", cursor: "pointer" }}
              // onClick={reload_song}
              onClick={()=>{prevous_song(myMusic.Id)}}
            ></i>
          </div>
          <div>
            {played === "false" ? (
              <i
                className="fa-solid fa-play"
                style={{ color: "#ffffff", cursor: "pointer" }}
                onClick={() => {
                  play_music();
                }}
              ></i>
            ) : (
              <i
                className="fa-solid fa-pause"
                style={{ color: "#ffffff", cursor: "pointer" }}
                onClick={() => {
                  pause_music();
                }}
              ></i>
            )}
          </div>
          <div>
            <i className="fa-solid fa-forward" style={{ color: "#ffffff",cursor:"pointer" }} onClick={()=>{next_song(myMusic.Id)}}></i>
          </div>
        </div>
        <div id="music_progress">
          <input type="range" style={{ width: "70%" }} id="progress"></input>
        </div>
      </div>
      <div>
        <div id="sound_controller">
          <div>
            {mute === "false" ? (
              <i
                className="fa-solid fa-volume-high"
                style={{ color: "#ffffff", cursor: "pointer" }}
                onClick={() => {
                  mute_speaker()
                }}
              ></i>
            ) : (
              <i
                className="fa-solid fa-volume-xmark"
                style={{ color: "#ffffff", cursor: "pointer" }}
                onClick={() => {
                  unmute_speaker()
                }}
              ></i>
            )}
          </div>
          <div style={{ marginTop: "2px" }}>
            <input
              type="range"
              max="100"
              style={{ width: "100px", cursor: "pointer" }}
              id="sound_progress"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
