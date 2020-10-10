import React from "react";
import Header from "./Header";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import "./Body.css";
import SongRow from "./SongRow";
import { useStateValue } from "../StateProvider";

function Body({ spotify }) {
  const [{ discover_weekly }, dispatch] = useStateValue();

  const playPlaylist = () => {
    spotify
      .play({
        context_uri: `spotify:playlist:${discover_weekly.id}`,
      })
      .then(() => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            item: true,
          });
        });
      })
      .catch((err) => {
        if (err.status === 403) {
          alert("You need Spotify Premium for this");
        } else {
          alert(err.response);
          console.log(err);
        }
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then(() => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            item: true,
          });
        });
      })
      .catch((err) => {
        if (err.status === 403) {
          alert("You need Spotify Premium for this");
        } else {
          alert(err.response);
          console.log(err);
        }
      });
  };

  return (
    <div className="body">
      <Header spotify={spotify} />

      <div className="body__info">
        <img src={discover_weekly?.images[0].url} alt="" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>

      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className="body__shuffle"
            onClick={playPlaylist}
          />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>

        {discover_weekly?.tracks.items.map((item, index) => (
          <SongRow key={index} track={item.track} playSong={playSong} />
        ))}
      </div>
    </div>
  );
}

export default Body;
