import { addDoc, collection, getDocs, query, doc, updateDoc, where, orderBy } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from '../../stores/AuthContext'
import db from "../../data/firebase";
import Third from "../../design/third";
import Sidebar from "../../auth/sidebar";
import {useNavigate } from 'react-router-dom';

const DepositeRent = () => {

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigation = useNavigate();


    useEffect(() => {

        const q = query(collection(db, "rooms"), where("userId", "==", user.uid), orderBy("roomNo"));
        getDocs(q).then(docs => {
            let roomsData = [];
            docs.forEach(doc => {
                roomsData = [...roomsData, {
                    roomId: doc.id,
                    roomNo: doc.data().roomNo,
                    personName: doc.data().personName,
                    meterReading: doc.data().meterReading,
                    paid: parseInt(doc.data().paid)
                }]
            })
            setRooms(roomsData);
        }).catch(err => {
            console.log(err);
        })

    }, [])

    // const submitHandler = (e) => {

    //     setLoading(true);

    //     e.preventDefault();
    //     const roomId = e.target.roomId.value;
    //     const roomInfo = rooms.filter(room => room.roomId === roomId)[0]
    //     const roomNo = roomInfo.roomNo;
    //     let paid = roomInfo.paid;
    //     const amount = parseInt(e.target.totalAmount.value);

    //     const date = e.target.date.value;

    //     const month = parseInt(date.split('-')[1]);
    //     const year = parseInt(date.split('-')[0]);

    //     const userID = user.uid;

    //     const date1 = new Date();

    //     addDoc(collection(db, "income"), {
    //         roomId: roomId,
    //         roomNo: roomNo,
    //         amount: amount,
    //         month: month,
    //         year: year,
    //         date: date1,
    //         userId: user.uid
    //     }).then(() => {
    //         const roomDoc = doc(db, "rooms", roomId);
    //         paid = paid + amount
    //         updateDoc(roomDoc, {
    //             paid: paid
    //         }).then(() => {
    //             alert('Added Successfully');
    //             setLoading(false);
    //             e.target.reset();
    //         })
    //     }).catch(err => {
    //         console.log(err);
    //     })

    // }
    const submitHandler = async (e) => {
        try {
          e.preventDefault();
          setLoading(true);
          
          const roomId = e.target.roomId.value;
          const roomInfo = rooms.find(room => room.roomId === roomId);
          const { roomNo, paid } = roomInfo;
          const amount = parseInt(e.target.totalAmount.value);
          const [year, month] = e.target.date.value.split('-');
          const userID = user.uid;
          const date = new Date();
          
          await addDoc(collection(db, 'income'), {
            roomId,
            roomNo,
            amount,
            month: parseInt(month),
            year: parseInt(year),
            date,
            userId: userID
          });
          
          const roomDoc = doc(db, 'rooms', roomId);
          const updatedPaid = paid + amount;
          
          await updateDoc(roomDoc, { paid: updatedPaid });
          
          alert('Added Successfully');
          setLoading(false);
          e.target.reset();
        } catch (error) {
          console.log(error);
        }
      };
      

    return (
        <div className='home'>
            <main className="dashboard">
            <Sidebar/>
                {user && <section className="getintouch">
                <div className='back' onClick={()=>{navigation('/')}}>Back</div>

                    <h2>Deposit Rent</h2>
                    <form onSubmit={submitHandler}>
                        <label htmlFor='room'>Room No.</label>
                        <select id="roomId">
                            {rooms && rooms.map(room => (
                                <option key={room.roomId} value={room.roomId}>{room.roomNo}</option>
                            ))}
                        </select>
                        <label htmlFor='date'>Date</label>
                        <input type="date" name="date" />
                        <label htmlFor='totalAmount'>Total Amount</label>
                        <input type="number" name="totalAmount" />
                        {!loading && <input type="submit" value="Add" />}
                    </form>
                </section>}
                <Third/>
            </main >
        </div>
    )

}

export default DepositeRent;