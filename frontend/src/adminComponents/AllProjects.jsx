import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image, Row, Col, Button, Modal, Form } from '@themesberg/react-bootstrap';
import { addProject, projects } from '../actions/projectActions';

import ReactLogo from '../assets/img/technologies/loader.png'

import ProjectTable from './ProjectTable';



const ProjectList = ({history}) => {
    // const [userList, setUserList] = useState([])
    const [mainProject, setMainProject] = useState('')

    const [showDefault, setShowDefault] = useState(false);
    const handleClose = () => setShowDefault(false);

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo: user } = userLogin

    const fetchProjects = useSelector((state) => state.fetchProjects)
    const { loading, error , projectInfo } = fetchProjects

    const createProject = useSelector((state) => state.addProject)
    const {projectInfo: addedProject } = createProject

    useEffect(()=>{
      if (user && user.isAdmin) {
        dispatch(projects())
      } else {
        history.push('/login')
      }
    }, [user, history])

    useEffect(()=>{
      if(addedProject){
      dispatch(projects())
      }
    }, [addedProject])

    
  const addMainProjectHandler = (e) =>{
    e.preventDefault()
    dispatch(addProject({mainProject}))
    handleClose()
  }

  
  if(projectInfo === undefined){
  return (
    <div className={`preloader bg-softr flex-column justify-content-center align-items-center `}>
        <Image className="loader-element animate__animated animate__jackInTheBox" src={ReactLogo} height={70} />
        </div>
    
  )
  } else{
    return (
      
      <>
      {loading? (
        // <div className={`preloader bg-softr flex-column justify-content-center align-items-center `}>
        // <Image className="loader-element animate__animated animate__jackInTheBox" src={ReactLogo} height={40} />
        // </div>
        <div></div>
      ) : (
      <div>
          <Row className='pt-3 pb-3'>
                        <Col>
                        {/* <a href="/#/addproject" className='btn btn-primary'>Add New Project</a> */}
                        <Button variant="primary" className="btn btn-primary" onClick={() => setShowDefault(true)}>Add New Project</Button>
                        <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
    <Modal.Header>
      <Modal.Title className="h6">Add New Project</Modal.Title>
      <Button variant="close" aria-label="Close" onClick={handleClose} />
    </Modal.Header>
    <Modal.Body>
        <Form onSubmit={(e) => addMainProjectHandler(e)}>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="addProject">
                {/* <Form.Label>Add Project</Form.Label> */}
                <Form.Control required type="text" placeholder="Enter project" defaultValue={mainProject} onChange={(e)=>setMainProject(e.target.value)}/>
              </Form.Group>
            </Col>

            <Col md={12} className="pt-2">
              <Button variant="primary" type="submit" >Add Project</Button>
            </Col>
          </Row>
          </Form>  
    </Modal.Body>
    <Modal.Footer>
    </Modal.Footer>
  </Modal>

                        </Col>
                        </Row>
                    <ProjectTable projectList={projectInfo}/>
      </div>
      )}
      </>
    )
  }
}
  

  export default ProjectList

