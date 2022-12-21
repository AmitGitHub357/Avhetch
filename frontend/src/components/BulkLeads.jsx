import React,{useState, useEffect} from 'react'
import axios from 'axios'
import CSVReader from 'react-csv-reader'
import { useDispatch, useSelector } from 'react-redux'
import BootstrapTable, {TableHeaderColumn} from 'react-bootstrap-table-next'
import { Image } from '@themesberg/react-bootstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import filterFactory, { textFilter, selectFilter, dateFilter, Comparator} from 'react-bootstrap-table2-filter'; 
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

import {updateLeadData} from '../actions/leadActions';
import Preloader from '../components/Preloader';
import ReactLogo from '../assets/img/technologies/loader.png'




const buttonRef = React.createRef();

const BulkLeads = () => {
    const [leadData, setLeadData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const dispatch = useDispatch()
  
          //  useEffect(() => {
          //    setTimeout(()=>{
          //     axios.get(`/api/leads`)
          //     .then(res => {
          //         const lead = res.data.filter(lead => lead.assignedUser === "" );;
          //         setLeadData(lead)
          //         setLoading(false)                     
          //     }).catch(function (error) {
          //       // handle error
          //       setError(true)
          //     })
          //   }, 2000)
            
  
          //  }, [])


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const addLeadHandler = (lead) => {
        lead.assignedUser = userInfo._id
        dispatch(updateLeadData(lead))
    }

    

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
          dataField: "customer",
          text: "Customer",
          sort: true,
        //   filter: textFilter()
        },
        {
          dataField: "enquiryDate",
          text: "Enquiry Date",
          sort: true,
          formatter: (enquiryDate) => {
              if(enquiryDate){
            return new Date(`${enquiryDate}`).toISOString().split('T')[0]
              }
          },
        //   filter: dateFilter({
        //     defaultValue: {comparator: Comparator.GT }
        //   })
        },
        {
          dataField: "contactNumber",
          text: "Contact Number"
        },
        {
          dataField: "project.subProject",
          text: "Project",
        //   filter: textFilter()
        },
       
        {
          dataField: "leadScore",
          text: "lead Score",
        //   filter: textFilter()
        },
        {
          dataField: "leadType",
          text: "lead Type",
        //   filter: textFilter()
        },
        {
          dataField: "status",
          text: "Status",
        //   filter: textFilter()
        },
        {
          dataField: "remarks",
          text: "Remarks",
        //   filter: textFilter(),
        },
        {
          dataField: "nextFollow",
          text: "Next Follow Up Date",
          sort: true,
          formatter: (enquiryDate) => {
              if(enquiryDate){
            return new Date(`${enquiryDate}`).toISOString().split('T')[0]
              }
          },
        //   filter: dateFilter({
        //     defaultValue: {comparator: Comparator.GT }
        //   })
        },
        {
          dataField: "managerRemarks",
          text: "Manager Remarks",
        //   filter: textFilter()
        },
        {
          dataField: "",
          text: "",
          csvExport: false,
          formatter: (cell,row) => {
            return (
              <button className="btn btn-primary" onClick={ ()=>addLeadHandler(row) }>Add</button>
            );
          },
  
        },
  
      ];

    
    return (
        <>
        {leadData && 
        <div>
            <div>  
                <BootstrapTable
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
        </div>
        }
        </>
    )
}

export default BulkLeads
