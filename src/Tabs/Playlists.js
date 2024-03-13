import React, { useState, useEffect, useContext } from 'react'
import "../SCSS/Playlists.scss";
import axios, { all } from 'axios';
import { context_music } from "../App.js";
import { Link } from 'react-router-dom';
import song_data from "../Song_data.json";

export default function Playlists() {
    const songArray = Object.values(song_data);
    const { setAllPlaylists, allPlaylists, musicPlayer } = useContext(context_music);
    const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false)
    function add_playlist() {
        let name = document.querySelector("#create_playlist_form_input");
        let playlistname = name.value;
        name.value = "";
        const obj2 = { ...allPlaylists };
        const obj1 = {};
        console.log(add_playlist.length)
        obj1["Name"] = playlistname;
        obj1["songs"] = [];
        obj2[Object.keys(allPlaylists).length+1] = obj1;
        axios.post("http://localhost:3001/allPlaylists", obj2)
            .then(response => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })
        setIsCreatingPlaylist(false);
    }

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

    function remove_playlist(variable) {
        delete allPlaylists[variable];
        axios.post("http://localhost:3001/allPlaylists", allPlaylists);
    }

    return (
        <div id="myplaylist"
            style={
                musicPlayer
                    ?
                    { height: "calc(100vh  - 70px)" }
                    :
                    { height: "100vh" }
            }
        >
            {
                isCreatingPlaylist
                    ?
                    <div id="create_playlist_area">
                        <div id="create_playlist">
                            <div id="create_playlist_heading_area">
                                <div id="create_playlist_heading">Create New Playlist</div>
                                <div id="create_playlist_heading_close" onClick={() => { setIsCreatingPlaylist(false) }}>X</div>
                            </div>
                            <form id="create_playlist_form">
                                <div id="create_playlist_form_heading">Playlist Name</div>
                                <input type="text" placeholder="Enter The Name" name="playlist_name" id="create_playlist_form_input" />
                            </form>
                            <div id="create_playlist_form_addsong">
                                Add Songs
                            </div>
                            <div id="create_playlist_form_create" onClick={() => { add_playlist() }}>
                                Create Playlist
                            </div>
                        </div>
                    </div>
                    :
                    <div></div>
            }
            <div id="liked_heading">
                <div id="liked_heading_content">
                    <img
                        src={"../Images/playlist_icon.jpg"}
                        alt="Header Song"
                        id="header_image"
                    />
                </div>
                <div id="liked_heading_content_right">
                    <div id="description1">All Playlists</div>
                    <div id="description2">10 Playlists</div>
                    <div id="description3">
                        <div id="btn1" onClick={() => { setIsCreatingPlaylist(true) }}>
                            <div><i className="fa-solid fa-plus" style={{ color: "#ffffff", fontSize: "20px", paddingTop: "2px" }}></i></div>
                            <div style={{ color: "white", fontSize: "20px", marginLeft: "10px" }}>Create New Playlist</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="playlist_area">
                <div id="title">
                    <div id="blank"></div>
                    <div id="playlist_name">Name</div>
                    <div id="playlist_length">Length</div>
                    <div id="add_to_playlist"></div>
                </div>
                <div id="body" style={{ width: "95%" }}>
                    {
                        playlist_array.map((element) => {
                            const playlist_songs_array = element.songs;
                            return (
                                <div id="playlists">
                                    <Link to={`/:${element.Name}`} id="blank" style={{ textDecoration: "none" }}>
                                        {
                                            playlist_songs_array.length > 3
                                                ?
                                                <div id="liked_heading_content_1">
                                                    <div style={{ display: "flex" }}>
                                                        <div>
                                                            <img src={"../Images/Song_Images/" + songArray[playlist_songs_array[0] - 1].Image} style={{ height: "25px", width: "25px", borderRadius: "10px 0 0 0" }} alt={songArray[playlist_songs_array[0] - 1].name} />
                                                        </div>
                                                        <div>
                                                            <img src={"../Images/Song_Images/" + songArray[playlist_songs_array[1] - 1].Image} style={{ height: "25px", width: "25px", borderRadius: "0 10px 0 0" }} alt={songArray[playlist_songs_array[1] - 1].name} />
                                                        </div>
                                                    </div>
                                                    <div style={{ display: "flex" }}>
                                                        <div>
                                                            <img src={"../Images/Song_Images/" + songArray[playlist_songs_array[2] - 1].Image} style={{ height: "25px", width: "25px", borderRadius: "0 0 0 10px" }} alt={songArray[playlist_songs_array[2] - 1].name} />
                                                        </div>
                                                        <div>
                                                            <img src={"../Images/Song_Images/" + songArray[playlist_songs_array[3] - 1].Image} style={{ height: "25px", width: "25px", borderRadius: "0 0 10px 0" }} alt={songArray[playlist_songs_array[3] - 1].name} />
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                playlist_songs_array.length >= 1 && playlist_songs_array.length <= 3
                                                    ?
                                                    <div id="liked_heading_content_2">
                                                        <img src={"../Images/Song_Images/" + songArray[playlist_songs_array[0] - 1].Image} style={{ height: "50px", width: "50px", borderRadius: "10px" }} alt={songArray[playlist_songs_array[0] - 1].name}></img>
                                                    </div>
                                                    :
                                                    <div id="liked_heading_content_2">
                                                        <img src={"../Images/playlist_icon.jpg"} style={{ height: "50px", width: "50px", borderRadius: "10px" }} alt="playlist-icon" ></img>
                                                    </div>
                                        }
                                    </Link>
                                    <Link to={`/:${element.Name}`} id="body_name" style={{ textDecoration: "none" }}>
                                        {element.Name}
                                    </Link>
                                    <Link to={`/:${element.Name}`} id="body_length" style={{ textDecoration: "none" }}>
                                        5 songs
                                    </Link>
                                    <div id="add_to_playlist" onClick={() => { remove_playlist(element.Name) }}>
                                        <div id="remove_playlist_btn">
                                            Remove Playlist
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
