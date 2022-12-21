import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image, Col, Row, Card, Nav, Tab, Table, Button, Modal, Form} from '@themesberg/react-bootstrap';
import { consultantList, fetchUserList, managerList, teamLeadList } from '../actions/userActions'
import { deleteUser } from '../actions/userActions';
import Select from "react-select";
import ReactLogo from '../assets/img/technologies/loader.png'
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import { FormGroup } from '@material-ui/core';
import { getProjectDetails, updateProject } from '../actions/projectActions';

import ConsultantSelect from '../components/ConsultantSelect';
import { addTeam, teamDetails, deleteTeam } from '../actions/teamManagementActions';
import { ADD_TEAM_RESET, DELETE_TEAM_RESET } from '../constants/teamManagementConstants';

  

const TeamMember = ({history, match}) => {

  // var consultantArray =[]

    const [showDefault, setShowDefault] = useState(false);
    const [showSubProjectDefault, setShowSubProjectDefault] = useState(false);
    const [showEditSubProjectDefault, setShowEditSubProjectDefault] = useState(false);
    const [showEditTeamDefault, setShowEditTeamDefault] = useState(false);
    const [editedSubProject, setEditedSubProject] = useState('')
    const [previousSubProject, setPreviousSubProject] = useState('')
    const [newSubProject, setNewSubProject] = useState('')
    const [selectedManager, setSelectedManager] = useState('')
    const [selectedTeamLead, setSelectedTeamLead] = useState('')
    const [selectedConsultants, setSelectedConsultants] = useState([])
    const [consultantArray, setConsultantArray] = useState([])
    const [cons, setCons] = useState([])

    const handleClose = () => setShowDefault(false);
    const handleSubProjectClose = () => setShowSubProjectDefault(false);
    const handleEditSubProjectClose = () => setShowEditSubProjectDefault(false);
    const handleEditTeamClose = () => setShowEditTeamDefault(false);

    const dispatch = useDispatch()

    const projectDetails = useSelector((state) => state.projectDetails)
    const { loading, error, projectInfo } = projectDetails

    const fetchManagers = useSelector((state) => state.fetchManagers)
    const { managers } = fetchManagers

    const fetchTeamLeads = useSelector((state) => state.fetchTeamLeads)
    const { teamlead } = fetchTeamLeads

    const fetchConsultants = useSelector((state) => state.fetchConsultants)
    const { consultants } = fetchConsultants

    // const projectTeamDetails = useSelector((state) => state.projectTeamDetails)
    // const { teamDetails } = projectTeamDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo: user } = userLogin

  const projectTeamDetails = useSelector((state) => state.projectTeamDetails)
  const { teamDetails: projectTeam } = projectTeamDetails

  const addTeamData = useSelector((state) => state.addTeam)
  const { addedTeam } = addTeamData

  const deleteTeamStatus = useSelector((state) => state.deleteTeam)
  const { success } = deleteTeamStatus


    useEffect(()=>{
      if (user && user.role === "Manager") {
        dispatch(getProjectDetails(user.project))
        dispatch(managerList())
        dispatch(teamLeadList())
        dispatch(consultantList())
        dispatch(teamDetails(user.project))
      } else {
        history.push('/login')
      }
    }, [user, history])

    useEffect(()=>{
      if(addedTeam || success){
        dispatch({
          type:DELETE_TEAM_RESET
        })
        dispatch({type: ADD_TEAM_RESET})
      dispatch(teamDetails(user.project))
      }
    },[addedTeam, success])

    // useEffect(()=>{
    //   if(consultants){
    //     // for(let i=0 ; i < consultants.length; i++){
    //     //   // setConsultantArray([...consultantArray, {value : consultants[i]._id, label: consultants[i].name}])
    //     //   consultantArray = [...consultantArray, {value : consultants[i]._id, label: consultants[i].name}]
    //     //   console.log(consultantArray)
    //     // }
    //     var a = []
    //     consultants.map(cons => {
          
    //       a.push({value : cons._id, label: cons.name})
    //     })
    //     setConsultantArray(a)
    //   }
    // }, [consultants])

    const editSubProjectHandler = (project) => {
      setShowEditSubProjectDefault(true)
      setEditedSubProject(project)
      setPreviousSubProject(project)
    }

    const saveEditSubProjectHandler = (e) => {
      e.preventDefault()
      projectInfo.subProject[projectInfo.subProject.findIndex(pro => pro === previousSubProject)] = editedSubProject
      dispatch(updateProject(projectInfo))
      setShowEditSubProjectDefault(false)
    }

    const selectOptionsManager = [
      { value: 'bootstrap', label: 'Bootstrap' },
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
    ];
  
    // const teamlead = [
    //   { value: 'bootstrap', label: 'Bootstrap' },
    //   { value: 'react', label: 'React' },
    //   { value: 'vue', label: 'Vue' },
    //   { value: 'angular', label: 'Angular' },
    //   { value: 'svelte', label: 'Svelte' },
    // ];
  
    const selectOptionsConsultant = [
      { value: 'bootstrap', label: 'Bootstrap' },
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
    ];
    
    const customStyles = {
    
      control: (provided) => ({
        ...provided,
        borderRadius: '.5rem',
      }),
    
      multiValue: (provided) => ({
        ...provided,
        borderRadius: '.5rem'
      }),
    
      multiValueRemove: (provided) => ({
        ...provided,
        borderRadius: '.5rem'
      }),
    
      placeholder: (provided) => ({
        ...provided,
        borderRadius: '.5rem',
      }),
    
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
    
        return {
          ...provided,
          opacity,
          transition,
        };
      }
    };

    const deleteSubProjectHandler = (project) => {
      const a = projectInfo.subProject.filter((pro) => pro !== project)
      projectInfo.subProject = a
      dispatch(updateProject(projectInfo))
      dispatch(getProjectDetails(user.project))
    }

    const addSubProjectHandler = () => {
      if(newSubProject){
      projectInfo.subProject.push(newSubProject)
      dispatch(updateProject(projectInfo))
      dispatch(getProjectDetails(user.project))
      setShowSubProjectDefault(false)
      }
    }

    // useEffect(() => {
    //   if(cons && cons.length>0){
    //     dispatch(addTeam({
    //       projectId: id,
    //       managerId: selectedManager,
    //       // teamLeads: [{teamLeadId:selectedTeamLead}],
    //       // consultants: [{
    //       //   consultantId : cons,
    //       //   teamLeadId : selectedTeamLead
    //       // }]
    //     }))
    //   }
    // }, [cons])

    const addTeamHandler = (e) => {
      e.preventDefault()
      // let b = []
      // selectedConsultants.map(c => b.push(c.value))
      
      // setCons(b)
      dispatch(addTeam({
        projectId: user.project,
        managerId: selectedManager,
      }))     
    
      handleClose()
    }

    const editTeamHandler = () => {
      // dispatch()
      handleEditTeamClose()
    }

    const deleteTeamHandler = (id) => {
      dispatch(deleteTeam(id))
      dispatch(teamDetails(id))
    }

  if(true){
    return (
      
      <>
     
      <div>
          <Row className='py-3'>
              <Col>
              
      <Tab.Container defaultActiveKey="overview">
      <Row>
        <Col lg={12}>
          <Nav className="nav-tabs">
            <Nav.Item>
              <Nav.Link eventKey="overview" className="mb-sm-3 mb-md-0">
                Project Overview
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="team" className="mb-sm-3 mb-md-0">
                Team Members
              </Nav.Link>
            </Nav.Item>

          </Nav>
        </Col>
        <Col lg={12}>
          <Tab.Content className='py-4' style={{background:"white"}}>
            <Tab.Pane eventKey="overview" className="py-4 px-4">
            <Row className='pt-3 pb-3'>
                <Col><h3>Sub Project Lists</h3></Col>
                <Col className='d-flex justify-content-end'><Button variant="primary" onClick={() => setShowSubProjectDefault(true)}>Add Sub Project</Button>
                <Modal as={Modal.Dialog} centered show={showSubProjectDefault} onHide={handleSubProjectClose}>
                      <Modal.Header>
                        <Modal.Title className="h6">Add Sub Project</Modal.Title>
                        <Button variant="close" aria-label="Close" onClick={handleSubProjectClose} />
                      </Modal.Header>
                      <Modal.Body>
                      <Form>
                      <Form.Group id="firstName" className = "mb-3">
                        <Form.Label>Sub Project</Form.Label>
                        <Form.Control required type="text" placeholder="Enter sub project" defaultValue={newSubProject} onChange={(e)=>setNewSubProject(e.target.value)}/>
                      </Form.Group>
                    <Button variant="primary" onClick={()=> addSubProjectHandler()}>Add</Button>
                  </Form>
                      </Modal.Body>
                    </Modal>
                </Col>
            </Row>
                <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Sub Project Name</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {(projectInfo && projectInfo.subProject) && projectInfo.subProject.map((project, i)=> (
            <tr key={i}>
            <td>{project}</td>
            <td>
              <Button variant="primary" onClick={() => editSubProjectHandler(project)}>Edit</Button>
                <Modal as={Modal.Dialog} centered show={showEditSubProjectDefault} onHide={handleEditSubProjectClose}>
                      <Modal.Header>
                        <Modal.Title className="h6">Add Sub Project</Modal.Title>
                        <Button variant="close" aria-label="Close" onClick={handleEditSubProjectClose} />
                      </Modal.Header>
                      <Modal.Body>
                      <Form onSubmit={(e) => saveEditSubProjectHandler(e)}>
                      <Form.Group id="firstName" className = "mb-3">
                        <Form.Label>Sub Project</Form.Label>
                        <Form.Control required type="text" placeholder="Enter sub project" value = {editedSubProject} onChange={(e)=> setEditedSubProject(e.target.value)}/>
                      </Form.Group>
                    <Button variant="primary" type='submit'>Save</Button>
                  </Form>
                      </Modal.Body>
                    </Modal>
                    </td>
            <td>
                    <Button variant="danger" onClick={() => deleteSubProjectHandler(project)}>Delete</Button>
            </td>
            </tr>
          ))}
        </tbody>
      </Table>
            </Tab.Pane>

            {projectTeam &&
            
            <Tab.Pane eventKey="team" className="py-4 px-4">
            <Row className='pt-3 pb-3'>
                <Col><h3>Team Members</h3></Col>
                {/* <Col className='d-flex justify-content-end'><Button variant="primary" onClick={() => setShowDefault(true)}>Add New Team</Button>
                <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                      <Modal.Header>
                        <Modal.Title className="h6">Add Team Members</Modal.Title>
                        <Button variant="close" aria-label="Close" onClick={handleClose} />
                      </Modal.Header>
                      <Modal.Body>
                      <Form onSubmit={(e)=>addTeamHandler(e)}>
                      <Form.Group className="mb-2">
                      <Form.Label>Select Manager</Form.Label>
                      <Form.Select onChange={(e) => setSelectedManager(e.target.value) } required>
                        <option value="">Select</option>
                        {
                          managers && managers.map((manager,i) => (
                            <option key={i} value={manager._id}>{manager.name}</option>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>
                    {/* <Form.Group className="mb-2">
                      <Form.Label>Select TeamLead</Form.Label>
                       <Form.Select onChange={(e) => setSelectedTeamLead(e.target.value)} required>
                        <option value="">Select</option>
                        {
                          teamlead && teamlead.map((lead,i) => (
                            <option key={i} value={lead._id}>{lead.name}</option>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>
                    
                    {<Form.Group className="mb-2">
                    <Form.Label>Select Consultants</Form.Label>
                    <Select
                        value={selectedConsultants}
                        onChange={setSelectedConsultants}
                        options={consultantArray}
                        isMulti = {true}
                      />
                    </Form.Group>}
                    <Button variant="primary" type="submit">Save</Button>
                  </Form>
                      </Modal.Body>
                    </Modal>
                </Col> */}
            </Row>

            <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Team Lead</th>
            <th scope="col">Consultant</th>        
            {/* <th scope="col"></th>
            <th scope="col"></th> */}
          </tr>
        </thead>
        <tbody>
          {
            projectTeam && projectTeam.teamData.map((team, i) => (
              
              team.teamLeads.map((teamLead) =>(
                team.consultants.map(cons => {
                  if(teamLead.teamLeadId._id === cons.teamLeadId){
                    return (
                    cons.consultantId.map(c => (
                    <tr>
                    <td>{teamLead.teamLeadId && teamLead.teamLeadId.name}</td>
                    <td>{c && c.name}</td>
                    {/* <td>
                    <Button variant="primary" onClick={() => setShowEditTeamDefault(true)}>Edit Team</Button>
                      <Modal as={Modal.Dialog} centered show={showEditTeamDefault} onHide={handleEditTeamClose}>
                      <Modal.Header>
                        <Modal.Title className="h6">Edit Team Members</Modal.Title>
                        <Button variant="close" aria-label="Close" onClick={handleEditTeamClose} />
                      </Modal.Header>
                      <Modal.Body>
                      <Form onSubmit={(e)=>editTeamHandler(e)}>
                      <Form.Group className="mb-2">
                      <Form.Label>Select Manager</Form.Label>
                      <Form.Select onChange={(e) => setSelectedManager(e.target.value) } required>
                        <option value="">Select</option>
                        {
                          managers && managers.map((manager,i) => (
                            <option key={i} value={manager._id}>{manager.name}</option>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Select TeamLead</Form.Label>
                       <Form.Select onChange={(e) => setSelectedTeamLead(e.target.value)} required>
                        <option value="">Select</option>
                        {
                          teamlead && teamlead.map((lead,i) => (
                            <option key={i} value={lead._id}>{lead.name}</option>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>
                    
                    {<Form.Group className="mb-2">
                    <Form.Label>Select Consultants</Form.Label>
                    <Select
                        value={selectedConsultants}
                        onChange={setSelectedConsultants}
                        options={consultantArray}
                        isMulti = {true}
                      />
                    </Form.Group>}
                    <Button variant="primary" type="submit">Save</Button>
                  </Form>
                      </Modal.Body>
                    </Modal></td>
                    <td><Button variant="danger" onClick = {()=>deleteTeamHandler(team._id)}>Delete</Button></td> */}
                  </tr>)))
                  
                  }
                })
              )

            )

               // {team.teamLeads.map((teamLead) =>{
              //  team.consultants.map((cons) => (
              //  <tr>
              //     <td>{team.managerId.name}</td>
                  
              //   <td>{teamLead._id === cons.teamLeadId && teamLead.name}</td>
              //   <td>{teamLead._id === cons.teamLeadId && cons.name}</td>
              //   <td><Button variant="secondary">Edit</Button></td>
              //   <td><Button variant="danger">Delete</Button></td>
              //   </tr>
              //   ))
              //  } )

            )
            
            
         
           )}
        </tbody>
      </Table>
            </Tab.Pane>
  }
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
              </Col>
          </Row>
      </div>
      
      </>
    )
  }
}
  

  export default TeamMember

