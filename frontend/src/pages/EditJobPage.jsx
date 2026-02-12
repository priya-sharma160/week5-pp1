import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

 useEffect(() => {
  const fetchJob = async () => {
    try {
      const res = await fetch(`/api/jobs/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch job");
      }
      const data = await res.json();
      setTitle(data.title);
      setType(data.type);
      setDescription(data.description);
      setCompanyName(data.company.name);
      setContactEmail(data.company.contactEmail);
      setSalary(data.salary);
      setLocation(data.location);
      setContactPhone(data.contactPhone);
    } catch (error) {
      console.error("Error fetching job:", error);
    }
  };
  fetchJob();
}, [id]);

  const updateJob = async (updatedJob) => {
  try {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedJob),
    });
    if (res.ok) {
      console.log("Job updated successfully!");
      navigate(`/jobs/${id}`);
    } else {
      console.error("Failed to update job");
    }
  } catch (error) {
    console.error("Error updating job:", error);
  }
};

const submitForm = (e) => {
  e.preventDefault();
  if (!title || !description || !companyName || !contactEmail || !salary) {
    alert("Please fill in all fields");
    return;
  }

  const updatedJob = {
    title,
    description,
    company: { name: companyName, contactEmail },
    salary,
    type,
    location,
    contactPhone,

  };

  updateJob(updatedJob);
};

const cancelEdit = () => navigate(`/jobs/${id}`);

  return (
    <div className="create">
      <h2>Edit Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Job type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="" disabled>
            Select job type
          </option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Company Name:</label>
        <input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label>Contact Email:</label>
        <input
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <label>Contact Phone:</label>
        <input
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
        <label>Location:</label>
        <input value={location} onChange={(e) => setLocation(e.target.value)} />
        <label>Salary:</label>
        <input value={salary} onChange={(e) => setSalary(e.target.value)} />
        <button type="submit">Update Job</button>
        <button type="button" onClick={cancelEdit}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditJobPage;
