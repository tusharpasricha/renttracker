import React, { useContext, useEffect, useState } from 'react'
import db from '../../data/firebase'
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import AuthContext from '../../stores/AuthContext'
import Sidebar from '../../auth/sidebar';
import Third from '../../design/third';
import { Link, useNavigate } from 'react-router-dom';


const RentInfo = () => {

    const [rooms, setRooms] = useState([]);
    const [amountToBePaid, setAmountToBePaid] = useState(0);
    const [period, setPeriod] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();

    const { user } = useContext(AuthContext);

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
                    roomNo: doc.data().roomNo,
                    amount: doc.data().amount,
                    paid: doc.data().paid,
                    rent: doc.data().rent,
                    next: doc.data().next
                }]
            })
            setRooms(roomsData);
        })

    }, [])

    const submitHandler = (e) => {

        e.preventDefault();
        const roomId = e.target.roomId.value;
        console.log(roomId);

        const roomData = rooms.filter(room => room.roomId === roomId)[0];
        console.log(roomData);

        const now = new Date();
        const next = new Date(roomData.next);
        let next1 = roomData.next;
        let amount = parseInt(roomData.amount);
        if (now > next) {
            let factor = Math.floor((now - next) / (1000 * 60 * 60 * 24 * 30));
            amount = amount + (parseInt(roomData.rent) * (factor + 1));
            let days = 0;
            for (let i = 0; i <= factor; i++) {
                let month = parseInt(roomData.next.split('-')[1]) + i;
                let year = parseInt(roomData.next.split('-')[0]);
                let day = daysInMonth(month, year);
                days = days + day;
            }
            const nextDate = new Date(roomData.next);
            next1 = nextDate.setDate(nextDate.getDate() + days);
            next1 = new Date(next1).getFullYear() + '-' + (new Date(next1).getMonth() + 1) + '-' + new Date(next1).getDate();
            console.log(next1);
        }

        // amount, next1
        setAmountToBePaid(amount - roomData.paid);
        setPeriod(next1);

        const roomDoc = doc(db, "rooms", roomId);
        updateDoc(roomDoc, {
            amount: amount,
            next: next1
        }).then(() => {
            setLoading(true);
        })

    }

    return (
        <div className='home'>
            <main className="dashboard">
            <Sidebar/>

            <div  className="getintouch">
            <div className='back' onClick={()=>{navigation('/')}}>Back</div>

            {user && rooms && <section>
                <h2 >Rent Info</h2>
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
            <div>
                {loading && <p className='owner'>DUE: {amountToBePaid}</p>}
                {loading && <p className='owner'>TILL: {period}</p>}
            </div>
            </div>
    
            <Third/>
            </main >
        </div>

    )

}

export default RentInfo;