import React from 'react'
import './Sidebar.css'
import SidebarOption from './SidebarOption'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { useDataLayerValue } from './DataLayer'


function Sidebar() {
    const [{ playlists }, dispatch] = useDataLayerValue();
    return (
        <div className="sidebar">
            <img className='sidebar__logo' src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt=""></img>
            <SidebarOption title="Home" Icon={HomeOutlinedIcon} />
            <SidebarOption title="Search" Icon={SearchOutlinedIcon} />
            <SidebarOption title="Your library" Icon={LibraryMusicOutlinedIcon} />
            <br />
            <strong className="sidebarOption__title">PLAYLISTS</strong>
            <hr />
            {playlists?.items?.map(playlist => {
               return <SidebarOption title={playlist.name} />
            })}
            
            
             </div>
    )
}

export default Sidebar
