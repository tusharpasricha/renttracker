import React, { useEffect, useState, useRef, useContext } from 'react'
import db from '../data/firebase'
import { collection, query, getDocs, addDoc, updateDoc, doc, where, orderBy } from 'firebase/firestore'
import AuthContext from '../stores/AuthContext';
import Sidebar from './sidebar';
import Third from './third';

const Addexpense = () => {

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useContext(AuthContext);

    const productRef = useRef();
    const priceRef = useRef();
    const dateRef = useRef();

    let roomsData = [];

    useEffect(() => {

        const q = query(collection(db, "rooms"), where("userId", "==", user.uid), orderBy("roomNo"));

        getDocs(q).then(docs => {
            docs.forEach(doc => {
                roomsData = [...roomsData, {
                    roomNo: doc.data().roomNo,
                    roomId: doc.id,
                    amount: doc.data().amount
                }]
            })
            setRooms(roomsData);
        }).catch(err => {
            console.log(err);
        })

    }, [])

    const submitHandler = (e) => {

        e.preventDefault();
        setLoading(true);
        const roomId = e.target.roomId.value;
        const roomInfo = rooms.filter(room => room.roomId === roomId)[0]
        const roomNo = parseInt(roomInfo.roomNo);
        const product = productRef.current.value;
        const price = parseInt(priceRef.current.value);
        const year = parseInt(e.target.date.value.split('-')[0]);
        const month = parseInt(e.target.date.value.split('-')[1]);
        const amount = roomInfo.amount
        const userId = user.uid;
        const date = new Date();

        const expense = {
            roomId, product, price, year, month, roomNo, userId, date
        }

        addDoc(collection(db, "expenses"), expense).then(() => {

            const updatedAmount = amount + price;
            const roomDoc = doc(db, "rooms", roomId);
            return updateDoc(roomDoc, {
                amount: updatedAmount
            })

        })
            .then(() => {
                e.target.reset();
                setLoading(false);
                alert('New Expense Added');
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <div className='home'>
        <main className="dashboard">
        <Sidebar/>
        {/* <div className={classes.addexpense}> */}

            {user && <section className="getintouch">
                <h2>Add a Room Expense</h2>
                <form onSubmit={submitHandler}>
                    {loading && <h3 className="loading">Loading...</h3>}
                    <label htmlFor='room'>Room No.</label>
                    <select id="roomId">
                        {rooms && rooms.map(room => (
                            <option key={room.roomId} value={room.roomId}>{room.roomNo}</option>
                        ))}
                    </select>
                    <label htmlFor='date'>Date</label>
                    <input type="date" name="date" ref={dateRef} required />
                    <label htmlFor='product'>Product</label>
                    <input type="text" name="product" ref={productRef} required />
                    <label htmlFor='price'>Price</label>
                    <input type="number" name="price" ref={priceRef} step="0.01" required />
                    {!loading && <input type="submit" value="Add" />}
                </form>
            </section>}
            
           
        <Third/>
            </main >
        </div>
    )

}

export default Addexpense;