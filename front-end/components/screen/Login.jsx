import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../src/App';

const LogIn = () => {
    const { state, dispatch } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const postData = async () => {
        try {
            const response = await fetch('http://localhost:5001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            toast.success('Login successful');
            localStorage.setItem('jwt', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            dispatch({ type: 'USER', payload: data.user });

            // Redirect to login page after successful signup
            navigate('/');
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Failed to sign in. Please try again later.');
            toast.error('Failed to sign in. Please try again later.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postData();
    };

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>LOGIN</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input type="password" placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="btn waves-effect waves-light #1e88e5 blue darken-1" type="submit" name="action">
                        Log In
                    </button>
                    <h6 style={{ marginTop: '15px' }}>
                        <Link to="/SignUp">Don't have an account</Link>
                    </h6>
                </form>
            </div>
        </div>
    );
}

export default LogIn;
