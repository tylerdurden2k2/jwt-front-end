import { useEffect, useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const Role = (props) => {
    const [listChild, setListChild] = useState({
        child1: { url: "", description: "" },
    });
    const handleOnChangeInput = (key, value, name) => {
        let copyObj = _.cloneDeep(listChild);
        copyObj[key][name] = value;
        setListChild({ ...copyObj });
    };
    const handleAddNewField = () => {
        let copyObj = _.cloneDeep(listChild);
        let randomKey = uuidv4();
        copyObj[randomKey] = { url: "", description: "" };
        setListChild({ ...copyObj });
    };
    const handleDeleteField = (key) => {
        let copyObj = _.cloneDeep(listChild);
        delete copyObj[key];
        setListChild({ ...copyObj });
    };
    console.log("check statet: ", listChild);
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
                                        className="form-control"
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
                    <button className="btn btn-warning">Save</button>
                </div>
            </div>
        </div>
    );
};
export default Role;
