import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';
import { useEffect, useState } from 'react';
import { FaLocationDot, FaStar } from 'react-icons/fa6';
import Header from '../header';

const JobsItemDetails = () => {
  const { id } = useParams();
  const token = Cookies.get("myToken");

  const [jobDetails, setJobDetails] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setIsLoading(true);
      const api = `https://apis.ccbp.in/jobs/${id}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      try {
        const response = await fetch(api, options);
        const data = await response.json();
        if (response.ok) {
          setJobDetails(data.job_details);
          setSimilarJobs(data.similar_jobs);
        }
      } catch (error) {
        console.error("Fetch Job Details Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, token]);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="d-flex justify-content-center align-items-center vh-100">
          <p>Loading job details...</p>
        </div>
      </>
    );
  }

  if (!jobDetails) return null;

  return (
    <>
      <Header />
      <div className="job-details-page p-3 p-md-5">
        <div className="container">
          <div className="card shadow-sm p-4 p-md-5 mb-5">
            <div className="d-flex align-items-center mb-4">
              <img src={jobDetails.company_logo_url} alt="company logo" width="80" className="me-3" />
              <div>
                <h1 className="h3 mb-1">{jobDetails.title}</h1>
                <p className="mb-0 text-muted"><FaStar className="text-warning me-1" /> {jobDetails.rating}</p>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
              <div className="d-flex gap-3">
                <span className="text-muted"><FaLocationDot className="me-1" /> {jobDetails.location}</span>
                <span className="text-muted">{jobDetails.employment_type}</span>
              </div>
              <span className="fw-bold fs-5">{jobDetails.package_per_annum}</span>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h3 className="h4 mb-0">Description</h3>
                <a href={jobDetails.company_website_url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
                  Visit Site
                </a>
              </div>
              <p className="text-secondary">{jobDetails.job_description}</p>
            </div>

            <div className="mb-4">
              <h3 className="h5 mb-3">Skills</h3>
              <ul className="d-flex flex-wrap gap-4 list-unstyled">
                {jobDetails.skills.map(skill => (
                  <li key={skill.name} className="d-flex align-items-center">
                    <img src={skill.image_url} alt={skill.name} width="40" className="me-2 rounded-0 shadow-none bg-transparent p-0" />
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="h4 mb-4">Similar Jobs</h2>
          <div className="row g-4">
            {similarJobs.map((job) => (
              <div className="col-12 col-md-6 col-lg-4" key={job.id}>
                <div className="card h-100 p-3 shadow-sm similar-job-card">
                  <div className="d-flex align-items-center mb-3">
                    <img src={job.company_logo_url} alt="similar company logo" width="40" className="me-3" />
                    <div>
                      <h3 className="h6 mb-0">{job.title}</h3>
                      <p className="small mb-0 text-muted"><FaStar className="text-warning me-1" /> {job.rating}</p>
                    </div>
                  </div>
                  <p className="small text-secondary mb-3 flex-grow-1">{job.job_description.substring(0, 100)}...</p>
                  <div className="d-flex justify-content-between align-items-center small text-muted mt-auto pt-2 border-top">
                    <span><FaLocationDot className="me-1" /> {job.location}</span>
                    <span>{job.employment_type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobsItemDetails;
