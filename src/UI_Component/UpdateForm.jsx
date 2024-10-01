import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const UpdateForm = () => {
  const location = useLocation();
  let { id, rating, feedback } = location?.state;
  const getfeedbackList = JSON.parse(localStorage.getItem("feedbackList"));
  const navigate = useNavigate();

  const [response, setResponse] = useState(false);

  const [responseMessage, setResponseMessage] = useState();

  const [feedbackList, setFeedbackList] = useState([]);
  const [review, setReview] = useState({
    id: id,
    rating: rating,
    feedback: feedback,
  });

  useEffect(() => {
    setFeedbackList(getfeedbackList);
  }, []);

  useEffect(() => {
    localStorage.setItem("feedbackList", JSON.stringify(feedbackList));
  }, [feedbackList]);

  const changeHandler = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log();

    setFeedbackList(updatedReview);

    setResponse(true);
    setResponseMessage("updated successfully");
    setTimeout(setResponseMessage, 3000);
    setTimeout(setResponse, 3000);

    
  };

  const replaceOld = (array, newObject) => {
    return array.map((item) => (item.id === id ? newObject : item));
  };

  const updatedReview = replaceOld(feedbackList, review);

  return (
    <div>
      {response ? <div className=" responseAlert">{responseMessage}</div> : " "}
      <div className="container feedbackCard bg-dark bg-opacity-75 d-flex vh-100 justify-content-center flex-column ">
        <Button
          onClick={() => {
            navigate("/");
          }}
          className="custom-btn-2"
        >
          {" "}
          <FontAwesomeIcon icon={faArrowLeft} />
          <span> Back</span>
        </Button>
        <div className=" bg-white h-50  rounded shadow my-3">
          <div className="p-1 h5 text-center my-3">Edit Feedback</div>
          <div className="p-2">
            <form onSubmit={submitHandler}>
              <div className="border rounded  p-2 m-3">
                <label className="form-label" htmlFor="rating">
                  Rating
                </label>
                <input
                  className=" form-control"
                  type="number"
                  name="rating"
                  min="1"
                  max="10"
                  placeholder="rate your service"
                  defaultValue={rating}
                  onChange={changeHandler}
                />
                <label className="form-label" htmlFor="feedback">
                  Feedback
                </label>
                <input
                  className=" form-control"
                  type="text"
                  name="feedback"
                  placeholder="write a review"
                  defaultValue={feedback}
                  onChange={changeHandler}
                />

                <button
                  className="custom-btn-1 rounded border-0 p-2 my-3"
                  type="submit"
                >
                  {" "}
                  update{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
