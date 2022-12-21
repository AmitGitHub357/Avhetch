import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next'
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import filterFactory, { textFilter, selectFilter, dateFilter, Comparator} from 'react-bootstrap-table2-filter'; 
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';


import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';


import { addLeadData, fetchleadDetails} from '../actions/leadActions';
import { fetchCancelLeadList, deleteCancelledLead } from '../actions/cancellationLeadActions';
import Preloader from '../components/Preloader';
import ReactLogo from '../assets/img/technologies/loader.png'


const CancelledLeads = ({history}) => {

    // var element = document.getElementsByTagName("table");
    // element.classList.add("table-dark");
  
    const dispatch = useDispatch()
  
    // useEffect(() => {
    //   dispatch(fetchLeadList())
    // }, [])
  
    // const leadList = useSelector((state) => state.leadList)
    //   const { loading, error, leadInfo } = leadList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo: user } = userLogin

    useEffect(()=>{
      if (user && user.isAdmin) {
       
      } else {
        history.push('/login')
      }
    }, [user, history])
  
    const selectOptions = {
      0: 'Hot',
      1: 'Warm',
      2: 'Cold'
    };
  
    const selectOptions2 = {
      0: 'Yet to Visit',
      1: 'Visited',
      2: 'Visit Confirmed',
      3: 'Detail Shared',
      4: 'Lost',
      5: 'Booked'
    };
  
    const [leadData, setLeadData] = useState([])
    const [loading, setLoading] = useState(true)
  
           useEffect(() => {
             setTimeout(()=>{
              axios.get(`/api/cancelledleads`)
              .then(res => {
                  const lead = res.data;
                  setLeadData(lead)
                  setLoading(false)                     
              })
            }, 3000)
            
  
           }, [])
  
           useEffect(() => {
             console.log(leadData)
           }, [leadData])
  
          // const retriveHandler = (lead) => {
          //   const 
          //       userInfo
          //      = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjU0ODFhMjVkMjk3MWE5NDU3OWUxNyIsImlhdCI6MTYzNDUyOTE3MSwiZXhwIjoxNjM0NjE1NTcxfQ.zWvQzJ1yMehQxu0JB3V_5RMlpLKhtHPmExGsGl-hN-Y"
               
        
          
          //     const config = {
          //       headers: {
          //         'Content-Type': 'application/json',
          //         Authorization: `Bearer ${userInfo}`,
          //       },
          //     }

          //   axios.post(`/api/leads`,leadData,
          //   config)
          //   axios.delete(`/api/cancelledleads/${lead._id}`, config) 
          //   .then(res => {
          //       history.go(0)            
          //   })             
          // }

          const retriveHandler = (row) => {
            dispatch(addLeadData(row))
            dispatch(deleteCancelledLead(row._id))
            history.go(0)
          }

          const editTableHandler = (lead) => {
            history.push(`/cancelledleads/${lead._id}/edit`)
          }
         
  
          const { ExportCSVButton } = CSVExport;
  
      const columns = [
        {
          dataField: "leadData",
          text: "Serial No.",
          formatter :(row,index, leadData) => {
            console.log(row, index)
            return leadData+1
          },
          
        },
        {
          dataField: "customerName",
          text: "Customer",
          sort: true,
          filter: textFilter()
        },
        {
          dataField: "enquiryDate",
          text: "Enquiry Date",
          sort: true,
          formatter: (enquiryDate) => {
            return new Date(`${enquiryDate}`).toISOString().split('T')[0]
          },
          filter: dateFilter({
            defaultValue: {comparator: Comparator.GT }
          })
        },
        {
          dataField: "contactNumber",
          text: "Contact Number"
        },
        {
          dataField: "consultantName",
          text: "Consultant",
          sort: true,
          filter: textFilter()
        },
        {
          dataField: "project.mainProject",
          text: "Main Project",
          filter: textFilter()
        },
        {
          dataField: "project.subProject",
          text: "Sub Project",
          filter: textFilter()
        },
       
        {
          dataField: "leadScore",
          text: "lead Score",
          filter: textFilter()
        },
        {
          dataField: "leadType",
          text: "lead Type",
          filter: textFilter()
        },
        {
          dataField: "status",
          text: "Status",
          filter: textFilter()
        },
        {
          dataField: "remarks",
          text: "Remarks",
          filter: textFilter(),
        },
        {
          dataField: "nextFollowUp",
          text: "Next Follow Up Date",
          sort: true,
          formatter: (nextFollowUp) => {
            return new Date(`${nextFollowUp}`).toISOString().split('T')[0]
          },
          filter: dateFilter({
            defaultValue: {comparator: Comparator.GT }
          })
        },
        {
          dataField: "managerRemarks",
          text: "Manager Remarks",
          filter: textFilter()
        },
        {
          dataField: "",
          text: "",
          formatter: (cell,row) => {
            return (
              // <button className="btn btn-primary" onClick={ ()=>retriveHandler(row) }>Retrive</button>
              <button className="btn btn-primary" onClick={ ()=>editTableHandler(row) }>Edit</button>
            );
          },
  
        },
  
      ];
  
  
  
  
  
    return (
      <>
      {loading? (
        <div className={`preloader bg-softr flex-column justify-content-center align-items-center `}>
        <Image className="loader-element animate__animated animate__jackInTheBox" src={ReactLogo} height={70} />
        </div>
      ) : (
      <div>
        <ToolkitProvider
          keyField="_id"
          data={ leadData }
          columns={ columns }
          exportCSV
        >
          {
            props => (
              <div>
                <ExportCSVButton { ...props.csvProps }>Export CSV</ExportCSVButton>
                <hr />
                {/* <BootstrapTable { ...props.baseProps } /> */}
                <BootstrapTable
                     { ...props.baseProps }
                    bootstrap4
                    keyField="_id"
                    data={leadData}
                    columns={columns}
                    // cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true })}
                    filter={ filterFactory() }
                    pagination={paginationFactory({ sizePerPage: 10 })}
                    striped
                    table-dark
                  />
                    
              </div>
            )
          }
        </ToolkitProvider>
      </div>
      )}
      </>
    )
  }
  
  export default CancelledLeads






// const TotalLeads = () => {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [leadData, setLeadData] = useState({})
//     const [leadType, setLeadType] = useState('')
//     const [status, setStatus] = useState('')

//     const dispatch = useDispatch();

//     // const userLogin = useSelector((state) => state.userLogin)
//     // const {userInfo: user } = userLogin

//     const cancelLeadList = useSelector((state) => state.cancelLeadList)
//     const { loading, error, cancelLeadInfo } = cancelLeadList

//     const leadDetails = useSelector((state) => state.leadDetails)
//     const { loading: loadingLead, error: errorLead, leadInfo: leadInfoLead } = leadDetails



//     useEffect(() => {
//         dispatch(fetchCancelLeadList())
//     }, [])




//     const updateHandler = (e, lead) => {
//         console.log(e.target.value)
//         e.preventDefault()
//         if(e.target.value){
//         dispatch(addLeadData(lead))
//         dispatch(deleteCancelledLead(lead._id))
//         setTimeout(() => {
//             dispatch(fetchCancelLeadList())
//             }, 1000)
//         console.log(lead)
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
//                         <th className="border-bottom">Enquiry date</th>
//                         <th className="border-bottom">Customer</th>
//                         <th className="border-bottom">Contact</th>
//                         <th className="border-bottom">Project</th> 
//                         <th className="border-bottom">Lead Score</th>
//                         <th className="border-bottom">Lead Type</th>
//                         <th className="border-bottom">Status</th>
//                         <th className="border-bottom">Remarks</th>
//                         <th className="border-bottom">Next Follow Up</th>            
//                         <th className="border-bottom">Manager Remarks</th>                       
//                         <th className="border-bottom">Cancellation</th> 
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {cancelLeadInfo && cancelLeadInfo.map((lead, i) => 
//                     <tr key={i}>
//                     <td>
//                         <span className="fw-normal">
//                         {i+1}
//                         </span>
//                     </td>
//                     <td>
//                         <span className="fw-normal">
//                         {new Date(`${lead.enquiryDate}`).toISOString().split('T')[0]}
//                         </span>
//                     </td>
//                     <td>
//                         <span className="fw-normal">
//                         {lead.customer}
//                         </span>
//                     </td>
//                     <td>
//                         <span className="fw-normal">
//                         {lead.contactNumber}
//                         </span>
//                     </td>
//                     <td>
//                         <span className="fw-normal">
//                         {lead.project.subProject}
//                         </span>
//                     </td>
//                     <td>
//                         <span className="fw-normal">
//                         {lead.leadScore}
//                         </span>
//                     </td>
//                     <td>
//                         <span className="fw-normal">
//                         {lead.leadType}
//                         </span>
//                     </td>
//                     <td>
//                         <span className="fw-normal">
//                             {lead.status}
//                         </span>
//                     </td>
//                     <td>
//                         <span className="fw-normal">
//                         {lead.remarks}
//                         </span>
//                     </td>
//                     <td>
//                         <span className="fw-normal">
//                         {new Date(`${lead.nextFollow}`).toISOString().split('T')[0]}
//                         </span>
//                     </td>
//                     <td>
//                         <span className="fw-normal">
//                         {lead.managerRemarks}
//                         </span>
//                     </td>
//                     {/* <td>
//                         <span className="fw-normal">
//                         {lead.payment.firstInstallment? lead.payment.firstInstallment : 0}
//                         </span>
//                     </td>
//                     <td>
//                         <span className="fw-normal">
//                         {lead.payment.secondInstallment? lead.payment.firstInstallment : 0}
//                         </span>
//                     </td>
//                     <td>
//                         <span className="fw-normal">
//                         {lead.payment.thirdInstallment? lead.payment.firstInstallment : 0}
//                         </span>
//                     </td>
//                     <td>
//                         <span className="fw-normal">
//                         {lead.totalSqft ? lead.payment.firstInstallment : 0}
//                         </span>
//                     </td>
//                     <td>
//                         <span className="fw-normal">
//                         {(lead.payment.firstInstallment) + (lead.payment.secondInstallment) + (lead.payment.thirdInstallment) }
//                         </span>
//                     </td> */}
//                     <td>
//                         <span className="fw-normal">
//                             <select defaultValue={!lead.cancellation} onChange={(e) => updateHandler(e, lead)}>
//                                 <option value={false}>Cancelled</option>
//                                 <option value={true}>Not Cancel</option>
//                             </select>
//                         </span>
//                     </td>
//                     {/* <td>
//                         <Dropdown as={ButtonGroup}>
//                         <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
//                             <span className="icon icon-sm">
//                             <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
//                             </span>
//                         </Dropdown.Toggle>
//                         <Dropdown.Menu>
//                             <Dropdown.Item>
//                             <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
//                             </Dropdown.Item>
//                             <Dropdown.Item><Link to={`/leads/${lead._id}/edit`}>
//                                 <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit</Link>
//                             </Dropdown.Item>
//                             <Dropdown.Item className="text-danger">
//                             <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
//                             </Dropdown.Item>
//                         </Dropdown.Menu>
//                         </Dropdown>
//                     </td> */}
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

// export default TotalLeads
