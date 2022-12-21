import React, {useState, useEffect,  forwardRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { fetchLeadList } from '../actions/leadActions';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js'

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import { trafficShares, totalOrders } from "../data/charts";
import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../components/Widgets";

import NextFollowUp from './NextFollowUp';

const ManagerDashboard = ({history}) => {
  var leadStatData = [], bookedData = [], lostLeadData = [], siteVisitData = []
  var leadCount = 0, bookedCount = 0, lostLeadCount=0, siteVisitCount = 0

  const d = new Date()

  const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const [leadStats , setLeadStats] = useState([])
  const [bookedStats , setBookedStats] = useState([])
  const [bookedAvg , setBookedAvg] = useState(0)
  const [thisMonthBooked , setThisMonthBooked] = useState(0)
  const [lostLeadStats , setLostLeadStats] = useState([])
  const [lostLeadAvg , setLostLeadAvg] = useState(0)
  const [thisMonthLostLead , setThisMonthLostLead] = useState(0)
  const [siteVisitStats , setSiteVisitStats] = useState([])
  const [siteVisitAvg , setSiteVisitAvg] = useState(0)
  const [thisMonthSiteVisit , setThisMonthSiteVisit] = useState(0)
  const [totalLeads , setTotalLeads] = useState(0)
  const [nextFollowUpCount, setNextFollowUpCount] = useState(0)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo: user } = userLogin

  const leadList = useSelector((state) => state.leadList)
    const { loading, error, leadInfo } = leadList

  useEffect(()=>{
    if (user && user.role === 'Manager') {
      dispatch(fetchLeadList())
    } else{
      history.push('/login')
    }
  }, [user, history])


  useEffect(()=>{
    if(leadInfo){
      setTotalLeads(leadInfo.length)
      for (var i = 0; i <= d.getMonth(); i++) {
        leadCount = 0
        bookedCount = 0
        lostLeadCount = 0
        siteVisitCount = 0
     leadInfo.forEach(lead=>{
      

      if (parseInt(lead.createdAt.split('-')[1]) - 1 === i && d.getFullYear() === parseInt(lead.createdAt.split('-')[0])) {
        leadCount += 1
        if(lead.status === "Booked"){
          bookedCount += 1
        }else if(lead.status === "Lost"){
          lostLeadCount += 1
        }else if (lead.status === "Visited"){
          siteVisitCount += 1
        }
    }
     })

     leadStatData.push(leadCount)
     bookedData.push(bookedCount)
     lostLeadData.push(lostLeadCount)
     siteVisitData.push(siteVisitCount)
     
     
    }
    setLeadStats(leadStatData)
    setBookedStats(bookedData)
    setLostLeadStats(lostLeadData)
    setSiteVisitStats(siteVisitData)
    if(bookedData[d.getMonth()] === bookedData[d.getMonth()-1] || bookedData[d.getMonth()-1] === 0){
      setBookedAvg(0)
    }else{
    setBookedAvg((bookedData[d.getMonth()]-bookedData[d.getMonth()-1])/bookedData[d.getMonth()-1])
    }
    setThisMonthBooked(bookedData[d.getMonth()])
    if(lostLeadData[d.getMonth()]===lostLeadData[d.getMonth()-1] || lostLeadData[d.getMonth()-1] === 0){
      setLostLeadAvg(0)
    }else{
    setLostLeadAvg((lostLeadData[d.getMonth()]-lostLeadData[d.getMonth()-1])/lostLeadData[d.getMonth()-1])
    }
    setThisMonthLostLead(lostLeadData[d.getMonth()])
    if(siteVisitData[d.getMonth()] === siteVisitData[d.getMonth()-1] || siteVisitData[d.getMonth()-1]===0){
      setSiteVisitAvg(0)
    }else{
    setSiteVisitAvg((siteVisitData[d.getMonth()]-siteVisitData[d.getMonth()-1])/siteVisitData[d.getMonth()-1])
    }
    setThisMonthSiteVisit(siteVisitData[d.getMonth()])
    setNextFollowUpCount(leadInfo.filter(lead => {if(lead.nextFollowUp){return lead.nextFollowUp.split('T')[0]  ===  d.toISOString().split('T')[0]}}).length)

    }
    
  },[leadInfo])

  

  

  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
    );

    var data = {
        labels: monthArray,
        datasets: [
            {
                label: "Leads",
                data: leadStats,
                fill: true,
                backgroundColor: "#4A5073",
                // backgroundColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)',
                // ],
                // borderColor: "#4A5073"
            },
            {
              label: "Booked Leads",
              data: bookedStats,
              fill: true,
              backgroundColor: "green",
              // backgroundColor: [
              //     'rgba(255, 99, 132, 1)',
              //     'rgba(54, 162, 235, 1)',
              //     'rgba(255, 206, 86, 1)',
              //     'rgba(75, 192, 192, 1)',
              //     'rgba(153, 102, 255, 1)',
              //     'rgba(255, 159, 64, 1)',
              // ],
              // borderColor: "green"
          },
          {
            label: "Lost Leads",
            data: lostLeadStats,
            fill: true,
            backgroundColor: "red",
            // backgroundColor: [
            //     'rgba(255, 99, 132, 1)',
            //     'rgba(54, 162, 235, 1)',
            //     'rgba(255, 206, 86, 1)',
            //     'rgba(75, 192, 192, 1)',
            //     'rgba(153, 102, 255, 1)',
            //     'rgba(255, 159, 64, 1)',
            // ],
            // borderColor: "red"
        },
        {
          label: "Site Visit",
          data: siteVisitStats,
          fill: true,
          // lineTension: 0.1,
          // pointBorderColor: '#111',
          // pointBackgroundColor: '#ff4000',
          // pointBorderWidth: 2,
          backgroundColor: "yellow",
          // backgroundColor: [
          //     'rgba(255, 99, 132, 1)',
          //     'rgba(54, 162, 235, 1)',
          //     'rgba(255, 206, 86, 1)',
          //     'rgba(75, 192, 192, 1)',
          //     'rgba(153, 102, 255, 1)',
          //     'rgba(255, 159, 64, 1)',
          // ],
          // borderColor: "yellow"
      }

        ]
    };

    const data1 = {
      labels: ['Booked Leads', 'Lost Leads', 'Site Visit'],
      datasets: [
        {
          label: 'Lead Statistics',
          data: [thisMonthBooked, thisMonthLostLead, thisMonthSiteVisit],
          backgroundColor: [
            'rgba(0,128,0 , 0.2)',
            'rgba(255, 0, 0, 0.2)',
            'rgba(255, 255, 0, 0.2)',
          ],
          borderColor: [
            'rgba(0,128,0 , 1)',
            'rgba(255, 0, 0, 1)',
            'rgba(255, 255, 0, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    const options = {
      responsive: true,
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          type: "linear",
          display: true,
          position: "left"
        }]
      }
    };

    const tableIcons = {
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
      Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
      DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
      SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
      ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
      ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

 


  return (
    <div>
      <Row className="justify-content-md-center mt-5">
        {/* <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="Total Leads"
            value={totalLeads}
            percentage={10.57}
            leadStats = {leadStats}
          />
        </Col> */}
        {/* <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
            title="Booked Leads"
            value={thisMonthBooked}
            percentage={bookedAvg}
          />
        </Col> */}

        <Col xs={12} sm={6} xl={6} className="mb-4">
          <CounterWidget
            category="Next Follow Up"
            title={nextFollowUpCount}
            period=""
            percentage={lostLeadAvg}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
          </Col>
        <Col xs={12} sm={6} xl={6} className="mb-4">
          <CounterWidget
            category="Booked Leads"
            title={thisMonthBooked+`/${user && user.setMilestone.bookings}`}
            period="monthly"
            percentage={bookedAvg}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={6} className="mb-4">
          <CounterWidget
            category="Site Visited"
            title={thisMonthSiteVisit+`/${user && user.setMilestone.siteVisits}`}
            period="monthly"
            percentage={siteVisitAvg}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={6} className="mb-4">
          <CounterWidget
            category="Lost Leads"
            title={thisMonthLostLead+`/${user && user.setMilestone.leads}`}
            period="monthly"
            percentage={lostLeadAvg}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        
      </Row>
      <Row className="p-5">
        <Col md={8}>
        {(leadStats && leadStats.length>0) && <Bar data={data}  />}
        </Col>
        <Col md={4}>
        <Doughnut data={data1} />
        </Col>
        </Row>
        <Row>
          <Col xs={12}>
              <NextFollowUp/>
          </Col>
          </Row>

          {/* <Row>
          <Col xs={12}>
              <LeadStatsTable bookedStats={bookedStats} lostLeadStats={lostLeadStats} siteVisitStats={siteVisitStats} monthArray={monthArray}/>
          </Col>
          </Row> */}
    </div>
  )
}

export default ManagerDashboard