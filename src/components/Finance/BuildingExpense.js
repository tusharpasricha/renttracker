import React, { useState, useRef, useContext } from 'react'
import db from '../../data/firebase'
import { collection, addDoc } from 'firebase/firestore'
import AuthContext from '../../context/AuthContext';
import Sidebar from '../../auth/sidebar';
import Third from '../../design/third';
import { Link, useNavigate } from 'react-router-dom';
const BuildingExpense = () => {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();

    const productRef = useRef();
    const priceRef = useRef();
    const dateRef = useRef();

    const { user } = useContext(AuthContext);


    const submitHandler = (e) => {

        e.preventDefault();
        setLoading(true);
        const product = productRef.current.value;
        const price = parseInt(priceRef.current.value);
        const year = parseInt(e.target.date.value.split('-')[0]);
        const month = parseInt(e.target.date.value.split('-')[1]);
        const date = new Date();
        const userId = user.uid;

        const expense = {
            product, price, year, month, date, userId
        }

        addDoc(collection(db, "building"), expense).then(() => {

            e.target.reset();
            setLoading(false);
            alert('New Expense Added');

        }).catch(err => {
            console.log(err);
        })

    }

    return (
        <div className='home'>
        <main className="dashboard">
        <Sidebar/>
            <section className="getintouch">
            <div className='back' onClick={()=>{navigation('/')}}>Back</div>

                <h2>Add a Building Expense</h2>
                <form onSubmit={submitHandler}>
                    {loading && <h3 className="loading">Loading...</h3>}
                    <label htmlFor='date'>Date</label>
                    <input type="date" name="date" ref={dateRef} required />
                    <label htmlFor='product'>Product</label>
                    <input type="text" name="product" ref={productRef} required />
                    <label htmlFor='price'>Price</label>
                    <input type="number" name="price" ref={priceRef} step="0.01" required />
                    {!loading && user && <input type="submit" value="Add" />}
                </form>
            </section>
            <Third/>
            </main >
        </div>
    )

}

export default BuildingExpense;