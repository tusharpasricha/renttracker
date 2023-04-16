import { BrowserRouter, Routes, Route } from "react-router-dom";

import RoomExpense from "./components/RoomExpense";
import Viewexpense from "./components/Viewexpense";
import ViewMonth from "./components/ViewMonth";
import RoomDetailUpdate from "./components/RoomDetailUpdate";
import Home from "./Home";
import DepositeRent from "./components/DepositeRent";
import Monthly from "./components/Monthly";
import BuildingExpense from "./components/BuildingExpense";
import RentInfo from "./components/RentInfo";
import AllotedRooms from "./components/AllotedRooms";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { AuthProvider } from "./stores/AuthContext";
import { getAuth } from "firebase/auth";
import RequireAuth from "./routes/PrivateRoute";
import { app } from "./data/firebase";
import AllotRoom from "./components/AllotRoom";

function App() {
  const auth = getAuth(app);

  return (
    <AuthProvider>
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
                  <Viewexpense />
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
                  <DepositeRent/>
                </RequireAuth>
              }
            />
            <Route
              path="/monthly"
              element={
                <RequireAuth>
                  <Monthly />
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
    </AuthProvider>
  );
}

export default App;
