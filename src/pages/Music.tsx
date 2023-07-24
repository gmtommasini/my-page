import config from "config";
import React, { useState } from "react";

import { generateRandomDate } from "utils/Dates";
import Loader from "components/Loader";



type CreateTrackListRequest = {
  list_of_songs : string[][];
  number_of_songs? : Number;
}
type SaveSongListRequest = {
  uri_list : string[];
  list_name? : Number;
  date?: string;
}

const MusicPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(generateRandomDate(new Date(1958,7,4 )).toISOString().split('T')[0]);
  const [billboardData, setBillboardData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [saveData, setSaveData] = useState(null);

  const base_url : string = config.MUSIC_BASE_URL!;
  if (!base_url){
    return <p>URL NOT FOUND</p>
  }

  const handleDateChange = (event: any) => {
    setSelectedDate(event.target.value);
  };

  const fetchBillboardData = async () => {
    try {
      // Step 1: GET data from the "music" endpoint using selectedDate
      setIsLoading(true)
      const response = await fetch(`${base_url}?date=${selectedDate}`);
      const data = await response.json();
      setBillboardData(data);
      setPostData(null)
      setSaveData(null)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally{
      setIsLoading(false)
    }
  };

  const createList = async () => {
    try {    
      // Step 2: POST the fetched data back to the "music" endpoint
      setIsLoading(true)
      let request_body : CreateTrackListRequest = {
        list_of_songs : billboardData!
      }
      const postResponse = await fetch(base_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request_body)
      });
      const postData = await postResponse.json();
      setPostData(postData);   
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false)
    }
  };

  const savePlaylist = async () => {
    try {  
      // Step 3: Call the "/save" endpoint with the response of the second request
      setIsLoading(true)
      let request_body : SaveSongListRequest = {
        uri_list: postData!,
        date: selectedDate,
        // list_name : TBD
      }
      console.log("REQUEST save playlist body:", request_body)
      const saveResponse = await fetch(base_url +"/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request_body),
      });
      const saveData = await saveResponse.json();
      console.log(saveData)
      setSaveData(saveData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div>
      {isLoading && <Loader/>}
      <h1>Music Page</h1>
      <h3>Working in progress....</h3>
      <label htmlFor="dateInput">Select a date:</label>
      <input
        type="date"
        id="dateInput"
        value={selectedDate}
        onChange={handleDateChange}
      />
      <button onClick={fetchBillboardData}>Fetch Billboard</button>
      {billboardData && !postData && <button onClick={createList}>Create Playlist</button>}
      {postData && !saveData && <button onClick={savePlaylist}>Save Playlist</button>}
      <p>We started with a ramdom date for your amusement.</p>
      <p>The earliest date available is 1958/08/04</p>
      {/* Display fetched data (optional) */}
      {billboardData && !postData && (
        <div>
          <h2>Fetched Music Data:</h2>
          <p>Result of the soup, the crawling on the Billboard</p>
          <pre>{JSON.stringify(billboardData, null, 2)}</pre>
        </div>
      )}
      {postData&& !saveData && (
        <div>
          <h2>Spotify's songs URIs:</h2>
          <p>This is something that is not user friendly!</p>
          <pre>{JSON.stringify(postData, null, 2)}</pre>
        </div>
      )}
      {saveData && (
        <div>
          <h2>Saved Data:</h2>
          <pre>{JSON.stringify(saveData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MusicPage;
