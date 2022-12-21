import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBoxOpen, faChartPie, faCog, faFileAlt, faHandHoldingUsd, faSignOutAlt, faTable, faTimes, faCalendarAlt, faMapPin, faInbox, faRocket, faHome, faUser, faUserFriends, faPlus, faUpload, faUserPlus, faCalendarPlus, faCalendarCheck, faProjectDiagram, faPeopleArrows, faHouseUser, faUserCheck, faGlobe, faChartBar, faTasks, faList, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import ThemesbergLogo from "../assets/img/themesberg.svg";
import ReactHero from "../assets/img/technologies/logo.png";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";
import { faInvision } from "@fortawesome/free-brands-svg-icons";


export default ({history}) => {
  const [user, setUser] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if(userInfo && userInfo.role === 'Manager'){
      setUser(userInfo.name)
    }else{
      history.push('/notfound')
    }
  }, [])
  
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
  const { eventKey, title, icon, children = null } = props;
  const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center">
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">
              {children}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={Link} to={Routes.DashboardOverview.path}>
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image src={ProfilePicture} className="card-img-top rounded-circle border-white" />
                </div>
                <div className="d-block">
                  <h6>{user}</h6>

                  {/* <Button as={Link} variant="secondary" size="xs" to={Routes.Signin.path} className="text-dark">
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Sign Out
                  </Button>
                   */}
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="Dashboard" link={Routes.ManagerDashboard.path} icon={faHome} />
              <NavItem title="Total Leads" link={Routes.ManagerLeads.path} icon={faTable} />
              {/* <NavItem title="Bulk Upload" link={Routes.ManagerBulkLeads.path} icon={faUpload} /> */}
              {/* <NavItem title="Team Member" link={Routes.ManagerTeamMember.path} icon={faUsers} /> */}
              <NavItem title="Add Lead" link={Routes.ManagerAddLead.path} icon={faUserPlus} />
              <NavItem title="Lost Leads" link={Routes.ManagerLostLeads.path} icon={faTable} />
              <NavItem title="Site Visits" link={Routes.ManagerSiteVisitsLeads.path} icon={faPeopleArrows} />
              <NavItem title="Cancelled Leads" link={Routes.ManagerCancellationLeads.path} icon={faTable} />
              <NavItem title="Next Follow Up" link={Routes.ManagerNextFollowUp.path} icon={faCalendarCheck} />
              <NavItem title="Add Member" link={Routes.ManagerAddMember.path} icon={faUserCheck} />
              <CollapsableNavItem eventKey="tables/" title="All Users" icon={faUserFriends}>
              <NavItem title="Team Lead" link={Routes.ManagerTeamLead.path} icon={faUser} />
              <NavItem title="Consultant" link={Routes.ManagerConsultant.path} icon={faUser} />
              </CollapsableNavItem>
              <NavItem title="Activity Log" link={Routes.ManagerActivityLog.path} icon={faChartPie} />
              <NavItem title="Set Milestone" link={Routes.ManagerSetMilestone.path} icon={faChartBar} />
              <NavItem title="Task Manager" link={Routes.ManagerTaskManager.path} icon={faTasks} />
              
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
