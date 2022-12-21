import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from '@themesberg/react-bootstrap';
import { consultantsUnderManager } from '../actions/userActions'
import { deleteUser } from '../actions/userActions';

import ReactLogo from '../assets/img/technologies/loader.png'

import ReactTable2 from './ReactTable2';


const Consultant = ({history}) => {
    // const [userList, setUserList] = useState([])
  
    const dispatch = useDispatch()

    const fetchConsultantsUnderManager = useSelector((state) => state.fetchConsultantsUnderManager)
    const { loading, error, consultantsList: users } = fetchConsultantsUnderManager

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo: user } = userLogin

    useEffect(()=>{
      if (user && user.role === "Manager") {
        dispatch(consultantsUnderManager(user._id))
      } else {
        history.push('/login')
      }
    }, [user, history])

    // useEffect(() => {
    //     dispatch(consultants())
    // }, [])

   

    // useEffect(() => {
    //     setUserList(users)
    // }, [users])

//     const [usersData, setUsersData] = useState([])
//   const [loading, setLoading] = useState(true)

//          useEffect(() => {
//            setTimeout(()=>{
//             axios.get(`/api/users/consultant`)
//             .then(res => {
//                 console.log("sgh")
//                 const users = res.data;
//                 setUsersData(users)
//                 setLoading(false)                     
//             })
//           }, 3000)
          

//          }, [])


    const deleteHandler = (id) =>{
        if (window.confirm('Are you sure')) {
        dispatch(deleteUser(id))
        }
        history.push('/')
    }
  

  
  
  
  if(users === undefined){
  return (
    <div className={`preloader bg-softr flex-column justify-content-center align-items-center `}>
        <Image className="loader-element animate__animated animate__jackInTheBox" src={ReactLogo} height={70} />
        </div>
    
  )
  } else{
    return (
      
      <>
      {loading? (
        // <div className={`preloader bg-softr flex-column justify-content-center align-items-center `}>
        // <Image className="loader-element animate__animated animate__jackInTheBox" src={ReactLogo} height={40} />
        // </div>
        <div></div>
      ) : (
      <div>
        
                    <ReactTable2 users={users}/>
      </div>
      )}
      </>
    )
  }
}
  

  export default Consultant