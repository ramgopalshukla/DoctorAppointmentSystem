import React from 'react'
import { useNavigate } from 'react-router-dom'
const DoctorList = ({doctors}) => {

    const navigate= useNavigate();
  return (
   <>
 {doctors && <div className="card" onClick= {()=> navigate('/appointments')}>
    <div className="card-header">
        Dr. {doctors[2].firstName}  {doctors[2].lastName}
    </div>

    <div className="card-body">
        <p>
            <b>Specialization</b> {doctors[2].specialization}
        </p>
        <p>
            <b>Experience</b> {doctors[2].experience}
        </p>
        <p>
            <b>Fees Per Cunsaltation</b> {doctors[2].feesPerCunsaltation
}
        </p>
        <p>
            <b>Timing</b> {doctors[2].timing[0]} - {doctors[2].timing[1]}
        </p>
       
    </div>
   </div>}
   </>
  )
}

export default DoctorList
