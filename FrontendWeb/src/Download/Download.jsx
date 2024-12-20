import Title from '../Title/Title';
import { IconArrowBarToDown } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import mobile_icon from '../assets/mobile.png';

import './Download.css';
import { useEffect } from 'react';

function Download() {
    const apiUrl = localStorage.getItem('userInputIP') ? localStorage.getItem('userInputIP') : 'http://localhost:8080';
    useEffect(() => {}, []);
    function move() {
        const fileUrl = `${apiUrl}/output/client.apk`;
        const fileName = 'client.apk';
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="download">
            <div className="all-container">
                <Title title="Download APK" />
                <div className="container">
                    <div className="back-rectangle">
                        <div className="text-download">
                            <span className="text-content">
                                Here is the download link for our mobile
                                version.
                            </span>
                            <Button className="button-content" onClick={move}>
                                Download apk
                                <IconArrowBarToDown
                                    style={{ marginLeft: '10px' }}
                                />
                            </Button>
                        </div>
                        <img
                            src={mobile_icon}
                            alt="Mobile icon"
                            className="icon"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Download;
