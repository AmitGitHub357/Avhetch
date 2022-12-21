import React, {useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import BootstrapTable, {TableHeaderColumn} from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import filterFactory, { textFilter, selectFilter, dateFilter, Comparator} from 'react-bootstrap-table2-filter'; 
import { deleteUser } from '../actions/userActions';
import axios from 'axios';
import { createHashHistory } from 'history'

const ReactTable = ({users}) => {
    const dispatch = useDispatch()
    const history = createHashHistory()

    const { SearchBar } = Search;

    const deleteUserProfile = useSelector((state) => state.deleteUserProfile)
    const { loading: deleteLoading, error:deleteError, success } = deleteUserProfile

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo: user } = userLogin

    useEffect(()=>{
      if (user && user.isAdmin) {
       
      } else {
        history.push('/login')
      }
    }, [user, history])

    const deleteHandler = (id) =>{
        if (window.confirm('Are you sure')) {
         dispatch(deleteUser(id))
        //  history.push('/remove/consultant')
        window.location.reload()
        }
    }

    const editHandler = (id) => {
      history.push(`/activitylog/${id}/`)
    }

    const afterSearch = (newResult) => {
      console.log(newResult);
    };

    const columns = [
        {
          dataField: "users",
          text: "Serial No.",
          formatter :(row,index, users) => {
            console.log(row, index)
            return users+1
          },
        },
        {
          dataField: "empCode",
          text: "Employee Code",
          sort: true,
        },
        {
          dataField: "name",
          text: "Name",
          sort: true,
          
        },
        {
          dataField: "mobile",
          text: "Mobile no."
        },
        {
          dataField: "email",
          text: "Email Id",
        },
        {
          dataField: "",
          text: "",
          formatter: (cell,row) => {
            return (
              // <button className="btn btn-primary" onClick={ ()=>deleteHandler(row._id) }>Remove</button>
              <button className="btn btn-primary" onClick={ ()=>editHandler(row._id) }>Activity Log</button>

            );
          },
  
        },
  
      ];
    return (
        <div>
          
          <ToolkitProvider
            keyField="_id"
            data={ users }
            columns={ columns }
            search
          >
            {
            props => (
            <div>
              {/* <span>Search: </span> */}
              <SearchBar { ...props.searchProps } />
              <hr />
        
            <BootstrapTable
                  { ...props.baseProps }
                 bootstrap4
                 keyField="_id"
                 data={users}
                 columns={columns}
                 filter={ filterFactory() }
                 pagination={paginationFactory({ sizePerPage: 10 })}
                 striped
               />
               </div>
               )
               }
               </ToolkitProvider>
        </div>
    )
}

export default ReactTable
