import React,{useEffect} from 'react';
import './App.css';
import Login from './Login'
import { getTokenFromUrl } from './spotify'
import Player from './Player'
import SpotifyWebApi from 'spotify-web-api-js'
import { useDataLayerValue } from './DataLayer';



 export const s = new SpotifyWebApi();

function App() {
  const [{user,token,playlists,top_artists,discover_weekly}, dispatch] = useDataLayerValue();
   
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      s.setAccessToken(_token);
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      
      
      s.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });
      s.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
          
        });
      });
      s.getPlaylist("22eUlBQe2LFWkTBgUhRq4E").then(response => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly:response,
        })
      })
      s.getMyTopArtists().then(response => {
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists:response,
        })
      })
      dispatch({
        type: "SET_SPOTIFY",
        spotify:s,
      })
    }
  }, [token,dispatch]);
  
  console.log("user", user);
  console.log("token", token);

  return (
    <div className="App">
      {
        token ? (<Player spotify={s}/>):(<Login />)
      }
    </div>
  );
}

export default App;
