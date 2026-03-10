import './index.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../header';
import DisplayAlljobs from '../displayAllJobs';
import FilterSection from '../filterSection';




const Jobs = () => {

    const [allValues, setValues] = useState({
        jobsArr: [],
        empType: [],
        minPackage: "",
        userInput: ""


    });

    const token = Cookies.get("myToken");

    useEffect(() => {

        const fetchJobs = async () => {

            const { empType, minPackage, userInput } = allValues;

            console.log(empType);
            const api = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${minPackage}&search=${userInput}`;

            const options = {
                method: "Get",
                headers: {
                    Authorization: `Bearer ${token}`
                }

            }

            try {

                const response = await fetch(api, options);
                const data = await response.json();
                console.log(data.jobs);

                if (response.ok) {
                    setValues({ ...allValues, jobsArr: data.jobs });
                }
                else {

                }

            } catch (error) {

                console.log(error);

            }


        }

        fetchJobs();
    }, [allValues.userInput, allValues.empType, allValues.minPackage]);



    const onsearchjobs = (e) => {



        if (e.key === "Enter") {

            setValues({ ...allValues, userInput: e.target.value });

        }
    }

    const onChangeEmpType = (value, isChecked) => {

        if (isChecked) {

            setValues({ ...allValues, empType: [...allValues.empType, value] });

        }

        else {

            setValues({ ...allValues, empType: allValues.empType.filter(e => e !== value) });


        }


        console.log(value, isChecked);


    }

    const onChangeSalaryRange = (value) => {
        setValues({ ...allValues, minPackage: value, });

        console.log("Selected Salary Range:", value);
    };








    return (


        <>

            <Header />


            <div className="p-3">
                <input onKeyUp={onsearchjobs} type="text" className="form-control w-50 mx-auto" placeholder='Search your Jobs here' />
            </div>
            <div className='container pt-3'>
                <div className='row'>
                    <div className='col-5 border border-primary'>

                        <ul style={{ listStyle: "none" }} className='p-3'>
                            <FilterSection profile_details={allValues.profile_details} onChangeEmpType={onChangeEmpType} onChangeSalaryRange={onChangeSalaryRange} />
                        </ul>

                    </div>
                    <div className='col-7'>
                        <ul style={{ listStyle: "none" }} className='p-3'>
                            {
                                allValues.jobsArr.map(e => <DisplayAlljobs key={e.id} jobsItems={e} />)
                            }
                        </ul>
                    </div>

                </div>
            </div>
        </>
    )
}



export default Jobs;