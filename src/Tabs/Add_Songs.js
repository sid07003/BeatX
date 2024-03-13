import React, { useState, useContext } from 'react'
import "../SCSS/Search.scss"
import "../SCSS/addSongs.scss"
import song_data from "../Song_data.json";
import { context_music } from "../App.js";
import axios from 'axios';


export default function Add_Songs() {
    const [isTyping, setIsTyping] = useState(false);
    const [isDataFound, setIsDataFound] = useState(true);
    const [searchdata, setsearchdata] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const songArray = Object.values(song_data);
    const { musicPlayer, whichPlaylist } = useContext(context_music);

    function read_substring(event) {
        const subString = event.target.value;
        const arr = [];
        if (subString.length === 0) {
            setIsTyping(false)
        }
        else {
            songArray.map((element) => {
                if (((element.Name.toLowerCase()).replace(/_/g, " ")).includes(subString)) {
                    arr.push(element.Id);
                }
            })
            setIsTyping(true);
            if (arr.length > 0) {
                setIsDataFound(true);
            }
            else {
                setIsDataFound(false);
            }
        }
        setsearchdata(arr);
    }

    function add_this_song(key) {
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
        }, 500);
        fetch("http://localhost:3001/allPlaylists")
            .then(response => response.json())
            .then(data => {
                const obj = data.content;
                for (let playlistName in obj) {
                    if (obj.hasOwnProperty(playlistName)) {
                        const playlist = obj[playlistName]
                        if (playlist.Name === whichPlaylist && !playlist.songs.includes(key)) {
                            playlist.songs.push(key);
                        }
                    }
                }
                axios.post("http://localhost:3001/allPlaylists", obj);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div id="search"
            style={musicPlayer
                ?
                { height: "calc(100vh  - 70px)" }
                :
                { height: "100vh" }
            }>
            {
                isAdded?
                <div id="notification"><b>Added To Playlist</b></div>
                :
                <div></div>
            }
            <div id="search_div">
                <div>
                    <input
                        type="text"
                        className="searchbar"
                        placeholder="Search"
                        onChange={read_substring}
                        id="search_bar"
                        style={{ color: "white" }}
                    />
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "left", alignItems: "center", height: "50px", width: "92%", PaddingTop: "0px" }}>
                <div style={{ fontSize: "25px", color: "white" }}>
                    <u>Click to add songs to Playlist</u>
                </div>
            </div>
            <div id="playlist1">
                <div id="title">
                    <div id="blank"></div>
                    <div id="title_name">Name</div>
                    <div id="title_duration">Duration</div>
                    <div id="title_likes"></div>
                </div>
                <div id="body" style={{ width: "95%" }}>
                    {
                        isTyping ?
                            isDataFound ?
                                searchdata.map((element) => {
                                    return (
                                        <div
                                            id="songs"
                                        >
                                            <div id="blank" >
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

                                                style={{ width: "30%" }}
                                            >
                                                {songArray[element - 1].Name.replace(/_/g, " ")}
                                            </div>
                                            <div id="body_duration"
                                            >{songArray[element - 1].Duration}</div>
                                            <div id="title_likes">
                                                <div id="add_songs_button" style={{
                                                    height: "30px", width: "30px", borderRadius: "100%",
                                                    border: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center"
                                                }} onClick={() => { add_this_song(element.Id) }}>
                                                    <i className="fa-solid fa-plus" style={{ color: "#ffffff", fontSize: "20px" }}></i>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) :
                                <div id="corrections" style={{ textAlign: "center" }}>No Data Found</div>
                            :
                            <div>
                                {
                                    songArray.map((element) => {
                                        return (
                                            <div
                                                id="songs"
                                            >
                                                <div id="blank" >
                                                    <img
                                                        src={"../Images/Song_Images/" + element.Image}
                                                        alt={element.Name}
                                                        style={{
                                                            height: "50px",
                                                            width: "50px",
                                                            borderRadius: "5px",
                                                        }}
                                                    ></img>
                                                </div>

                                                <div
                                                    id="body_name"

                                                    style={{ width: "30%" }}
                                                >
                                                    {element.Name.replace(/_/g, " ")}
                                                </div>
                                                <div id="body_duration"
                                                >{element.Duration}</div>
                                                <div id="title_likes">
                                                    <div id="add_songs_button" style={{
                                                        height: "30px", width: "30px", borderRadius: "100%",
                                                        border: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center"
                                                    }} onClick={() => { add_this_song(element.Id) }}>
                                                        <i className="fa-solid fa-plus" style={{ color: "#ffffff", fontSize: "20px" }}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}