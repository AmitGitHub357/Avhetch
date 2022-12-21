import React,{useState, useEffect} from 'react'
import axios from 'axios'
import CSVReader from 'react-csv-reader'
import { useDispatch, useSelector } from 'react-redux'
import BootstrapTable, {TableHeaderColumn} from 'react-bootstrap-table-next'
import { Button, Image, Alert } from '@themesberg/react-bootstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import filterFactory, { textFilter, selectFilter, dateFilter, Comparator} from 'react-bootstrap-table2-filter'; 
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import template from "../assets/files/Bulk_upload_sheet.csv"

import { fetchLeadList, updateLeadData, fetchleadDetails, deleteLead} from '../actions/leadActions';
import { addCancelLeadData } from '../actions/cancellationLeadActions'

import ReactLogo from '../assets/img/technologies/loader.png'
import Preloader from '../components/Preloader';

import { addBulkLeadData, assignBulkLead, getBulkLeadList, editBulkLeadData } from '../actions/bulkLeadActions';


const UploadLeads = ({history}) => {
    const [leadData, setLeadData] = useState([])
    const [leadList, setLeadList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const getBulkLead = useSelector((state) => state.getBulkLead)
    const {leadList: leads } = getBulkLead

    // const getBulkLead = useSelector((state) => state.getBulkLead)
    // const {leadList: leads } = getBulkLead


    useEffect(()=>{
      if (userInfo && userInfo.role === "Manager") {
        dispatch(getBulkLeadList())
      } else {
        history.push('/login')
      }
    }, [userInfo, history])



    useEffect(() => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      setTimeout(()=>{
       axios.get(`/api/bulkLead`, config)
       .then(res => {
           const lead = res.data;
           setLeadData(lead.bulkLeadList)
           setLoading(false)                     
       }).catch(function (error) {
         // handle error
         setLoading(false)
         setError(error)
       })
     }, 3000)
     

    }, [])

    useEffect(()=>{
     
      if(leadList && leadList.length>0){
        var b = []
        for(var i=1; i< leadList.length-1; i++){
          const a = {
              "serial": i,
              "customerName" : leadList[i][0],
              "enquiryDate" : leadList[i][1]? `${leadList[i][1]}T00:00:00.000Z` : '',
              "contactNumber": leadList[i][2],
              "project": {
                  "mainProject": leadList[i][3],
                  "subProject": leadList[i][4]
              },
              "leadScore": leadList[i][5],
              "leadType": leadList[i][6],
              "status": leadList[i][7],
              "remarks": leadList[i][8],
              "nextFollow": leadList[i][9]?`${leadList[i][9]}T00:00:00.000Z`:'',
              "managerRemarks": leadList[i][10],
              "payment":{
                  "firstInstallment" : 0,
                  "secondInstallment" : 0,
                  "thirdInstallment" : 0
              },
              "cancellation":false,
              "totalSqft" : 0,
              "createdUser": userInfo._id,
              "assignedUser":""
          }
  
          b.push(a)
          
          }
          if(leadData.length > 0){
          setLeadData([...leadData, ...b])
          }else{
            setLeadData(b)
          }
  
        dispatch(addBulkLeadData(b))
      }
    },[leadList])


    const assignHandler = (e) => {
      dispatch(assignBulkLead(leads))

    }

    const editTableHandler = (lead) => {
        dispatch(editBulkLeadData(lead))
    }


    const columns = [
        {
          dataField: "serial",
          text: "Serial No.",
          formatter :(row,index, leadData) => {
            return leadData+1
          },
          
        },
        {
          dataField: "customerName",
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
            return enquiryDate && new Date(`${enquiryDate}`).toISOString().split('T')[0]
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
          formatter: (nextFollow) => {
              if(nextFollow){
            return nextFollow && new Date(`${nextFollow}`).toISOString().split('T')[0]
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
    {error}
  </Alert>):(
        <div>
          <div className="d-flex justify-content-between my-3 px-md-3 px-sm-1">
            <div>
          <a href={template} className='btn btn-primary' download>Template</a>
          <Button className='btn btn-primary ms-3' onClick={(e)=>assignHandler(e)} disabled={leadData && leadData.length>0? false : true}> Assign Leads</Button>
          </div>
            <CSVReader onFileLoaded={(data, fileInfo, originalFile) => setLeadList(data)} />           
            {/* <img src={Profile1} alt="" /> */}
            </div>
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
        )
        }
        </>
    )
}

export default UploadLeads
