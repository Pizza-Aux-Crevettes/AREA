import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import Title from '../Title/Title';
import './Dashboard.css';
import logo_plus from '../assets/plus.png';
import RectangleDashboard from './Rectangle_Action.jsx';
import Cookies from 'cookies-js';

function AddRectangle({ addNewArea }) {
    return (
        <div className="row_container">
            <Button className="rectangle-add" onClick={addNewArea}>
                <img src={logo_plus} alt="Add new area" width={50} />
            </Button>
        </div>
    );
}

function Dashboard() {
    const [areas, setAreas] = useState([{ id: 1 }, { id: 2 }]);

    useEffect(() => {
        const token = Cookies.get('token');
        fetch('http://localhost:8080/api/getArea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify({
                token,
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setAreas(json);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const addNewArea = () => {
        const maxId =
            areas.length > 0 ? Math.max(...areas.map((area) => area.id)) : 0;
        const newArea = {
            id: maxId + 1,
            action: 'Select action',
            reaction: 'Select reaction',
            inputAction: '',
            inputReaction: '',
        };
        setAreas([...areas, newArea]);
        setAreas([...areas, newArea]);
    };

    const inputChange = (id, field, value) => {
        setAreas((prevInputs) =>
            prevInputs.map((inp) =>
                inp.id === id ? { ...inp, [field]: value } : inp
            )
        );
    };

    const removeArea = (id, action, reaction, inputAction, inputReaction) => {
        console.log(action, reaction, inputAction, inputReaction);
        fetch('http://localhost:8080/api/delArea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify({
                token: Cookies.get('token'),
                action: action,
                reaction: reaction,
                inputAct: inputAction,
                inputReact: inputReaction,
            }),
        })
            .then((response) => {
                fetch('http://localhost:8080/api/DelEmailUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                    body: JSON.stringify({
                        token: Cookies.get('token'),
                    }),
                });
            })
            .catch((error) => {
                console.error(error);
            });
        setAreas((prevAreas) => prevAreas.filter((area) => area.id !== id));
    };

    return (
        <div className="dashboard">
            <div className="all-container">
                <Title title="Dashboard" />
                <div className="container">
                    <div className="back-rectangle">
                        <div className="column-container">
                            {areas.map((area) =>
                                area.action === 'Select action' ? (
                                    <div
                                        key={area.id}
                                        className="row_container"
                                    >
                                        <RectangleDashboard
                                            id={area.id}
                                            onRemove={removeArea}
                                            contentAct={area.action}
                                            contentReact={area.reaction}
                                            inputChange={inputChange}
                                            inputContentAct={area.inputAction}
                                            inputContentReact={
                                                area.inputReaction
                                            }
                                            alreadyExist={false}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        key={area.id}
                                        className="row_container"
                                    >
                                        <RectangleDashboard
                                            id={area.id}
                                            onRemove={removeArea}
                                            contentAct={area.action}
                                            contentReact={area.reaction}
                                            inputChange={inputChange}
                                            inputContentAct={area.inputAction}
                                            inputContentReact={
                                                area.inputReaction
                                            }
                                            alreadyExist={true}
                                        />
                                    </div>
                                )
                            )}
                            <AddRectangle addNewArea={addNewArea} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
