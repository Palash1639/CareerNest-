import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = () => {
    const navigate = useNavigate();

   
    const handleLogout = () => {
       
        Cookies.remove('myToken');
        
        navigate("/login");
    };

    return (
        <nav className='navbar navbar-expand-lg d-flex justify-content-between p-3 bg-white border-bottom shadow-sm'>
            <Link to="/" className='navbar-brand text-danger fw-bold'>CareerNest</Link>

            <ul className='navbar-nav d-flex' style={{ listStyle: "none" }}>
                <li className='nav-item mx-2'>
                    <Link to="/" className='nav-link'>Home</Link>
                </li>
                <li className='nav-item mx-2'>
                    <Link to="/jobs" className='nav-link'>Jobs</Link>
                </li>
            </ul>

            <button
                type="button"
                className='btn btn-outline-danger'
                onClick={handleLogout}
            >
                LogOut
            </button>
        </nav>
    );
};

export default Header;