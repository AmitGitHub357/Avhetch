import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Alert, Image } from '@themesberg/react-bootstrap'
import Preloader from "../components/Preloader";
// import TimeAgo from 'react-timeago'
// import StudentTable from "./StudentTable"
import { Col, Row, Button, Dropdown, ButtonGroup, Modal, Form } from '@themesberg/react-bootstrap';
// import { Form } from 'react-bootstrap';
// import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../components/Widgets";
// import { activityLogData } from '../actions/activityLogActions'
import { deleteBatch, fetchIndividualBatch, addBatch, updateBatch, fetchBatch } from '../actions/batchActions';
// import { fetchUserList } from '../actions//userActions'                      
// import { addTask, updateTask } from '../actions/taskManagerActions';
import { UPDATE_BATCH_RESET, DELETE_BATCH_RESET } from '../constants/batchConstants';
// delete lead -> null remaining
const Batch = ({ history, match }) => {
    const [batchName, setName] = useState("")
    const [courseName, setCourseName] = useState("")
    const [trainerName, setTrainerName] = useState("")
    const [link, setLink] = useState("")
    const [showDefault, setShowDefault] = useState(false);
    // const [materialPDF, setEditedMaterialPDF] = useState([])
    const [showEditDefault, setShowEditDefault] = useState(false);
    const [description, setDescription] = useState('')
    const [notes, setNotes] = useState('')

    const [previousBatch, setPreviousBatch] = useState('')
    // const [editedName, setEditedName] = useState("")
    // const [editedMaterialPDF, setEditedMaterialPDF] = useState([])
    const [editedName, setEditedName] = useState("")
    const [editedCourseName, setEditedCourseName] = useState("")
    const [editedTrainerName, setEditedTrainerName] = useState("")
    const [editedLink, setEditedLink] = useState("")
    const [editedDescription, setEditedDescription] = useState('')
    const [editedNotes, setEditedNotes] = useState('')

    const handleClose = () => setShowDefault(false);
    const handleEditClose = () => setShowEditDefault(false);
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const fetchSingleBatch = useSelector((state) => state.fetchIndividualBatch)
    // const { loading, error, StudentList } = fetchStudent
    const states = useSelector(state => state)
    console.log(states)
    const batchLists = useSelector(state => state.fetchBatch)
    const { loading, error, batchList } = batchLists
    const addBatchData = useSelector((state) => state.addBatch)
    const { loading: batchLoading, error: batchError, addedBatch } = addBatchData

    const updateBatchData = useSelector((state) => state.updateBatch)
    const { success } = updateBatchData

    const deleteBatchData = useSelector((state) => state.deleteBatch)
    const { success: deleteSuccess } = deleteBatchData
    useEffect(() => {
        if (userInfo && userInfo.userInfo && userInfo.userInfo.isAdmin) {
            dispatch(fetchIndividualBatch(userInfo && userInfo.userInfo && userInfo.userInfo._id))
            dispatch(fetchBatch())
        }
        //  else {
        //     history.push(`/login`)
        // }
    }, [])

    // useEffect(() => {
    //     setStudentList(studentLists && studentLists.BatchList && studentLists.BatchList)        
    // },[])

    useEffect(() => {
        if (success) {
            dispatch({
                type: UPDATE_BATCH_RESET
            })
            dispatch(fetchIndividualBatch(userInfo.userInfo && userInfo.userInfo._id))
        }
    }, [success])

    useEffect(() => {
        if (deleteSuccess) {
            dispatch({
                type: DELETE_BATCH_RESET
            })
            dispatch(fetchIndividualBatch(userInfo.userInfo && userInfo.userInfo._id))
        }
    }, [deleteSuccess])

    const addBatchHandler = (e) => {
        e.preventDefault()
        console.log(batchName, courseName, trainerName, link, description, notes)
        dispatch(addBatch({
            batchName, courseName, trainerName, link, description, notes
        }))

        setShowDefault(false)
        dispatch(fetchIndividualBatch(userInfo && userInfo.userInfo._id))
        setName('')
        setNotes('')
        setDescription('')
        setCourseName('')
        setLink('')
        setTrainerName('')
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
        dispatch(deleteBatch(id))
    }


    const editHandler = (e, batch) => {
        e.preventDefault()
        setPreviousBatch(batch)
        setShowEditDefault(true)
        // setEditede.target.value(e.target.value.e.target.value)
        setEditedName(batch.batchName)
        setEditedNotes(batch.notes) 
        setEditedLink(batch.link)
        // setEditedMaterialPDF(batch.materialPDF)
        setEditedDescription(batch.description)
        setEditedTrainerName(batch.trainerName)
        setEditedCourseName(batch.courseName)
    }

    const saveEditedHandler = (e) => {
        e.preventDefault()
        dispatch(updateBatch({
            _id: previousBatch._id,
            batchName: editedName,
            courseName: editedCourseName,
            trainerName: editedTrainerName,
            description: editedDescription,
            notes: editedNotes,
            link: editedLink,
            // materialPDF : editedMaterialPDF
        }))

        setShowEditDefault(false)
        setEditedName('')
        setEditedNotes('')
        setEditedDescription('')
        setEditedLink('')
        setEditedTrainerName('')
        setEditedCourseName('')
    }

    return (
        <>
            {loading ? (<Preloader />) : error ? (<Alert>{error}</Alert>) : true ? (
                <>
                    <Row className='pt-3 pb-3'>
                        <Col>
                            {/* <a href="#" className='btn btn-primary'>Add New Task</a> */}
                            <Button variant="primary" className="my-3" onClick={() => setShowDefault(true)}>Add New Batch</Button>
                            <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                                <Modal.Header>
                                    <Modal.Title className="h6">Add New Batch</Modal.Title>
                                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                                </Modal.Header>
                                <Modal.Body>
                                    <Form className='p-3' onSubmit={(e) => addBatchHandler(e)}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Batch Name</Form.Label>
                                            <Form.Control required placeholder='Enter Batch Name' type="text" onChange={(e) => setName(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Course Name</Form.Label>
                                            <Form.Control required type="text" placeholder="Enter Course Name" defaultValue={courseName} onChange={(e) => { setCourseName(e.target.value) }} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Trainer Name</Form.Label>
                                            <Form.Control required placeholder='Enter Trainer Name' type="text" onChange={(e) => setTrainerName(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows="4" placeholder="Enter Description..." onChange={(e) => setDescription(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Link</Form.Label>
                                            <Form.Control required placeholder='Enter Batch Name' type="text" onChange={(e) => setLink(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Notes</Form.Label>
                                            <Form.Control required placeholder='Enter Batch Notes' type="text" onChange={(e) => setNotes(e.target.value)} />
                                        </Form.Group>
                                        {/* <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Batch Password" onChange={(e) => setPassword(e.target.value)} />
                                        </Form.Group> */}
                                        <button className="btn btn-primary" type='submit'>Add Batch</button>
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
                    {
                        console.log(batchList)
                    }
                    <div>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Batch Name</th>
                                    <th>Course Name</th>
                                    <th>Trainer Name</th>
                                    <th>Link</th>
                                    <th>Description</th>
                                    <th>Notes</th>
                                    <th>Material PDF</th>
                                    <th colSpan={2}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {batchList && batchList.BatchList && batchList.BatchList.map((list) => {
                                    return (<>
                                        <tr>
                                            <td>{list && list.batchName}</td>
                                            <td>{list && list.courseName}</td>
                                            <td>{list && list.trainerName}</td>
                                            <td>{list && list.link}</td>
                                            <td>{list && list.description}</td>
                                            <td>{list && list.notes}</td>
                                            <td>{list && list.materialPDF ? list.materialPDF : " "}</td>
                                            <td><button onClick={(e) => deleteHandler(e, list._id)} className="btn btn-danger">Delete</button></td>
                                            <td><button className="btn btn-secondary" onClick={(e) => editHandler(e, list)}>Edit</button></td>
                                        </tr>
                                    </>)
                                })}
                            </tbody>
                        </table>
                    </div>
                    <Modal as={Modal.Dialog} centered show={showEditDefault} onHide={handleEditClose}>
                        <Modal.Header>
                            <Modal.Title className="h6">Update batch</Modal.Title>
                            <Button variant="close" aria-label="Close" onClick={handleEditClose} />
                        </Modal.Header>
                        <Modal.Body>
                        <Form className='p-3' onSubmit={(e) => saveEditedHandler(e)}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Batch Name</Form.Label>
                                            <Form.Control required value={editedName} placeholder='Enter Batch Name' type="text" onChange={(e) => setEditedName(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Course Name</Form.Label>
                                            <Form.Control value={ editedCourseName } required type="text" placeholder="Enter Course Name" onChange={(e) => { setEditedCourseName(e.target.value) }} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Trainer Name</Form.Label>
                                            <Form.Control required placeholder='Enter Trainer Name' value={ editedTrainerName } type="text" onChange={(e) => setEditedTrainerName(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows="4" value={ editedDescription } placeholder="Enter Description..." onChange={(e) => setEditedDescription(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Link</Form.Label>
                                            <Form.Control required value = { editedLink } type="text" onChange={(e) => setEditedLink(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Notes</Form.Label>
                                            <Form.Control required value = { editedNotes } placeholder='Enter Batch Notes' type="text" onChange={(e) => setEditedNotes(e.target.value)} />
                                        </Form.Group>
                                        <button className="btn btn-dark text-white" onClick={(e) => saveEditedHandler(e)} type='submit'>Update Batch</button>
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

export default Batch