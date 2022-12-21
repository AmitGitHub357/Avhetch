import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const IndividualAchievedStatus = ({history, match}) => {
    const userId = match.params.id
    const [bookingMonthlyStatus, setBookingMonthlyStatus] = useState(0)
    const [siteVisitsMonthlyStatus, setSiteVisitsMonthlyStatus] = useState(0)
    const [leadMonthlyStatus, setLeadMonthlyStatus] = useState(0)
    const [bookingDailyStatus, setBookingDailyStatus] = useState(0)
    const [siteVisitsDailyStatus, setSiteVisitsDailyStatus] = useState(0)
    const [leadDailyStatus, setLeadDailyStatus] = useState(0)
    
  return (
    <div>IndividualAchievedStatus</div>
  )
}

export default IndividualAchievedStatus