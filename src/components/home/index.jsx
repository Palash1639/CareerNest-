import './index.css';
import Header from '../header';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Header />
            <div className='home-bg-container d-flex justify-content-center align-items-center'>
                <div className='home-content text-center p-3'>
                    <div className="card text-center w-100 bg-light bg-opacity-75 shadow-lg">
                        <div className="card-header bg-danger text-white">
                            CareerNest
                        </div>
                        <div className="card-body py-5">
                            <h3 className="card-title text-danger mb-4">Track and land your dream job</h3>
                            <p className="card-text mb-4">
                                "Our application helps job seekers discover opportunities in IT and other industries,
                                with smart filters and real-time updates."
                            </p>
                            <Link to="/jobs" className="btn btn-primary px-4 py-2">Go to Jobs</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
