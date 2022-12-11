import { useState, useEffect } from "react";
import { fetchAllUser, deleteUserById } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalCreate from "./ModalCreate";
import ModalUpdate from "./ModalUpdate";

const User = (props) => {
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(2);
    //data User to delete
    const [currentUser, setCurrentUser] = useState({});
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    //data User to update
    const [dataUser, setDataUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleCloseModalCreate = () => {
        setShowModalCreate(false);
    };
    const handleCloseModalUpdate = () => {
        setShowModalUpdate(false);
    };
    const handleShowModalUpdate = (user) => {
        setShowModalUpdate(true);
        let groupId = user.Group.id;
        const { ["Group"]: group, ...handleUser } = user;
        setDataUser({ ...handleUser, groupId });
    };

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
        console.log("check response: ", response);
        if (response && response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            if (
                response.DT.totalPages > 0 &&
                response.DT.listUser.length === 0
            ) {
                setCurrentPage(response.DT.totalPages);
                await fetchAllUser(response.DT.totalPages, limit);
            }
            if (response.DT.totalPages > 0 && response.DT.listUser.length > 0) {
                setListUser(response.DT.listUser);
            }
        }
    };
    useEffect(() => {
        getAllUser();
    }, [currentPage, totalPages]);

    const handlePageClick = (e) => {
        setCurrentPage(e.selected + 1);
    };

    const handleDeleteUser = async () => {
        let response = await deleteUserById(currentUser.id);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            await getAllUser();
        } else {
            toast.error(response.EM);
        }
        setShowModalDelete(false);
    };
    const refreshAfterHandleSuccess = () => {
        getAllUser();
    };
    const handleClickRefreshPage = async () => {
        setIsLoading(true);
        setTimeout(() => {
            refreshAfterHandleSuccess();
            setIsLoading(false);
        }, 1000);
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
                                onClick={() => setShowModalCreate(true)}
                            >
                                <i className="fa fa-plus-circle mx-1" />
                                Add User
                            </button>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => handleClickRefreshPage()}
                            >
                                <i className="fa fa-refresh mx-1" />
                                Refresh
                            </button>
                        </div>
                        <table className="table table-hover table-bordered">
                            <thead className="table-danger">
                                <tr>
                                    <th scope="col">#No</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">User name</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Position</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            {isLoading ? (
                                <div>Loading ...</div>
                            ) : (
                                <tbody>
                                    {listUser &&
                                        listUser.length > 0 &&
                                        listUser.map((item, index) => {
                                            return (
                                                <tr key={item.id}>
                                                    <th scope="row">
                                                        {(currentPage - 1) *
                                                            limit +
                                                            index +
                                                            1}
                                                    </th>
                                                    <th scope="row">
                                                        {item.id}
                                                    </th>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.sex}</td>
                                                    <td>{item.address}</td>
                                                    <td>
                                                        {item.Group &&
                                                            item.Group
                                                                .description}
                                                    </td>
                                                    <td>
                                                        <span
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                            title="Edit"
                                                            className="fs-5 px-2 mx-1"
                                                            onClick={() =>
                                                                handleShowModalUpdate(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <i className="fa fa-pencil text-warning" />
                                                        </span>
                                                        <span
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                            title="Delete"
                                                            className="fs-5 px-2 mx-1"
                                                            onClick={() =>
                                                                handleShowModal(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <i className="fa fa-trash text-danger" />
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            )}
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
                                forcePage={+currentPage - 1}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ModalDelete
                show={showModalDelete}
                handleClose={handleCloseModal}
                handleDeleteUser={handleDeleteUser}
                user={currentUser}
            />
            <ModalCreate
                handleClose={handleCloseModalCreate}
                show={showModalCreate}
                refreshPage={refreshAfterHandleSuccess}
            />
            <ModalUpdate
                handleClose={handleCloseModalUpdate}
                show={showModalUpdate}
                refreshPage={refreshAfterHandleSuccess}
                dataUser={dataUser}
            />
        </>
    );
};

export default User;
