import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import BootstrapTable, {TableHeaderColumn} from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import filterFactory, { textFilter, selectFilter, dateFilter, Comparator} from 'react-bootstrap-table2-filter'; 
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

import { fetchLeadList, updateLeadData, fetchleadDetails, deleteLead} from '../actions/leadActions';
import { addCancelLeadData } from '../actions/cancellationLeadActions'

// import ReactLogo from '../assets/img/technologies/react-logo-transparent.svg'

import ReactLogo from '../assets/img/technologies/loader.png'
import { Image } from '@themesberg/react-bootstrap';

import './style.css'



const NextFollowUp = ({history}) => {
  var gapi = window.gapi

  var CLIENT_ID = "1013896874235-1htic5jfq2uhg6s8kjt7130t98a0kd86.apps.googleusercontent.com"
    var API_KEY = "AIzaSyBoJQl0S2P5iI5LxS4FQThPKm8b5rVagwc"
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"

  const [remainder, setRemainder] = useState(false) 

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
      if (user && user.role === "TeamLead") {
       
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
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }

            axios.get(`/api/leads/teamlead`, config)
            .then(res => {
                const today = new Date()
                const lead = res.data.leadsList.filter(lead => {if(lead.nextFollowUp){return lead.nextFollowUp.split('T')[0]  ===  today.toISOString().split('T')[0]}});
                setLeadData(lead)   
                setLoading(false)                   
            })
         }, [])


        const editTableHandler = (lead) => {
          history.push(`/leads/${lead._id}/edit`)
        }

      

        
       

        const { ExportCSVButton } = CSVExport;

    const columns = [
      {
        dataField: "leadData",
        text: "Serial No.",
        formatter :(row,index, leadData) => {
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
        dataField: "project.subProject",
        text: "Project",
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
        
      },
      {
        dataField: "remarks",
        text: "Remarks",
      },
      {
        dataField: "nextFollowUp",
        text: "Next Follow Up Date",
        sort: true,
        formatter: (enquiryDate) => {
          if(enquiryDate){
          return new Date(`${enquiryDate}`).toISOString().split('T')[0]
          }
        },
        filter: dateFilter({
          defaultValue: {comparator: Comparator.GT }
        })
      },
      {
        dataField: "managerRemarks",
        text: "Manager Remarks",
      },
      // {
      //   dataField: "",
      //   text: "",
      //   formatter: (cell,row) => {
      //     return (
      //       <button className="btn btn-primary" onClick={ ()=>remainderHandler(row) }>Remainder</button>
      //     );
      //   },

      // },
      {
        dataField: "",
        text: "",
        formatter: (cell,row) => {
          return (
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
    ): (
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

export default NextFollowUp





