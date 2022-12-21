import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import BootstrapTable, {TableHeaderColumn} from 'react-bootstrap-table-next'
import { Image, Alert} from '@themesberg/react-bootstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import filterFactory, { textFilter, selectFilter, dateFilter, Comparator} from 'react-bootstrap-table2-filter'; 
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

import { fetchLeadList, updateLeadData, fetchleadDetails, deleteLead} from '../actions/leadActions';
import { addCancelLeadData } from '../actions/cancellationLeadActions'
import Preloader from '../components/Preloader';
import ReactLogo from '../assets/img/technologies/loader.png'

import './style.css'



const Leads = ({history}) => {


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
  const [error, setError] = useState(false)

         useEffect(() => {
           setTimeout(()=>{
            axios.get(`/api/leads`)
            .then(res => {
                const lead = res.data;
                setLeadData(lead)
                setLoading(false)                     
            }).catch(function (error) {
              // handle error
              setError(true)
            })
          }, 3000)
          

         }, [])


        const editTableHandler = (lead) => {
          history.push(`/leads/${lead._id}/edit`)
        }
       

        const { ExportCSVButton } = CSVExport;

    const columns = [
      {
        dataField: "leadData",
        text: "Serial No.",
        csvExport: false,
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
        formatter: (enquiryDate) => {
          return new Date(`${enquiryDate}`).toISOString().split('T')[0]
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
        csvExport: false,
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
    ): error?  (<Alert variant="primary">
    A simple primary alert — check it out!
  </Alert>)
  :  (
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

export default Leads





