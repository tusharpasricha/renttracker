import React, { useContext, useState } from 'react';
import AuthContext from '../stores/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore'
import db from '../data/firebase'
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import Third from '../design/third';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();

    const getUserDetails = async (userUid) => {
        try {
            const userRef = collection(db, "users");
            const snapshot = await getDocs(query(userRef, where("uid", "==", userUid)));
            if (snapshot.empty) {
                throw new Error('User not found');
            } else {
                const userData = snapshot.docs[0].data();
                const user = { name: userData.name, uid: userData.uid, nameId: snapshot.docs[0].id };
                return user;
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        const email = event.target.email.value.trim();
        const password = event.target.password.value.trim();

        if (!email || !password) {
            setError('Please enter email and password');
            setLoading(false);
            return;
        }

        try {
            const userCredential = await login(email, password);
            const user = await getUserDetails(userCredential.user.uid);
            localStorage.setItem('user', JSON.stringify(user));
            console.log("LOGIN SUCCESSFUL");
            console.log("user"+user);
            navigation('/');
        } catch (error) {
            console.log(error);
            const errorMessage = error.message.split('/')[1].split(')')[0].split('-').join(' ').toUpperCase();
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <main className="dashboard">
                <Sidebar />
                <div className="getintouch">
                    <section className="login">
                        <img src="img/login.svg" alt="Logo" />
                        <form onSubmit={handleSubmit}>
                            {error && <div className="error">{error}</div>}
                            {loading && <div className="loading">Loading...</div>}
                            <label>Email</label>
                            <input type="email" name="email" />

                            <label>Password</label>
                            <input type="password" name="password" />

                            <input type="submit" value="Login" />
                            <p className="link">
                                Don't have an account? <Link to="/signup">Signup</Link>
                            </p>
                        </form>
                    </section>
                </div>
                <Third />
            </main>
        </div>
    );
};

export default Login;



// import React, { useContext, useState } from 'react';
// import AuthContext from '../stores/AuthContext';
// import { collection, getDocs, query, where } from 'firebase/firestore'
// import db from '../data/firebase'
// import { Link, useNavigate } from 'react-router-dom';
// import Sidebar from './sidebar';
// import Third from '../design/third';

// const Login = () => {

//     const { login, setClient } = useContext(AuthContext);
//     const [error, setError] = useState('');
//     const navigation = useNavigate();
//     const [loading, setLoading] = useState(false);

//     const getUserDetails = (user_uid) => {
//         const userRef = collection(db, "users");
//         getDocs(query(userRef, where("uid", "==", user_uid))).then(docs => {
//             let userData = [];
//             docs.forEach(doc => {
//                 userData = [...userData, {
//                     name: doc.data().name,
//                     uid: doc.data().uid,
//                     nameId: doc.id
//                 }]
//             })
//             setClient(userData[0]);
//             localStorage.setItem(user_uid, userData[0].name);
//             setLoading(false);
//             navigation('/');
//         }).catch((err) => {
//             console.log(err);
//         })
//     }

//     const submitHandler = (e) => {
//         setLoading(true);
//         e.preventDefault();
//         setError('');

//         const email = e.target.email.value;
//         const password = e.target.password.value;

//         if(!password || !email) {
//             setLoading(false);
//             return setError('Some Field is empty');
//         }

//         login(email, password).then(user => {
//             console.log("Logged In Successfully");
//             navigation('/');
//             getUserDetails(user.user.uid);
//         }).catch(err => {
//             setLoading(false);
//             const error = err.message.split('/')[1].split(')')[0].split('-');
//             let errorString = '';
//             error.forEach(err => {
//                 errorString += err.toLocaleUpperCase();
//                 errorString += ' ';
//             })
//             console.log(errorString);
//             setError(errorString);
//         })

//     }

//     return (
//         <div className='home'>
//         <main className="dashboard">
//         <Sidebar/>
//         <div className="getintouch">
//             <section className='login'>
//                 <img src="img/login.svg" alt="Logo" />
//                 <form onSubmit={submitHandler}>
//                     {error && <div className='error'>{error}</div>}
//                     {loading && <div className='error'>Loading...</div>}
//                     <label>Email</label>
//                     <input type="email" name="email" />


//                     <label>Password</label>
//                     <input type="password" name="password" />


//                     <input type="submit" value="Login" />
//                     <p className='link'>Want to signup <Link to="/signup">Signup</Link></p>
//                 </form>
//             </section>
//         </div>
//            <Third/>
//            </main >
//        </div>
//     );

// }

// export default Login;