import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {Button, Modal, Table} from "react-bootstrap";


const DataTable = () => {
  const [users, setUsers] = useState([]);

  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");

  const [show, setShow] = useState({});
  const [modalValue, setModalValue] = useState({});
  const [viewIndex,setViewIndex] = useState();
  const [viewUserIndex, setViewUserIndex] = useState();
  const handleClose = () => setShow({});

  const handleShow = (userItem) => {
    setShow({ showModal: true, items: userItem });
    setModalValue(userItem);
    console.log('userItem',userItem)
  };

  const handleDataView = (userItem,index) => {
  setShow({showModaldata: true, items: userItem });
  setModalValue(userItem);
  setViewIndex(index)
  console.log(index,"index")
 }
useEffect(()=>{
  getUserList();
  }, []);
 
const handleModelDelete = (modalValue) => {
  let modalId = modalValue._id;
  console.log(modalValue._id, "userItem");
    axios
      .delete(`/v4/api/deleteuserData/${modalId}`)
      .then((users) => {
        getUserList();
        console.log(users, "---ashish");
        alert("data deleted successfully");
        window.location.reload();
      })
      .catch((err) => console.log(err));
      console.log(users, "My delete")
}
const handleModelSave = () => {
    let modalId = modalValue._id;
    axios
      .put(`/v3/api/putuserData/${modalId}`, modalValue)
      .then((users) => {
        alert("updated successfully");
        console.log(users, "updated data");
        setFilterData();
        window.location.reload();
      })
      .catch((error) => console.log(error));
        setFilterData();
  };


  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const npage = Math.ceil(users.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [rowCount, setRowCount] = useState(0);

const getUserList = () => {
  axios.get(`/v2/api/getuserData`)
      .then((response)=> {
        setUsers(response.data);
        setFilterData(response.data);
        setRowCount(response.data.length);
      })
      .catch((err) => console.log(err))
  };
  useEffect(() => {
    getUserList();
  }, []);

  const deleteData = (userItem, index) => {
    setShow({showModaldeletion: true, items: userItem });
    setModalValue(userItem);
    setViewUserIndex(index)
    console.log(index,"index")
   }

const handleModalChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value, "ashish");
    setModalValue({ ...modalValue, [name]: value });
  };

const handlesearch = (event) => {
    const getSearch = event.target.value;
    if (getSearch.length > 0) {
      const searchdata = users.filter((item) =>
        item.firstName.toLowerCase().includes(getSearch) ||
        item.email.toLowerCase().includes(getSearch) ||
        item.profile.toLowerCase().includes(getSearch)
      );
      setUsers(searchdata);
    } else {
      setUsers(filterData);
    }
    setQuery(getSearch);
  };

  return (
    <>
      <div className="table-container">
        <div className="user-data">
          <div className="search-type">
            <h4>Total counts: {rowCount}</h4>
            <div className="search-menu">
              <label>Search By</label>
              <br />
              <select className="selection">
                <option value disabled>
                  Select type
                </option>
                <option value="all">All Users</option>
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="profile">Profile</option>
              </select>
            </div>
            <div className="search-input">
              <label>Enter Name/Email/Profile</label>
              <br />
              <div className="dFlex">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => handlesearch(e)}
                  placeholder="Enter search term..."
                />
                <button type="submit">
                  <div className="fa fa-search textWhite"></div>
                </button>
              </div>
            </div>
          </div>
          <div className="table-data">
            <div className="table-size">
              <table className=" main-table">
                <thead className="table-head">
                  <tr>
                    <th scope="col">Sr. no.</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Profile</th>
                    <th scope="col" colSpan={3} className="colspan-action">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((user, index) => (
                    <tr key={user._id}>
                      <td className="sr-no">
                        {index + 1 + (currentPage - 1) * recordsPerPage}
                      </td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.profile}</td>
                      <td
                        className="td-action1"
                        onClick={() => handleDataView(user,index + 1 + (currentPage - 1) * recordsPerPage)}
                      >
                        View
                      </td>
                      <td
                        className="td-action2"
                        onClick={() => handleShow(user)}
                      >
                        Update
                      </td>
                      <td
                        className="td-action3"
                        onClick={() => deleteData(user,index+1+ (currentPage - 1) * recordsPerPage)}
                      >
                        Delete
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="nav-page">
          <div className="back-btn">
            <button type="submit">
              <Link to="/" className="back-link">
                Back
              </Link>
            </button>
          </div>
          <div className="nav-list">
            <nav className="">
              <ul className="pagination">
                <li className="page-item">
                  <Link to="#" className="page-link" onClick={prePage}>
                    Prev
                  </Link>
                </li>
                {numbers.map((n, i) => (
                  <li
                    className={`page-item ${currentPage === n ? "active" : ""}`}
                    key={i}
                  >
                    <Link
                      to="#"
                      className="page-link"
                      onClick={() => changeCPage(n)}
                    >
                      {n}
                    </Link>
                  </li>
                ))}
                <li className="page-item">
                  <Link to="#" className="page-link" onClick={nextPage}>
                    Next
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
        <Modal
          className="model-content"
          show={show.showModal}
          onHide={handleClose}
          centered
          size="lg"
        >
          <Modal.Header closeButton style={{background:'#51518B', color:'#FDFEFE'}}>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Table variant="" size="sm" style={{marginRight:"30px"}}>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Profile</th>
        </tr>
      </thead>
      <tbody>
     
      </tbody>
    </Table>
            <input
              name="firstName"
              type="text"
              value={modalValue.firstName}
              onChange={handleModalChange} maxLength={20} 
            />
            <input
              name="lastName"
              type="text"
              value={modalValue.lastName}
              onChange={handleModalChange} maxLength={20} 
            />
            <input
              name="email"
              type="text"
              value={modalValue.email}
              onChange={handleModalChange} maxLength={30} 
            />
            <input
              name="profile"
              type="text"
              // value={modalValue.profile}
              onChange={handleModalChange} maxLength={20} 
            />
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleModelSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          className="model-content"
          show={show.showModaldata}
          onHide={handleClose}
          centered
          size="lg"
        >
          <Modal.Header closeButton style={{background:'#45B39D', color:"#FDFEFE"}}>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Table variant="" size="sm" style={{marginRight:"30px"}}>
      <thead>
        <tr>
          <th>Sr. no</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Profile</th>
        </tr>
      </thead>
    </Table>
    <div className="model-view">
      <p>{viewIndex}</p>
      <p>{modalValue.firstName }</p>   
      <p>{modalValue.lastName }</p>   
      <p>{modalValue.email }</p>   
      <p>{modalValue.profile }</p> 
      </div>  
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          className="model-content"
          show={show.showModaldeletion}
          onHide={handleClose}
          centered
          size="lg"
        >
          <Modal.Header closeButton style={{background:'#E59866', color:'#FDFEFE'}}>
            <Modal.Title>Click on confirm botton if want to delete this user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
         
          <Table variant="" size="sm" style={{marginRight:"30px"}}>
      <thead>
        <tr>
          <th>Sr. no</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Profile</th>
        </tr>
      </thead>
    </Table>
    <div className="model-view">
      <p>{viewUserIndex}</p>
      <p>{modalValue.firstName }</p>   
      <p>{modalValue.lastName }</p>   
      <p>{modalValue.email }</p>   
      <p>{modalValue.profile }</p> 
      </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancle
            </Button>
            <Button variant="primary" onClick={()=>handleModelDelete(modalValue)}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
        
      
    </>
    
  );
  function prePage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCPage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    if (currentPage!== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }
};

export default DataTable;
