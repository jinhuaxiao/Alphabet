#!/bin/bash

# Change to the directory where your files are located
cd alphabet

# Array of letters from a to z
letters=(a b c d e f g h i j k l m n o p q r s t u v w x y z)

# Initialize a counter
count=0

# Loop through each file in the directory
for file in *.webp; do
  # Rename the file using the letters array
  mv "$file" "${letters[$count]}.webp"
  # Increment the counter
  ((count++))
done

