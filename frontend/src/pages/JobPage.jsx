import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const JobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);


useEffect(() => {
  const fetchSingleJob = async () => {
    try {
      const res = await fetch(`/api/jobs/${id}`);
      
      const data = await res.json();
      setJob(data)
      console.log(job)
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
    finally{
      setLoading(false)
    }
  };
  fetchSingleJob();
}, [id]);

const deleteJob = async () => {
  try {
    setDeleting(true);

    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete job");
    }

    navigate("/");
  } catch (error) {
    console.error("Error deleting job:", error);
  } finally {
    setDeleting(false);
  }
};


  const confirmAndDelete = () => {
  if (window.confirm("Are you sure you want to delete this job?")) {
    deleteJob();
  }
};

  if(!job){
    return(<div>loading...</div>)
  }

 return (
  <div>
 <div className="job-preview">
  {loading ? (
    <p>Loading...</p>
  ) : (
    <>
      <h2>{job.title}</h2>
      <p>Type: {job.type}</p>
      <p>Description: {job.description}</p>
      <p>Company: {job.company.name}</p>
      <p>Email: {job.company.contactEmail}</p>
      <p>Phone: {job.company.contactPhone}</p>
      <p>Location: {job.location}</p>
      <p>Salary: {job.salary}</p>

      <button onClick={() => navigate(`/edit-job/${job._id}`)}>
        edit
      </button>
      <button onClick={confirmAndDelete} disabled={deleting}>
  {deleting ? "Deleting..." : "Delete Job"}
</button>

    </>
  )}
</div>

  
  </div>
);
};

export default JobPage;
