import React from "react";
import { Link } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";

function Error() {
  return (
    <div className="container">
      <div className="card">
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
        <div className="not-found">
          <Link className="back" to="/">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ThrowError() {
  throw new Error("error");
}

export default Error;
