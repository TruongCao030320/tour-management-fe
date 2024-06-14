import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/tour-details.css";
import {
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { useParams } from "react-router-dom";
import tourData from "../assets/data/tours";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";
const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);
  const {
    photo,
    title,
    desc,
    price,
    reviews,
    city,
    distance,
    maxGroupSize,
    address,
  } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);
  const options = { day: "numeric", month: "long", year: "numeric" };
  // submit request to server
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    try {
      if (!user || user === undefined || user === null) {
        return alert("Please sign in");
      }
      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating,
      };
      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });
      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      alert(result.message);
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);
  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center">Loading....</h4>}
          {error && <h4 className="text-center">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt="" />
                  <div className="tour__info">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i
                          class="ri-star-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>{" "}
                        {avgRating === 0 ? null : avgRating}{" "}
                        {totalRating === 0 ? (
                          "Not rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>
                      <span>
                        <i class="ri-map-pin-user-fill"></i>
                        {address}
                      </span>
                    </div>
                    <div className="tour__extra-details">
                      <span>
                        <i class="ri-map-pin-2-line"></i>
                        {city}
                      </span>
                      <span>
                        <i class="ri-money-dollar-circle-line"></i>
                        {price} / per person
                      </span>
                      <span>
                        <i class="ri-map-pin-time-line"></i>
                        {distance} k/m
                      </span>
                      <span>
                        <i class="ri-group-line"></i>
                        {maxGroupSize} people
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>
                  {/* tour reviews section */}
                  <ListGroup className="tour__reviews mt-4 d-flex justify-items-center">
                    <h4>Reviews({reviews?.length} reviews)</h4>
                    <Form onSubmit={submitHandler} className="reviews__form">
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span onClick={() => setTourRating(1)}>
                          1 <i class="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          2 <i class="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          3 <i class="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          4 <i class="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          5 <i class="ri-star-fill"></i>
                        </span>
                      </div>
                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Share your thoughts"
                          required
                        />
                        <button className="btn primary__btn" type="submit">
                          Submit
                        </button>
                      </div>
                    </Form>
                    <div className={"user__reviews"}>
                      {reviews?.map((rev) => (
                        <div className="review__item">
                          <img src={avatar} alt="" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{rev.username}</h5>
                                <p>
                                  {new Date(rev.createdAt).toLocaleDateString(
                                    "en-US",
                                    options
                                  )}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {rev.rating} <i class="ri-star-s-fill" />
                              </span>
                            </div>
                            <h6>{rev.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ListGroup>
                </div>
              </Col>
              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
