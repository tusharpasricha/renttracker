import React, { useContext, useRef, useState } from "react";
import {useNavigate } from "react-router-dom";

import Sidebar from "../../auth/sidebar";
import Third from "../../design/third";

import AuthContext from "../../stores/AuthContext";

import db from "../../data/firebase";
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import {  addDoc } from "firebase/firestore";

const AllotRoom = () => {
  const navigation = useNavigate();

  const roomRef = useRef();
  const personRef = useRef();
  const dateRef = useRef();
  const rentRef = useRef();

  const {user} = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Alloting the room..")
    const userId = user.uid;
    const roomNo = roomRef.current.value;
    const personName = personRef.current.value;
    const rent = parseFloat(rentRef.current.value);
    const year = parseInt(dateRef.current.value.split("-")[0]);
    const month = parseInt(dateRef.current.value.split("-")[1]);
    const day = parseInt(dateRef.current.value.split("-")[2]);

    console.log("date:" + dateRef.current.value);
    const selectedDate = new Date(dateRef.current.value);
    const nextDate = new Date(selectedDate);
    nextDate.setMonth(nextDate.getMonth() + 1);
    const next = `${nextDate.getFullYear()}-${(nextDate.getMonth() + 1).toString().padStart(2, '0')}-${nextDate.getDate().toString().padStart(2, '0')}`;
    console.log("next date:" + next);

    //checking if already alloted 
    if (user) {
      console.log("checking if already alloted ");
      const q = query(collection(db, "rooms"), where("userId", "==", userId), where("roomNo", "==", roomNo));

      getDocs(q)
      .then((querySnapshot) => {
        const docs = querySnapshot.docs;
        console.log("doc lenght" +docs.length)
        if(docs.length > 0){
          console.log("Room already alloted");
          alert("Room already allotted.");
        }
        else{
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
            userId: userId,
          })
            .then(() => {
              console.log("New Room Added Successfully");
              alert("New Room Added Successfully");
              e.target.reset();
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });

        }

        
      }).catch(err => {
          console.log(err);
      })
  }

  };

  return (
    <div className="home">
      <main className="dashboard">
        <Sidebar />
        <section className="getintouch">
          <div
            className="back"
            onClick={() => {
              navigation("/");
            }}
          >
            Back
          </div>
          <h2>Add a New Room</h2>
          <form onSubmit={submitHandler}>
            {loading && <h3 className="owner">Loading...</h3>}
            <label htmlFor="room">Room No.</label>
            <input type="number" name="room" ref={roomRef} />
            <label htmlFor="person">Person</label>
            <input type="text" name="person" ref={personRef} />
            <label htmlFor="date">Date</label>
            <input type="date" name="date" ref={dateRef} />
            <label htmlFor="rent">Current Rent</label>
            <input type="number" name="rent" ref={rentRef} step="0.01" />
            {!loading && <input type="submit" value="Add" />}
          </form>
        </section>
        <Third />
      </main>
    </div>
  );
};

export default AllotRoom;
