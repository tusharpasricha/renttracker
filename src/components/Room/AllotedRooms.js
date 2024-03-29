import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from '../../context/AuthContext'
import db from "../../data/firebase";
import Sidebar from '../../auth/sidebar';
import Third from '../../design/third';


const AllotedRooms = () => {

    const [rooms, setRooms] = useState([]);
    const navigation = useNavigate();
    const [loading, setLoading] = useState(true);

    const { user } = useContext(AuthContext);

    useEffect(() => {

        if (user) {
            const q = query(collection(db, "rooms"), where("userId", "==", user.uid), orderBy("roomNo"));
            getDocs(q).then(docs => {

                let roomsData = [];
                docs.forEach(doc => {
                    roomsData = [...roomsData, {
                        roomNo: doc.data().roomNo,
                        roomId: doc.id,
                        personName: doc.data().personName
                    }]
                })
                setLoading(false);
                setRooms(roomsData);

            }).catch(err => {
                console.log(err);
            })
        }

    }, [user])

    const deleteRoom = (id) => {

        const answer = prompt('Do you want to delete (y / n) : ');
        if (answer !== 'y') {
            return;
        }

        deleteDoc(doc(db, "rooms", id)).then(() => {
            alert('Deleted Successfully');
            navigation('/');
        })

    }

    return (
        <div className='home'>
        <main className="dashboard">
        <Sidebar/>
        <div className="getintouch">
<div className='back' onClick={()=>{navigation('/')}}>Back</div>
            {user && <div>
                {loading && <div className="loading">Loading...</div>}
                {rooms[0] && <table className="contentTable">
                    <thead>
                        <tr>
                            <th>Room No.</th>
                            <th>Name</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map(r => (
                            <tr key={r.roomId}>
                                <td>{r.roomNo}</td>
                                <td>{r.personName}</td>
                                <td><img src="img/delete.png" alt="Delete" onClick={() => {
                                    deleteRoom(r.roomId);
                                }} /></td>
                            </tr>
                        ))}
                    </tbody>

                </table>}
            </div>}
            {!rooms[0] && !loading && <div className="error">No Rooms Found:(</div>}
            </div>
            <Third/>
            </main >
        </div>
    )

}
export default AllotedRooms;