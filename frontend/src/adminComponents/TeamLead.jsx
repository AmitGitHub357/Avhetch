import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from '@themesberg/react-bootstrap';
import { teamLeadList } from '../actions/userActions'
import { deleteUser } from '../actions/userActions';

import ReactLogo from '../assets/img/technologies/loader.png'

import ReactTable from './ReactTable';


const TeamLead = ({history}) => {
  
    const dispatch = useDispatch()

    const fetchTeamLeads = useSelector((state) => state.fetchTeamLeads)
    const { loading, error, teamlead: users } = fetchTeamLeads

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo: user } = userLogin

    useEffect(()=>{
      if (user && user.isAdmin) {
        dispatch(teamLeadList())
      } else {
        history.push('/login')
      }
    }, [user, history])

    // useEffect(() => {
    //     dispatch(teamLeads())
    // }, [])

   

    // useEffect(() => {
    //     setUserList(users)
    // }, [users])

//     const [usersData, setUsersData] = useState([])
//   const [loading, setLoading] = useState(true)

//          useEffect(() => {
//            setTimeout(()=>{
//             axios.get(`/api/users/consultant`)
//             .then(res => {
//                 console.log("sgh")
//                 const users = res.data;
//                 setUsersData(users)
//                 setLoading(false)                     
//             })
//           }, 3000)
          

//          }, [])


    const deleteHandler = (id) =>{
        if (window.confirm('Are you sure')) {
        dispatch(deleteUser(id))
        }
        history.push('/')
    }
  

  
  
  
  if(users === undefined){
  return (
    <div className={`preloader bg-softr flex-column justify-content-center align-items-center `}>
        <Image className="loader-element animate__animated animate__jackInTheBox" src={ReactLogo} height={70} />
        </div>
    
  )
  } else{
    return (
      
      <>
    
      <div>
        
                    <ReactTable users={users}/>
      </div>
      </>
    )
  }
}
  

  export default TeamLead




































// import React, {useState, useEffect} from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
// import { Link } from 'react-router-dom';

// import { Routes } from "../routes";
// import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
// import transactions from "../data/transactions";
// import commands from "../data/commands";

// import { teamLeads } from '../actions/userActions'
// import { deleteUser } from '../actions/userActions';
// import Preloader from '../components/Preloader';



// const RemoveTeamLead = () => {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')

//     const dispatch = useDispatch();

//     // const userLogin = useSelector((state) => state.userLogin)
//     // const {userInfo: user } = userLogin

//     const fetchTeamLeads = useSelector((state) => state.fetchTeamLeads)
//     const { loading, error, teamleads: users } = fetchTeamLeads

//     const deleteUserProfile = useSelector((state) => state.deleteUserProfile)
//     const { loading: deleteLoading, error:deleteError, success } = deleteUserProfile


//     useEffect(() => {
//         dispatch(teamLeads())
//     }, [dispatch, success])

//     const deleteHandler = (id) =>{
//         if (window.confirm('Are you sure')) {
//       dispatch(deleteUser(id))
//         }
//     }
    
//     return (
//         <div>
//             { loading ? <Preloader /> : (
//                 <Card border="light" className="table-wrapper table-responsive shadow-sm">
//                 <Card.Body className="pt-0">
//                 <Table hover className="user-table align-items-center">
//                     <thead>
//                     <tr>
//                         <th className="border-bottom">Serial No.</th>
//                         <th className="border-bottom">Employee Code</th>
//                         <th className="border-bottom">Name</th>
//                         <th className="border-bottom">Email Id</th>
//                         <th className="border-bottom">Mobile no.</th>            
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {users && users.map((user, i) => 
//                     <tr key={i}>
//                     <td>
//                         <span className="fw-normal">
//                         {i + 1}
//                         </span>
//                     </td>
//                     <td>
//                         <span className="fw-normal">
//                         {user.empCode}
//                         </span>
//                     </td>
//                     <td>
//                         <span className="fw-normal">
//                         {user.name}
//                         </span>
//                     </td>
//                     <td>
//                         <span className="fw-normal">
//                         {user.email}
//                         </span>
//                     </td>
//                     <td>
//                         <span className="fw-normal">
//                         {user.mobile}
//                         </span>
//                     </td>
//                     <td>
//                         <Dropdown as={ButtonGroup}>
//                         <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
//                             <span className="icon icon-sm">
//                             <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
//                             </span>
//                         </Dropdown.Toggle>
//                         <Dropdown.Menu>
//                             {/* <Dropdown.Item>
//                             <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
//                             </Dropdown.Item>
//                             <Dropdown.Item>
//                             <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
//                             </Dropdown.Item> */}
//                             <Dropdown.Item className="text-danger" onClick= {()=> deleteHandler(user._id)}>
//                             <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
//                             </Dropdown.Item>
//                         </Dropdown.Menu>
//                         </Dropdown>
//                     </td>
//                     </tr>
//                     )}
//                     </tbody>
//                 </Table>
//                 <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
//                     <Nav>
//                     <Pagination className="mb-2 mb-lg-0">
//                         <Pagination.Prev>
//                         Previous
//                         </Pagination.Prev>
//                         <Pagination.Item active>1</Pagination.Item>
//                         <Pagination.Item>2</Pagination.Item>
//                         <Pagination.Item>3</Pagination.Item>
//                         <Pagination.Item>4</Pagination.Item>
//                         <Pagination.Item>5</Pagination.Item>
//                         <Pagination.Next>
//                         Next
//                         </Pagination.Next>
//                     </Pagination>
//                     </Nav>
//                     {/* <small className="fw-bold">
//                     Showing <b>{totalTransactions}</b> out of <b>25</b> entries
//                     </small> */}
//                 </Card.Footer>
//                 </Card.Body>
//             </Card>
//             )}
//         </div>
//     )
// }

// export default RemoveTeamLead
