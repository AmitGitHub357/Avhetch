import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
// import moment from "moment-timezone";
// import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';

import { addUser } from "./../actions/userActions";
import { projects } from "../actions/projectActions";
import Preloader from "../components/Preloader";



export default ({history}) => {
    const [userData, setUserData] = useState({})
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [empCode, setEmpCode] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    // const [mainProject, setMainProject] = useState('')
    // const [projectId, setProjectId] = useState('')
 
    

    const dispatch = useDispatch()

    const addConsultant = useSelector((state) => state.addConsultant)
    const { loading, error, userInfo } = addConsultant

    // const Projects = useSelector((state) => state.fetchProjects)
    // const { loading: loadingProject, error: errorProject , projectInfo } = Projects

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo: user } = userLogin

    useEffect(()=>{
      if (user && user.isAdmin) {
       
      } else {
        history.push('/login')
      }
    }, [user, history])
  
  
    useEffect(() => {
      if (userInfo) {
        history.push('/')
      }
    }, [history, userData])

    // useEffect(() => {
    //   if(projectInfo){
    //   setMainProject(projectInfo[0].mainProject)
    //   setProjectId(projectInfo[0].projectId)
    //   }
    // }, [projectInfo])
  
    const submitHandler = (e) => {
        e.preventDefault()
        setUserData(
            userData.name = name, 
            userData.email = email,
            userData.empCode= empCode,
            userData.mobile= mobile,
            userData.password= password,
            userData.role= "manager",
            userData.manager= "null",
            userData.teamLead= "null",
            userData.asm= "null",
            userData.cpm= "null",
            userData.isAdmin= "false",
            userData.project={
              mainProject : "null",
              projectId : "null"
          },
          userData.setMilestone = {
            bookings: 0,
            leads: 0,
            siteVisits: 0
          }
        )
        dispatch(addUser(userData))
        window.location.reload();
    }

    // const projectHandler = (e) => {
    //   console.log(e)
    //   setMainProject(e.mainProject)
    //   setProjectId(e.projectId)
    //   console.log(mainProject, projectId)
    // }


  return (
    <>
    { loading ? (<Preloader />) : error? (<p>{error}</p>) :(
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Employee Code</Form.Label>
                <Form.Control required type="text" placeholder="Enter your Employee Code" value={empCode} onChange={(e) => setEmpCode(e.target.value)}/>
              </Form.Group>
            </Col>
          </Row>
          {/* <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Birthday</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setBirthday}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={birthday ? moment(birthday).format("MM/DD/YYYY") : ""}
                        placeholder="mm/dd/yyyy"
                        onFocus={openCalendar}
                        onChange={() => { }} />
                    </InputGroup>
                  )} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select defaultValue="0">
                  <option value="0">Gender</option>
                  <option value="1">Female</option>
                  <option value="2">Male</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row> */}
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control required type="number" placeholder="+12-345 678 910" value={mobile} onChange={(e) => setMobile(e.target.value)}/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
             {/* <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Project Assign</Form.Label>
                <Form.Select defaultValue={mainProject ? mainProject : ' '} onChange={(e) => projectHandler(e.target.value)}>
                  {
                    projectInfo && (projectInfo.map((pro, i) => {
                      return (
                        <option key ={i} value={pro}>{pro.mainProject}</option>
                      )
                    }))
                  }
                  
                </Form.Select>
              </Form.Group>
            </Col> */}
            <Col md={6} className="mb-3">
                <Form.Group id="password" className="mb-4">
                  <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </InputGroup>
                </Form.Group>
            </Col>
          </Row>

          

        {/*  <h5 className="my-4">Address</h5>
           <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control required type="text" placeholder="Enter your home address" />
              </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Number</Form.Label>
                <Form.Control required type="number" placeholder="No." />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>City</Form.Label>
                <Form.Control required type="text" placeholder="City" />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group className="mb-2">
                <Form.Label>Select state</Form.Label>
                <Form.Select id="state" defaultValue="0">
                  <option value="0">State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group id="zip">
                <Form.Label>ZIP</Form.Label>
                <Form.Control required type="tel" placeholder="ZIP" />
              </Form.Group>
            </Col>
          </Row>
           */}
          <div className="mt-3">
            <Button variant="primary" type="submit">Save</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
    )}
    </>
  );
};
