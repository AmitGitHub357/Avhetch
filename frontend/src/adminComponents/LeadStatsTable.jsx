import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from '@themesberg/react-bootstrap';

import './style.css'



const LeadStatsTable = ({history, bookedStats, lostLeadStats, siteVisitStats, monthArray}) => {

  const dispatch = useDispatch()

  const loading = false

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


    
  return (
   <>
    <Table>
    <thead>
      <tr>
        <th>Month</th>
        <th>Booked Leads</th>
        <th>Site Visit Leads</th>
        <th>Lost Leads</th>
      </tr>
    </thead>
    <tbody>
      
        {monthArray.map((m, i)=>(
        <tr>
            <td>{m}</td>
            <td>{bookedStats[i]}</td>
            <td>{siteVisitStats[i]}</td>
            <td>{lostLeadStats[i]}</td>
        </tr>
        ))}
      
    </tbody>
    </Table>
   </>
  )
}

export default LeadStatsTable





