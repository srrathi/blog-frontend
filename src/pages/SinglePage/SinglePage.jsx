import React from "react";
import { useHistory } from "react-router-dom";
import SinglePost from "../../components/SinglePost/SinglePost";

const SinglePage = () => {
  const history = useHistory();
  return (
    <div>
      <div className="d-flex container mt-5 align-items-center justify-content-between">
        <h2>My Dev blogs</h2>
        <p role="button" onClick={history.goBack} className="text-primary mt-2">
        <i className="fas fa-long-arrow-alt-left"></i> Go Back
        </p>
      </div>
      <SinglePost />
    </div>
  );
};

export default SinglePage;
