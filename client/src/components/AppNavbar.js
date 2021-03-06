import React, { useCallback, useEffect, useState, Fragment } from "react";
import {
  Navbar,
  Container,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Form,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import LoginModal from "../components/sign/LoginModal";
import RegisterModal from "../components/sign/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_REQUEST, POST_WRITE_REQUEST } from "../redux/types";
import SearchInput from "./search/searchInput";

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, userRole } = useSelector(
    (state) => state.login
  );

  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    setIsOpen(false);
  }, [user]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const addPostClick = () => {
    dispatch({
      type: POST_WRITE_REQUEST,
    });
  };

  const authLink = (
    <Fragment>
      <NavItem style={{ marginLeft: "3px", marginRight: "5px" }}>
        {userRole === "MainOwner" ? (
          <Form className="">
            <Link to="/post" onClick={addPostClick}>
              <Button style={{ border: 0, backgroundColor: "#1976d2" }}>
                포스트 작성
              </Button>
            </Link>
          </Form>
        ) : (
          ""
        )}
      </NavItem>
      <NavItem className="d-flex justify-content-center">
        <Form>
          {user && user.name ? (
            <Link to={`/user/${user.name}/profile`}>
              <Button style={{ border: 0, backgroundColor: "#FFC107" }}>
                {user ? ` ${user.name}` : ""}
              </Button>
            </Link>
          ) : (
            <Button outline color="light" className="px-3" block>
              <strong>유저가 존재하지 않습니다</strong>
            </Button>
          )}
        </Form>
      </NavItem>
      <NavItem>
        <Form>
          <Link onClick={onLogout} to="#">
            <Button
              style={{ border: 0, backgroundColor: "", marginLeft: "5px" }}
            >
              로그아웃
            </Button>
          </Link>
        </Form>
      </NavItem>
    </Fragment>
  );

  const guestLink = (
    <Fragment>
      <NavItem style={{ marginRight: "3px" }}>
        <LoginModal />
      </NavItem>
      <NavItem>
        <RegisterModal />
      </NavItem>
    </Fragment>
  );

  return (
    <Fragment>
      <Navbar color="dark" dark expand="lg" className="sticky-top">
        <Container className="">
          <Link to="/" className="col-md-3 text-white text-decoration-none">
            <img src="/logo.png" width="60px" alt="logo" />
            <span>Choi kyung yeul Blog</span>
          </Link>
          <div className="col-md-3"></div>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <SearchInput isOpen={isOpen} />
            <Nav className="d-flex flex-row" navbar>
              {isAuthenticated ? authLink : guestLink}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default AppNavbar;
