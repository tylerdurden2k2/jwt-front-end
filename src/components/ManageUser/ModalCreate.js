import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchAllPosition, createNewUser } from "../../services/userService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ModalCreate = (props) => {
    const [listPosition, setListPosition] = useState([]);

    const defaultInput = {
        email: "",
        username: "",
        phone: "",
        address: "",
        sex: "",
        groupId: "",
        password: "",
    };

    const isValidFields = {
        email: true,
        username: true,
        phone: true,
        password: true,
    };
    const [isValid, setIsValid] = useState({ ...isValidFields });
    const [inputFields, setInputFields] = useState({ ...defaultInput });

    const handleValidateForm = () => {
        const arr = ["email", "phone", "username", "password"];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!inputFields[arr[i]]) {
                isValidFields[arr[i]] = false;
                check = false;
            }
        }
        setIsValid({ ...isValidFields });
        return check;
    };
    const handleSubmitForm = async () => {
        let check = handleValidateForm();
        console.log("check: ", check);
        console.log("check fields: ", inputFields);
        if (check) {
            let response = await createNewUser(inputFields);
            console.log("check response: ", response);
            if (response && response.data && response.data.EC === 0) {
                toast.success(response.data.EM);
                props.handleClose();
                props.refreshPage();
                setInputFields({});
            } else {
                toast.error(response.data.EM);
            }
        } else {
            toast.error("You need to enter all required information");
            return;
        }
    };
    const getAllPosition = async () => {
        let response = await fetchAllPosition();
        if (
            response &&
            response.data &&
            response.data.DT.length > 0 &&
            response.data.EC === 0
        ) {
            setListPosition([...response.data.DT]);
            setInputFields({
                ...inputFields,
                groupId: response.data.DT[0].id,
                sex: "Male",
            });
        }
    };
    const handleOnChangeInput = (value, name) => {
        let copyObj = {
            ...inputFields,
        };
        copyObj[name] = value;
        console.log("check obj: ", copyObj);
        setInputFields({ ...copyObj });
    };

    useEffect(() => {
        getAllPosition();
    }, []);

    return (
        <>
            <Modal
                size={"lg"}
                centered={true}
                show={props.show}
                onHide={props.handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-user-form row">
                        <div className="col-sm-6 form-group">
                            <label>
                                Email ( <span className="text-danger">*</span> )
                            </label>
                            <input
                                className={
                                    isValid.email
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                value={inputFields.email}
                                onChange={(e) =>
                                    handleOnChangeInput(e.target.value, "email")
                                }
                            />
                        </div>
                        <div className="col-sm-6 form-group">
                            <label>
                                Phone ( <span className="text-danger">*</span> )
                            </label>
                            <input
                                className={
                                    isValid.phone
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                value={inputFields.phone}
                                onChange={(e) =>
                                    handleOnChangeInput(e.target.value, "phone")
                                }
                            />
                        </div>
                        <div className="col-sm-6 form-group">
                            <label>
                                Username ({" "}
                                <span className="text-danger">*</span> )
                            </label>
                            <input
                                className={
                                    isValid.username
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                value={inputFields.username}
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
                                type="password"
                                className={
                                    isValid.password
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                value={inputFields.password}
                                onChange={(e) =>
                                    handleOnChangeInput(
                                        e.target.value,
                                        "password"
                                    )
                                }
                            />
                        </div>
                        <div className="col-sm-12 form-group">
                            <label>Address</label>
                            <input
                                className="form-control"
                                value={inputFields.address}
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
                                value={inputFields.sex}
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
                                value={inputFields.groupId}
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
                        onClick={() => handleSubmitForm()}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalCreate;
