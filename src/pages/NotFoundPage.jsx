import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="container">
      <div className="card">
        <div className="not-found-container">
          <h1>404</h1>
          <p>Page Not Found</p>
          <div className="not-found">
            <Link className="back" to="/">
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
