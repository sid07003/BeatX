import os
import json
from tinytag import TinyTag

# beatx = {}
# artists = {}

# file = os.listdir("public/Images/Artists")
# id = 1

# for items in file:
#     object = {}

#     # ---------------------------- Path of file ------------------------------------------------

#     file_path = os.path.join("public/Images/Artists/", items)

#     # --------------------------------- name of image ---------------------------------

#     file_path_components = file_path.split("/")
#     file_path_name_extension = file_path_components[-1].split(".", 1)

#     # --------------------------------- fitting values in object --------------------------------
    
#     object["Id"]=id
#     object["Name"] = file_path_name_extension[0]
#     object["Image"] = file_path
#     artists[id] = object
#     id = id+1

# beatx["Artists"] = artists
# my_file = open("src/data.json", "w")
# json.dump(beatx, my_file, indent=4)
# my_file.close()

# ----------------------------------- Songs arrangement ---------------------------------------

# Songs = {}
# id = 1

# song_file = os.listdir("public/Songs")
# song_images_file = os.listdir("public/Images/Song_Images")

# for (items1, items2) in zip(song_file, song_images_file):
#     object = {}

#     # ---------------------------- Path of file ------------------------------------------------

#     file_path1 = os.path.join("public/Songs/", items1)
#     file_path2 = os.path.join("public/Images/Song_Images/", items2)

#     # ---------------------------- Duration of audio -------------------------------------------

#     audio = TinyTag.get(file_path1)
#     audio_info = int(audio.duration)
#     min = int(audio_info/60)
#     sec = audio_info % 60
#     duration = str(min)+":"+str(sec)

#     # --------------------------------- name of audio and image ---------------------------------

#     file_path_components1 = file_path1.split("/")
#     file_path_components2 = file_path2.split("/")
#     file_path_name_extension1 = file_path_components1[-1].split(".", 1)
#     file_path_name_extension2 = file_path_components2[-1].split(".", 1)

#     # --------------------------------- fitting values in object --------------------------------
#     object["Id"]=id
#     object["Name"] = file_path_name_extension1[0]
#     object["Image"] = file_path_components2[-1]
#     object["Songs"] = file_path1
#     object["Duration"] = duration
#     object["singers"] = audio.artist
#     Songs[id] = object

#     id = id + 1

# my_song_file = open("src/Song_data.json", "w")
# json.dump(Songs, my_song_file, indent=4)
# my_song_file.close()


# -----------------------------------------------------------------------------------------------


# with open("src/Song_data.json", "r") as song_file:
#     song_data = json.load(song_file)

# with open("src/data.json", "r") as data_file:
#     complete_data = json.load(data_file)

# for key1,content1 in complete_data["Artists"].items():
#     artist_name=content1["Name"]
#     print(artist_name+":")
#     artist_songs=[]
#     for key2,content2 in song_data.items():
#         singers_list=content2["singers"].split(',')
#         for items in singers_list:
#             if(items==artist_name):
#                 artist_songs.append(key2)
#                 break
        
#     content1["artist_songs"]=artist_songs
    
# with open("src/data.json", "w") as data_file:
#     json.dump(complete_data, data_file, indent=4)  