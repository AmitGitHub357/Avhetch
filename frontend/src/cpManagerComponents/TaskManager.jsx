import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Alert, Image } from '@themesberg/react-bootstrap'
import Preloader from "../components/Preloader";
import TimeAgo from 'react-timeago'

import { Col, Row, Button, Dropdown, ButtonGroup, Modal, Form } from '@themesberg/react-bootstrap';
// import { Form } from 'react-bootstrap';
import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../components/Widgets";
import { activityLogData } from '../actions/activityLogActions'
import { deleteTask, fetchIndividualTasks } from '../actions/taskManagerActions';
import { fetchUserList } from '../actions//userActions'
import { addTask, updateTask } from '../actions/taskManagerActions';
import { UPDATE_TASK_RESET, DELETE_TASK_RESET } from '../constants/taskManagerContants';


// delete lead -> null remaining

const TaskManager = ({ history, match }) => {
    const [showDefault, setShowDefault] = useState(false);
    const [showEditDefault, setShowEditDefault] = useState(false);
    const [task, setTask] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [assignTo, setAssignTo] = useState('')
    const [note, setNote] = useState('')
    const [status, setStatus] = useState('')
    const [editedTask, setEditedTask] = useState('')
    const [previousTask, setPreviousTask] = useState('')
    const [editedDueDate, setEditedDueDate] = useState('')
    const [editedAssignTo, setEditedAssignTo] = useState('')
    const [editedNote, setEditedNote] = useState('')
    const [editedStatus, setEditedStatus] = useState('')
    


    const handleClose = () => setShowDefault(false);

    const handleEditClose = () => setShowEditDefault(false);


    const dispatch = useDispatch()


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const fetchUserTasks = useSelector((state) => state.fetchIndividualTasks)
    const { loading, error, taskList } = fetchUserTasks

    const userList = useSelector((state) => state.userList)
    const { users } = userList

    const addTaskData = useSelector((state) => state.addTask)
    const { loading: taskLoading, error: taskError, addedTask } = addTaskData

    const updateTaskData = useSelector((state) => state.updateTask)
    const { success } = updateTaskData

    const deleteTaskData = useSelector((state) => state.deleteTask)
    const { success: deleteSuccess } = deleteTaskData

    useEffect(() => {
        if (userInfo && userInfo.role === "Manager") {
            dispatch(fetchIndividualTasks(userInfo._id))
            dispatch(fetchUserList())
        } else {
            history.push(`/login`)
        }
    }, [])

    useEffect(()=>{
        if(success) {
            dispatch({
                type: UPDATE_TASK_RESET
            })
            dispatch(fetchIndividualTasks(userInfo._id))
        }
    },[success])

    useEffect(()=>{
        if(deleteSuccess) {
            dispatch({
                type: DELETE_TASK_RESET
            })
            dispatch(fetchIndividualTasks(userInfo._id))
        }
    }, [deleteSuccess])

    const addtaskHandler = (e) => {
        e.preventDefault()
       
        dispatch(addTask({
            task,
            member: userInfo._id,
            dueDate,
            note,
            assignTo : assignTo? assignTo: userInfo._id
        }))

        setShowDefault(false)
        dispatch(fetchIndividualTasks(userInfo._id))
        setAssignTo('')
        setDueDate('')
        setNote('')
        setStatus('')
        setTask('')
        
    }

    const taskStatusHandler = (e, task) => {
      
        if(task.status === 'Pending'){
            task.status = 'Completed'
        }else{
            task.status ='Pending'
        }

        dispatch(updateTask(task))
    }

    const deleteTaskHandler = (e, task) => {
        dispatch(deleteTask(task._id))
    }


    const editTaskHandler = (e,task) => {
        e.preventDefault()
        setPreviousTask(task)
        setShowEditDefault(true)

        setEditedTask(task.task)
        setEditedDueDate(task.dueDate)
        setEditedNote(task.note)
        setEditedAssignTo(task.assignTo)
    }

    const saveEditedTaskHandler = (e, task) => {
        e.preventDefault()
        dispatch(updateTask({
            _id : previousTask._id,
            task : editedTask,
            note: editedNote,
            status : editedStatus,
            member: userInfo._id,
            assignTo: editedAssignTo,
            dueDate: editedDueDate
        }))

        setShowEditDefault(false)
        setEditedAssignTo('')
        setEditedDueDate('')
        setEditedNote('')
        setEditedStatus('')
        setEditedTask('')
    }


    return (
        <>
            {loading ? (<Preloader />) : error ? (<Alert>{error}</Alert>) : true ? (
                <>
                    <Row className='pt-3 pb-3'>
                        <Col>
                        {/* <a href="#" className='btn btn-primary'>Add New Task</a> */}
                        <Button variant="primary" className="my-3" onClick={() => setShowDefault(true)}>Add New Task</Button>
                        <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                            <Modal.Header>
                            <Modal.Title className="h6">Add New Task</Modal.Title>
                            <Button variant="close" aria-label="Close" onClick={handleClose} />
                            </Modal.Header>
                            <Modal.Body>
                                <Form className='p-3' onSubmit={(e)=>addtaskHandler(e)}>
                                <Form.Group className="mb-3">
                                <Form.Label>Task</Form.Label>
                                <Form.Control required  type="text" onChange={(e) => setTask(e.target.value)}/>
                                {/* <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback> */}
                                 </Form.Group>
                                 <Form.Group id="lastName" className="mb-3">
                                    <Form.Label>Due time</Form.Label>
                                    <Form.Control required type="datetime-local" placeholder="Enter Due time" defaultValue={dueDate}  onChange={(e) => {setDueDate(e.target.value)}}/>
                                </Form.Group>
                                    

                                    <Form.Group id="leadType" className="mb-3">
                                        <Form.Label>Assign to</Form.Label>
                                        <Form.Select value={assignTo || ''} onChange={(e) => setAssignTo(e.target.value)}>
                                        <option value=" ">Select</option>
                                        
                                        {users && users.map((user, i) => (
                                            
                                        (user.isAdmin === false && <option key={i} value={user._id}>{user.name}</option>)
                                            
                                        ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Note</Form.Label>
                                        <Form.Control as="textarea" rows="4" placeholder="Enter your message..." onChange={(e) => setNote(e.target.value)}/>
                                    </Form.Group>
                                    <button className="btn btn-primary" type='submit'>Add Task</button>
                            </Form>
                                </Modal.Body>
                                {/* <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    I Got It
                                </Button>
                                <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                                    Close
                                </Button>
                                </Modal.Footer> */}
                            </Modal>

                        </Col>
                    </Row>
                    <Row className="">
                        {(taskList && taskList.length>0)? taskList.map((task, i)=>(
                        <Col xs={12} sm={12} xl={12} className="mb-4 d-sm-block" key={i}>
                            <div className="hover-state rounded-0 rounded-top py-3 card border-bottom">
                                <div className="d-sm-flex align-items-center flex-wrap flex-lg-nowrap py-0 card-body">
                                    <div className="text-left text-sm-center mb-2 mb-sm-0 col-1">
                                        <div className="form-check check-lg inbox-check me-sm-2">
                                            <input type="checkbox" id="task-584be4d2-bec0-4fb1-80b1-690358ca4809" className="form-check-input"
                                                value="" />
                                        </div>
                                    </div>
                                    <div className="px-0 mb-4 mb-md-0 col-lg-9 col-9">
                                        <div className="mb-2">
                                            <h5 className="">{task.task}</h5>
                                            <div className="d-block d-sm-flex">
                                                <div>
                                                    <h6 className="fw-normal text-gray mb-3 mb-sm-0"><svg width={15} xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                                                        className="icon icon-xxs text-gray-500 me-2">
                                                        <path fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                                            clipRule="evenodd"></path>
                                                    </svg> {new Date(task.dueDate).toLocaleDateString() + ` (` + new Date(task.dueDate).toLocaleTimeString() + `)`}</h6>
                                                </div>
                                                <div className="ms-sm-3" onClick={(e) => taskStatusHandler(e, task)} style={{cursor: 'pointer'}}>
                                                    {task.status === 'Pending'? <span className="super-badge badge bg-warning">In Progress</span> : <span className="super-badge badge bg-success">Completed</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="fw-bold text-dark card-link">
                                                <span className="fw-normal text-gray ">{task.note && task.note}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right text-sm-center mb-2 mb-sm-0 col-1">
                                        <div className="form-check check-lg inbox-check ms-sm-2" >
                                        <i className="fas fa-edit" aria-hidden="true" style={{cursor: 'pointer'}} onClick={(e)=> editTaskHandler(e,task)}></i>
                                        </div>
                                    </div>

                                    <div className="text-right text-sm-center mb-2 mb-sm-0 col-1">
                                        <div className="form-check check-lg inbox-check ms-sm-2" >
                                        <i className="fa fa-trash red" aria-hidden="true" style={{cursor: 'pointer'}} onClick={(e)=> deleteTaskHandler(e, task)}></i>
                                        </div>
                                    </div>


                                    
                                    <div
                                        className="d-none d-lg-block d-xl-inline-flex align-items-center ms-lg-auto text-right justify-content-center px-md-0 col-xl-1 col-lg-1 col-sm-1 col-10">
                                        <div className="d-flex justify-content-end dropdown">
                                            <button id="react-aria8234133146-25" aria-expanded="false" type="button"
                                                className="text-dark dropdown-toggle-split m-0 p-0 dropdown-toggle btn btn-link">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                                                    className="icon icon-xs icon-dark">
                                                    <path
                                                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                                                    </path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <Modal as={Modal.Dialog} centered show={showEditDefault} onHide={handleEditClose}>
                                    <Modal.Header>
                                    <Modal.Title className="h6">Add New Task</Modal.Title>
                                    <Button variant="close" aria-label="Close" onClick={handleEditClose} />
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form className='p-3' onSubmit={(e)=>saveEditedTaskHandler(e, task)}>
                                        <Form.Group className="mb-3">
                                        <Form.Label>Task</Form.Label>
                                        <Form.Control required  type="text"  value={editedTask} onChange={(e)=> setEditedTask(e.target.value)}/>
                                        {/* <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback> */}
                                        </Form.Group>
                                        <Form.Group id="lastName" className="mb-3">
                                            <Form.Label>Due time</Form.Label>
                                            <Form.Control required type="datetime-local" placeholder="Enter Due time" value={editedDueDate.split('.')[0]}  onChange={(e) => {setEditedDueDate(e.target.value)}}/>
                                        </Form.Group>
                                            

                                            <Form.Group id="leadType" className="mb-3">
                                                <Form.Label>Assign to</Form.Label>
                                                <Form.Select value={editedAssignTo} onChange={(e) => setEditedAssignTo(e.target.value)}>
                                                <option value=" ">Select</option>
                                                
                                                {users && users.map((user, i) => (
                                                    
                                                (user.isAdmin === false && <option key={i} value={user._id}>{user.name}</option>)
                                                    
                                                ))}
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group id="leadType" className="mb-3">
                                                <Form.Label>Status</Form.Label>
                                                <Form.Select value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)}>
                                                <option value="Pending">In Progress</option>
                                                <option value="Completed">Completed</option>
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Note</Form.Label>
                                                <Form.Control as="textarea" rows="4" placeholder="Enter your message..." value={editedNote} onChange={(e) => setEditedNote(e.target.value)}/>
                                            </Form.Group>
                                            <button className="btn btn-primary" type='submit'>Save Task</button>
                                    </Form>
                                        </Modal.Body>
                                        {/* <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            I Got It
                                        </Button>
                                        <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                                            Close
                                        </Button>
                                        </Modal.Footer> */}
                                    </Modal>

                                   
                                </div>
                            </div>
                        </Col>
                        )): (
                            <div className='p-5 d-flex justify-content-center align-items-center'>
                                <h1>"No Task"</h1>
                            </div>
                        )}

                    </Row>
                </>
            ) : (
                <div className='p-5 d-flex justify-content-center align-items-center'>
                    <h1>"No Task"</h1>
                </div>
            )}
        </>
    )
}

export default TaskManager