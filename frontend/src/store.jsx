import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    userLoginReducer, 
    addConsultantReducer, 
    fetchManagersReducer, 
    fetchTeamLeadsReducer, 
    fetchConsultantsReducer, 
    fetchASMReducer,
    userUpdateReducer,
    userDetailReducer,
    deleteUserReducer, 
    userListReducer,
    fetchTeamLeadsUnderManagerReducer,
    fetchConsultantsUnderTeamLeadReducer,
    fetchConsultantsUnderManagerReducer
} from './reducers/usersReducer'
import { 
    addLeadReducer,
    updateLeadReducer,
    leadDetailsReducer,
    leadListReducer,
    deleteLeadReducer,
    bulkLeadsReducer,
    consultantLeadListReducer,
    teamLeadLeadListReducer,
    managerLeadListReducer
} from './reducers/leadsReducer'
import {addStudentReducer, fetchStudentsReducer, fetchIndividualStudentsReducer, deleteStudentReducer, updateStudentReducer} from './reducers/studentReducer'
import {addBatchReducer, fetchBatchsReducer, fetchIndividualBatchReducer, deleteBatchReducer, updateBatchReducer} from './reducers/batchReducer'
import { fetchProjectsReducer, addProjectReducer, updateProjectReducer, projectDetailsReducer } from './reducers/projectsReducer'
import { addCancelLeadReducer, cancelLeadListReducer, deleteCancelLeadReducer, updateCancelLeadReducer, cancelledLeadDetailsReducer } from './reducers/cancellationLeadsReducer'
import { addBulkLeadReducer, assignBulkLeadReducer,getBulkLeadReducer,editBulkLeadReducer } from './reducers/bulkLeadReducer'
import {activityLogDetailReducer} from './reducers/activityLogReducer'
import {addTaskReducer, fetchTasksReducer, fetchIndividualTasksReducer, deleteTaskReducer, updateTaskReducer} from './reducers/taskManagerReducer'
import {projectTeamDetailsReducer, addTeamReducer, deleteTeamReducer, getTeamListReducer, updateTeamDataReducer} from './reducers/teamManagementReducer'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    addConsultant: addConsultantReducer,
    fetchManagers : fetchManagersReducer,
    fetchTeamLeads: fetchTeamLeadsReducer,
    fetchASM: fetchASMReducer,
    fetchConsultants: fetchConsultantsReducer,
    fetchProjects: fetchProjectsReducer,
    addProject: addProjectReducer,
    updateProject: updateProjectReducer,
    projectDetails: projectDetailsReducer,
    deleteUserProfile: deleteUserReducer ,
    userUpdate: userUpdateReducer,
    userList : userListReducer,
    userDetail : userDetailReducer,
    teamLeadsUnderManager : fetchTeamLeadsUnderManagerReducer,
    consultantsUnderTeamLead : fetchConsultantsUnderTeamLeadReducer,
    fetchConsultantsUnderManager : fetchConsultantsUnderManagerReducer,
    addLead: addLeadReducer,
    updateLead: updateLeadReducer,
    leadDetails : leadDetailsReducer,
    leadList: leadListReducer,
    deleteLead: deleteLeadReducer,
    bulkLeads: bulkLeadsReducer,
    deleteCancelLead: deleteCancelLeadReducer,
    addCancelLead: addCancelLeadReducer,
    cancelLeadList: cancelLeadListReducer,
    consultantLeadList: consultantLeadListReducer,
    teamLeadLeadList: teamLeadLeadListReducer,
    managerLeadList: managerLeadListReducer,
    updateCancelLead : updateCancelLeadReducer,
    cancelledLeadDetails : cancelledLeadDetailsReducer,
    addBulkLead: addBulkLeadReducer,
    assignLeads: assignBulkLeadReducer,
    getBulkLead: getBulkLeadReducer,
    editBulkLead : editBulkLeadReducer,
    activityLogDetail: activityLogDetailReducer,
    addTask: addTaskReducer,
    fetchTasks: fetchTasksReducer,
    fetchIndividualTasks: fetchIndividualTasksReducer,
    deleteTask: deleteTaskReducer,
    updateTask: updateTaskReducer,
    addStudent: addStudentReducer,
    fetchStudents: fetchStudentsReducer,
    fetchIndividualStudents: fetchIndividualStudentsReducer,
    deleteStudent: deleteStudentReducer,
    updateStudent: updateStudentReducer,
    addBatch : addBatchReducer,
    fetchBatch : fetchBatchsReducer,
    fetchIndividualBatch : fetchIndividualBatchReducer,
    deleteBatch: deleteBatchReducer,
    updateBatch: updateBatchReducer,
    projectTeamDetails: projectTeamDetailsReducer,
    addTeam: addTeamReducer,
    deleteTeam: deleteTeamReducer,
    getTeamList: getTeamListReducer,
    updateTeamData: updateTeamDataReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )
  
  export default store