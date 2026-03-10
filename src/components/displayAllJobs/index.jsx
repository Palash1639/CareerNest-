import './index.css';
import Jobs from '../jobs';
import { FaStar } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';




const DisplayAlljobs = (props)=>{

    const {jobsItems} = props;

   return (

    
    <li className='w-100  mb-3 rounded p-3 bg-dark-subtle'>
       <div className='d-flex '>
         <img src={jobsItems.company_logo_url} width="70px"  />
        <div style={{ marginLeft: '20px' }}>

            <h3>{jobsItems.title}</h3>
            <FaStar className="text-warning m-1"/>
            <span>{jobsItems.rating}</span>

        </div>

       </div>
       
         <div className='d-flex justify-content-between mt-3'>
            <div >
              <FaLocationDot />
              <span className='m-3'>{jobsItems.location}</span>
              <br/>
              <FaBriefcase />
              <span className='m-3'>{jobsItems.employment_type}</span>
            </div>
            <h3>{jobsItems.package_per_annum}</h3>
        </div>
        <hr/>

        <Link to ={`/jobs/${jobsItems.id}`}>

        <h4>Description</h4>


         </Link>

        <p>{jobsItems.job_description}</p>
    </li>     
   
    
   )       

}





export default DisplayAlljobs;