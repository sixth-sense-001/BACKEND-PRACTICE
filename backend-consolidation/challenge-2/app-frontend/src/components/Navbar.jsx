import { Link } from 'react-router-dom';
import '../styles/navbar.css'

const Navbar = () => {
    return (
        <nav class="navbar">
            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Create account</Link>
            <Link to="/tasks">Tasks</Link>
        </nav>
    )
}

export default Navbar;