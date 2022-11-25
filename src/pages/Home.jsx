import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";

function Home() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [repoPerPage] = useState(5);

  const location = useLocation();

  useEffect(() => {
    fetchUser();
    fetchRepo();
  }, []);

  const url = process.env.REACT_APP_GITHUB_URL;
  const token = process.env.REACT_APP_GITHUB_TOKEN;

  // "https://api.github.com/users/username"

  // fetching the user
  const fetchUser = async () => {
    const response = await fetch(`${url}/users/Preshique`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    const data = await response.json();
    setUser(data);
    setLoading(false);
  };

  // fetching the repos
  const fetchRepo = async () => {
    const params = new URLSearchParams({
      sort: "created",
      per_page: 20,
    });
    const response = await fetch(`${url}/users/Preshique/repos?${params}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    const data = await response.json();
    setRepos(data);
    setLoading(false);
  };

  if (loading) return <Spinner />;

  // Pagination logic
  const indexOfLastNumber = currentPage * repoPerPage;
  const indexOfFirstNumber = indexOfLastNumber - repoPerPage;
  const currentRepo = repos.slice(indexOfFirstNumber, indexOfLastNumber);
  const numberOfPages = Math.ceil(repos.length / repoPerPage);

  return (
    <div className="container">
      {location.pathname === "/" ? (
        <>
          <div className="card">
            <div className="header">
              <h3>devApp</h3>
              <p>
                <Link to="/error-page">
                  <span>Error Page</span>
                  <span id="changer">
                    <i className="fa-solid fa-bug"></i>
                  </span>
                </Link>
              </p>
            </div>

            <div className="card-header">
              <div className="card-img">
                <img src={user.avatar_url} alt="avatar" />
              </div>
              <div className="card-profile">
                <div className="card-profile-name">
                  <h3>{user.name}</h3>
                  <p>{user.login}</p>
                </div>
                <div className="card-profile-date">
                  <p>{user.location ? user.location : "Lagos, Nigeria"}</p>
                </div>
              </div>
            </div>
            <div className="card-body">
              <p>{user.bio}</p>
            </div>
            <div className="card-details">
              <div className="repo">
                <h4>Repos</h4>
                <p>{user.public_repos}</p>
              </div>
              <div className="followers">
                <h4>Followers</h4>
                <p>{user.followers}</p>
              </div>
              <div className="following">
                <h4>Following</h4>
                <p>{user.following}</p>
              </div>
            </div>

            <div className="card-social">
              <div className="social-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{user.location ? user.location : "Lagos"}</span>
              </div>
              <div className="social-item">
                <i className="fab fa-github"></i>
                <span>
                  <a href={user.html_url}>{user.login}</a>
                </span>
              </div>
              <div className="social-item">
                <i className="fab fa-twitter"></i>
                <span>
                  {user.twitter_username ? user.twitter_username : "Preshique"}
                </span>
              </div>
              <div className="social-item">
                <i className="fas fa-building"></i>
                <span>{user.company ? user.company : "none"}</span>
              </div>
            </div>
            <>
              <Repos currentRepo={currentRepo} />
              <Pagination
                numberOfPages={numberOfPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default Home;
