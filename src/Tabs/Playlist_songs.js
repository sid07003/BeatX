import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { context_music } from "../App.js";
import song_data from "../Song_data.json";
import axios from "axios";
import "../SCSS/Artist.scss";
import "../SCSS/Liked_Songs.scss";
import "../SCSS/Playlist_songs.scss";
import { Link } from "react-router-dom";
// JWt

export default function Playlist_songs(props) {
  const { playlistName } = useParams();
  const [playlist_array, setPlaylist_array] = useState([]);
  const { liked, setLiked, likedSongs, setLikedSongs, musicPlayer,myMusic, setmyMusic, musicinprogress,
    whichPlaylist, setWhichPlaylist } = useContext(context_music);
  const songArray = Object.values(song_data);
  useEffect(() => {
    fetch("http://localhost:3001/allPlaylists")
      .then(response => response.json())
      .then(data => {
        setWhichPlaylist(playlistName.substring(1));
        for (const it in data.content) {
          const x = data.content;
          if (data.content.hasOwnProperty(it)) {
            const obj = data.content[it];
            if (obj.Name === playlistName.substring(1)) {
              setPlaylist_array(obj.songs);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }, [playlistName]);

  function begin(element) {
    axios.post("http://localhost:3001/readPlayingMusic", { "Id": element.Id })
    setmyMusic(songArray[element.Id - 1]);
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
    <div id="Liked_Songs"
      style={
        musicPlayer
          ?
          { height: "calc(100vh  - 70px)" }
          :
          { height: "100vh" }

      }>
      <div id="liked_heading">
        {
          playlist_array.length > 3
            ?
            <div id="liked_heading_content_if">
              <div style={{ display: "flex" }}>
                <div>
                  <img src={"../Images/Song_Images/" + songArray[playlist_array[0] - 1].Image} style={{ height: "100px", width: "100px",borderRadius:"10px 0 0 0" }} alt={songArray[playlist_array[0] - 1].name} />
                </div>
                <div>
                  <img src={"../Images/Song_Images/" + songArray[playlist_array[1] - 1].Image} style={{ height: "100px", width: "100px",borderRadius:"0 10px 0 0" }} alt={songArray[playlist_array[1] - 1].name} />
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div>
                  <img src={"../Images/Song_Images/" + songArray[playlist_array[2] - 1].Image} style={{ height: "100px", width: "100px",borderRadius:"0 0 0 10px" }} alt={songArray[playlist_array[2] - 1].name} />
                </div>
                <div>
                  <img src={"../Images/Song_Images/" + songArray[playlist_array[3] - 1].Image} style={{ height: "100px", width: "100px",borderRadius:"0 0 10px 0" }} alt={songArray[playlist_array[3] - 1].name} />
                </div>
              </div>
            </div>
            :
            playlist_array.length >=1 && playlist_array.length <=3
              ?
              <div id="liked_heading_content_else">
                <img src={"../Images/Song_Images/" + songArray[playlist_array[0] - 1].Image}  style={{ height: "200px", width: "200px",borderRadius:"10px" }} alt={songArray[playlist_array[0] - 1].name}></img>
              </div>
              :
              playlist_array.length===0?
              <div id="liked_heading_content_else">
                <img src={"../Images/playlist_icon.jpg"}  style={{ height: "200px", width: "200px",borderRadius:"10px" }} alt="playlist-icon" ></img>
              </div>:<div></div>
        }
        <div id="liked_heading_content_right">
          <div id="description1">{whichPlaylist}</div>
          <div id="description2">{playlist_array.length} songs</div>
          <div id="description3">
            <div id="btn1">
              <div><i className="fa-solid fa-play" style={{ color: "#ffffff", fontSize: "20px", paddingTop: "2px" }}></i></div>
              <div style={{ color: "white", fontSize: "20px", marginLeft: "10px" }}>Play</div>
            </div>

            <Link to="/addSongs" style={{ textDecoration: "none" }}>
              <div id="btn1" style={{ marginLeft: "10px" }}>
                <div style={{ color: "white" }}>
                  Add Songs
                </div>
              </div>
            </Link>

          </div>
        </div>
      </div>
      {
        playlist_array.length > 0
          ?
          <div id="liked_area1">
            <div id="title">
              <div id="blank"></div>
              <div id="title_name">Name</div>
              <div id="title_duration">Duration</div>
              <div id="title_likes"></div>
            </div>
            <div id="body" style={{ width: "95%" }}>
              {
                playlist_array.map((element, index) => {

                  return (
                    musicinprogress[songArray[element - 1].Id - 1] ?
                      <div
                        id="songs"
                        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
                      >
                        <div id="blank" onClick={
                          () => begin(songArray[element - 1])
                        }>
                          <img
                            src={"../Images/Song_Images/" + songArray[element - 1].Image}
                            alt={songArray[element - 1].Name}
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
                            () => begin(songArray[element - 1])
                          }
                        >
                          <div>
                            {songArray[element - 1].Name.replace(/_/g, " ")}
                          </div>
                          <div id="body_icon" style={{ paddingLeft: "15px" }}>
                            <iframe src="https://giphy.com/embed/qWLNlDMfimhXtM5g0M" style={{ pointerEvents: "none", height: "50px", width: "50px" }}></iframe>
                          </div>
                        </div>

                        <div id="body_duration"
                          onClick={
                            () => begin(songArray[element - 1])
                          }>{songArray[element - 1].Duration}</div>
                        <div id="title_likes" onClick={() => toggleLikedStatus(songArray[element - 1].Id - 1)}>
                          {
                            !liked[songArray[element - 1].Id - 1]
                              ?
                              <i className="fa-regular fa-heart" style={{ color: "#ffffff" }} onClick={() => addSong(songArray[element - 1])}></i>
                              :
                              <i className="fa-solid fa-heart" style={{ color: "#ffffff" }} onClick={() => removeSong(songArray[element - 1])}></i>
                          }
                        </div>
                      </div>
                      :
                      <div
                        id="songs"
                      >
                        <div id="blank" onClick={
                          () => begin(songArray[element - 1])
                        }>
                          <img
                            src={"../Images/Song_Images/" + songArray[element - 1].Image}
                            alt={songArray[element - 1].Name}
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
                            () => begin(songArray[element - 1])
                          }
                          style={{ width: "30%" }}
                        >
                          {songArray[element - 1].Name.replace(/_/g, " ")}
                        </div>
                        <div id="body_duration"
                          onClick={
                            () => begin(songArray[element - 1])
                          }>{songArray[element - 1].Duration}</div>
                        <div id="title_likes" onClick={() => toggleLikedStatus(songArray[element - 1].Id - 1)}>
                          {
                            !liked[songArray[element - 1].Id - 1]
                              ?
                              <i className="fa-regular fa-heart" style={{ color: "#ffffff" }} onClick={() => addSong(songArray[element - 1])}></i>
                              :
                              <i className="fa-solid fa-heart" style={{ color: "#ffffff" }} onClick={() => removeSong(songArray[element - 1])}></i>
                          }
                        </div>
                      </div>

                  );
                })
              }
            </div>
          </div>
          :
          <div id="liked_area2">
            <div id="default">This playlist is Empty...</div>
          </div>
      }
    </div >
  )
}