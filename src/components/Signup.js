import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../stores/AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import db from '../data/firebase';
import Sidebar from './sidebar';
import Third from './third';

const Signup = () => {

    const { signup } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigation = useNavigate();

    const submitHandler = (e) => {

        e.preventDefault();
        setError('');

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        let uid;
        if(!password || !confirmPassword || !name || !email)
        {
            return setError('Some Field is Empty');
        }
        if (password === confirmPassword) {
            signup(email, password).then(user => {
                uid = user.user.uid;
                console.log(uid);
                return addDoc(collection(db, "users"), {
                    uid: uid,
                    name: e.target.name.value
                })
            })
                .then(() => {
                    console.log('Signup Successful');
                    navigation('/');
                })
                .catch(err => {
                    const error = err.message.split('/')[1].split(')')[0].split('-');
                    let errorString = '';
                    error.forEach(err => {
                        errorString += err.toLocaleUpperCase();
                        errorString += ' ';
                    })
                    console.log(errorString);
                    setError(errorString);
                });
        } else {
            setError('Password does not match');
        }

    }

    return (
        

        <div className='home'>
        <main className="dashboard">
        <Sidebar/>
        <div className='getintouch' >
            <section className='login'>
                <img src="img/signup.svg" alt="Signup" />
                <form onSubmit={submitHandler}>
                    {error && <div className='error'>{error}</div>}
                    <label>Name</label>
                    <input type="text" name="name" />

                    <label>Email</label>
                    <input type="email" name="email" />

                    <label>Password</label>
                    <input type="password" name="password" />

                    <label>Confirm Password</label>
                    <input type="password" name="confirmPassword" />
                    <input type="submit" value="Sign up" />
                    <p className='link'>Already Have an account <Link to="/login">Login</Link></p>
                </form>
            </section>
        </div>
        <Third/>
            </main >
        </div>
    );

}

export default Signup;