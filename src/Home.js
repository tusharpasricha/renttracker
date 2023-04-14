import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './home.css'
import AuthContext from './stores/AuthContext'

const Home = () => {

    const { user, client } = useContext(AuthContext);
    const [name, setName] = useState('');


    useEffect(() => {

        setName(localStorage.getItem(user.uid));

    }, [])

    return (
        <div className='home'>
            <main className="dashboard">
                <section className="cover">
                    <img src="img/welcome.svg" alt="Welcome" />
                    <div className="coverDetails">
                        
                        {client && <p className='owner'>{name}</p>}
                    </div>
                </section>
                <div className="cards">
                    <Link to="/addroom">
                        <div className="card">
                            <img src="img/newroom.svg" alt="Cover" />
                            <h4>ALLOT ROOM</h4>
                        </div>
                    </Link>
                    <Link to="/addexpense">
                        <div className="card">
                            <img src="img/expense.svg" alt="Cover" />
                            <h4>EXPENSE</h4>
                        </div>
                    </Link>
                    {/* <Link to="/viewexpenses">
                        <div className="card">
                            <img src="img/expenses.svg" alt="Cover" />
                            <h4>Room Expenses</h4>
                        </div>
                    </Link> */}
                    {/* <Link to="/building">
                        <div className="card">
                            <img src="img/building.svg" alt="Cover" />
                            <h4>Building Expenses</h4>
                        </div>
                    </Link> */}
                    
                    {/* <Link to="/viewroom">
                        <div className="card">
                            <img src="img/editroom.svg" alt="Cover" />
                            <h4>Room Details</h4>
                        </div>
                    </Link> */}
                    {/* <Link to="/electricitybill">
                        <div className="card">
                            <img src="img/electricity.svg" alt="Cover" />
                            <h4>Electricity</h4>
                        </div>
                    </Link> */}
                    <Link to="/rooms">
                        <div className="card">
                            <img src="img/rooms.svg" alt="Cover" />
                            <h4>ROOMS</h4>
                        </div>
                    </Link>
                    <Link to="/rentinfo">
                        <div className="card">
                            <img src="img/rentinfo.svg" alt="Cover" />
                            <h4>RENT INFO</h4>
                        </div>
                    </Link>
                    <Link to="/income">
                        <div className="card">
                            <img src="img/income.svg" alt="Cover" />
                            <h4>DEPOSIT RENT</h4>
                        </div>
                    </Link>
                    <Link to="/monthly">
                        <div className="card">
                            <img src="img/month.svg" alt="Cover" />
                            <h4>MONTHLY STATEMENT</h4>
                        </div>
                    </Link>
                    
                </div>

            </main >

        </div >
    )

}

export default Home;