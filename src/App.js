import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import "./App.css";
import Login from "./components/Login";
import Player from "./components/Player";
import { getTokenFromUrl } from "./spotify";
import { useStateValue } from "./StateProvider";

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useStateValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });
    }
  }, []);

  console.log("🙋‍♂️ from state!", user);

  return <div className="app">{token ? <Player /> : <Login />}</div>;
}

export default App;
