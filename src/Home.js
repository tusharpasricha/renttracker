import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./auth/sidebar";
import Third from "./design/third";
import "./home.css";
import AuthContext from "./stores/AuthContext";

const Home = () => {
  const { user, client } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [g1, setg1] = useState(1);
  const [g2, setg2] = useState(0);
  const [g3, setg3] = useState(0);
  useEffect(() => {
    setName(localStorage.getItem(user.uid));
  }, []);

  return (
    <div className="home">
      <main className="dashboard">
        <Sidebar />
        <div className="second">
          <div className="namebar">
            <div>{client && <p className="owner">{name}</p>}</div>

            <div className="profile"></div>
          </div>
          <div className="navbar">
            <div
              onClick={() => {
                setg1(1);
                setg2(0);
                setg3(0);
              }}
              className="owner"
            >
              Rooms
            </div>
            <div
              onClick={() => {
                setg2(1);
                setg1(0);
                setg3(0);
              }}
              className="owner"
            >
              Rent
            </div>
            <div
              onClick={() => {
                setg3(1);
                setg1(0);
                setg2(0);
              }}
              className="owner"
            >
              Finance
            </div>
          </div>

          {g1 && (
            <div className="cards">
              <Link to="/addroom">
                <div className="card">
                  <img src="img/newroom.svg" alt="Cover" />
                  <h4>ALLOT ROOM</h4>
                </div>
              </Link>
              <Link to="/viewroom">
                <div className="card">
                  <img src="img/editroom.svg" alt="Cover" />
                  <h4>ROOM DETAILS</h4>
                </div>
              </Link>

              <Link to="/rooms">
                <div className="card">
                  <img src="img/rooms.svg" alt="Cover" />
                  <h4>ROOMS</h4>
                </div>
              </Link>
            </div>
          )}
          {g2 && (
            <div className="cards">
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
            </div>
          )}
          {g3 && (
            <div className="cards">
              <Link to="/addexpense">
                <div className="card">
                  <img src="img/expense.svg" alt="Cover" />
                  <h4>ROOM EXPENSE</h4>
                </div>
              </Link>

              <Link to="/building">
                <div className="card">
                  <img src="img/building.svg" alt="Cover" />
                  <h4>BUILDING EXPENSE</h4>
                </div>
              </Link>
              <Link to="/viewexpenses">
                <div className="card">
                  <img src="img/expense.svg" alt="Cover" />
                  <h4>VIEW EXPENSE</h4>
                </div>
              </Link>
              <Link to="/monthly">
                <div className="card">
                  <img src="img/month.svg" alt="Cover" />
                  <h4>MONTHLY STATEMENT</h4>
                </div>
              </Link>
            </div>
          )}
        </div>
        <Third />
      </main>
    </div>
  );
};

export default Home;
