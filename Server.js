const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors())
app.use(express.json())

app.get('/readLikedSongs', (req, res) => {
    fs.readFile("./src/Liked_Songs.json", 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error reading file' });
            return;
        }
        else {
            res.json({ content: JSON.parse(data) });
        }
    })
})

app.post("/readLikedSongs", (req, res) => {
    const jsonData = JSON.stringify(req.body); // Convert the object to JSON string
    fs.writeFile("./src/Liked_Songs.json", jsonData, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error writing to file' });
            return;
        }
        res.status(200).json({ message: 'Data written successfully' });
    });
});

app.get('/readPlayingMusic', (req, res) => {
    fs.readFile("./src/playing_music.json", 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error reading file' });
            return;
        }
        else {
            res.json({ content: JSON.parse(data) });
        }
    })
})

app.post("/readPlayingMusic", (req, res) => {
    const jsonData = JSON.stringify(req.body); // Convert the object to JSON string
    fs.writeFile("./src/playing_music.json", jsonData, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error writing to file' });
            return;
        }
        res.status(200).json({ message: 'Data written successfully' });
    });
});

app.get('/SearchedSongs', (req, res) => {
    fs.readFile("./src/Searched_Songs.json", 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error reading file' });
            return;
        }
        else {
            res.json({ content: JSON.parse(data) });
        }
    })
})

app.post("/SearchedSongs", (req, res) => {
    const jsonData = JSON.stringify(req.body); // Convert the object to JSON string
    fs.writeFile("./src/Searched_Songs.json", jsonData, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error writing to file' });
            return;
        }
        res.status(200).json({ message: 'Data written successfully' });
    });
});

app.get('/allPlaylists', (req, res) => {
    fs.readFile("./src/All_Playlists.json", 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error reading file' });
            return;
        }
        else {
            res.json({ content: JSON.parse(data) });
        }
    })
})

app.post("/allPlaylists", (req, res) => {
    const jsonData = JSON.stringify(req.body); // Convert the object to JSON string
    fs.writeFile("./src/All_Playlists.json", jsonData, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error writing to file' });
            return;
        }
        res.status(200).json({ message: 'Data written successfully' });
    });
});

app.listen(3001, () => {
    console.log("Server Started");
})
