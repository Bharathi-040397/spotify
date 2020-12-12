import React,{useEffect} from 'react'
import './Footer.css'
import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import SkipPreviousOutlinedIcon from '@material-ui/icons/SkipPreviousOutlined';
import SkipNextOutlinedIcon from '@material-ui/icons/SkipNextOutlined';
import ShuffleOutlinedIcon from '@material-ui/icons/ShuffleOutlined';
import RepeatOutlinedIcon from '@material-ui/icons/RepeatOutlined';
import Grid from '@material-ui/core/Grid';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import Slider from '@material-ui/core/Slider';
import { useDataLayerValue } from './DataLayer';
import Audio from '@material-ui/core'
import {s} from './App'






function Footer() {
    const [{item, playing }, dispatch] = useDataLayerValue();
    useEffect(() => {
        s.getMyCurrentPlaybackState().then((r) => {
            console.log(r);
            dispatch({
                type: "SET_PLAYING",
                playing: r.is_playing,
              });

            
            dispatch({
                type: "SET_ITEM",
                item: r.item,
              });
      
            
       
          });
        
    }, [s]);


    const handlePlayPause = () => {
        if (playing)
        {
            s.pause();
            dispatch({
                type: "SET_PLAYING",
                playing: false,
            });
            
        }
        else
        {
            s.play();
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
            }
    }
    
    const skipNext = () => {
        s.skipToNext();
        s.getMyCurrentPlayingTrack().then(response => {
            dispatch({
                type: "SET_ITEM",
                item: response.item,
            });
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
            
            
        })
}
    const skipPrevious = () => {
        s.skipToPrevious();
        s.getMyCurrentPlayingTrack().then(response => {
            dispatch({
                type: "SET_ITEM",
                item: response.item,
            });
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
            
        })
}

    return (
        <div className="footer">
            <div className="footer__left">
                <img src={item?.album.images[0].url} alt={item?.name} />
                {item ?
                    <div className="footer__songinfo">
                        <p>{item.name}</p>
                        <small>{item.artists.map(artist => artist.name).join(",")}</small>
                    </div>
                    :
                    <div className="footer__songinfo">
                        <p>No song is Playing</p>
                        <small>...</small>
                    </div>
                }
            </div>
            <div className="footer__center">
                
                                <ShuffleOutlinedIcon className="footer__green" />
                <SkipPreviousOutlinedIcon onClick={skipPrevious} className="footer__icon" />
                {
                    playing ?
                        
                        (< PauseCircleOutlineIcon onClick={handlePlayPause} fontSize="large" className="footer__icon" />)
                        :
                        (< PlayCircleOutlineOutlinedIcon onClick={handlePlayPause} fontSize="large" className="footer__icon" />)
                }
                
                <SkipNextOutlinedIcon onClcik={skipNext} className="footer__icon"/>
                <RepeatOutlinedIcon className="footer__green"/>
            </div>
            <div className="footer__right">
                <Grid container spacing={2}>
                    <Grid item>
                      <PlaylistPlayIcon />  
                    </Grid>
                    <Grid item>
                       <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
