import Title from '../Title/Title';
import { IconArrowBarToDown } from '@tabler/icons-react';
import { Button, Tooltip } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import mobile_icon from '../assets/mobile.png';

import './Download.css';

function Download () {

    const navigate = useNavigate();
    const location = useLocation();

    function move() {
        navigate('/');
        location.pathname === '/';
    }

    return (
        <div className='download'>
            <div className='all-container'>
                <Title title="Download APK" />
                <div className="container">
                    <div className="back-rectangle">
                        <div className='text-download'>
                            <span className="text-content">Here is the download link for our mobile version.</span>
                            <Button className="button-content" onClick={move}>Download apk<IconArrowBarToDown style={{marginLeft:'10px'}}/></Button>
                        </div>
                        <img src={mobile_icon} alt="Mobile icon" className="icon"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Download;
