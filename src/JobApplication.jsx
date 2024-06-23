import React, { useState, useEffect } from 'react';

import Summary from './Summary';

const JobApplication = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioUrl: '',
    managementExperience: '',
    additionalSkills: {
      JavaScript: false,
      CSS: false,
      Python: false,
    },
    preferredInterviewTime: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        additionalSkills: {
          ...formData.additionalSkills,
          [name]: checked,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.fullName) formErrors.fullName = 'Full Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Email is invalid';
    if (!formData.phoneNumber) formErrors.phoneNumber = 'Phone Number is required';
    else if (isNaN(formData.phoneNumber)) formErrors.phoneNumber = 'Phone Number must be a valid number';
    if ((formData.position === 'Developer' || formData.position === 'Designer') && !formData.relevantExperience)
      formErrors.relevantExperience = 'Relevant Experience is required';
    else if (formData.relevantExperience <= 0)
      formErrors.relevantExperience = 'Relevant Experience must be a number greater than 0';
    if (formData.position === 'Designer' && !formData.portfolioUrl)
      formErrors.portfolioUrl = 'Portfolio URL is required';
    else if (formData.portfolioUrl && !/^https?:\/\/.*\..*/i.test(formData.portfolioUrl))
      formErrors.portfolioUrl = 'Portfolio URL must be a valid URL';
    if (formData.position === 'Manager' && !formData.managementExperience)
      formErrors.managementExperience = 'Management Experience is required';
    if (!Object.values(formData.additionalSkills).includes(true))
      formErrors.additionalSkills = 'At least one skill must be selected';
    if (!formData.preferredInterviewTime)
      formErrors.preferredInterviewTime = 'Preferred Interview Time is required';
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setSubmitted(true);
    } else {
      setErrors(formErrors);
    }
  };

  useEffect(() => {
    if (formData.position !== 'Developer' && formData.position !== 'Designer') {
      setFormData((prevData) => ({ ...prevData, relevantExperience: '' }));
    }
    if (formData.position !== 'Designer') {
      setFormData((prevData) => ({ ...prevData, portfolioUrl: '' }));
    }
    if (formData.position !== 'Manager') {
      setFormData((prevData) => ({ ...prevData, managementExperience: '' }));
    }
  }, [formData.position]);

  if (submitted) {
    return <Summary formData={formData} setSubmitted={setSubmitted}/>
  }

  return (
    <form className="mx-5 my-5" onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label htmlFor="fullName" className="form-label">Full Name</label>
        <input 
          type="text" 
          className={`form-control ${errors.fullName ? 'is-invalid' : ''}`} 
          id="fullName" 
          name="fullName" 
          value={formData.fullName} 
          onChange={handleChange} 
        />
        <div className="invalid-feedback">{errors.fullName}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input 
          type="email" 
          className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
        />
        <div className="invalid-feedback">{errors.email}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
        <input 
          type="text" 
          className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`} 
          id="phoneNumber" 
          name="phoneNumber" 
          value={formData.phoneNumber} 
          onChange={handleChange} 
        />
        <div className="invalid-feedback">{errors.phoneNumber}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="position" className="form-label">Applying for Position</label>
        <select 
          className="form-select" 
          id="position" 
          name="position" 
          value={formData.position} 
          onChange={handleChange}
        >
          <option value="">Select a position</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
      </div>

      {(formData.position === 'Developer' || formData.position === 'Designer') && (
        <div className="mb-3">
          <label htmlFor="relevantExperience" className="form-label">Relevant Experience (years)</label>
          <input 
            type="number" 
            className={`form-control ${errors.relevantExperience ? 'is-invalid' : ''}`} 
            id="relevantExperience" 
            name="relevantExperience" 
            value={formData.relevantExperience} 
            onChange={handleChange} 
          />
          <div className="invalid-feedback">{errors.relevantExperience}</div>
        </div>
      )}

      {formData.position === 'Designer' && (
        <div className="mb-3">
          <label htmlFor="portfolioUrl" className="form-label">Portfolio URL</label>
          <input 
            type="text" 
            className={`form-control ${errors.portfolioUrl ? 'is-invalid' : ''}`} 
            id="portfolioUrl" 
            name="portfolioUrl" 
            value={formData.portfolioUrl} 
            onChange={handleChange} 
          />
          <div className="invalid-feedback">{errors.portfolioUrl}</div>
        </div>
      )}

      {formData.position === 'Manager' && (
        <div className="mb-3">
          <label htmlFor="managementExperience" className="form-label">Management Experience</label>
          <textarea 
            className={`form-control ${errors.managementExperience ? 'is-invalid' : ''}`} 
            id="managementExperience" 
            name="managementExperience" 
            value={formData.managementExperience} 
            onChange={handleChange} 
          />
          <div className="invalid-feedback">{errors.managementExperience}</div>
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Additional Skills</label>
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="JavaScript" 
            name="JavaScript" 
            checked={formData.additionalSkills.JavaScript} 
            onChange={handleChange} 
          />
          <label className="form-check-label" htmlFor="JavaScript">JavaScript</label>
        </div>
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="CSS" 
            name="CSS" 
            checked={formData.additionalSkills.CSS} 
            onChange={handleChange} 
          />
          <label className="form-check-label" htmlFor="CSS">CSS</label>
        </div>
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="Python" 
            name="Python" 
            checked={formData.additionalSkills.Python} 
            onChange={handleChange} 
          />
          <label className="form-check-label" htmlFor="Python">Python</label>
        </div>
        {errors.additionalSkills && <div className="text-danger">{errors.additionalSkills}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="preferredInterviewTime" className="form-label">Preferred Interview Time</label>
        <input 
          type="datetime-local" 
          className={`form-control ${errors.preferredInterviewTime ? 'is-invalid' : ''}`} 
          id="preferredInterviewTime" 
          name="preferredInterviewTime" 
          value={formData.preferredInterviewTime} 
          onChange={handleChange} 
        />
        <div className="invalid-feedback">{errors.preferredInterviewTime}</div>
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default JobApplication;
