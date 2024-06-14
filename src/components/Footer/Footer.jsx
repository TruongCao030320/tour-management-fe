import React from "react";
import "./footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
const nav__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const quick__links2 = [
  {
    path: "/gallery",
    display: "Gallery",
  },
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/register",
    display: "Register",
  },
];
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3" className={"logo"}>
            <img src={logo} alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga,
              sit quae quis vitae ipsa sapiente!
            </p>
            <div className="social__links d-flex align-items-center gap-4">
              <span>
                <Link to="#">
                  <i class="ri-youtube-fill"></i>
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i class="ri-facebook-fill"></i>
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i class="ri-instagram-fill"></i>
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i class="ri-twitter-fill"></i>
                </Link>
              </span>
            </div>
          </Col>
          <Col lg="3">
            <h5 className="footer__link-title">Discover</h5>
            <ListGroup className="footer__quick-links">
              {quick__links2?.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer__link-title">Quick Links</h5>
            <ListGroup className="footer__quick-links">
              {quick__links2.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer__link-title">Contact</h5>
            <ListGroup className="footer__quick-links">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-map-pin-line"></i>
                  </span>
                  Address:
                </h6>
                <p className="mb-0">Chau Doc</p>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-mail-line"></i>
                  </span>
                  Email:truongcao3320@gmail.com
                </h6>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-phone-line"></i>
                  </span>
                  Address:
                </h6>
                <p className="mb-0">0123 456 789</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg="12" className={"text-center pt-5"}>
            <p className="copyright">
              Copyright {year} ,design and develop by Truong Cao. All rights
              reserved
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;