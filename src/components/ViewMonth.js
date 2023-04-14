import React, { useContext, useRef, useState } from 'react'
import db from '../data/firebase'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import AuthContext from '../stores/AuthContext'
import classes from './viewexpenses.module.css'

const ViewMonth = () => {

    const yearRef = useRef();
    const monthRef = useRef();

    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useContext(AuthContext);

    const submitHandler = (e) => {
        e.preventDefault();
        const month = parseInt(monthRef.current.value) - 1
        console.log(month);
        const q = query(collection(db, "expenses"), where("month", "==", month), where("userId", "==", user.uid), orderBy("roomNo"))


        getDocs(q).then(docs => {
            let expensesData = []
            docs.forEach(doc => {
                expensesData = [...expensesData, {
                    expenseId: doc.id,
                    product: doc.data().product,
                    price: parseInt(doc.data().price),
                    year: doc.data().year,
                    month: doc.data().month,
                    roomNo: doc.data().roomNo
                }]
            })
            console.log(expensesData);
            setLoading(true);
            setExpenses(expensesData);
        })

    }

    return (
        <div className={classes.viewexpenses}>
            <section className="getintouch">
                <h2>View Monthly Expenses</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor='month'>Month</label>
                    <input type="text" name="month" ref={monthRef} />
                    <label htmlFor='year'>Year</label>
                    <input type="text" name="year" ref={yearRef} />
                    <input type="submit" value="View" />
                </form>
            </section>
            <section>
                <div>
                    {!expenses[0] && loading &&
                        <div className='owner'>No Data Available</div>
                    }
                </div>
                {expenses[0] && <table class={classes.contentTable}>
                    <thead>
                        <tr>
                            <th>Room No.</th>
                            <th>Product</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map(expense => (
                            <tr key={expense.expenseId}>
                                <td>{expense.roomNo}</td>
                                <td>{expense.product}</td>
                                <td>{expense.price}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>}
            </section>
        </div>
    )

}

export default ViewMonth;