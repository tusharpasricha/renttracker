import { BrowserRouter, Routes, Route } from "react-router-dom";

import Addexpense from "./components/AddExpense";
import AddRoomNo from "./components/Addroomno";
import Viewexpense from "./components/Viewexpense";
import ViewMonth from "./components/ViewMonth";
import Viewroom from "./components/Viewroom";
import Home from "./Home";
import Income from "./components/Income";
import Monthly from "./components/Monthly";
import Building from "./components/Building";
import Rentinfo from "./components/Rentinfo";
import Rooms from "./components/Rooms";
import Login from './components/Login';
import Signup from './components/Signup';

import { AuthProvider } from './stores/AuthContext';
import { getAuth } from 'firebase/auth';
import RequireAuth from "./routes/PrivateRoute";
import { app } from './data/firebase';


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
                  <AddRoomNo />
                </RequireAuth>
              }
            />
            <Route
              path="/viewroom"
              element={
                <RequireAuth>
                  <Viewroom />
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
                  <Addexpense />
                </RequireAuth>
              }
            />
            
            <Route
              path="/income"
              element={
                <RequireAuth>
                  <Income />
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
                  <Building />
                </RequireAuth>
              }
            />
            <Route
              path="/rentinfo"
              element={
                <RequireAuth>
                  <Rentinfo />
                </RequireAuth>
              }
            />
            <Route
              path="/rooms"
              element={
                <RequireAuth>
                  <Rooms />
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
