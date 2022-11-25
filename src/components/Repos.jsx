import React from "react";
import { Link } from "react-router-dom";

function Repos({ currentRepo }) {
  return (
    <>
      <h3>List Of Repos</h3>
      <div className="repos">
        {currentRepo.map((repo) => (
          <Link key={repo.id} to={`repo/${repo.name}`}>
            <div className="repo-item">
              <h4>{repo.name}</h4>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Repos;
