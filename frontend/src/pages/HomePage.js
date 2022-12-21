import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";
import { ToastProvider } from "react-toast-notifications";

// pages
import Presentation from "./Presentation";
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
//Login Page ***********
import LoginPage from "./LoginPage";
import AdminDashboardOverview from '../adminComponents/DashboardOverview';
import AddConsultant from "../adminComponents/AddConsultant";
import AddMember from '../adminComponents/AddMember';
import AddTeamLead from '../adminComponents/AddTeamLead';
import AddLead from "../adminComponents/AddLead";
import AddASM from '../adminComponents/AddASM';
import AddCP from '../adminComponents/AddCP';
import AddCPM from '../adminComponents/AddCPM';
import AddLeadAssigner from '../adminComponents/AddLeadAssigner';
import ModifyLead from '../adminComponents/ModifyLead';
import AdminDashboard from './AdminDashboard';
import Consultant from '../adminComponents/Consultant';
import Student from '../adminComponents/Student';
import Batch from '../adminComponents/Batch';
// import Course from '../adminComponents/Course';
import Manager from '../adminComponents/Manager'; 
import TeamLead from '../adminComponents/TeamLead';
import TotalLeads from '../adminComponents/TotalLeads'
import CancellationLeads from '../adminComponents/CancellationLeads';
import LostSales from '../adminComponents/LostSales'
import SiteVisits from '../adminComponents/SiteVisits'
import SetMilestone from '../adminComponents/SetMilestone'
import Promotion from '../adminComponents/Promotion';
import AddProject from '../adminComponents/AddProject';
import TaskManager from '../adminComponents/TaskManager';
import AllProjects from '../adminComponents/AllProjects';
import ProjectDetails from '../adminComponents/ProjectDetails';
import Leads from '../adminComponents/Leads';
import LostLeads from '../adminComponents/LostLeads';
import SiteVisitsLeads from '../adminComponents/SiteVisitsLeads';
import NextFollowUp from '../adminComponents/NextFollowUp';
import UploadLeads from '../adminComponents/UploadLeads';
import Calendar from '../adminComponents/Calendar';
import BulkLeads from '../components/BulkLeads';
import UserList from '../adminComponents/UserList'
import ActivityLog from '../adminComponents/ActivityLog'
import EditUser from '../adminComponents/EditUser'
import Dashboard from '../adminComponents/Dashboard';
import CancelledLeadEdit from '../adminComponents/CancelledLeadEdit'

//Manager Components
import ManagerDashboard from '../managerComponents/ManagerDashboard';
import ManagerLeads from '../managerComponents/Leads';
import ManagerAddLead from '../managerComponents/AddLead';
import ManagerLostLeads from '../managerComponents/LostLeads';
import ManagerSiteVisitsLeads from '../managerComponents/SiteVisitsLeads';
import ManagerCancellationLeads from '../managerComponents/CancellationLeads';
import ManagerNextFollowUp from '../managerComponents/NextFollowUp';
import ManagerAddMember from '../managerComponents/AddMember';
import ManagerConsultant from '../managerComponents/Consultant';
import ManagerTeamLead from '../managerComponents/TeamLead';
// import ManagerUserList from '../managerComponents/UserList'
import ManagerActivityLog from '../managerComponents/ActivityLog'
import ManagerSetMilestone from '../managerComponents/SetMilestone'
import ManagerTaskManager from '../managerComponents/TaskManager';
import ManagerEditUser from '../managerComponents/EditUser';
import ManagerBulkLeads from '../managerComponents/UploadLeads';
import ManagerModifyLead from '../managerComponents/ModifyLead';
import ManagerTeamMember from '../managerComponents/TeamMember';

//CPManager Components
import CPManagerDashboard from '../cpManagerComponents/CPManagerDashboard';
import CPManagerLeads from '../cpManagerComponents/Leads';
import CPManagerAddLead from '../cpManagerComponents/AddLead';
import CPManagerLostLeads from '../cpManagerComponents/LostLeads';
import CPManagerSiteVisitsLeads from '../cpManagerComponents/SiteVisitsLeads';
import CPManagerCancellationLeads from '../cpManagerComponents/CancellationLeads';
import CPManagerNextFollowUp from '../cpManagerComponents/NextFollowUp';
import CPManagerActivityLog from '../cpManagerComponents/ActivityLog'
import CPManagerTaskManager from '../cpManagerComponents/TaskManager';
import CPManagerBulkLeads from '../cpManagerComponents/UploadLeads';
import CPManagerModifyLead from '../cpManagerComponents/ModifyLead';

//Teamlead Components
import TeamLeadDashboard from '../teamleadComponents/TeamleadDashboard';
import TeamLeadLeads from '../teamleadComponents/Leads';
import TeamLeadAddLead from '../teamleadComponents/AddLead';
import TeamLeadLostLeads from '../teamleadComponents/LostLeads';
import TeamLeadSiteVisitsLeads from '../teamleadComponents/SiteVisitsLeads';
import TeamLeadActivityLog from '../teamleadComponents/ActivityLog'
import TeamLeadSetMilestone from '../teamleadComponents/SetMilestone'
import TeamLeadTaskManager from '../teamleadComponents/TaskManager';
import TeamLeadModifyLead from '../teamleadComponents/ModifyLead';

//Consultant Components
import ConsultantDashboard from '../consultantComponents/ConsultantDashboard';
import ConsultantLeads from '../consultantComponents/Leads';
import ConsultantAddLead from '../consultantComponents/AddLead';
import ConsultantLostLeads from '../consultantComponents/LostLeads';
import ConsultantSiteVisitsLeads from '../consultantComponents/SiteVisitsLeads';
import ConsultantActivityLog from '../consultantComponents/ActivityLog'
import ConsultantNextFollowUp from '../consultantComponents/NextFollowUp'
import ConsultantTaskManager from '../consultantComponents/TaskManager';
import ConsultantModifyLead from '../consultantComponents/ModifyLead';

// import Demotwo from '../adminComponents/Demotwo'
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// documentation pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../adminComponents/Sidebar";
import MangerSidebar from "../managerComponents/Sidebar";
import TeamLeadSidebar from '../teamleadComponents/TeamLeadSidebar';
import ConsultantSidebar from '../consultantComponents/ConsultantSidebar';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";


const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // console.log(userLogin)
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);
  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        {/* {user && user.isAdmin ? 
        <Sidebar /> : <MangerSidebar />} */}
        {(()=>{
          if(userLogin.userInfo){
              // console.log(userLogin)
              // console.log(userInfo.userInfo.name)
              return <Sidebar />
          }
        //   else if(user.role === 'Manager'){
        //     return <MangerSidebar />
        //   }else if(user.role === 'TeamLead'){
        //     return <TeamLeadSidebar />
        //   }else if(user.role === 'Consultant'){
        //     return <ConsultantSidebar />
        //   }else if(user.role === 'CPM'){
        //     return 'CPM'
        //   }
        // }
        })()}

        <main className="content">
          <Navbar />
          <Component {...props} />
          {/* <Footer toggleSettings={toggleSettings} showSettings={showSettings} /> */}
        </main>
      </>
    )}
    />
  );
};

export default () => (
  <ToastProvider placement="bottom-left">
  <Switch>
    {/* <RouteWithLoader exact path={Routes.Presentation.path} component={Presentation} /> */}
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={AdminDashboardOverview} />
    

    <RouteWithSidebar exact path={Routes.UploadLeads.path} component={UploadLeads} />
    {/* Admin Dashboard ********** */}
    <RouteWithLoader exact path={Routes.AdminDashboard.path} component={ AdminDashboard } />
    <RouteWithLoader exact path={Routes.LoginPage.path} component={LoginPage} />
    <RouteWithSidebar exact path={Routes.AddConsultant.path} component={AddConsultant} />
    <RouteWithSidebar exact path={Routes.AddMember.path} component={AddMember} />
    <RouteWithSidebar exact path={Routes.AddTeamLead.path} component={AddTeamLead} />
    <RouteWithSidebar exact path={Routes.AddLead.path} component={AddLead} />
    <RouteWithSidebar exact path={Routes.Student.path} component={ Student } />
    <RouteWithSidebar exact path={Routes.Batch.path} component={ Batch } />
    {/* <RouteWithSidebar exact path={Routes.Course.path} component={ Course } /> */}
    <RouteWithSidebar exact path={Routes.AddASM.path} component={AddASM} />
    <RouteWithSidebar exact path={Routes.AddCP.path} component={AddCP} />
    <RouteWithSidebar exact path={Routes.AddCPM.path} component={AddCPM} />
    <RouteWithSidebar exact path={Routes.AddLeadAssigner.path} component={AddLeadAssigner} />
    <RouteWithSidebar exact path={Routes.ModifyLead.path} component={ModifyLead} />
    <RouteWithSidebar exact path={Routes.TotalLeads.path} component={TotalLeads} />
    <RouteWithSidebar exact path={Routes.CancellationLeads.path} component={CancellationLeads} />
    <RouteWithSidebar exact path={Routes.Consultant.path} component={Consultant} />
    <RouteWithSidebar exact path={Routes.Manager.path} component={Manager} />
    <RouteWithSidebar exact path={Routes.TeamLead.path} component={TeamLead} />
    <RouteWithSidebar exact path={Routes.LostSales.path} component={LostSales} />
    <RouteWithSidebar exact path={Routes.SiteVisits.path} component={SiteVisits} />
    <RouteWithSidebar exact path={Routes.SetMilestone.path} component={SetMilestone} />
    <RouteWithSidebar exact path={Routes.Promotion.path} component={Promotion} />
    <RouteWithSidebar exact path={Routes.AddProject.path} component={AddProject} />
    <RouteWithSidebar exact path={Routes.TaskManager.path} component={TaskManager} />
    <RouteWithSidebar exact path={Routes.AllProjects.path} component={AllProjects} />
    <RouteWithSidebar exact path={Routes.Leads.path} component={Leads} />
    <RouteWithSidebar exact path={Routes.LostLeads.path} component={LostLeads} />
    <RouteWithSidebar exact path={Routes.SiteVisitsLeads.path} component={SiteVisitsLeads} />
    <RouteWithSidebar exact path={Routes.NextFollowUp.path} component={NextFollowUp} />
    <RouteWithSidebar exact path={Routes.BulkLeads.path} component={BulkLeads} />
    <RouteWithSidebar exact path={Routes.Calendar.path} component={Calendar} />
    <RouteWithSidebar exact path={Routes.UserList.path} component={UserList} />
    <RouteWithSidebar exact path={Routes.ActivityLog.path} component={ActivityLog} />
    <RouteWithSidebar exact path={Routes.EditUser.path} component={EditUser} />
    <RouteWithSidebar exact path={Routes.Dashboard.path} component={Dashboard} />
    <RouteWithSidebar exact path={Routes.CancelledLeadEdit.path} component={CancelledLeadEdit} />

    {/* Manager Dashboard */}
    <RouteWithSidebar exact path={Routes.ManagerDashboard.path} component={ManagerDashboard} />
    <RouteWithSidebar exact path={Routes.ManagerLeads.path} component={ManagerLeads} />
    <RouteWithSidebar exact path={Routes.ManagerAddLead.path} component={ManagerAddLead} />
    <RouteWithSidebar exact path={Routes.ManagerModifyLead.path} component={ManagerModifyLead} />
    <RouteWithSidebar exact path={Routes.ManagerLostLeads.path} component={ManagerLostLeads} />
    <RouteWithSidebar exact path={Routes.ManagerSiteVisitsLeads.path} component={ManagerSiteVisitsLeads} />
    <RouteWithSidebar exact path={Routes.ManagerCancellationLeads.path} component={ManagerCancellationLeads} />
    <RouteWithSidebar exact path={Routes.ManagerNextFollowUp.path} component={ManagerNextFollowUp} />
    <RouteWithSidebar exact path={Routes.ManagerAddMember.path} component={ManagerAddMember} />
    <RouteWithSidebar exact path={Routes.ManagerConsultant.path} component={ManagerConsultant} />
    <RouteWithSidebar exact path={Routes.ManagerTeamLead.path} component={ManagerTeamLead} />
    {/* <RouteWithSidebar exact path={Routes.ManagerUserList.path} component={ManagerUserList} /> */}
    <RouteWithSidebar exact path={Routes.ManagerActivityLog.path} component={ManagerActivityLog} />
    <RouteWithSidebar exact path={Routes.ManagerSetMilestone.path} component={ManagerSetMilestone} />
    <RouteWithSidebar exact path={Routes.ManagerTaskManager.path} component={ManagerTaskManager} />
    <RouteWithSidebar exact path={Routes.ManagerEditUser.path} component={ManagerEditUser} />
    <RouteWithSidebar exact path={Routes.ManagerBulkLeads.path} component={ManagerBulkLeads} />
    <RouteWithSidebar exact path={Routes.ManagerTeamMember.path} component={ManagerTeamMember} />
    

     {/* TeamLead Dashboard */}
    <RouteWithSidebar exact path={Routes.TeamLeadDashboard.path} component={TeamLeadDashboard} />
    <RouteWithSidebar exact path={Routes.TeamLeadLeads.path} component={TeamLeadLeads} />
    <RouteWithSidebar exact path={Routes.TeamLeadAddLead.path} component={TeamLeadAddLead} />
    <RouteWithSidebar exact path={Routes.TeamLeadLostLeads.path} component={TeamLeadLostLeads} />
    <RouteWithSidebar exact path={Routes.TeamLeadSiteVisitsLeads.path} component={TeamLeadSiteVisitsLeads} />
    <RouteWithSidebar exact path={Routes.TeamLeadActivityLog.path} component={TeamLeadActivityLog} />
    <RouteWithSidebar exact path={Routes.TeamLeadSetMilestone.path} component={TeamLeadSetMilestone} />
    <RouteWithSidebar exact path={Routes.TeamLeadTaskManager.path} component={TeamLeadTaskManager} />

     {/* Consultant Dashboard */}
    <RouteWithSidebar exact path={Routes.ConsultantDashboard.path} component={ConsultantDashboard} />
    <RouteWithSidebar exact path={Routes.ConsultantLeads.path} component={ConsultantLeads} />
    <RouteWithSidebar exact path={Routes.ConsultantAddLead.path} component={ConsultantAddLead} />
    <RouteWithSidebar exact path={Routes.ConsultantLostLeads.path} component={ConsultantLostLeads} />
    <RouteWithSidebar exact path={Routes.ConsultantSiteVisitsLeads.path} component={ConsultantSiteVisitsLeads} />
    <RouteWithSidebar exact path={Routes.ConsultantActivityLog.path} component={ConsultantActivityLog} />
    <RouteWithSidebar exact path={Routes.ConsultantNextFollowUp.path} component={ConsultantNextFollowUp} />
    <RouteWithSidebar exact path={Routes.ConsultantTaskManager.path} component={ConsultantTaskManager} />
    <RouteWithSidebar exact path={Routes.ConsultantModifyLead.path} component={ConsultantModifyLead} />

    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
    <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

    {/* pages */}
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
    <RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} />
    <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />
    <RouteWithSidebar exact path={Routes.ProjectDetails.path} component={ProjectDetails} />

    {/* components */}
    <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} />
    <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
    <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
    <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
    <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
    <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
    <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
    <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
    <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
    <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} />
    <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
    <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
    <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
    <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
    <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
    <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />

    {/* documentation */}
    <RouteWithSidebar exact path={Routes.DocsOverview.path} component={DocsOverview} />
    <RouteWithSidebar exact path={Routes.DocsDownload.path} component={DocsDownload} />
    <RouteWithSidebar exact path={Routes.DocsQuickStart.path} component={DocsQuickStart} />
    <RouteWithSidebar exact path={Routes.DocsLicense.path} component={DocsLicense} />
    <RouteWithSidebar exact path={Routes.DocsFolderStructure.path} component={DocsFolderStructure} />
    <RouteWithSidebar exact path={Routes.DocsBuild.path} component={DocsBuild} />
    <RouteWithSidebar exact path={Routes.DocsChangelog.path} component={DocsChangelog} />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
  </ToastProvider>
);
