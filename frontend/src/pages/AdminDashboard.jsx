import React, {useState, useEffect} from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import { Button } from '@themesberg/react-bootstrap';


const AdminDashboard = ({history}) => {

    // const RouteWithLoader = ({ component: Component, ...rest }) => {
    //       const [loaded, setLoaded] = useState(false);
        
    //       useEffect(() => {
    //         const timer = setTimeout(() => setLoaded(true), 1000);
    //         return () => clearTimeout(timer);
    //       }, []);
        
    //       return (
    //         <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
    //       );
    //     };
        
        // const RouteWithSidebar = ({ component: Component, ...rest }) => {
        //   const [loaded, setLoaded] = useState(false);
        
        //   useEffect(() => {
        //     const timer = setTimeout(() => setLoaded(true), 1000);
        //     return () => clearTimeout(timer);
        //   }, []);
        
        //   const localStorageIsSettingsVisible = () => {
        //     return localStorage.getItem('settingsVisible') === 'false' ? false : true
        //   }
        
        //   const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);
        
        //   const toggleSettings = () => {
        //     setShowSettings(!showSettings);
        //     localStorage.setItem('settingsVisible', !showSettings);
        //   }

        const users = useSelector((state) => state.userLogin)
        const { loading, error, userInfo } = users

        const redirectHandler = () => {
           if(userInfo){
            if(userInfo && userInfo.userInfo.isAdmin){
                history.push('/dashboard')
            }else if(userInfo.role === "Manager"){
                history.push('/manager/dashboard')
            }else{
                history.push('/login')
            }
           }
        }
        

    return (
        <>
            {/* <Preloader show={loaded ? false : true} /> */}
            
            <main className="content">
                <Navbar />
                <div className="home">
                <h1>Ahvetch</h1>
                <div className="mt-3">
                    <Button variant="primary" type="submit" onClick= {()=>redirectHandler()}>Dashboard</Button>
                </div>
                </div>  
            </main>
       </>
    )
}

export default AdminDashboard


