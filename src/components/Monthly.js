import React, { useContext, useRef, useState } from "react";
import db from '../data/firebase'
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from 'firebase/firestore'
import AuthContext from '../stores/AuthContext'
import { useNavigate } from "react-router-dom";
import classes from './viewexpenses.module.css'

const Monthly = () => {

    const monthRef = useRef();
    const yearRef = useRef();
    const navigation = useNavigate();

    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [building, setBuilding] = useState([]);
    const [loading, setLoading] = useState(false);

    const [totalExpense, setTotalExpense] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalBuilding, setTotalBuilding] = useState(0);

    const { user } = useContext(AuthContext);

    const submitHandler = (e) => {

        e.preventDefault();
        const month = parseInt(monthRef.current.value);
        const year = parseInt(yearRef.current.value);
        const q = query(collection(db, "expenses"), where("userId", "==", user.uid), where("month", "==", month), where("year", "==", year), orderBy("date"));


        getDocs(q).then(docs => {
            let expensesData = []
            let amount = 0;
            docs.forEach(doc => {
                amount = amount + parseFloat(doc.data().price);
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
            setTotalExpense(amount);
            return getDocs(query(collection(db, "income"), where("userId", "==", user.uid), where("month", "==", month), where("year", "==", year), orderBy("date")))
        }).then(docs => {
            let incomeData = [];
            let amount = 0;
            docs.forEach(doc => {
                amount = amount + doc.data().amount;
                incomeData = [...incomeData, {
                    amount: doc.data().amount,
                    month: doc.data().month,
                    roomNo: doc.data().roomNo,
                    roomId: doc.data().roomId,
                    year: doc.data().year,
                    incomeId: doc.id
                }]
            })
            setIncomes(incomeData);
            // setLoading(true);
            setTotalIncome(amount);
            return getDocs(query(collection(db, "building"), where("userId", "==", user.uid), where("month", "==", month), where("year", "==", year), orderBy("date")))
        }).then(docs => {
            let buildingData = [];
            let amount = 0;
            docs.forEach(doc => {
                amount = amount + parseInt(doc.data().price);
                buildingData = [...buildingData, {
                    amount: doc.data().price,
                    month: doc.data().month,
                    year: doc.data().year,
                    buildingId: doc.id,
                    product: doc.data().product
                }]
            })
            setBuilding(buildingData);
            setLoading(true);
            setTotalBuilding(amount);
        })

    }

    const expenseDelete = (id) => {

        const answer = prompt('Do you want to delete (y / n) : ');

        if (answer !== 'y') {
            return;
        }

        deleteDoc(doc(db, "expenses", id)).then(() => {
            alert('Deleted Successfully');
            navigation('/');
        })

    }

    const buildingDelete = (id) => {

        const answer = prompt('Do you want to delete (y / n) : ');

        if (answer !== 'y') {
            return;
        }

        deleteDoc(doc(db, "building", id)).then(() => {
            alert('Deleted Successfully');
            navigation('/');
        })

    }

    const incomeDelete = (id) => {

        const answer = prompt('Do you want to delete (y / n) : ');

        if (answer !== 'y') {
            return;
        }

        deleteDoc(doc(db, "income", id)).then(() => {
            alert('Deleted Successfully');
            navigation('/');
        })

    }

    return (
        <div>
            <section className="getintouch">
                <h2>View Monthly Statement</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor='month'>Month</label>
                    <input type="text" name="month" ref={monthRef} />
                    <label htmlFor='year'>Year</label>
                    <input type="text" name="year" ref={yearRef} />
                    <input type="submit" value="View" />
                </form>
            </section>
            <section className="informations">
                {<div className="owner">Net Profit : <span>{totalIncome - (totalExpense + totalBuilding)}</span></div>}
                <div className={totalExpense ? 'datas' : ''}>
                    {expenses[0] && <h2 className='owner'>Expenses</h2>}
                    {expenses[0] && <table class={classes.contentTable}>
                        <thead>
                            <tr>
                                <th>Room No.</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map(expense => (
                                <tr key={expense.expenseId}>
                                    <td>{expense.roomNo}</td>
                                    <td>{expense.product}</td>
                                    <td>{expense.price}</td>
                                    <td><img src="img/delete.png" alt="Delete" onClick={() => {
                                        expenseDelete(expense.expenseId)
                                    }} /></td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    }
                    {loading && <div className='owner'>Total Expenses : <span>{totalExpense}</span></div>}
                </div>
                
            </section>
            <section className="informations">
                <div className={totalBuilding ? 'datas' : ''}>
                {building[0] && <h2 className='owner'>Building Expenses</h2>}
                {building[0] && <table class={classes.contentTable}>
                    <thead>
                        <tr>
                            <th>Room No.</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {building.map(expense => (
                            <tr key={expense.expenseId}>
                                <td>Building Expenses</td>
                                <td>{expense.product}</td>
                                <td>{expense.amount}</td>
                                <td><img src="img/delete.png" alt="Delete" onClick={() => {
                                    buildingDelete(expense.buildingId)
                                }} /></td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                }
                {loading && <div className='owner'>Total Building Expenses : <span>{totalBuilding}</span></div>}
                </div>
            </section>
            <section className="informations">
                <div className={totalIncome ? 'datas' : ''}>
                    {incomes[0] && <h2 className='owner'>Income</h2>}
                    {incomes[0] && <table class={classes.contentTable}>
                        <thead>
                            <tr>
                                <th>Room No.</th>
                                <th>Amount</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incomes.map(income => (
                                <tr key={income.incomeId}>
                                    <td>{income.roomNo}</td>
                                    <td>{income.amount}</td>
                                    <td><img src="img/delete.png" alt="Delete" onClick={() => {
                                        incomeDelete(income.incomeId)
                                    }} /></td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    }
                    {loading && <div className='owner'>Total Income : <span>{totalIncome}</span></div>}
                </div>
                
            </section>
        </div>
    )

}

export default Monthly;