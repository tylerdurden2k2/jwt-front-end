import { useState, useRef } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { createRole } from "../../services/roleService";
import { toast } from "react-toastify";
import TableRole from "./TableRole";

const Role = (props) => {
    const [listChild, setListChild] = useState({
        child1: { url: "", description: "", isValid: true },
    });
    const childRef = useRef();
    const handleOnChangeInput = (key, value, name) => {
        let copyObj = _.cloneDeep(listChild);
        copyObj[key][name] = value;
        if (copyObj[key]["url"]) {
            copyObj[key]["isValid"] = true;
        }
        setListChild({ ...copyObj });
    };
    const handleAddNewField = () => {
        let copyObj = _.cloneDeep(listChild);
        let randomKey = uuidv4();
        copyObj[randomKey] = { url: "", description: "", isValid: true };
        setListChild({ ...copyObj });
    };
    const handleDeleteField = (key) => {
        let copyObj = _.cloneDeep(listChild);
        delete copyObj[key];
        setListChild({ ...copyObj });
    };
    const buildDataToPersist = () => {
        let copyObj = { ...listChild };
        let result = [];
        Object.entries(copyObj).map(([key, value]) => {
            result.push({
                url: value.url,
                description: value.description,
            });
        });
        return result;
    };
    const handleOnSave = async () => {
        let emptyChild = Object.entries(listChild).find(([key, value]) => {
            return !value["url"];
        });
        if (!emptyChild) {
            //call api
            let data = buildDataToPersist();
            let response = await createRole(data);
            if (response && response.EC === 0) {
                toast.success(response.EM);
                childRef.current.fetchAllRoleFromChild();
                setListChild({
                    child1: { url: "", description: "", isValid: true },
                });
            } else {
                toast.error(response.EM);
            }
        } else {
            let key = emptyChild[0];
            let copyObj = { ...listChild };
            copyObj[key]["isValid"] = false;
            setListChild({ ...copyObj });
        }
    };
    return (
        <div className="role-container">
            <div className="container">
                <div className="text-center fs-2 fw-bold text-primary">
                    ADD ROLE
                </div>
                <div className="row row-parent">
                    {Object.entries(listChild).map(([key, value], index) => {
                        return (
                            <div
                                className={`col-12 row-child row child-${key}`}
                                key={key}
                            >
                                <div className="col-5 form-group">
                                    <label>URL: </label>
                                    <input
                                        className={
                                            value["isValid"]
                                                ? "form-control"
                                                : "form-control is-invalid"
                                        }
                                        value={value["url"]}
                                        onChange={(e) =>
                                            handleOnChangeInput(
                                                key,
                                                e.target.value,
                                                "url"
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-5 form-group">
                                    <label>Description: </label>
                                    <input
                                        className="form-control"
                                        value={value["description"]}
                                        onChange={(e) =>
                                            handleOnChangeInput(
                                                key,
                                                e.target.value,
                                                "description"
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-2 mt-4 pt-1">
                                    <span
                                        className="p-2"
                                        onClick={() => handleAddNewField()}
                                    >
                                        <i className="fa fa-plus-circle mx-1 text-success" />
                                    </span>
                                    <span className="p-2">
                                        {index === 0 ? (
                                            ""
                                        ) : (
                                            <i
                                                className="fa fa-trash text-danger"
                                                onClick={() =>
                                                    handleDeleteField(key)
                                                }
                                            />
                                        )}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-3">
                    <button
                        className="btn btn-warning"
                        onClick={() => handleOnSave()}
                    >
                        Save
                    </button>
                </div>
            </div>
            <TableRole ref={childRef} />
        </div>
    );
};
export default Role;
