import { useState, useEffect } from "react";
import { fetchAllUser, deleteUserById } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";

const User = (props) => {
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(2);
    const [currentUser, setCurrentUser] = useState({});

    const [showModalDelete, setShowModalDelete] = useState(false);
    const handleCloseModal = () => {
        setShowModalDelete(false);
    };
    const handleShowModal = (user) => {
        setShowModalDelete(true);
        setCurrentUser(user);
    };
    const getAllUser = async () => {
        let response = await fetchAllUser(currentPage, limit);
        if (
            response &&
            response.data &&
            response.data.DT &&
            response.data.DT.listUser
        ) {
            setListUser([...response.data.DT.listUser]);
            setTotalPages(response.data.DT.totalPages);
        }
    };
    useEffect(() => {
        getAllUser();
    }, [currentPage]);

    const handlePageClick = (e) => {
        setCurrentPage(e.selected + 1);
    };

    const handleDeleteUser = async () => {
        let response = await deleteUserById(currentUser.id);
        if (response && response.data && response.data.EC === 0) {
            toast.success(response.data.EM);
            await getAllUser();
        } else {
            toast.error(response.data.EM);
        }
        setShowModalDelete(false);
    };

    return (
        <>
            <div className="manage-user-container">
                <div className="container">
                    <div className="text-center fs-1 text-primary fw-bold">
                        Table User
                    </div>
                    <div className="manage-user-content mt-3">
                        <div className="manage-user-button my-2 d-flex justify-content-end">
                            <button
                                type="button"
                                className="btn btn-primary mx-1"
                            >
                                Add User
                            </button>
                            <button type="button" className="btn btn-success">
                                Update User
                            </button>
                        </div>
                        <table className="table table-hover table-bordered">
                            <thead className="table-danger">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">User name</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Position</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUser &&
                                    listUser.length > 0 &&
                                    listUser.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <th scope="row">{item.id}</th>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.sex}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    {item.Group &&
                                                        item.Group.description}
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className=" mx-2 btn btn-warning"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={() =>
                                                            handleShowModal(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        <div className="manage-user-footer">
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
                    </div>
                </div>
            </div>
            <ModalDelete
                show={showModalDelete}
                handleClose={handleCloseModal}
                handleDeleteUser={handleDeleteUser}
            />
        </>
    );
};

export default User;
