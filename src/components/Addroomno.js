import React, { useContext, useRef, useState } from 'react'
import db from '../data/firebase';
import { collection, addDoc } from "firebase/firestore";
import AuthContext from '../stores/AuthContext'
import '../home.css'
import Sidebar from './sidebar';
import Third from './third';

const AddRoomNo = () => {

    const roomRef = useRef();
    const personRef = useRef();
  
    const dateRef = useRef();
    const rentRef = useRef();

    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    const submitHandler = (e) => {

        e.preventDefault();
        setLoading(true);

        const roomNo = roomRef.current.value;
        const personName = personRef.current.value;
        

        console.log(dateRef.current.value);
        const year = parseInt(dateRef.current.value.split('-')[0]);
        const month = parseInt(dateRef.current.value.split('-')[1])
        const day = parseInt(dateRef.current.value.split('-')[2])
        console.log(year, month, day);

        const nextDate = new Date(dateRef.current.value);
        const days = daysInMonth(month, year);
        let next = nextDate.setDate(nextDate.getDate() + days);
        console.log(new Date(next).getDate());
        next = new Date(next).getFullYear() + '-' + (new Date(next).getMonth() + 1) + '-' + new Date(next).getDate();

        const rent = parseFloat(rentRef.current.value);

        const userId = user.uid;



        addDoc(collection(db, "rooms"), {
            roomNo: parseInt(roomNo),
            personName: personName,
        
            month: month,
            day: day,
            year: year,
            next: next,
            rent: rent,
            amount: rent,
            paid: 0,
            userId: userId
        }).then(() => {
            console.log('New Room Added Successfully');
            alert('New Room Added Successfully');
            e.target.reset();
            setLoading(false);
        }).catch(err => {
            console.log(err);
        })

    }

    return (
        <div className='home'>
            <main className="dashboard">
            <Sidebar/>
            <section className="getintouch">
                <h2>Add a New Room</h2>
                <form onSubmit={submitHandler}>
                    {loading && <h3 className="owner">Loading...</h3>}
                    <label htmlFor='room'>Room No.</label>
                    <input type="number" name="room" ref={roomRef} />
                    <label htmlFor='person'>Person</label>
                    <input type="text" name="person" ref={personRef} />
                    <label htmlFor='date'>Date</label>
                    <input type="date" name="date" ref={dateRef} />
                    <label htmlFor='rent'>Current Rent</label>
                    <input type="number" name="rent" ref={rentRef} step="0.01" />
                    {!loading && <input type="submit" value="Add" />}
                </form>
            </section>
            <Third/>
            </main >
        </div>
    )

}

export default AddRoomNo;