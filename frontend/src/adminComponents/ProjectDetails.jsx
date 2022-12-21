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
import { addTeam, teamDetails, deleteTeam, updateTeam, fetchTeamList } from '../actions/teamManagementActions';
import { ADD_TEAM_RESET, DELETE_TEAM_RESET, UPDATE_TEAM_RESET } from '../constants/teamManagementConstants';

  

const ProjectDetails = ({history, match}) => {
  const id = match.params.id
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
    const [editManager, setEditManager] = useState('')
    const [editTeamLead, setEditTeamLead] = useState('')
    const [editConsultants, setEditConsultants] = useState([])
    const [consultantArray, setConsultantArray] = useState([])
    const [cons, setCons] = useState([])
    const [teamId, setTeamId] = useState('')

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

  const getTeamList = useSelector((state) => state.getTeamList)
  const { teamList } = getTeamList

  const deleteTeamStatus = useSelector((state) => state.deleteTeam)
  const { success } = deleteTeamStatus

  const updateTeamData = useSelector((state) => state.updateTeamData)
  const { success: updateSuccess } = updateTeamData

    useEffect(()=>{
      if (user && user.isAdmin) {
        dispatch(getProjectDetails(id))
        dispatch(managerList())
        dispatch(teamLeadList())
        dispatch(consultantList())
        dispatch(teamDetails(id))
        dispatch(fetchTeamList())
      } else {
        history.push('/login')
      }
    }, [user, history])
    

    useEffect(()=>{
      if(addedTeam || success || updateSuccess){
        dispatch({
          type:DELETE_TEAM_RESET
        })
        dispatch({type: ADD_TEAM_RESET})
        dispatch({
          type: UPDATE_TEAM_RESET
        })
       
      dispatch(teamDetails(id))
      dispatch(teamLeadList())
        dispatch(consultantList())
      }
    },[addedTeam, success, updateSuccess])


    useEffect(()=>{
      if(consultants){
        // for(let i=0 ; i < consultants.length; i++){
        //   // setConsultantArray([...consultantArray, {value : consultants[i]._id, label: consultants[i].name}])
        //   consultantArray = [...consultantArray, {value : consultants[i]._id, label: consultants[i].name}]
        //   console.log(consultantArray)
        // }
        var a = []
        consultants.map(cons => {
          if(cons.isAvailable){
          a.push({value : cons.consultantId, label: cons.name})
          }
        })
        setConsultantArray(a)
      }
    }, [consultants])

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
      dispatch(getProjectDetails(id))
    }

    const addSubProjectHandler = () => {
      if(newSubProject){
      projectInfo.subProject.push(newSubProject)
      dispatch(updateProject(projectInfo))
      dispatch(getProjectDetails(id))
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

    // useEffect(()=>{
    //   if(selectedConsultants && selectedConsultants.length>0){
    //   var consArray = []
    //   selectedConsultants.map(cons => {
    //     consArray.push({consultantId: cons.value, teamLeadId: selectedTeamLead})
    //   })
    //   console.log("cons", consArray)
    //   setSelectedConsultants(consArray)
    // }
    // }, [])

   


    const addTeamHandler = (e) => {
      e.preventDefault()

      if(teamList){
        var managerCheck = teamList.teamsData.filter(team => {
          if(team.managerId._id === selectedManager)  {
            return team.projectId._id !== id 
          }})
       
      }

      
      
      let teamCheck = projectTeam.teamData.filter(team =>(team.teamLeads.filter(t=>t.teamLeadId._id === selectedTeamLead)))

      // let managerCheck = teamList.teamData.filter(team => (team.projectId === id) && (team.managerId._id === selectedManager))
      
      if(selectedConsultants && selectedConsultants.length>0){
        var consArray = []
        selectedConsultants.map(cons => {
          consArray.push({consultantId: cons.value, teamLeadId: selectedTeamLead})
        })
      }
        if( teamCheck && managerCheck && managerCheck.length>0){
         alert("Already member is in team")
        }else{
         
        dispatch(addTeam({
        projectId: id,
        managerId: selectedManager,
        teamLeads: [{
          teamLeadId: selectedTeamLead}],
        consultants: consArray
        
      })) }
      setSelectedConsultants([])
      handleClose()
    }

    const editTeamHandler = (e) => {
      e.preventDefault()
      if(editConsultants && editConsultants.length>0){
        var consArray = []
        editConsultants.map(cons => {
          consArray.push({consultantId: cons.value, teamLeadId: editTeamLead})
        })}
       dispatch(updateTeam({
            _id: teamId,
            projectId: id,
            managerId: editManager,
            teamLeads: [{
              teamLeadId: editTeamLead}],
            consultants: consArray
            
          }))
      handleEditTeamClose()
    }

    const deleteTeamHandler = (id) => {
      dispatch(deleteTeam(id))
      dispatch(teamDetails(id))
    }

    const editTeamFormHandler = (team, id) =>{
      setEditManager(team.managerId._id)
      setEditTeamLead(id)
      setTeamId(team._id)
      if(team.consultants && team.consultants.length>0){
      var a = []
      team.consultants.map(cons => {
        a.push({value : cons.consultantId.userId.consultantId, label: cons.consultantId.userId.name})
        
      })
    }
  
      setEditConsultants(a)
      setShowEditTeamDefault(true)
    }

  

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
              <Nav.Link eventKey="managers" className="mb-sm-3 mb-md-0">
                Managers
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
            <>
             <Tab.Pane eventKey="managers" className="py-4 px-4">
            <Row className='pt-3 pb-3'>
                <Col><h3>Team Members</h3></Col>
                {/* <Col className='d-flex justify-content-end'><Button variant="primary" onClick={() => setShowDefault(true)}>Add Manager</Button>
                <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                      <Modal.Header>
                        <Modal.Title className="h6">Add Manager</Modal.Title>
                        <Button variant="close" aria-label="Close" onClick={handleClose} />
                      </Modal.Header>
                      <Modal.Body>
                      <Form onSubmit={(e)=>addTeamHandler(e)}>
                      <Form.Group className="mb-2">
                      <Form.Label>Select Manager</Form.Label>
                      <Form.Select onChange={(e) => setSelectedManager(e.target.value) } required>
                        <option value="">Select</option>
                        {
                          managers && managers.map((manager,i) => {
                            if(manager.isAvailable){
                            return <option key={i} value={manager._id}>{manager.name}</option>
                            }
                              })
                        }
                      </Form.Select>
                    </Form.Group>
                     <Form.Group className="mb-2">
                      <Form.Label>Select TeamLead</Form.Label>
                       <Form.Select onChange={(e) => setSelectedTeamLead(e.target.value)} required>
                        <option value="">Select</option>
                        {
                          teamlead && teamlead.map((lead,i) => (
                            <option key={i} value={lead.teamLeadId}>{lead.name}</option>
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
            <th scope="col">Manager</th>
            <th scope="col"></th>
           
          </tr>
        </thead>
        <tbody>
          {
            projectTeam && projectTeam.teamData.map((team, i) => (
                                 
                    <tr key={i}>
                    <td>{team.managerId && team.managerId.name}</td>
                    <td><Button variant="danger" onClick={()=>deleteTeamHandler(team._id)}>Delete</Button></td>
                    
                  </tr>

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
            <Tab.Pane eventKey="team" className="py-4 px-4">
            <Row className='pt-3 pb-3'>
                <Col><h3>Team Members</h3></Col>
                <Col className='d-flex justify-content-end'><Button variant="primary" onClick={() => setShowDefault(true)}>Add New Team</Button>
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
                            
                            <option key={i} value={manager.managerId}>{manager.name}</option>
                            
                          ))
                        }
                      </Form.Select>
                    </Form.Group>
                     <Form.Group className="mb-2">
                      <Form.Label>Select TeamLead</Form.Label>
                       <Form.Select onChange={(e) => setSelectedTeamLead(e.target.value)} >
                        <option value="">Select</option>
                        {
                          teamlead && teamlead.map((lead,i) => {
                            if(lead.isAvailable){
                            return <option key={i} value={lead.teamLeadId}>{lead.name}</option>
                            }
  })
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
                        required={selectedTeamLead? true : false}
                      />
                    </Form.Group>}
                    <Button variant="primary" type="submit">Save</Button>
                  </Form>
                      </Modal.Body>
                    </Modal>
                </Col>
            </Row>

            <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Manager</th>
            <th scope="col">Team Lead</th>
            <th scope="col">Consultant</th>        
             <th scope="col"></th>
            {/*<th scope="col"></th> */}
          </tr>
        </thead>
        <tbody>
          {
            projectTeam && projectTeam.teamData.map((team, j) => {
              
              if(team.consultants && team.consultants.length>0){
                return team.consultants.map((cons,i) => {
                    return (
                    
                    <tr key={i}>
                    <td>{team.managerId && team.managerId.name}</td>
                    <td>{cons.teamLeadId && cons.teamLeadId.userId.name}</td>
                    <td>{cons.consultantId && cons.consultantId.userId.name}</td>
                    <td>
                    <Button variant="primary" onClick={() =>editTeamFormHandler(team, cons.teamLeadId.userId.teamLeadId)}>Edit Team</Button>
                      <Modal as={Modal.Dialog} centered show={showEditTeamDefault} onHide={handleEditTeamClose}>
                      <Modal.Header>
                        <Modal.Title className="h6">Edit Team Members</Modal.Title>
                        <Button variant="close" aria-label="Close" onClick={handleEditTeamClose} />
                      </Modal.Header>
                      <Modal.Body>
                      <Form onSubmit={(e)=>editTeamHandler(e)}>
                      <Form.Group className="mb-2">
                      <Form.Label>Select Manager</Form.Label>
                      <Form.Select onChange={(e) => setEditManager(e.target.value) } value={editManager} required>
                        <option value="">Select</option>
                        {
                          managers && managers.map((manager,i) => (
                            <option key={i} value={manager.managerId}>{manager.name}</option>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Select TeamLead</Form.Label>
                       <Form.Select onChange={(e) => setEditTeamLead(e.target.value)} required value={editTeamLead}>
                        <option value="">Select</option>
                        {
                          teamlead && teamlead.map((lead,i) => (
                            <option key={i} value={lead.teamLeadId}>{lead.name}</option>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>
                    
                    {<Form.Group className="mb-2">
                    <Form.Label>Select Consultants</Form.Label>
                    <Select
                        value={editConsultants}
                        onChange={setEditConsultants}
                        options={consultantArray}
                        isMulti = {true}
                      />
                    </Form.Group>}
                    <Button variant="primary" type="submit">Save</Button>
                  </Form>
                      </Modal.Body>
                    </Modal></td>
                    {/* <td><Button variant="danger" onClick = {()=>deleteTeamHandler(team._id)}>Delete</Button></td> */}
                  </tr>)
                  
                  
                })
              }else{
                return (<tr key={j}>
                        <td>{team.managerId && team.managerId.name}</td>
                        <td>{team.teamLeads[0].teamLeadId && team.teamLeads[0].teamLeadId.userId.name}</td>
                        <td></td>
                        <td> <Button variant="primary" onClick={() =>editTeamFormHandler(team, cons && cons.length>0? cons.teamLeadId.userId.teamLeadId: team.teamLeads[0].teamLeadId.userId.teamLeadId)}>Edit Team</Button></td>
                      </tr>)
              }

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

            }
            
            
         
           )}
        </tbody>
      </Table>
            </Tab.Pane></>
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
  

  export default ProjectDetails

