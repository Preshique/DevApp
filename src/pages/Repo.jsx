import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";

function Repo() {
  const { id } = useParams();
  const [repo, setRepo] = useState({});
  const [loading, setLoading] = useState(true);

  const url = process.env.REACT_APP_GITHUB_URL;
  const token = process.env.REACT_APP_GITHUB_TOKEN;

  useEffect(() => {
    fetchRepo();
  }, [id]);

  // fetch single repo
  const fetchRepo = async () => {
    const response = await fetch(`${url}/repos/Preshique/${id}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    const data = await response.json();
    setRepo(data);
    setLoading(false);
  };

  if (loading) return <Spinner />;

  console.log(id);
  return (
    <div className="container">
      <div className="card">
        <Link className="back" to="/">
          Go Back
        </Link>
        <div className="repo-details">
          <h4>Name: {repo.name}</h4>
          <p>Fork: {repo.forks}</p>
          <p>Language: {repo.language}</p>
          <p>File Size: {repo.size}kb</p>
          <p>visibility : {repo.visibility}</p>
          <p>watchers : {repo.watchers}</p>
          <p>open issues : {repo.open_issues}</p>
          <button>
            <a target="_blank" rel="noreferrer" href={repo.html_url}>
              view on github
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Repo;
