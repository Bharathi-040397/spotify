import React from 'react'
import './Body.css'
import Header from './Header'
import { useDataLayerValue } from './DataLayer'
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SongRow from './SongRow'


function Body({spotify}) {
    const [{ discover_weekly }, dispatch] = useDataLayerValue();
    console.log(discover_weekly);

    const playPlaylist = (id) => {
        spotify.play({
            context_uri: `spotify:playlist:22eUlBQe2LFWkTBgUhRq4E`,
        }).then(response => {
            spotify.getMyCurrentPlayingTrack().then(r => {
                dispatch({
                    type: "SET_ITEM",
                    item: r.item,
                });
                dispatch({
                    type: "SET_PLAYING",
                    playing: true,
                });
                
                    })
                })
    }
    const playSong = (id) => {
        spotify.play({
            uris: [`spotify:track:${id}`],
        }).then(response => {
            spotify.getMyCurrentPlayingTrack().then(r => {
                dispatch({
                    type: "SET_ITEM",
                    item: r.item,
                });
                dispatch({
                    type: "SET_PLAYING",
                    playing: true,
                });
                
                    })
                })
    }
    return (
        <div className="body">
            <Header spotify={spotify}/>
            <div className="body__info">
                <img src={discover_weekly?.images[0]?.url} alt="" />
                <div className="body__infoText">
                    <strong>PLAYLISTS</strong>
                    <h3>Discover Weekly</h3>
                    <p>{discover_weekly?.description}</p>
                </div>
            </div>
            <div className="body__songs">
                <div className="body__icons">
                    <PlayCircleFilledWhiteIcon className="body__shuffle" onClick={playPlaylist} />
                    <FavoriteIcon fontSize='large'/>
                    <MoreHorizIcon className="dot" />
                </div>
                {discover_weekly?.tracks.items.map(item => 
                    <SongRow playSong={playSong} track={item.track} />
                )}
            </div>
        </div>
    )
}

export default Body
