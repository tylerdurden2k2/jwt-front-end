import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { getAllRole } from "../../services/roleService";

const TableRole = (props) => {
    const [limit, setLimit] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [listRole, setListRole] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const handlePageClick = (e) => {
        setCurrentPage(e.selected + 1);
    };
    const fetchAllRole = async () => {
        let response = await getAllRole(currentPage, limit);
        if (response && response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            setListRole(response.DT.listRole);
        } else {
            toast.error(response.EM);
        }
    };
    useEffect(() => {
        fetchAllRole();
    }, [currentPage]);
    return (
        <div className="container mt-3">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Id</th>
                        <th scope="col">URL</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listRole.length > 0 &&
                        listRole.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <th scope="row">
                                        {(currentPage - 1) * limit + index + 1}
                                    </th>
                                    <td>{item.id}</td>
                                    <td>{item.url}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <button className="btn btn-primary mx-2">
                                            Edit
                                        </button>
                                        <button className="btn btn-danger">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
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
    );
};

export default TableRole;
