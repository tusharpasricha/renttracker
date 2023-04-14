import React, { useEffect, useRef, useState } from 'react'
import db from '../data/firebase'
import { addDoc, collection, doc, getDocs, query, setDoc } from 'firebase/firestore'

const Electricitybill = () => {

    const [rooms, setRooms] = useState([]);
    const [reading, setReading] = useState(0);
    const [amount, setAmount] = useState(0);
    const [isChanged, setIsChanged] = useState(0);
    const [loading, setLoading] = useState(false);

    const currentRef = useRef();
    const previousRef = useRef();
    const priceRef = useRef();

    useEffect(() => {

        const q = query(collection(db, "rooms"));
        getDocs(q).then(docs => {
            let roomsData = [];
            docs.forEach(doc => {
                roomsData = [...roomsData, {
                    roomId: doc.id,
                    roomNo: doc.data().roomNo,
                    meterReading: parseFloat(doc.data().meterReading),
                    personName: doc.data().personName
                }]
            })
            setRooms(roomsData);
            setReading(roomsData[0].meterReading);
        }).catch(err => {
            console.log(err);
        })

    }, [isChanged])

    const submitHandler = (e) => {

        e.preventDefault();

        setLoading(true);

        const rooM = rooms.filter(room => room.meterReading === parseFloat(previousRef.current.value))[0];
        const roomId = rooms.filter(room => room.meterReading === parseFloat(previousRef.current.value))[0].roomId;
        const ref = doc(db, "rooms", roomId);

        setDoc(ref, {
            roomNo: rooM.roomNo,
            personName: rooM.personName,
            meterReading: currentRef.current.value
        }).then(() => {
            return addDoc(collection(db, "expenses"), {
                roomId: roomId,
                roomNo: parseInt(rooM.roomNo),
                product: "Electricity Bill",
                price: parseFloat(amount),
                month: new Date().getMonth(),
                year: new Date().getFullYear()
            })
        }).then(() => {
            const changed = isChanged + 1;
            setIsChanged(changed);
            alert('Electricity Bill Added Successfully');
            setLoading(false);
            e.target.reset();
        }).catch(err => {
            console.log(err);
            setLoading(false);
        })

    }

    return (
        <>
            <section className="getintouch">
                <h2>Electricity Bill Calculator</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor='room'>Room No.</label>
                    <select id="roomId" onChange={e => {
                        setReading(parseFloat(e.target.value));
                    }}>
                        {rooms && rooms.map(room => (
                            <option key={room.roomId} value={room.meterReading}>{room.roomNo}</option>
                        ))}
                    </select>
                    <label htmlFor='reading'>Last Month Meter Reading</label>
                    <input type="number" value={reading} ref={previousRef} />
                    <label htmlFor='reading'>Current Meter Reading</label>
                    <input type="number" name="currentReading" ref={currentRef} onChange={e => {
                        const unit = parseFloat(currentRef.current.value) - parseFloat(previousRef.current.value)
                        setAmount(unit * parseFloat(priceRef.current.value));
                    }} />
                    <label htmlFor='price'>Price per Unit</label>
                    <input type="number" name="price" step="0.01" ref={priceRef} onChange={e => {
                        const unit = parseFloat(currentRef.current.value) - parseFloat(previousRef.current.value)
                        setAmount(unit * parseFloat(priceRef.current.value));
                    }} />
                    <label htmlFor='amount'>Total Amount</label>
                    <input type="text" name="totalAmount" value={amount} />
                    {!loading && <input type="submit" value="Add Expense" />}
                </form>
            </section>
        </>
    )

}

export default Electricitybill;