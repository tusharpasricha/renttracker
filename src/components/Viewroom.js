import React, { useContext, useEffect, useState } from 'react'
import { collection, query, where, getDocs, doc, updateDoc, orderBy } from "firebase/firestore";
import AuthContext from '../stores/AuthContext'
import db from '../data/firebase';
import classes from './viewroom.module.css'

const Viewroom = () => {

    // const roomId = 'yiyUA6PoMwqsPKG4B6Hh';
    // const roomno = 104;

    const [rooms, setRooms] = useState([]);

    const { user } = useContext(AuthContext);

    const [roomNo, setRoomNo] = useState();
    const [roomId, setRoomId] = useState();
    const [personName, setPersonName] = useState('');
    const [meterReading, setMeterReading] = useState();
    const [rent, setRent] = useState();
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);

    const [room, setRoom] = useState({});

    const [isShown, setIsShown] = useState(false);

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }


    useEffect(() => {

        const q = query(collection(db, "rooms"), where("userId", "==", user.uid), orderBy("roomNo"));
        getDocs(q).then(docs => {
            let roomsData = [];
            docs.forEach(doc => {
                roomsData = [...roomsData, {
                    roomId: doc.id,
                    roomNo: doc.data().roomNo
                }]
            })
            setRooms(roomsData);
        }).catch(err => {
            console.log(err);
        })



    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        const roomId = e.target.roomId.value;
        setRoomId(roomId);
        console.log(roomId);
        // Get the Room No
        const roomNo1 = rooms.filter(room => room.roomId === roomId)[0].roomNo;
        console.log(roomNo1);
        const q = query(collection(db, "rooms"), where("userId", "==", user.uid), where("roomNo", '==', roomNo1));
        getDocs(q).then(rooms => {
            let roomsDetails = []
            rooms.forEach(room => {
                const roomNo = room.data().roomNo;
                const meterReading = room.data().meterReading;
                const personName = room.data().personName;
                const month = room.data().month;
                const year = room.data().year;
                const day = room.data().day;
                const rent = room.data().rent
                let date;
                if (month.toString().length === 1 && day.toString().length === 1) {
                    date = year + '-' + '0' + month + '-' + '0' + day;
                } else if (month.toString().length === 1) {
                    date = year + '-' + '0' + month + '-' + day;
                } else if (day.toString().length === 1) {
                    date = year + '-' + month + '-' + '0' + day;
                }
                console.log(date);
                const roomDetail = {
                    roomNo, meterReading, personName, date, rent
                };
                roomsDetails = [...roomsDetails, roomDetail];
            })
            setRoomNo(roomsDetails[0].roomNo);
            setRent(roomsDetails[0].rent);
            setMeterReading(roomsDetails[0].meterReading);
            setPersonName(roomsDetails[0].personName);
            setDate(roomsDetails[0].date);
            setIsShown(true);
            setRoom({
                date: roomsDetails[0].date
            })
        }).catch(err => {
            console.log(err);
        })
    }

    const submitHandler1 = (e) => {

        e.preventDefault();
        setLoading(true);
        console.log(e.target.date.value);
        const year = date.split('-')[0];
        const month = date.split('-')[1];
        const day = date.split('-')[2];
        if (parseInt(year) === parseInt(room.date.split('-')[0]) && parseInt(month) === parseInt(room.date.split('-')[1]) && parseInt(day) === parseInt(room.date.split('-')[2])) {
            const roomRef = doc(db, "rooms", roomId);
            console.log('I m here');
            updateDoc(roomRef, {
                roomNo: roomNo,
                meterReading: meterReading,
                personName: personName,
                month: parseInt(month),
                year: parseInt(year),
                day: parseInt(day)
            }).then(() => {
                alert('Updated Successfully');
                setLoading(false);
            })
        } else {
            const roomRef = doc(db, "rooms", roomId);
            const nextDate = new Date(e.target.date.value);
            const days = daysInMonth(month, year);
            let next = nextDate.setDate(nextDate.getDate() + days);
            console.log(new Date(next).getDate());
            next = new Date(next).getFullYear() + '-' + (new Date(next).getMonth() + 1) + '-' + new Date(next).getDate();
            updateDoc(roomRef, {
                roomNo: roomNo,
                meterReading: meterReading,
                personName: personName,
                month: parseInt(month),
                year: parseInt(year),
                day: parseInt(day),
                paid: 0,
                next: next,
                amount: rent
            }).then(() => {
                alert('Updated Successfully');
                setLoading(false);
            })
        }
        // const roomRef = collection(db, 'rooms', roomId);

        // setDoc(doc(roomRef, roomId), {
        //     roomNo: roomNo,
        //     meterReading: meterReading,
        //     personName: personName,
        //     month: parseInt(month),
        //     year: parseInt(year),
        //     day: parseInt(day)
        // }).then(() => {
        //     alert('Updated Successfully');
        //     setLoading(false);
        // }).catch(err => {
        //     console.log(err);
        // })
    }

    return (
        <div className={classes.room}>
            {!isShown && <section className="getintouch">
                <h2 className={classes.roomText}>Room Details</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor='room'>Room No.</label>
                    <select id="roomId">
                        {rooms && rooms.map(room => (
                            <option key={room.roomId} value={room.roomId}>{room.roomNo}</option>
                        ))}
                    </select>
                    <input type="submit" value="View" />
                </form>
            </section>}
            {isShown && <section className={classes.getintouch}>
                <h2 className={classes.roomText}>Room No {roomNo}</h2>
                <form onSubmit={submitHandler1}>
                    <label htmlFor='room'>Room No.</label>
                    <input type="number" name="room" value={roomNo} onChange={e => {
                        const roomNo = e.target.value;
                        setRoomNo(roomNo)
                    }} />
                    <label htmlFor='person'>Person</label>
                    <input type="text" name="person" value={personName} onChange={e => {
                        const personName = e.target.value;
                        setPersonName(personName);
                    }} />
                    <label htmlFor='meter'>Current Meter Reading</label>
                    <input type="number" name="meter" step="0.01" value={meterReading} onChange={e => {
                        const meterReading = e.target.value;
                        setMeterReading(meterReading);
                    }} />
                    <label htmlFor='rent'>Rent</label>
                    <input type="number" name="rent" step="0.01" value={rent} onChange={e => {
                        const rent = parseInt(e.target.value);
                        setRent(rent);
                    }} />
                    <label htmlFor='date'>Date</label>
                    <input type="date" name="date" value={date} onChange={e => {
                        console.log(e.target.value);
                        setDate(e.target.value);
                    }} />
                    {!loading && <input type="submit" value="Update" />}
                </form>
            </section>}
        </div>
    )

}

export default Viewroom;