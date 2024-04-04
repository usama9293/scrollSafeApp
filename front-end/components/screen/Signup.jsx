import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const postData = async () => {
        try {
            const response = await fetch('http://localhost:5001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    password: password,
                    confirmPassword: confirmPassword
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            toast.success(data.message);
            // Redirect to login page after successful signup
            navigate('/login');
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Failed to sign up. Please try again later.');
            toast.error('Failed to sign up. Please try again later.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postData();
    };

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>SignUp</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="btn waves-effect waves-light #1e88e5 blue darken-1"
                    >
                        SignUp
                    </button>
                    {error && <p className="error-message">{error}</p>}
                    <h6>
                        <Link to="/login">Already have an account?</Link>
                    </h6>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;
