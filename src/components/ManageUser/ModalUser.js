import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchAllPosition } from "../../services/userService";
import { useState, useEffect } from "react";

const ModalUser = (props) => {
    const [listPosition, setListPosition] = useState([]);

    const getAllPosition = async () => {
        let response = await fetchAllPosition();
        console.log("check response: ", response);
        if (
            response &&
            response.data &&
            response.data.DT.length > 0 &&
            response.data.EC === 0
        ) {
            setListPosition([...response.data.DT]);
        }
    };

    useEffect(() => {
        getAllPosition();
    }, []);

    return (
        <>
            <Modal show={true} size={"lg"} centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-user-form row">
                        <div className="col-sm-6 form-group">
                            <label>
                                Email ( <span className="text-danger">*</span> )
                            </label>
                            <input className="form-control" />
                        </div>
                        <div className="col-sm-6 form-group">
                            <label>
                                Phone ( <span className="text-danger">*</span> )
                            </label>
                            <input className="form-control" />
                        </div>
                        <div className="col-sm-6 form-group">
                            <label>
                                Username ({" "}
                                <span className="text-danger">*</span> )
                            </label>
                            <input className="form-control" />
                        </div>
                        <div className="col-sm-6 form-group">
                            <label>
                                Password ({" "}
                                <span className="text-danger">*</span> )
                            </label>
                            <input className="form-control" />
                        </div>
                        <div className="col-sm-12 form-group">
                            <label>Address</label>
                            <input className="form-control" />
                        </div>
                        <div className="col-sm-6 form-group">
                            <label>Gender</label>
                            <select className="form-select">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-sm-6 form-group">
                            <label>Position</label>
                            <select className="form-select">
                                {listPosition.length > 0 &&
                                    listPosition.map((item, index) => {
                                        return (
                                            <option
                                                key={item.id}
                                                value={item.name}
                                            >
                                                {item.name}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalUser;
