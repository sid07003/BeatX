import React from "react";
import "../SCSS/Home.scss";
import data from "../data.json";
import { Link  } from "react-router-dom";


export default function Home() {
  const rightSrl = () => {
    let element = document.querySelector("#artists");
    element.scrollLeft += element.offsetWidth;
  };

  const leftSrl = () => {
    let element = document.querySelector("#artists");
    element.scrollLeft -= element.offsetWidth;
  };

  const artistsArray = Object.values(data.Artists);

  return (
    <div id="home">
      <nav>
        <div>
          <Link to="/SearchSongs">
          <input
            type="text"
            className="searchbar"
            placeholder="Search"
            onMouseEnter={() => {
              let searchbar = document.querySelector(".searchbar");
              searchbar.style.border = "2px solid rgb(56, 221, 78)";
            }}
            onMouseLeave={() => {
              let searchbar = document.querySelector(".searchbar");
              searchbar.style.border = "2px solid white";
            }}
          />
          </Link>
        </div>
        <div className="profile">
          <i
            className="fa-solid fa-right-from-bracket"
            style={{ color: "#ffffff", fontSize: "25px", padding: "10px" }}
          ></i>
        </div>
      </nav>
      <div id="popularArtists">
        <div id="popular">Popular Artists</div>
        <div id="sideScroll">
          <div id="leftscroll" onClick={leftSrl}>
            <i
              className="fa-solid fa-angles-left"
              style={{ color: "#ffffff", fontSize: "35px" }}
            ></i>
          </div>
          <div id="artists">
            {artistsArray.map((element) => {
              return (
                <Link to={`/artist/:${element.Id}`} style={{textDecoration:"none"}}>
                  <div style={{ cursor: "pointer" }}>
                    <img src={element.Image} alt={element.Name} id="artist" />
                    <p style={{ paddingTop: "5px" }}>{element.Name}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div id="rightscroll" onClick={rightSrl}>
            <i
              className="fa-solid fa-angles-right"
              style={{ color: "#ffffff", fontSize: "35px" }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}
