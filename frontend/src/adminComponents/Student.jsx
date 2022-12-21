import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Alert, Image } from '@themesberg/react-bootstrap'
import Preloader from "../components/Preloader";
// import TimeAgo from 'react-timeago'
import StudentTable from "./StudentTable"
import { Col, Row, Button, Dropdown, ButtonGroup, Modal, Form } from '@themesberg/react-bootstrap';
// import { Form } from 'react-bootstrap';
// import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../components/Widgets";
// import { activityLogData } from '../actions/activityLogActions'
import { deleteStudent, fetchIndividualStudent, addStudent, updateStudent, fetchStudent } from '../actions/studentActions';
// import { fetchUserList } from '../actions//userActions'
// import { addTask, updateTask } from '../actions/taskManagerActions';
import { UPDATE_STUDENT_RESET, DELETE_STUDENT_RESET } from '../constants/studentConstants';

// delete lead -> null remaining

const Student = ({ history, match }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [studentList, setStudentList] = []
    const [showDefault, setShowDefault] = useState(false);
    const [showEditDefault, setShowEditDefault] = useState(false);
    const [task, setTask] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [assignTo, setAssignTo] = useState('')
    const [note, setNote] = useState('')
    const [status, setStatus] = useState('')
    const [editedStudent, setEditedStudent] = useState('')
    const [previousStudent, setPreviousStudent] = useState('')
    const [editedName, setEditedName] = useState('')
    const [editedEmail, setEditedEmail] = useState('')
    // const [editedNote, setEditedNote] = useState('')
    // const [editedStatus, setEditedStatus] = useState('')

    const handleClose = () => setShowDefault(false);
    const handleEditClose = () => setShowEditDefault(false);
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    // const fetchSingleStudent = useSelector((state) => state.fetchIndividualStudents)
    // const { loading, error, StudentList } = fetchStudent
    const states = useSelector(state => state)
    console.log(states)
    const studentLists = useSelector(state => state.fetchStudents)
    const { loading, error, StudentList } = studentLists
    const addStudentData = useSelector((state) => state.addStudent)
    const { loading: studentLoading, error: studentError, addedStudent } = addStudentData

    const updateStudentData = useSelector((state) => state.updateStudent)
    const { success } = updateStudentData

    const deleteStudentData = useSelector((state) => state.deleteStudent)
    const { success: deleteSuccess } = deleteStudentData

    useEffect(() => {
        console.log(userInfo)
        if (userInfo && userInfo.userInfo && userInfo.userInfo.isAdmin) {
            // dispatch(fetchIndividualStudent(userInfo.userInfo && userInfo.userInfo._id))
            dispatch(fetchStudent())
        } else {
            history.push(`/login`)
        }
    }, [])
    // console.log(userInfo)
    // useEffect(() => {
    //     setStudentList(studentLists && studentLists.newUserList && studentLists.newUserList)        
    // },[])

    useEffect(() => {
        if (success) {
            dispatch({
                type: UPDATE_STUDENT_RESET
            })
            dispatch(fetchIndividualStudent(userInfo.userInfo && userInfo.userInfo._id))
        }
    }, [success])

    useEffect(() => {
        if (deleteSuccess) {
            dispatch({
                type: DELETE_STUDENT_RESET
            })
            dispatch(fetchIndividualStudent(userInfo.userInfo && userInfo.userInfo._id))
        }
    }, [deleteSuccess])

    const addStudentHandler = (e) => {
        e.preventDefault()
        console.log(name, email, password)
        dispatch(addStudent({
            name,
            email,
            password
        }))

        setShowDefault(false)
        // dispatch(fetchIndividualStudent(userInfo && userInfo.userInfo._id))
        // setAssignTo('')
        // setDueDate('')
        setName('')
        // setStatus('')
        setEmail('')
    }

    // const StudentStatusHandler = (e, Student) => {

    //     if (task.status === 'Pending') {
    //         task.status = 'Completed'
    //     } else {
    //         task.status = 'Pending'
    //     }

    //     dispatch(updateTask(task))
    // }

    const deleteHandler = (e, id) => {
        e.preventDefault()
        dispatch(deleteStudent(id))
    }


    const editHandler = (e, student) => {
        e.preventDefault()
        setPreviousStudent(student)
        setShowEditDefault(true)
        // setEditede.target.value(e.target.value.e.target.value)
        setEditedName(student.name)
        setEditedEmail(student.email)
        // setEditedAssignTo(Student.assignTo)
    }

    const saveEditedHandler = (e, Student) => {
        e.preventDefault()
        dispatch(updateStudent({
            _id: previousStudent._id,
            name: editedName,
            email: editedEmail,
            // status: editedStatus,
            // member: userInfo._id,
            // assignTo: editedAssignTo,
            // dueDate: editedDueDate
        }))

        setShowEditDefault(false)
        setEditedName('')
        setEditedEmail('')
        // setEditedDueDate('')
        // setEditedNote('')
        // setEditedStatus('')
        // setEditedTask('')
    }

    return (
        <>
            {loading ? (<Preloader />) : error ? (<Alert>{error}</Alert>) : true ? (
                <>
                    <Row className='pt-3 pb-3'>
                        <Col>
                            {/* <a href="#" className='btn btn-primary'>Add New Task</a> */}
                            <Button variant="primary" className="my-3" onClick={() => setShowDefault(true)}>Add New Student</Button>
                            <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                                <Modal.Header>
                                    <Modal.Title className="h6">Add New Student</Modal.Title>
                                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                                </Modal.Header>
                                <Modal.Body>
                                    <Form className='p-3' onSubmit={(e) => addStudentHandler(e)}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control required placeholder='Enter Student Name' type="text" onChange={(e) => setName(e.target.value)} />

                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control required type="email" placeholder="Enter Student Email" defaultValue={email} onChange={(e) => { setEmail(e.target.value) }} />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Student Password" onChange={(e) => setPassword(e.target.value)} />
                                        </Form.Group>
                                        <button className="btn btn-primary" onClick={e => addStudentHandler(e)} type='submit'>Add Student</button>
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
                    
                    <div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th colSpan={2}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {StudentList && StudentList.NewUserList && StudentList.NewUserList.map((list) => {
                                    return (<>
                                        <tr>
                                            <td>{list && list.name}</td>
                                            <td>{list && list.email}</td>
                                            <td><button onClick={(e) => deleteHandler(e, list._id)} className="btn btn-danger">Delete</button></td>
                                            <td><button className="btn btn-secondary" onClick={(e) => editHandler(e, list)}>Edit</button></td>
                                        </tr>
                                    </>)
                                })}
                            </tbody>
                        </table>
                        {/* <StudentTable  studentList={ StudentList && StudentList }/> */}
                    </div>
                    <Modal as={Modal.Dialog} centered show={showEditDefault} onHide={handleEditClose}>
                        <Modal.Header>
                            <Modal.Title className="h6">Update Student</Modal.Title>
                            <Button variant="close" aria-label="Close" onClick={handleEditClose} />
                        </Modal.Header>
                        <Modal.Body>
                            <Form className='p-3' onSubmit={(e) => saveEditedHandler(e)}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                                    {/* <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback> */}
                                </Form.Group>
                                <Form.Group id="email" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required type="email" placeholder="Enter Email" value={editedEmail} onChange={(e) => { setEditedEmail(e.target.value) }} />
                                </Form.Group>     
                                <button onClick={ e => saveEditedHandler(e)} className="btn btn-primary" type='submit'>Update Student</button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            ) : (
                <div className='p-5 d-flex justify-content-center align-items-center'>
                    <h1>"No Records"</h1>
                </div>
            )}
        </>
    )
}

export default Student