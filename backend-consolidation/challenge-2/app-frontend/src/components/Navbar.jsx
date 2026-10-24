import { Link } from 'react-router-dom';
import '../styles/navbar.css'

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/home" className="navLink">Home</Link>
            <Link to="/login" className="navLink">Login</Link>
            <Link to="/signup" className="navLink">Create account</Link>
            <Link to="/tasks" className="navLink">Tasks</Link>
        </nav>
    )
}

export default Navbar;