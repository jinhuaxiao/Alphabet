#!/bin/bash

# Base URL
base_url="https://yingyuyinbiao.cn/wp-content/uploads/2020/09"

# Array of letters from A to Z
letters=(A B C D E F G H I J K L M N O P Q R S T U V W X Y Z)

# Create a directory to store the audio files if it doesn't exist
mkdir -p audio_files

# Loop through each letter and download the corresponding audio file
for letter in "${letters[@]}"; do
  # Construct the file name and URLs
  file_path="audio_files/${letter}.mp3"
  url_upper="${base_url}/letter-${letter}.mp3"
  url_lower="${base_url}/letter-${letter,,}.mp3" # Convert to lowercase using ,,

  # Check if the file already exists and is greater than 0 bytes
  if [ -s "$file_path" ]; then
    echo "${letter}.mp3 already exists and is not empty, skipping download."
  else
    # Attempt to download using the uppercase URL first
    echo "Attempting to download ${letter}.mp3 using uppercase URL..."
    wget -O "$file_path" "$url_upper"

    # If the download fails, try the lowercase URL
    if [ ! -s "$file_path" ]; then
      echo "Uppercase URL failed. Attempting to download using lowercase URL..."
      wget -O "$file_path" "$url_lower"
    fi
  fi
done

echo "Download completed. Audio files are saved in the 'audio_files' directory."

