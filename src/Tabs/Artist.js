import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../SCSS/Artist.scss";
import data from "../data.json";
import { context_music } from "../App.js";
import song_data from "../Song_data.json";
import axios from "axios";

export default function Artist(props) {
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

  // ---------------------------------------------------------------------------------

  const { setmyMusic, liked, setLiked, likedSongs, setLikedSongs, musicPlayer, musicinprogress, setMusicinprogress } = useContext(context_music);

  // ----------------------------------------------------------------------------------
 
  const { artistData } = useParams();
  const artistsArray = Object.values(data.Artists);
  const singer = artistsArray.find((obj) => ":" + obj.Id === artistData);
  const singerArray = Object.values(singer.artist_songs);
  const songArray = Object.values(song_data);

  // ----------------------------------------------------------------------------------

  function begin(element) {
    axios.post("http://localhost:3001/readPlayingMusic", { "Id": element.Id })
    setmyMusic(songArray[element.Id - 1]);
    props.setMusicClicked("true");
  }

  function begin_playlist() {
    const song = songArray.find((item) => item.Id === parseInt(singerArray[0]))
    axios.post("http://localhost:3001/readPlayingMusic", { "Id": song.Id })
    setmyMusic(songArray[song.Id-1]);
    props.setMusicClicked("true");
  }

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

  return (
    <div id="Artist" style={
      musicPlayer
        ?
        { height: "calc(100vh  - 70px)" }
        :
        { height: "100vh" }
    }>
      <div id="info">
        <div id="container">
          <img src={singer.Image} alt={singer.Name} id="singer" />
        </div>
        <div id="details">
          <div id="Name">{singer.Name}</div>
          <div id="song_info">
            <div>{singerArray.length} Songs</div>
            <div style={{ marginLeft: "20px" }}>*</div>
            <div style={{ marginLeft: "20px" }}>40 Minutes</div>
          </div>
          <div id="play_all" onClick={() => begin_playlist()}>
            <div>
              <i className="fa-solid fa-play"></i>
            </div>
            <div style={{ paddingLeft: "8px" }}>Play All</div>
          </div>
        </div>
      </div>

      <div id="playlist">
        <div id="title">
          <div id="blank"></div>
          <div id="title_name">Name</div>
          <div id="title_duration">Duration</div>
          <div id="title_likes"></div>
        </div>

        <div id="body" style={{ width: "95%" }}>
          {singerArray.map((element, index) => {
            const song = songArray.find((item) => item.Id === parseInt(element))
            return (
              musicinprogress[song.Id - 1] ?
                <div
                  id="songs"
                  style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
                >
                  <div id="blank" onClick={
                    () => begin(song)
                  }>
                    <img
                      src={"../Images/Song_Images/" + song.Image}
                      alt={song.Name}
                      style={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "5px",
                      }}
                    ></img>
                  </div>

                  <div
                    id="body_name"
                    onClick={
                      () => begin(song)
                    }
                  >
                    <div>
                      {song.Name.replace(/_/g, " ")}
                    </div>
                    <div id="body_icon" style={{ paddingLeft: "15px" }}>
                      <iframe src="https://giphy.com/embed/qWLNlDMfimhXtM5g0M" style={{ pointerEvents: "none", height: "50px", width: "50px" }}></iframe>
                    </div>
                  </div>

                  <div id="body_duration"
                    onClick={
                      () => begin(song)
                    }>{song.Duration}</div>
                  <div id="title_likes" onClick={() => toggleLikedStatus(song.Id - 1)}>
                    {
                      !liked[song.Id - 1]
                        ?
                        <i className="fa-regular fa-heart" style={{ color: "#ffffff" }} onClick={() => addSong(song)}></i>
                        :
                        <i className="fa-solid fa-heart" style={{ color: "#ffffff" }} onClick={() => removeSong(song)}></i>
                    }
                  </div>
                </div> :
                <div
                  id="songs"
                >
                  <div id="blank" onClick={
                    () => begin(song)
                  }>
                    <img
                      src={"../Images/Song_Images/" + song.Image}
                      alt={song.Name}
                      style={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "5px",
                      }}
                    ></img>
                  </div>

                  <div
                    id="body_name"
                    onClick={
                      () => begin(song)
                    }
                    style={{ width: "30%" }}
                  >
                    {song.Name.replace(/_/g, " ")}
                  </div>
                  <div id="body_duration"
                    onClick={
                      () => begin(song)
                    }>{song.Duration}</div>
                  <div id="title_likes" onClick={() => toggleLikedStatus(song.Id - 1)}>
                    {
                      !liked[song.Id - 1]
                        ?
                        <i className="fa-regular fa-heart" style={{ color: "#ffffff" }} onClick={() => addSong(song)}></i>
                        :
                        <i className="fa-solid fa-heart" style={{ color: "#ffffff" }} onClick={() => removeSong(song)}></i>
                    }
                  </div>
                </div>
            );
          })}
        </div>
      </div>
    </div >
  );
}
