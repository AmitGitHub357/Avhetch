import React, {useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import BootstrapTable, {TableHeaderColumn} from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import filterFactory, { textFilter, selectFilter, dateFilter, Comparator} from 'react-bootstrap-table2-filter'; 
import { deleteStudent } from '../actions/studentActions';
import axios from 'axios';
import { createHashHistory } from 'history'
// import { deleteStudent } from '../actions/StudentActions';

const StudentTable = ({studentList}) => {
    const dispatch = useDispatch()
    const history = createHashHistory()
    // const { SearchBar } = Search;
    const userLogin = useSelector((state) => state.userLogin)
    console.log(studentList)
    // const { userInfo: user } = userLogin

    // useEffect(()=>{
    //   if (user && user.isAdmin) {
       
    //   } else {
    //     history.push('/login')
    //   }
    // }, [user, history])

    const deleteHandler = (id) =>{
        if (window.confirm('Are you sure')) {
         dispatch(deleteStudent(id))
        //  history.push('/remove/  consultant')
        window.location.reload()
        }
    }

    const editHandler = (id) => {
      history.push(`/Studentdetails/${id}`)
    }

    // const afterSearch = (newResult) => {
    //   console.log(newResult);
    // };

    const columns = [
        {
          dataField: "",
          text: "Serial No.",
          formatter :(row,index) => {
            // console.log(row, index)
            return index
          },
        },
        {
          dataField: "name",
          text: "Student Name",
          sort: true,
        },
        {
          dataField: "email",
          text: "Student Email",
          sort: false,
        },
        {
            dataField: "",
            text: "",
            formatter: (cell,row) => {
              return (
                // <button className="btn btn-primary" onClick={ ()=>deleteHandler(row._id) }>Remove</button>
                <button className="btn btn-primary ms-auto" onClick={ ()=>editHandler(row._id) }>View Student</button>
  
              );
            },
    
          },
        {
          dataField: "",
          text: "",
          formatter: (cell,row) => {
            return (
              // <button className="btn btn-primary" onClick={ ()=>deleteHandler(row._id) }>Remove</button>
              <button className="btn btn-danger" onClick={ ()=>deleteHandler(row._id) }>Delete</button>

            );
          },
  
        },
  
      ];
    return (
        <div>
          
          <ToolkitProvider
            keyField="_id"
            data = { studentList && studentList.NewUserList }
            columns={ columns }
            // search
          >
            {
            props => (
            <div>
              {/* <span>Search: </span> */}
              {/* <SearchBar { ...props.searchProps } /> */}
              <hr />
        
            <BootstrapTable
                  { ...props.baseProps }
                 bootstrap4
                 keyField="_id"
                 data={ studentList && studentList.NewUserList }
                 columns={columns}
                //  filter={ filterFactory() }
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

export default StudentTable
