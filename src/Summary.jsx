import React from "react";

function Summary({formData,setSubmitted}){
    return (
        <div className="mt-5 text-center">
          <h3>Application Summary</h3>
          <p className="mt-5"><strong>Full Name:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
          <p><strong>Applying for Position:</strong> {formData.position}</p>
          {formData.position === 'Developer' || formData.position === 'Designer' ? (
            <p><strong>Relevant Experience:</strong> {formData.relevantExperience}</p>
          ) : null}
          {formData.position === 'Designer' ? (
            <p><strong>Portfolio URL:</strong> {formData.portfolioUrl}</p>
          ) : null}
          {formData.position === 'Manager' ? (
            <p><strong>Management Experience:</strong> {formData.managementExperience}</p>
          ) : null}
          <p><strong>Additional Skills:</strong> {Object.keys(formData.additionalSkills).filter(skill => formData.additionalSkills[skill]).join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {formData.preferredInterviewTime}</p>
          <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Edit</button>
        </div>
      );
}

export default Summary;