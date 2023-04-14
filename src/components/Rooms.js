import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './viewexpenses.module.css'
import AuthContext from '../stores/AuthContext'
import db from "../data/firebase";
import Viewroom from "./Viewroom";

const Rooms = () => {

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
                        roomId: doc.id
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
        <>
            {user && <div>
                <Viewroom/>
                {loading && <div className="loading">Loading...</div>}
                {rooms[0] && <table className={classes.contentTable}>
                    <thead>
                        <tr>
                            <th>Room No.</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map(expense => (
                            <tr key={expense.roomId}>
                                <td>{expense.roomNo}</td>
                                <td><img src="img/delete.png" alt="Delete" onClick={() => {
                                    deleteRoom(expense.roomId);
                                }} /></td>
                            </tr>
                        ))}
                    </tbody>

                </table>}
            </div>}
            {!rooms[0] && !loading && <div className="error">No Rooms Found:(</div>}
           
        </>
    )

}
export default Rooms;