import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

import Sidebar from "../../auth/sidebar";
import Third from "../../design/third";

import AuthContext from "../../stores/AuthContext";
import db from "../../data/firebase";

const AllotRoom = () => {
  const navigation = useNavigate();
  const roomRef = useRef();
  const personRef = useRef();
  const dateRef = useRef();
  const rentRef = useRef();

  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Alloting the room..");

    const userId = user.uid;
    const roomNo = parseInt(roomRef.current.value);

    // Query to find all rooms belonging to the user
    const userRoomsQuery = query(collection(db, "rooms"), where("userId", "==", userId));
    const userRoomsSnapshot = await getDocs(userRoomsQuery);

    // Check if there is already a room with the specified roomNo
    const alreadyAlloted = userRoomsSnapshot.docs.some((doc) => doc.data().roomNo === roomNo);

    if (alreadyAlloted) {
      console.log("Room already allotted");
      alert("Room already allotted.");
      setLoading(false);
    } else {
      const personName = personRef.current.value;
      const rent = parseFloat(rentRef.current.value);
      const year = parseInt(dateRef.current.value.split("-")[0]);
      const month = parseInt(dateRef.current.value.split("-")[1]);
      const day = parseInt(dateRef.current.value.split("-")[2]);

      console.log("date:" + dateRef.current.value);
      const selectedDate = new Date(dateRef.current.value);
      const nextDate = new Date(selectedDate);
      nextDate.setMonth(nextDate.getMonth() + 1);
      const next = `${nextDate.getFullYear()}-${(nextDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${nextDate.getDate().toString().padStart(2, "0")}`;
      console.log("next date:" + next);

      try {
        await addDoc(collection(db, "rooms"), {
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
        });
        console.log("New Room Added Successfully");
        alert("New Room Added Successfully");
        e.target.reset();
        setLoading(false);
      } catch (err) {
        console.log("Error adding the new room:", err);
        setLoading(false);
      }
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
