import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
// import moment from "moment-timezone";
// import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import Preloader from "../components/Preloader";

import { projects, updateProject, addProject } from "../actions/projectActions";

export default ({history}) => {
  const [projectd, setProject] = useState({})
  const [mainProject, setMainProject] = useState('')
  const [addMainProject, setAddMainProject] = useState('')
  const [main, setMain] = useState('')
  const [addSubProject, setAddSubProject] = useState('')
  const [projectId, setProjectId] = useState('')
  const [index, setIndex] = useState(0)
  const [index2, setIndex2] = useState(0)
   
    const dispatch = useDispatch()

    const fetchProjects = useSelector((state) => state.fetchProjects)
    const { loading, error , projectInfo } = fetchProjects

    const updateProjectd = useSelector((state) => state.updateProject)
    const { success } = updateProjectd

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo: user } = userLogin

    // const addProject = useSelector((state) => state.addProject)
    // const {projectInfo: projectadded } = addProject

    useEffect(()=>{
      if (user && user.isAdmin) {
        dispatch(projects())
      } else {
        history.push('/login')
      }
    }, [user, history, success, ])

    // useEffect(() => {
    //   dispatch(projects())
    // }, [])

    

    useEffect(() => {
      if(projectInfo){
        const i = projectInfo.findIndex((element,i) => {
          if (element.mainProject === mainProject){
            setProjectId(element._id)
          return true
          }
        })
        setIndex(i);
       
      }
    }, [mainProject])

    useEffect(() => {
      if(projectInfo){
        const i = projectInfo.findIndex((element,i) => {
          if (element.mainProject === main){
          return true
          }
        })
        setIndex2(i);
       
      }
    }, [main])

    const addProjectHandler= () => {
      dispatch(addProject({
        mainProject: addMainProject,
        subProject: []
      }))
      setAddMainProject('')
      setIndex(0)
      setTimeout(() => {
        dispatch(projects())
        }, 1000)
    }

    const addSubProjectHandler= () => {
      setProject(projectd.subProject = [...projectInfo[index].subProject,addSubProject],
        projectd.mainProject = projectInfo[index].mainProject,
        projectd._id = projectInfo[index]._id
        )
      setTimeout(() => {
        dispatch(updateProject(projectd))
        }, 2000)
        setTimeout(() => {
          dispatch(projects())
          }, 3000)
      setAddSubProject('')
    }

  return (
    <>
    { loading ? (<Preloader />) : error? (<p>{error}</p>) :(
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
      <h5 className="mb-4">Project and Subproject List</h5>
        <Form>
          <Row>
          <Col md={6} className="mb-3">
              <Form.Group id="projectList">
                <Form.Label>Project List</Form.Label>
                <Form.Select required defaultValue={main} onChange = {(e)=> setMain(e.target.value)} >
                  {
                    projectInfo && (projectInfo.map((pro, i) => {
                      return (
                        <option key ={i} value={pro.mainProject}>{pro.mainProject}</option>
                      )
                    }))
                  }
                  
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="subProjectList">
                <Form.Label>Sub Project List</Form.Label>
                <Form.Select required>
                  {
                      projectInfo && projectInfo[index2] && (projectInfo[index2].subProject.map((pro, i) => {
                        return (
                          <option key ={i} value={pro}>{pro}</option>
                        )
                      }))
                    }
                </Form.Select>
              </Form.Group>
            </Col>
            
            
          </Row>
          </Form>
        <h5 className="mt-4">Add Project</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="addProject">
                <Form.Label>Add Project</Form.Label>
                <Form.Control required type="text" placeholder="Enter project"  onChange={(e)=>setAddMainProject(e.target.value)}/>
              </Form.Group>
            </Col>

            <Col md={6} className="mt-4 pt-2">
              <Button variant="primary" type="submit" value={addMainProject} onClick={() => addProjectHandler()}>Add Project</Button>
            </Col>
            
            
          </Row>
          </Form>         
          <h5 className="mb-4 mt-4">Add Sub Project</h5>
          <Form>
          <Row>
          <Col md={6} className="mb-3">
              <Form.Group id="projectList">
                <Form.Label>Select Project</Form.Label>
                <Form.Select required defaultValue={mainProject}  onChange = {(e)=> setMainProject(e.target.value)}>
                  {
                    projectInfo && (projectInfo.map((pro, i) => {
                      return (
                        <option key ={i} value={pro.mainProject}>{pro.mainProject}</option>
                      )
                    }))
                  }
                  
                </Form.Select>
              </Form.Group>
            </Col>

          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="addsub">
                <Form.Label>Add Sub Project</Form.Label>
                <Form.Control required type="text" placeholder="Enter Sub Project" value={addSubProject} onChange={(e)=>setAddSubProject(e.target.value)}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mt-4 pt-2">
              <Button variant="primary" type="submit" onClick={() => addSubProjectHandler()}>Add SubProject</Button>
            </Col>
          </Row>

        
        </Form>
      </Card.Body>
    </Card>
    )}
    </>
  );
};
