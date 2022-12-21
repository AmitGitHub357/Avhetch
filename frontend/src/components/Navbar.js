import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog, faEnvelopeOpen, faSearch, faSignOutAlt, faUserShield, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Nav, Form, Image, Navbar, Dropdown, Container, ListGroup, InputGroup } from '@themesberg/react-bootstrap';
import { createHashHistory } from 'history'
import ReactHero from "../assets/img/technologies/logo.png";
import NOTIFICATIONS_DATA from "../data/notifications";
import Profile3 from "../assets/img/team/profile-picture-3.jpg";

import { logout } from "../actions/userActions";
import './style.css'


export default (props) => {
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const areNotificationsRead = notifications.reduce((acc, notif) => acc && notif.read, true);
  const [user, setUser] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const dispatch = useDispatch()

  useEffect(() => {
    if(userInfo && userInfo.userInfo){
      setUser(userInfo.name)
    }
  }, [])

  const markNotificationsAsRead = () => {
    setTimeout(() => {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }, 300);
  };

  const history = createHashHistory()
  const logoutHandler = () => {
    dispatch(logout())
    history.push('/login')
  }

  const loginHandler = () => {
    history.push('/login')
  }


  const Notification = (props) => {
    const { link, sender, image, time, message, read = false} = props;
    const readClassName = read ? "" : "text-danger";

    return (
      <ListGroup.Item action href={link} className="border-bottom border-light">
        <Row className="align-items-center">
          <Col className="col-auto">
            <Image src={image} className="user-avatar lg-avatar rounded-circle" />
          </Col>
          <Col className="ps-0 ms--2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="h6 mb-0 text-small">{sender}</h4>
              </div>
              <div className="text-end">
                <small className={readClassName}>{time}</small>
              </div>
            </div>
            <p className="font-small mt-1 mb-0">{message}</p>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  };

  

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
      <Image src="data:image/png;base64,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" className="logomain" />

        <div className="d-flex justify-content-end w-100">
          {/* <div className="d-flex align-items-center">
            <Form className="navbar-search">
              <Form.Group id="topbarSearch">
                <InputGroup className="input-group-merge search-bar">
                  <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                  <Form.Control type="text" placeholder="Search" />
                </InputGroup>
              </Form.Group>
            </Form>
          </div> */}
          <Nav className="align-items-center">
            {/* <Dropdown as={Nav.Item} onToggle={markNotificationsAsRead} >
              <Dropdown.Toggle as={Nav.Link} className="text-dark icon-notifications me-lg-3">
                <span className="icon icon-sm">
                  <FontAwesomeIcon icon={faBell} className="bell-shake" />
                  {areNotificationsRead ? null : <span className="icon-badge rounded-circle unread-notifications" />}
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-center mt-2 py-0">
                <ListGroup className="list-group-flush">
                  <Nav.Link href="#" className="text-center text-primary fw-bold border-bottom border-light py-3">
                    Notifications
                  </Nav.Link>

                  {notifications.map(n => <Notification key={`notification-${n.id}`} {...n} />)}

                  <Dropdown.Item className="text-center text-primary fw-bold py-3">
                    View all
                  </Dropdown.Item>
                </ListGroup>
              </Dropdown.Menu>
            </Dropdown> */}

            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  {/* <Image src={Profile3} className="user-avatar md-avatar rounded-circle" /> */}
                  {user? <span className="profile-img">{user.substring(0,1)}</span> : 
                  (
                    <Dropdown.Item className="fw-bold" onClick={logoutHandler}>
                      <FontAwesomeIcon icon={faSignInAlt} className="text-danger me-2" /> Logout
                    </Dropdown.Item>
                  )
                  }
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold">{user}</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                {/* <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faUserCircle} className="me-2" /> My Profile
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faEnvelopeOpen} className="me-2" /> Messages
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faUserShield} className="me-2" /> Support
                </Dropdown.Item>

                <Dropdown.Divider /> */}

                <Dropdown.Item className="fw-bold" onClick={loginHandler}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2"/> Login
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
