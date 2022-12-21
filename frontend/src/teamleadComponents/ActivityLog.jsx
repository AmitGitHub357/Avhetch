import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Card, Alert, Image } from '@themesberg/react-bootstrap'
import Preloader from "../components/Preloader";
import TimeAgo from 'react-timeago'


import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../components/Widgets";
import {activityLogData} from '../actions/activityLogActions'
import { fetchUserDetail } from '../actions/userActions';
import { fetchConsultantLeadList } from '../actions/leadActions';

// delete lead -> null remaining

const ActivityLog = ({history, match}) => {
  const id = match.params.id
  const d = new Date()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [bookingMonthlyStatus, setBookingMonthlyStatus] = useState(0)
  const [siteVisitsMonthlyStatus, setSiteVisitsMonthlyStatus] = useState(0)
  const [leadMonthlyStatus, setLeadMonthlyStatus] = useState(0)

  const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const activityLogDetail = useSelector((state) => state.activityLogDetail)
    const { loading , error, activityLog } = activityLogDetail

    const userDetail = useSelector((state) => state.userDetail)
    const { userData } = userDetail


    const consultantLeadList = useSelector((state) => state.consultantLeadList)
    const {leadList: consultantLeads } = consultantLeadList

  useEffect(()=>{
    if(userInfo && userInfo.role === 'Consultant'){
    dispatch(activityLogData(id))
    dispatch(fetchUserDetail(id))
    }else{
      history.push(`/login`)
    }
  },[])

  useEffect(()=>{
    if(consultantLeadList){
      // setBookingMonthlyStatus(consultantLeads.leadsList.filter(lead => lead.status === 'booked' && new Date(lead.updatedAt).getFullYear() === d.getFullYear() && new Date(lead.updatedAt).getMonth() === d.getMonth()).length)
      // setSiteVisitsMonthlyStatus(consultantLeads.leadsList.filter(lead => lead.status === 'visited' && new Date(lead.updatedAt).getFullYear() === d.getFullYear() && new Date(lead.updatedAt).getMonth() === d.getMonth()).length)
      // setLeadMonthlyStatus(consultantLeads.leadsList.filter(lead =>new Date(lead.updatedAt).getFullYear() === d.getFullYear() && new Date(lead.updatedAt).getMonth() === d.getMonth()).length)
      console.log(consultantLeadList)
    }
    else if(userData){
      if(userData.role === "Consultant"){
        dispatch(fetchConsultantLeadList(userData._id))
      }
    }

  }, [userData])

  useEffect(()=>{
    if(activityLog && activityLog.activityLogData && activityLog.activityLogData.length>0){
      setName(activityLog.activityLogData[0].member.name.charAt(0).toUpperCase()+activityLog.activityLogData[0].member.name.slice(1))
    }
  },[activityLog])

  const leadHandler = (activity) => {
    history.push(`/leads/${activity.leadId._id}/edit`)
  }

  return (
    <>
    { loading ? (<Preloader />) : error? (<Alert>{error}</Alert>) : activityLog && activityLog.activityLogData.length > 0 ?(
      <>
      <h3 className='mb-3'>{activityLog && activityLog.activityLogData && (name + ' - ' +(activityLog.activityLogData[0].member.role)+'') }</h3>
    <Row className="">
      <Col xs={12} sm={6} xl={8} className="mb-4 d-sm-block">
    <div className=''>
      {(activityLog && activityLog.activityLogData) && activityLog.activityLogData.map((activity, i) => (
      <Card className='px-3 py-3 mb-2 d-flex justify-content-between align-items-center flex-row' key={i}>
        <div>
        <a className={`mb-3 action-text ${activity.leadId === null ? 'deleted-lead':'' }`} onClick={()=>leadHandler(activity)} > {name} {activity.action}</a>
        </div>
        <div className='me-0 mt-2'>
        {/* <p className='mb-1'>{new Date(activity.createdAt).toDateString()}</p> */}
        <p className='mb-1' style={{"color":"#69acbf"}}>  <TimeAgo date={new Date(activity.createdAt)} /> </p>
        </div>
      </Card>
      ))
  }
  </div>
  </Col>
  
      <Col xs={12} sm={6} xl={4} className="mb-4 d-sm-block">
      <CounterWidget
            category="Bookings"
            title={userData? `${bookingMonthlyStatus}/${userData.setMilestone.bookings}` : 0}
            period=""
            percentage={0}
     
            iconColor="shape-tertiary"
          />
          <br/>

      <CounterWidget
            category="Site Visits"
            title={userData? `${siteVisitsMonthlyStatus}/${userData.setMilestone.siteVisits}` : 0}
            period=""
            percentage={0}
     
            iconColor="shape-tertiary"
          />
<br/>
      <CounterWidget
            category="Leads"
            title={userData? `${leadMonthlyStatus}/${userData.setMilestone.leads}` : 0}
            period=""
            percentage={0}
     
            iconColor="shape-tertiary"
          />
      </Col>
      </Row>
    </>
  ):(
    <div className='p-5 d-flex justify-content-center align-items-center'>
      <h1>"No Activity"</h1>
    </div>
  )}
  </>
  )
}

export default ActivityLog