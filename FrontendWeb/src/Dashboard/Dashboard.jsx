import { useState } from 'react';
import { Button } from '@mantine/core';
import Title from '../Title/Title';
import './Dashboard.css';
import logo_plus from '../assets/plus.png';
import RectangleDashboard from "./Rectangle_Action.jsx"

function AddRectangle({ addNewArea }) {
    return (
        <div className='row_container'>
            <Button className="rectangle-add" onClick={addNewArea}>
                <img src={logo_plus} alt="Add new area" width={50} />
            </Button>
        </div>
    );
}

// function StopArea({ areaId, onConfirm }) {
//     const [opened, setOpened] = useState(false);

//     const handleCloseModal = () => setOpened(false);
//     const handleConfirm = () => {
//         onConfirm(areaId);
//         setOpened(false);
//     };

//     return (
//         <>
//             <Button
//                 className="button-correct"
//                 onClick={() => setOpened(true)}
//             >
//                 ■ Stop
//             </Button>

//             <Modal
//                 opened={opened}
//                 onClose={handleCloseModal}
//                 title="Stopping area"
//                 centered
//             >
//                 <p>Are you sure you want to stop this area?</p>
//                 <Button onClick={handleConfirm}>Yes</Button>
//             </Modal>
//         </>
//     );
// }

function Dashboard() {
    const [areas, setAreas] = useState([{ id: 1 }, { id: 2 }]);
    const [input, setInput] = useState([ { id: 1, content: '' }, { id: 2, content: '' }]);

    const addNewArea = () => {
        const maxId =
            areas.length > 0 ? Math.max(...areas.map((area) => area.id)) : 0;
        // const newArea = { id: maxId + 1, buttonText: 'Apply' };
        const newArea = { id: maxId + 1 };
        const newInput = {content: '', id: maxId + 1};
        setAreas([...areas, newArea]);
        setInput([...input, newInput]);
    };

    const inputChange = (id, value) => {
        setInput((prevInputs) =>
            prevInputs.map((inp) =>
                inp.id === id ? { ...inp, content: value } : inp
            )
        );
    };

    // const handleApplyClick = (id) => {
    //     setAreas((prevAreas) =>
    //         prevAreas.map((area) =>
    //             area.id === id
    //                 ? {
    //                     ...area,
    //                     buttonText:
    //                         area.buttonText === 'Apply' ? '■ Stop' : 'Apply',
    //                 }
    //                 : area
    //         )
    //     );

    //     const area = areas.find((area) => area.id === id);
    //     if (area.buttonText === 'Apply') {
    //         applyAcRea(actionReaction, selectedCity);
    //     }
    // };

    // const handleStopArea = (id) => {
    //     setAreas((prevAreas) =>
    //         prevAreas.map((area) =>
    //             area.id === id ? { ...area, buttonText: 'Apply' } : area
    //         )
    //     );
    // };

    const removeArea = (id) => {
        setAreas((prevAreas) => prevAreas.filter((area) => area.id !== id));
    };

    return (
        <div className="dashboard">
            <div className="all-container">
                <Title title="Dashboard" />
                <div className="container">
                    <div className="back-rectangle">
                        <div className="column-container">
                            {areas.map((area) => (
                                <div key={area.id} className="row_container">
                                    <RectangleDashboard
                                        id={area.id}
                                        onRemove={removeArea}
                                        input={input.find((inp) => inp.id === area.id)?.content || ''}
                                        inputChange={inputChange}
                                    />
                                </div>
                            ))}
                            <AddRectangle addNewArea={addNewArea} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
