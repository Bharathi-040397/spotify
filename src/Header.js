import React from 'react'
import './Header.css'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import Avatar from '@material-ui/core/Avatar';
import { useDataLayerValue } from './DataLayer';



function Header({spotify}) {
    const [{ user }, dispatch] = useDataLayerValue();
    console.log(user);
    return (
        <div className="header">
            <div className="header__left">
            <SearchOutlined />
            <input 
                placeholder="Search for Artists ,songs or podcast"
                />
            </div>
            <div className="header__right">
                
               <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
                <h5>{user?.display_name}</h5>
                    
            </div>
            
        </div>
    )
}

export default Header
