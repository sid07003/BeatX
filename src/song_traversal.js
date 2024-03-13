const fs=require("fs");
const { stringify } = require("querystring");
const song_traversal=[];

fs.readFile("./src/data.json","utf-8",(err,data)=>{
    if(err){
        console.log(err);
    }
    else{
        data=JSON.parse(data);
        for(let i in data.Artists){
            if(data.Artists.hasOwnProperty(i)){
                data.Artists[i].artist_songs.map((element)=>{
                    song_traversal.push(parseInt(element));
                })
            }
        }
    }
    console.log(song_traversal)
    fs.writeFile("./src/playlist.json",JSON.stringify(song_traversal),(err)=>{
        if(err){
            console.log(err);
        }
    })
})