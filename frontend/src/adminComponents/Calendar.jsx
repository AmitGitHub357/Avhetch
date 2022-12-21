import React from 'react';
// import logo from './logo.svg';
// import './App.css';


function App() {

  var gapi = window.gapi
  /* 
    Update with your own Client Id and Api key 
  */
  var CLIENT_ID = "1013896874235-1htic5jfq2uhg6s8kjt7130t98a0kd86.apps.googleusercontent.com"
  var API_KEY = "AIzaSyBoJQl0S2P5iI5LxS4FQThPKm8b5rVagwc"
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  var SCOPES = "https://www.googleapis.com/auth/calendar.events"

  const handleClick = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        
        var event = {
          'summary': 'Awesome Event!',
          'location': '800 Howard St., San Francisco, CA 94103',
          'description': 'Really great refreshments',
          'start': {
            'dateTime': new Date('2022-06-12T09:18:01.221Z').toISOString().replace('Z',''),
            'timeZone': 'America/Los_Angeles'
          },
          'end': {
            'dateTime': new Date('2022-06-12T09:38:01.221Z').toISOString().replace('Z',''),
            'timeZone': 'America/Los_Angeles'
          },
          'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=1'
          ],
          'attendees': [
            {'email': 'lpage@example.com'},
            {'email': 'sbrin@example.com'}
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
        }

        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event,
        })

        request.execute(event => {
          console.log(event)
          window.open(event.htmlLink)
        })
        

        /*
            Uncomment the following block to get events
        */
        /*
        // get events
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(response => {
          const events = response.result.items
          console.log('EVENTS: ', events)
        })
        */
    

      })
    })
  }


  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Click to add event to Google Calendar</p>
        <p style={{fontSize: 18}}>Uncomment the get events code to get events</p>
        <p style={{fontSize: 18}}>Don't forget to add your Client Id and Api key</p>
        <button style={{width: 100, height: 50}} onClick={handleClick}>Add Event</button>
      </header>
    </div>
  );
}

export default App;
















// import React,{useState, useEffect} from 'react';
// import { useDispatch, useSelector } from 'react-redux'

// import { fetchLeadList } from "./../actions/leadActions";

// const Calendar= () => {
//   var gapi = window.gapi

//   const [leads, setLeads] = useState([])

//   const dispatch = useDispatch()

//   const leadList = useSelector((state) => state.leadList)
//   const { loading, error, leadInfo } = leadList

//   useEffect(() => {
//     dispatch(fetchLeadList())
//   },[])

//   useEffect(()=>{
//     if(leadInfo){
//     setLeads(leadInfo.slice(1,3))
//     }
//   }, [leadInfo])

//   console.log(22, leadInfo)


//   /* 
//     Update with your own Client Id and Api key 
//   */
//   var CLIENT_ID = "1013896874235-1htic5jfq2uhg6s8kjt7130t98a0kd86.apps.googleusercontent.com"
//   var API_KEY = "AIzaSyBoJQl0S2P5iI5LxS4FQThPKm8b5rVagwc"
//   var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
//   var SCOPES = "https://www.googleapis.com/auth/calendar.events"

//   useEffect(() => {
//     if(leads){
//     gapi.load('client:auth2', () => {
//       console.log('loaded client')

//       gapi.client.init({
//         apiKey: API_KEY,
//         clientId: CLIENT_ID,
//         discoveryDocs: DISCOVERY_DOCS,
//         scope: SCOPES,
//       })

//       gapi.client.load('calendar', 'v3', () => console.log('bam!'))


//       gapi.auth2.getAuthInstance().signIn()
//       .then(() => {
        
//         for(var i = 0; i < leads.length; i++){
//         console.log(leads[i])
//         var event = {
//           'summary': leads[i].customer,
//           'location': '',
//           'description': leads.status,
//           'start': {
//             'dateTime': leads.nextFollow ? leads.nextFollow.toISOString().remove('Z','') : null,
//             'timeZone': 'Asia/Kolkata'
//           },
//           'end': {
//             'dateTime': `${leads.nextFollow ? leads.nextFollow.toISOString().remove('Z','') : null}`,
//             'timeZone': 'Asia/Kolkata'
//           },
//           'recurrence': [
//             'RRULE:FREQ=DAILY;COUNT=2'
//           ],
//           'attendees': [
//             // {'email': 'lpage@example.com'},
//             // {'email': 'sbrin@example.com'}
//           ],
//           'reminders': {
//             'useDefault': false,
//             'overrides': [
//               {'method': 'email', 'minutes': 24 * 60},
//               {'method': 'popup', 'minutes': 10}
//             ]
//           }
//         }
//       }

//         var request = gapi.client.calendar.events.insert({
//           'calendarId': 'primary',
//           'resource': event,
//         })

//         request.execute(event => {
//           console.log(event)
//           window.open(event.htmlLink)
//         })
        

//         /*
//             Uncomment the following block to get events
//         */
//         /*
//         // get events
//         gapi.client.calendar.events.list({
//           'calendarId': 'primary',
//           'timeMin': (new Date()).toISOString(),
//           'showDeleted': false,
//           'singleEvents': true,
//           'maxResults': 10,
//           'orderBy': 'startTime'
//         }).then(response => {
//           const events = response.result.items
//           console.log('EVENTS: ', events)
//         })
//         */
    

//       })
//     })
//   }
//   },[leads])


//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* <img src={logo} className="App-logo" alt="logo" /> */}
//         <p>Click to add event to Google Calendar</p>
//         <p style={{fontSize: 18}}>Uncomment the get events code to get events</p>
//         <p style={{fontSize: 18}}>Don't forget to add your Client Id and Api key</p>
//         <button style={{width: 100, height: 50}}>Add Event</button>
//       </header>
//     </div>
//   );
// }

// export default Calendar;