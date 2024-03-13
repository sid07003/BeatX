import React, { useContext, useEffect } from "react";
import "../SCSS/Sidebar.scss";
import { Link } from "react-router-dom";
import { context_music } from "../App.js";

export default function Sidebar() {
  const { setAllPlaylists, allPlaylists } = useContext(context_music);

  useEffect(() => {
    fetch("http://localhost:3001/allPlaylists")
      .then(response => response.json())
      .then(data => {
        setAllPlaylists(data.content)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [allPlaylists])
  const playlist_array = Object.values(allPlaylists);
  return (
    <div className="sidebar">
      <div className="logo"></div>
      <Link to="./" className="home">
        <div style={{ margin: "10px" }}>
          <i className="fa-solid fa-house" style={{ color: "#ffffff" }}></i>
        </div>
        <div className="homeText">Home</div>
      </Link>
      <Link to="/SearchSongs" className="search" >
        <div style={{ margin: "10px" }}>
          <i
            className="fa-solid fa-magnifying-glass"
            style={{ color: "#ffffff" }}
          ></i>
        </div>
        <div style={{ margin: "5px", color: "white" }}>Search</div>
      </Link>
      <div className="library">
        <div className="heading">
          <div style={{ margin: "5px" }}>
            <i className="fa-solid fa-bars" style={{ color: "#ffffff" }}></i>
          </div>
          <div style={{ margin: "10px" }}>Library</div>
        </div>
        {/* --------------------------------------------------------------------------------------- */}
        <ul className="content">
          <Link to="/LikedSongs" style={{ textDecoration: "none" }}>
            <li className="liked">
              <div style={{ margin: "5px" }} >
                <i className="fa-solid fa-heart" style={{ color: "#ffffff" }}></i>
              </div>
              <div style={{ margin: "5px" }} >Liked Songs</div>
            </li>
          </Link>
          {/* --------------------------------------------------------------------------------------- */}
          <li className="liked">
            <div style={{ margin: "5px" }} >
              <i className="fas fa-history" style={{ color: "#ffffff" }}></i>
            </div>
            <div
              style={{
                margin: "5px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Recent Songs
            </div>
          </li>
          {/* --------------------------------------------------------------------------------------- */}
          <li className="playlist">
            <Link to="myPlaylist" style={{ textDecoration: "none", display: "flex" }} id="playlist_element">
              <div style={{ margin: "5px" }} >
                <i className="fa-solid fa-list" style={{ color: "#ffffff" }}></i>
              </div>
              <div style={{ margin: "5px" }} >My Playlists</div>
            </Link>
            <div style={{
              color: "rgb(255, 255, 255, 0.7)", marginLeft: "10px",height:"100px",overflowY:"scroll"
            }}>
              <ul>
                {playlist_array.length > 0
                  ?
                  playlist_array.map((element) => {
                    return (
                      <li style={{ height: "20px", width: "80px" }}>
                        <Link to={`/:${element.Name}`} id="playlist_names">
                          <div style={{color: "rgb(255, 255, 255, 0.7)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{element.Name}</div></Link>
                      </li>
                    )
                  })
                  :
                  <div></div>
                }
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
