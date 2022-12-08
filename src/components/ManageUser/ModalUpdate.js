import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchAllPosition, updateUser } from "../../services/userService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ModalUpdate = (props) => {
    const [listPosition, setListPosition] = useState([]);
    const [dataUser, setDataUser] = useState({});

    useEffect(() => {
        setDataUser({
            ...props.dataUser,
        });
    }, [props.dataUser]);

    const getAllPosition = async () => {
        let response = await fetchAllPosition();
        if (response && response.DT.length > 0 && response.EC === 0) {
            setListPosition([...response.DT]);
        }
    };
    const handleOnChangeInput = (value, name) => {
        const copyObj = { ...dataUser };
        copyObj[name] = value;
        setDataUser({ ...copyObj });
    };

    useEffect(() => {
        getAllPosition();
    }, []);

    const handleConfirmUpdate = async () => {
        let response = await updateUser(dataUser);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            props.handleClose();
            props.refreshPage();
        } else {
            toast.error(response.EM);
        }
    };

    return (
        <>
            <Modal
                size={"lg"}
                centered={true}
                show={props.show}
                onHide={props.handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-user-form row">
                        <div className="col-sm-6 form-group">
                            <label>
                                Email ( <span className="text-danger">*</span> )
                            </label>
                            <input
                                className={"form-control"}
                                value={dataUser.email}
                                disabled
                            />
                        </div>
                        <div className="col-sm-6 form-group">
                            <label>
                                Phone ( <span className="text-danger">*</span> )
                            </label>
                            <input
                                className={"form-control"}
                                value={dataUser.phone}
                                disabled
                            />
                        </div>
                        <div className="col-sm-6 form-group">
                            <label>
                                Username ({" "}
                                <span className="text-danger">*</span> )
                            </label>
                            <input
                                className={"form-control"}
                                value={dataUser.username}
                                onChange={(e) =>
                                    handleOnChangeInput(
                                        e.target.value,
                                        "username"
                                    )
                                }
                            />
                        </div>
                        <div className="col-sm-6 form-group">
                            <label>
                                Password ({" "}
                                <span className="text-danger">*</span> )
                            </label>
                            <input
                                className={"form-control"}
                                value={dataUser.password}
                                disabled
                            />
                        </div>
                        <div className="col-sm-12 form-group">
                            <label>Address</label>
                            <input
                                className="form-control"
                                value={dataUser.address}
                                onChange={(e) =>
                                    handleOnChangeInput(
                                        e.target.value,
                                        "address"
                                    )
                                }
                            />
                        </div>
                        <div className="col-sm-6 form-group">
                            <label>Gender</label>
                            <select
                                className="form-select"
                                value={dataUser.sex}
                                onChange={(e) =>
                                    handleOnChangeInput(e.target.value, "sex")
                                }
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-sm-6 form-group">
                            <label>Position</label>
                            <select
                                className="form-select"
                                value={dataUser.groupId}
                                onChange={(e) =>
                                    handleOnChangeInput(
                                        e.target.value,
                                        "groupId"
                                    )
                                }
                            >
                                {listPosition.length > 0 &&
                                    listPosition.map((item, index) => {
                                        return (
                                            <option
                                                key={item.id}
                                                value={item.id}
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
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handleConfirmUpdate()}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalUpdate;
