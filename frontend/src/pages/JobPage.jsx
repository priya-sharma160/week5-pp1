import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const JobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState([]);
  const [loading, setLoading]= useState(true);

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
    console.log(JobPage);
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
      <button onClick={() => onDeleteClick(job._id)}>
        delete
      </button>
      <button onClick={() => navigate(`/edit-job/${job._id}`)}>
        edit
      </button>
    </>
  )}
</div>

  
  </div>
);
};

export default JobPage;
