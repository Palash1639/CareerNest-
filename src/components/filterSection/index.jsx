
import { useEffect } from 'react'
import './index.css'
import { useState } from 'react'
import Cookies from 'js-cookie';


const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterSection = (prop) => {




  const [allValues, setvalue] = useState({
    profileDetails: {}
  })

  const { onChangeEmpType } = prop;

  const { onChangeSalaryRange } = prop;



  const token = Cookies.get("myToken");


  useEffect(() => {

    const getProfileDetails = async () => {

      const apiUrl = 'https://apis.ccbp.in/profile'
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok === true) {
        setvalue({ ...allValues, profileDetails: data.profile_details })
      }
    }
    getProfileDetails();

  }, [])



  const renderEmploymentTypesList = () => {

    const onChangeEmp = (e) => {

      onChangeEmpType(e.target.value, e.target.checked);
    }

    const onChangeSalary = (e) => {
      onChangeSalaryRange(e.target.value, e.target.checked);
    };






    return employmentTypesList.map(eachType => {

      return (
        <li className="filters-list-item" key={eachType.employmentTypeId}>
          <input
            id={eachType.employmentTypeId}
            type="checkbox"
            className="checkbox-input"
            value={eachType.employmentTypeId}
            onChange={onChangeEmp}
          />
          <label htmlFor={eachType.employmentTypeId} className="filter-label">
            {eachType.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentTypes = () => (
    <>
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filters-list">{renderEmploymentTypesList()}</ul>
    </>
  )

  const renderSalaryRangesList = () => {

    return salaryRangesList.map(eachRange => {


      return (
        <li className="filters-list-item" key={eachRange.salaryRangeId}>
          <input
            type="radio"
            className="checkbox-input"
            value={eachRange.salaryRangeId}
            id={eachRange.salaryRangeId}
            name="salaryRange"
            onChange={(e) => onChangeSalaryRange(e.target.value)}
          />
          <label htmlFor={eachRange.salaryRangeId} className="filter-label">
            {eachRange.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRangesTypes = () => (
    <>
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filters-list">{renderSalaryRangesList()}</ul>
    </>
  )

  const renderProfileDetails = () => (
    <div className="profile-details-container">
      <div className="idCard d-flex align-items-center">
        {allValues.profileDetails.profile_image_url && (
          <img src={allValues.profileDetails.profile_image_url} alt="profile" width="80px" className="rounded-circle me-3" />
        )}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1 className="h5 mb-1">{allValues.profileDetails.name}</h1>
          <p className="small text-muted mb-0">{allValues.profileDetails.short_bio}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="filters-group-container">
      {renderProfileDetails()}
      {renderEmploymentTypes()}
      <hr className="separator" />
      {renderSalaryRangesTypes()}
    </div>
  )
}

export default FilterSection;