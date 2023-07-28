import config from "config";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import { getRandomDate } from "utils/Dates";
import Loader from "components/Loader";
import { CreateTrackListRequest, SaveSongListRequest } from "./Types";

// import { handleSpotifyOAuth } from "./functions";



const MusicPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Technical states
  const [isLoading, setIsLoading] = useState(false);

  // AUTH
  const [callbackCode, setCallbackCode] = useState<string | null>(null)
  const [sptyState, setSptyState] = useState<string | null>(null)
  const [token, setToken] = useState(null);

  // Business
  const [selectedDate, setSelectedDate] = useState(getRandomDate(new Date(1958, 7, 4)).toISOString().split('T')[0]);
  const [billboardData, setBillboardData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [saveData, setSaveData] = useState(null);

  useEffect(() => {
    // Stores the callback and state
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    const state = queryParams.get('state');
    if (code) {
      localStorage.removeItem('code') //MODIFY THIS TO COOKIE
      localStorage.removeItem('state') //MODIFY THIS TO COOKIE
      setCallbackCode(code)
    }
    if (state) {
      setSptyState(state)
    }
  }, [location.search]);

  useEffect(() => {
    if (callbackCode && !token) {
      localStorage.clear()
      if (!token) {
        
        handleSpotifyToken(callbackCode, sptyState) // this thing will store the state and token
      }
    }
  }, [callbackCode]);


  const base_url: string = config.MUSIC_BASE_URL!;
  if (!base_url) {
    return <p>URL NOT FOUND</p>
  }

  async function handleSpotifyOAuth() {
    setIsLoading(true)
    console.log("HAndling OAUTH")

    // console.log(JSON.stringify(query))
    // console.log(QueryString.stringify(query))
    let oauth_url = config.MUSIC_BASE_URL + "/get_spotify_auth_url"
    const response = await fetch(oauth_url)
    const data = await response.json();
    console.log("URL: ", data.authorizationUrl)
    window.location.href = data.authorizationUrl;
    // window.open(data.authorizationUrl, "_blank");

    // fetch(oauth_url, {
    //   method: 'POST',
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Handle the response from the backend, which could include the authorization URL
    //     // Redirect the user to the Spotify authorization page
    //     console.log("URL: ", data.authorizationUrl)
    //     window.location.href = data.authorizationUrl;

    //     // window.open(data.authorizationUrl, "_blank");
    //   })
    //   .catch((error) => {
    //     // Handle any errors that occurred during the process
    //     console.error('Error initiating OAuth:', error);
    //   });


    setIsLoading(false)
  }
  async function handleSpotifyToken(code: string, state: string | null) {
    console.log("Handling Token - Getting token: ", code, state)
    if (!token) {
      let token_url = config.MUSIC_BASE_URL
        + "/get_spotify_user_token?callback_code="
        + code + (state ? '&state=' + state : '')
      fetch(token_url, { method: 'get' })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("token", data.userToken) ///MODIFY THIS TO COOKIE          
          localStorage.setItem('sptyState', sptyState!)
          setToken(data.userToken)
          console.log("Cleaning url :)")
          navigate('/music') // cleaning query parameters
        })
        .catch((error) => {
          // Handle any errors that occurred during the process
          console.error('Error with TOKEN:', error);
        });
    }

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
    } finally {
      setIsLoading(false)
    }
  };

  const createList = async () => {
    try {
      // Step 2: POST the fetched data back to the "music" endpoint
      setIsLoading(true)
      let request_body: CreateTrackListRequest = {
        list_of_songs: billboardData!
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
      let request_body: SaveSongListRequest = {
        uri_list: postData!,
        date: selectedDate,
        // list_name : TBD
      }
      console.log("REQUEST save playlist body:", request_body)
      const saveResponse = await fetch(base_url + "/save", {
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
      {isLoading && <Loader />}
      <h1>Music Page</h1>
      <h3>This page is a working in progress....</h3>
      <p>To use this feature you will need to have a Spotify account and to give us access to it:</p>
      <button onClick={handleSpotifyOAuth}>Authorize Spotify</button>
      <br />
      <hr />
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
      {postData && !saveData && (
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
