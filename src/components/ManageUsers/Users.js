import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchAllUsers, deleteUser } from "../../services/userService";
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
import "./Users.scss";
const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    // Modal Delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModal, setDataModal] = useState({});

    // Modal create, update
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [actionModalUser, setActionModalUser] = useState("CREATE");
    const [dataModalUser, setDataModalUser] = useState({});
    let history = useHistory();
    // useEffect(() => {
    //     let session = sessionStorage.getItem("account"); 
    //     if (!session) {
    //         history.push("/login")
    //     }
    // }, []);

    useEffect(() => {
        console.log("Chạy lại");
        fetchUsers();
    }, [currentPage]);


    const fetchUsers = async (page) => {
        let response = await fetchAllUsers(currentPage, currentLimit);
        console.log(">>>>> check response = ", response);
        if (response && response.EC === 0 && response.DT.users) {
            console.log("response.DT = ", response);
            setTotalPages(response.DT.totalPages);
            setListUsers(response.DT.users);
        }
    }
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
        // await fetchUsers(+event.selected + 1);
    };

    const handleDeleteUser = async (user) => {
        setDataModal(user);
        setIsShowModalDelete(true);
        // let response = await deleteUser(user);
        // console.log(">>> check response = ", response);
        // if (response && response.EC === 0) {
        //     toast.success(response.EM);
        //     await fetchUsers();
        // }
        // else {
        //     toast.error(response.EM);
        // }
    }

    const handleClose = () => {
        setIsShowModalDelete(false);
        setDataModal({});
    }

    const onHideModalUser = async () => {
        setIsShowModalUser(false);
        setDataModal({});
        await fetchUsers();
    }


    const confirmDeleteUser =async () => {
        let response = await deleteUser(dataModal);
        console.log(">>> check response = ", response);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            await fetchUsers();
            setIsShowModalDelete(false);
        }
        else {
            toast.error(response.EM);
        }
    }

    const handleEditUser = async (user) => {
        console.log("user = ", user);
        setDataModalUser(user);
        setActionModalUser("UPDATE");
        setIsShowModalUser(true);
    }
    
    const handleRefresh =async () => {
        await fetchUsers();
    }

    return (
        <>
            <div className="container">
                <div className="manage-users-container">
                    <div className="user-header">
                        <div className="title mt-3">
                            <h3>Manage Users</h3>
                        </div>
                        <div className="actions my-3">
                            <button
                                className="btn btn-success refresh"
                                onClick={() => handleRefresh()}
                            >
                                <i className="fa fa-refresh"></i>
                                Refresh
                            </button>
                            <button className="btn btn-primary"
                                onClick={() => {
                                    setActionModalUser("CREATE");
                                    // setDataModalUser({});
                                    setIsShowModalUser(true);
                                }}
                            >
                                <i className="fa fa-plus-circle"></i>
                                Add new user
                            </button>
                        </div>
                    </div>
                    <div className="user-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Group</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { listUsers && listUsers.length > 0 ?
                                    <>
                                        { listUsers.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ""}</td>
                                                    <td>
                                                        <span
                                                            title="Edit"
                                                            className="edit"
                                                            onClick={() => handleEditUser(item)}
                                                        >
                                                            <i className="fa fa-pencil"></i>
                                                        </span>
                                                        <span
                                                            title="Delete"
                                                            className="delete"
                                                            onClick={() => handleDeleteUser(item)}
                                                        >
                                                            <i className="fa fa-trash-o"></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        }) }
                                    </>
                                    :
                                    <>
                                        <tr>
                                            <td>Not found user</td>
                                        </tr>
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>
                    { totalPages > 0 && 
                        <div className="user-footer">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }
                </div>
            </div>

            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />
            <ModalUser
                show={isShowModalUser}
                onHide={onHideModalUser}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
        </>
    );
}

export default Users;