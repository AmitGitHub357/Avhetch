import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from '@themesberg/react-bootstrap';
import { fetchUserList } from '../actions/userActions'
import { deleteUser } from '../actions/userActions';

import ReactLogo from '../assets/img/technologies/loader.png'

import UserTable from './UserTable';


const UserList = ({history}) => {
    // const [userList, setUserList] = useState([])
  
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo: user } = userLogin

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    useEffect(()=>{
      if (user && user.isAdmin) {
        dispatch(fetchUserList())
      } else {
        history.push('/login')
      }
    }, [user, history])

    
  

  
  
  
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
        
                    <UserTable users={users}/>
      </div>
      )}
      </>
    )
  }
}
  

  export default UserList

