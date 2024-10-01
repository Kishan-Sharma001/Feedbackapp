import React, { useState, useEffect } from "react";
import "./style.css";
import Rating from "./Rating ";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";

function Feedback() {
  const [rating, setRating] = useState(1);
  const [feedback, setFeedback] = useState();
  const [ratingAverage, setRatingAverage] = useState();
  const [review, setReview] = useState({
    id: "",
    rating: 1,
    feedback: " ",
  });
  const [feedbackList, setFeedbackList] = useState([]);

  const[response,setResponse]=useState(false);

  const [responseMessage,setResponseMessage]=useState();

  const navigate = useNavigate();

  const calculateAverage = (data) => {
    const totalRating = data.reduce((sum, item) => sum + item.rating, 0);
    const averageRating = totalRating / data.length;

    return averageRating;
  };

  useEffect(() => {
    fetchoffeedbacklist();
  }, []);

  const fetchoffeedbacklist = () => {
    const savedFeedbackList = localStorage.getItem("feedbackList");
    if (savedFeedbackList) {
      setFeedbackList(JSON.parse(savedFeedbackList)); 
    }
  };

  useEffect(() => {
    if (feedbackList.length > 0) {
      localStorage.setItem("feedbackList", JSON.stringify(feedbackList));
      let average = calculateAverage(feedbackList);
      setRatingAverage(average);
    }
  }, [feedbackList]);

  const changeHandler = (e) => {
    setFeedback(e.target.value);
    review.rating = rating;
    review.id = Date.now();
    const { name, value } = e.target;

    setReview({ ...review, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(`rating:${rating} , feedback:${feedback}`);

    setFeedbackList([...feedbackList, review]);

    setReview({
        rating:'',
        feedback:''
    })

    setResponse(true)
    setResponseMessage('Thank you for feedback')
    setTimeout(
        setResponseMessage,3000
    )
    setTimeout( setResponse,3000)
    

    
  };


 const deleteHandler=(id)=>{

    let updatedlist = feedbackList.filter(feedback => feedback.id !== id);
   
      setFeedbackList(updatedlist);

      setResponse(true)
      setResponseMessage('feedback deleted successfully')
      setTimeout(
          setResponseMessage,3000
      )
      setTimeout( setResponse,3000)

      

      navigate(0)
  }

  return (
    <>
      
      <div className="container feedbackCard  bg-dark bg-opacity-50 p-4 d-flex vh-100 justify-content-center flex-column ">
     {response?<div className=" responseAlert">{responseMessage}</div>:" "}

     
        <div className=" bg-white  rounded shadow my-3">
          <div className="p-1">
            <Rating rating={rating} setRating={setRating} />
          </div>
          <div className="p-2">
            <form onSubmit={submitHandler}>
              <div className="border rounded d-flex justify-content-between p-2 m-3">
                <input
                  className="border-0 form-control"
                  type="text"
                  name="feedback"
                  placeholder="write a review"
                  onChange={changeHandler}
                />

                <button
                  className="custom-btn-1 rounded "
                  type="submit"
                >
                  {" "}
                  send{" "}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="d-block">
          {ratingAverage ? (
            <Button
              className="border-0 bg-warning my-1 text-dark float-end "
              style={{ width: "200px" }}
            >
              OverAll Rating : {parseFloat(ratingAverage).toFixed(1)}/10
            </Button>
          ) : (
            <Button
              className="border-0 bg-warning text-dark float-end my-1 "
              style={{ width: "200px" }}
            >
              OverAll Rating : 0
            </Button>
          )}
        </div>

        <div className=" bg-white feedbackListCard  rounded shadow my-1">
          <h3 className="text-center my-3">
            Feedbacks <hr></hr>{" "}
          </h3>

          {!(feedbackList.length === 0) ? (
            <div className="overflow-auto feedbacklist">
              <ul>
                {feedbackList?.map((item, index) => (
                  <>
                    <div className="border rounded p-2 m-1 shadow-sm ">
                      <li
                        className="list-unstyled d-flex justify-content-between p-0 "
                        key={index}
                      >
                        <div>
                          <h6>
                            <>{item.feedback}</>{" "}
                          </h6>
                          <em> Rating: {item.rating}/10</em>
                        </div>

                        <div className="align-items-center">
                          <button
                            className="text-primary rounded border-0 p-2 m-1"
                            onClick={() => {
                              navigate("/edit", { state: item });
                            }}
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                          <button
                            className="text-danger rounded border-0 p-2 m-1"
                            onClick={(id)=>{deleteHandler(item.id)}}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </li>
                    </div>
                  </>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center h2 text-secondary  text-opacity-50 p-0">
              No Feedback Found
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Feedback;
