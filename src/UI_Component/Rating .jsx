import React from "react";
import Button from "react-bootstrap/Button";
import "./style.css";

function Rating({ rating, setRating }) {
  const ratingValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const sumbitHandler = (value) => {
    setRating(value);
    console.log(value, ",rating");
  };
  return (
    <>
      <div className=" ">
        <h5 className="text-center my-1 p-2">
          {" "}
          How would you rate your service with us?{" "}
        </h5>
        <div className=" d-flex justify-content-around m-1">
          {ratingValues.map((value, index) => {
            return (
              <>
                <Button
                  className="rating  rounded-circle mb-3  border-0"
                  onClick={() => {
                    sumbitHandler(value);
                  }}
                >
                  {value}
                </Button>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Rating;
