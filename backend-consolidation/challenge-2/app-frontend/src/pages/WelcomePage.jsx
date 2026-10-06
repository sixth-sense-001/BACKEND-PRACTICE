import { Link } from 'react-router-dom';

const WelcomePage = () => {
    return (
        <>
            <p>This is the Welcome page</p>
            <Link to="/login">Login</Link>
            <Link to="/signup">Create account</Link>
            <Link to="/tasks">Tasks</Link>
        </>
    );
}

export default WelcomePage;