import React, { useContext} from "react";
import "../SCSS/Artist.scss";
import { context_music } from "../App.js";
import song_data from "../Song_data.json";
import axios from "axios";
import "../SCSS/Liked_Songs.scss";

export default function Liked_Songs(props) {
  const { liked, setLiked, likedSongs, setLikedSongs, musicPlayer,setmyMusic,musicinprogress ,setMusicinprogress } = useContext(context_music);
  const songArray = Object.values(song_data);

  function begin(element) {
    axios.post("http://localhost:3001/readPlayingMusic", {"Id":element.Id})
    setmyMusic(songArray[element.Id-1]);
    props.setMusicClicked("true");
  }

  function begin_playlist() {
    const song = songArray.find((item) => item.Id === parseInt(likedSongs[0]))
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
    <div id="Liked_Songs"
      style={
        musicPlayer
          ?
          { height: "calc(100vh  - 70px)" }
          :
          { height: "100vh" }

      }>
      {likedSongs.length > 0 ? (
        <div id="liked_heading">
          <div id="liked_heading_content">
            <img
              src={"../Images/Song_Images/" + songArray.find(item => item.Id === parseInt(likedSongs[0])).Image}
              alt="Header Song"
              id="header_image"
            />
          </div>
          <div id="liked_heading_content_right">
            <div id="description1">Liked Songs</div>
            <div id="description2">{songArray.find(item => item.Id === parseInt(likedSongs[0])).singers}</div>
            <div id="description2">{likedSongs.length} songs</div>
            <div id="description3">
              <div id="btn1">
                <div><i className="fa-solid fa-play" style={{color: "#ffffff",fontSize:"20px",paddingTop:"2px"}}></i></div>
                <div style={{color:"white",fontSize:"20px",marginLeft:"10px"}} onClick={()=>{begin_playlist()}}>Play</div>
              </div>
            </div>
          </div>
        </div>
      ) :
        <div id="liked_heading">
          <div id="liked_heading_content">
            <i className="fa-solid fa-clock-rotate-left" id="reverse_clock" style={{ color: "#ffffff" }}></i>
          </div>
          <div id="liked_heading_content_right">
            <div id="description1">Liked Songs</div>
            <div id="description2">{likedSongs.length} songs</div>
            <div id="description3">
              <div id="btn1">
                <div><i className="fa-solid fa-ban" style={{color: "#ffffff",fontSize:"20px",paddingTop:"2px"}}></i></div>
                <div style={{color:"white",fontSize:"20px",marginLeft:"10px"}}>Play</div>
              </div>
            </div>
          </div>
        </div>}
      {
        likedSongs.length > 0
          ?
          <div id="liked_area1">
            <div id="title">
              <div id="blank"></div>
              <div id="title_name">Name</div>
              <div id="title_duration">Duration</div>
              <div id="title_likes"></div>
            </div>
            <div id="body" style={{ width: "95%" }}>
              {likedSongs.map((element, index) => {
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
                    <div id="body_icon" style={{paddingLeft:"15px"}}>
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
          :
          <div id="liked_area2">
            <div id="default">This playlist is Empty...</div>
          </div>
      }
    </div>
  )
}
