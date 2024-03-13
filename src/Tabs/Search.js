import React, { useState, useContext, useEffect } from 'react'
import "../SCSS/Search.scss"
import song_data from "../Song_data.json";
import axios from "axios";
import { context_music } from "../App.js";


export default function Search(props) {
    const [recentlySearchedSongs, setRecentlySearchedSongs] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isSearchEmpty, setIsSearchEmpty] = useState(true);
    const [isDataFound, setIsDataFound] = useState(true);
    useEffect(() => {
        fetch("http://localhost:3001/SearchedSongs")
            .then(response => response.json())
            .then(data => {
                setRecentlySearchedSongs(data.content);
                if (data.content.length === 0) {
                    setIsSearchEmpty(true);
                }
                else {
                    setIsSearchEmpty(false);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [recentlySearchedSongs])

    const [searchdata, setsearchdata] = useState([]);
    const songArray = Object.values(song_data);

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

    const { setmyMusic, liked, setLiked, likedSongs, setLikedSongs, musicPlayer, musicinprogress, setMusicinprogress } = useContext(context_music);

    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------

    function begin(element) {
        sendSearchedData(element.Id)
        axios.post("http://localhost:3001/readPlayingMusic", { "Id": element.Id })
        setmyMusic(songArray[element.Id-1]);
        props.setMusicClicked("true");
    }

    function begin_searched(element) {
        axios.post("http://localhost:3001/readPlayingMusic", { "Id": element.Id })
        setmyMusic(songArray[element.Id-1]);
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

    function sendSearchedData(key) {
        const arr = [...recentlySearchedSongs];
        arr.push(key);
        console.log(arr)
        axios.post("http://localhost:3001/SearchedSongs", arr)
            .then(response => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function backToSearch() {
        let searchbar = document.querySelector("#search_bar");
        searchbar.value = "";
        setIsTyping(false);
    }

    return (
        <div id="search"
            style={musicPlayer
                ?
                { height: "calc(100vh  - 70px)" }
                :
                { height: "100vh" }
            }>
            <div id="search_div">
                <div>
                    <i className="fa-solid fa-arrow-left" style={{ color: "#ffffff" }} onClick={backToSearch} id="backToSearch"></i>
                </div>
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
                    Recent Searches
                </div>
            </div>
            <div id="playlist1">
                <div id="title">
                    <div id="blank"></div>
                    <div id="title_name">Name</div>
                    <div id="title_duration">Duration</div>
                    <div id="title_likes"></div>
                </div>
                {
                    isTyping ?
                        isDataFound ?
                            searchdata.map((element) => {
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
                                                        <i className="fa-regular fa-heart" style={{ color: "#ffffff" }} onClick={() => addSong(songArray[element - 1].Image)}></i>
                                                        :
                                                        <i className="fa-solid fa-heart" style={{ color: "#ffffff" }} onClick={() => removeSong(songArray[element - 1].Image)}></i>
                                                }
                                            </div>
                                        </div> :
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
                                )
                            }) :
                            <div id="corrections">No Data Found</div>
                        :
                        isSearchEmpty ?
                            <div id="corrections">Search Your Favorite Songs....</div>
                            :
                            recentlySearchedSongs.map((element) => {
                                return (
                                    musicinprogress[songArray[element - 1].Id - 1] ?
                                        <div
                                            id="songs"
                                            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
                                        >
                                            <div id="blank" onClick={
                                                () => begin_searched(songArray[element - 1])
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
                                                    () => begin_searched(songArray[element - 1])
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
                                                    () => begin_searched(songArray[element - 1])
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
                                        </div> :
                                        <div
                                            id="songs"
                                        >
                                            <div id="blank" onClick={
                                                () => begin_searched(songArray[element - 1])
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
                                                    () => begin_searched(songArray[element - 1])
                                                }
                                                style={{ width: "30%" }}
                                            >
                                                {songArray[element - 1].Name.replace(/_/g, " ")}
                                            </div>
                                            <div id="body_duration"
                                                onClick={
                                                    () => begin_searched(songArray[element - 1])
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
                                )
                            })
                }
            </div>
        </div>
    )
}