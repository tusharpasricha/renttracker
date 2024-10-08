
import Home from "./Home";

import Login from "./auth/Login";
import Signup from "./auth/Signup";

import RoomExpense from "./components/Finance/RoomExpense";
import ViewRoomExpense from "./components/Finance/ViewRoomExpense";
import ViewMonth from "./components/Finance/ViewMonth";
import RoomDetailUpdate from "./components/Room/RoomDetailUpdate";
import DepositeRent from "./components/Rent/DepositeRent";
import BuildingExpense from "./components/Finance/BuildingExpense";
import RentInfo from "./components/Rent/RentInfo";
import AllotedRooms from "./components/Room/AllotedRooms";
import AllotRoom from "./components/Room/AllotRoom";
import MonthlyStatement from "./components/Finance/MonthlyStatement";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthContextProvider } from "./context/AuthContext";

import RequireAuth from "./routes/RequireAuth";

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="/addroom"
              element={
                <RequireAuth>
                  <AllotRoom />
                </RequireAuth>
              }
            />
            <Route
              path="/viewroom"
              element={
                <RequireAuth>
                  <RoomDetailUpdate />
                </RequireAuth>
              }
            />
            <Route
              path="/viewexpenses"
              element={
                <RequireAuth>
                  <ViewRoomExpense />
                </RequireAuth>
              }
            />
            <Route
              path="/viewmonthexpenses"
              element={
                <RequireAuth>
                  <ViewMonth />
                </RequireAuth>
              }
            />
            <Route
              path="/addexpense"
              element={
                <RequireAuth>
                  <RoomExpense />
                </RequireAuth>
              }
            />

            <Route
              path="/income"
              element={
                <RequireAuth>
                  <DepositeRent />
                </RequireAuth>
              }
            />
            <Route
              path="/monthly"
              element={
                <RequireAuth>
                  <MonthlyStatement />
                </RequireAuth>
              }
            />
            <Route
              path="/building"
              element={
                <RequireAuth>
                  <BuildingExpense />
                </RequireAuth>
              }
            />
            <Route
              path="/rentinfo"
              element={
                <RequireAuth>
                  <RentInfo />
                </RequireAuth>
              }
            />
            <Route
              path="/rooms"
              element={
                <RequireAuth>
                  <AllotedRooms />
                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContextProvider>
  );
}

export default App;
