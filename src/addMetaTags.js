import { log } from 'console';
import fs from 'fs';

const filePath = 'C:/Users/HP/Desktop/mp4moviess/src/data/tvshows.json'; // Replace with the actual path to your JSON file

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
console.log(data);
  try {
    const jsonData = JSON.parse(data);
    
    // Add the meta object to each item in the array
    jsonData.forEach((item) => {
      item.meta = {
        title: item.title,
        description: item.description,
        keywords: item.category,
      };
    });

    // Convert the modified JSON object back to a string
    const jsonString = JSON.stringify(jsonData, null, 2);

    // Write the JSON string back to the file
    fs.writeFile(filePath, jsonString, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to the file:', err);
      } else {
        console.log('Successfully updated the JSON file.');
      }
    });
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});