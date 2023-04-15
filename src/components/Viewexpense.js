import React, { useContext, useEffect, useState } from 'react'
import db from '../data/firebase'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import AuthContext from '../stores/AuthContext'
import Sidebar from './sidebar';
import Third from './third';
import { Link, useNavigate } from 'react-router-dom';


const Viewexpense = () => {
    const navigation = useNavigate();

    const [expenses, setExpenses] = useState([]);
    const [rooms, setRooms] = useState([]);

    const [amount, setAmount] = useState(0);

    const [loading, setLoading] = useState(false);

    const { user, getMonth } = useContext(AuthContext);

    

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
        const id = e.target.roomId.value;
        const q = query(collection(db, "expenses"), where('roomId', '==', id));
        getDocs(q).then(docs => {
            let expensesData = [];
            let amountData = 0;
            docs.forEach(doc => {
                amountData = amountData + parseFloat(doc.data().price);
                expensesData = [...expensesData, {
                    expenseId: doc.id,
                    product: doc.data().product,
                    price: parseInt(doc.data().price),
                    year: doc.data().year,
                    month: doc.data().month
                }]
            })
            setLoading(true);
            setAmount(amountData);
            setExpenses(expensesData);
        })

    }

    return (
        <div className='home'>
        <main className="dashboard">
        <Sidebar/>
        <div className="getintouch">
        <div className='back' onClick={()=>{navigation('/')}}>Back</div>

            <section >
                <h2>View Expenses</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor='room'>Room No.</label>
                    <select id="roomId">
                        {rooms && rooms.map(room => (
                            <option key={room.roomId} value={room.roomId}>{room.roomNo}</option>
                        ))}
                    </select>
                    <input type="submit" value="View" />
                </form>
            </section>
            <section>
                <div>
                    {!expenses[0] && loading &&
                        <div className='owner'>No Data Available</div>
                    }
                </div>
                {expenses[0] && <table className="contentTable">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Product</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map(expense => (
                            <tr key={expense.expenseId}>
                                <td>{getMonth(expense.month)}-{expense.year}</td>
                                <td>{expense.product}</td>
                                <td>{expense.price}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>}
                {expenses[0] && <div className='owner'>Total Amount : {amount}</div>}
            </section>
            </div>
            <Third/>
            </main >
        </div>

    )

}

export default Viewexpense;