import config from "config";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import { getRandomDate } from "utils/Dates";
import Cookies from 'js-cookie';
import Loader from "components/Loader";
import { CreateTrackListRequest, SaveSongListRequest } from "./Types";


const MusicPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Technical states
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');

  // AUTH
  const [callbackCode, setCallbackCode] = useState<string | null>(null)
  const [sptyState, setSptyState] = useState<string | null>(null)

  // Business
  const initialTrackList = localStorage.getItem("songsList")?.split(',') || null
  const [selectedDate, setSelectedDate] = useState(getRandomDate(new Date(1958, 7, 4)).toISOString().split('T')[0]);
  const [billboardData, setBillboardData] = useState(null);
  const [tracksList, setTracksList] = useState(initialTrackList);
  const [playlistID, setPlaylistID] = useState(null);

  // Stores the callback code and state
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    const state = queryParams.get('state');
    if (code) {
      // Cookies.set('state', state);
      setCallbackCode(code)
      if (state) {
        setSptyState(state)
      }
    }
    else {      
      console.log("tracksList", tracksList)
      if (tracksList && Cookies.get('token')) {
        // it means that user already selected songs and gave auth.
        savePlaylist()
      }
    }
  }, [location.search]);
  useEffect(() => {
    if (callbackCode) {
      handleSpotifyToken(callbackCode, sptyState) // this thing will store the state and token
      setCallbackCode(null)
    }
  }, [callbackCode]);


  const base_url: string = config.MUSIC_BASE_URL!;
  if (!base_url) {
    return <p>URL NOT FOUND</p>
  }

  async function handleSpotifyOAuth() {
    setIsLoading(true)
    let oauth_url = config.MUSIC_BASE_URL + "/get_spotify_auth_url"
    fetch(oauth_url, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend, which could include the authorization URL
        // Redirect the user to the Spotify authorization page
        window.location.href = data.authorizationUrl;
        // From here, the page should be reloaded with the code in the parameters
        // useEffect with "location.search" as dependency
      })
      .catch((error) => {
        // Handle any errors that occurred during the process
        console.error('Error initiating OAuth:', error);
      });
    setIsLoading(false)
  }
  async function handleSpotifyToken(code: string, state: string | null) {
    console.log(`Handling Token - Getting token. code: ${code}\n state: ${state}`)
    // backend needs callback code and the state to generate token with Spotify
    let token_url = config.MUSIC_BASE_URL
      + "/get_spotify_user_token?callback_code="
      + code + (state ? '&state=' + state : '')
    fetch(token_url, { method: 'get' })
      .then((response) => response.json())
      .then((data) => {
        // Cookies.setCookie("token", data.userToken, 0.01)
        // Cookies.setCookie("sptyState", sptyState || "", 0.02)
        Cookies.set('token', data.userToken, {expires: 0.01})
        setToken(data.userToken)
        console.log("Cleaning url :)")
        navigate('/music') // cleaning query parameters
      })
      .catch((error) => {
        // Handle any errors that occurred during the process
        console.error('Error with TOKEN:', error);
      });
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
      // setTracksList(null)
      setPlaylistID(null)

      let request_body: CreateTrackListRequest = {
        list_of_songs: data,
      }
      const postResponse = await fetch(base_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request_body)
      });
      const songsList = await postResponse.json();
      setTracksList(songsList);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false)
    }
  };

  const savePlaylist = async () => {
    try {
      setIsLoading(true)
      let bearer_token = Cookies.get('token')
      console.log("TOKEN: ", bearer_token)
      if (!bearer_token) {
        console.log("TOKEN IS NULL")
        localStorage.setItem('songsList', tracksList!.join(','))        
        handleSpotifyOAuth()
      }
      const songsListList : any = tracksList ? tracksList : localStorage.getItem('songsList')
      // const songsListList : any = tracksList ? tracksList : Storage.getFromStorage('songsList', 'object');
      let request_body: SaveSongListRequest = {
        uri_list: songsListList,
        date: selectedDate,
        // list_name : TBD
      }
      console.log("REQUEST save playlist body:", request_body)
      const saveResponse = await fetch(base_url + "/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + Cookies.get('token')
        },
        body: JSON.stringify(request_body),
      });
      const saveData = await saveResponse.json();
      console.log("saveData", saveData)
      setPlaylistID(saveData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false)
      localStorage.clear()
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
      <button onClick={fetchBillboardData}>Create Billboard List</button>
      {/* {billboardData && !tracksList && <button onClick={createList}>Create Playlist</button>} */}
      {tracksList && !playlistID && <button onClick={savePlaylist}>Save Playlist</button>}
      <p>We started with a random date for your amusement.</p>
      <p>The earliest date available is 1958/08/04</p>
      {/* Display fetched data (optional) */}
      {billboardData && !tracksList && (
        <div>
          <h2>Fetched Music Data:</h2>
          <p>Result of the soup, the crawling on the Billboard</p>
          <pre>{JSON.stringify(billboardData, null, 2)}</pre>
        </div>
      )}
      {tracksList && !playlistID && (
        <div>
          <h2>Spotify's songs URIs:</h2>
          <p>This is something that is not user friendly!</p>
          <pre>{JSON.stringify(tracksList, null, 2)}</pre>
        </div>
      )}
      {playlistID && (
        <div>
          <h2>Saved Data:</h2>
          <pre>{JSON.stringify(playlistID, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MusicPage;
