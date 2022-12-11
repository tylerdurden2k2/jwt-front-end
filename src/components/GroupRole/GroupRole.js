import { useState, useEffect } from "react";
import { fetchAllPosition } from "../../services/userService";
import {
    getAllRoleOnePage,
    getRoleByGroupId,
    assignRoleForGroup,
} from "../../services/roleService";
import { toast } from "react-toastify";
const GroupRole = (props) => {
    const [listPosition, setListPosition] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState("");
    const [listRole, setListRole] = useState([]);
    const [roleByPosition, setRoleByPosition] = useState([]);

    const getAllPosition = async () => {
        let response = await fetchAllPosition();
        if (response && response.DT.length > 0 && response.EC === 0) {
            setListPosition([...response.DT]);
        }
    };
    const fetchAllRole = async () => {
        let response = await getAllRoleOnePage();
        if (response && response.DT.length > 0 && response.EC === 0) {
            setListRole([...response.DT]);
        }
    };
    const handleOnChangePosition = async (e) => {
        setSelectedPosition(e.target.value);
        if (e.target.value) {
            let response = await getRoleByGroupId(+e.target.value);
            if (response && response.EC === 0) {
                let result = buildData(response.DT.Roles, listRole);
                setRoleByPosition([...result]);
            }
        }
    };
    const buildData = (groupRole, allRole) => {
        let result = [];
        if (allRole.length > 0) {
            allRole.map((role) => {
                let object = {};
                object.url = role.url;
                object.id = role.id;
                object.description = role.description;
                object.isAssigned = false;
                if (groupRole.length > 0) {
                    object.isAssigned = groupRole.some(
                        (item) => item.url === object.url
                    );
                }
                result.push(object);
            });
        }
        return result;
    };
    const handleToAssignRole = async () => {
        let assignRole = roleByPosition.filter((item) => item.isAssigned);
        let data = buildDataToSave(+selectedPosition, assignRole);
        let response = await assignRoleForGroup(data);
        console.log("check response: ", response);
        if (response && response.EC === 0) {
            toast.success(response.EM);
        } else {
            toast.error(response.EM);
        }
    };
    const buildDataToSave = (groupId, data) => {
        let result = data.map((item) => {
            let object = {};
            object.roleId = item.id;
            object.groupId = groupId;
            return object;
        });
        return result;
    };
    const handleChangeSelectRole = (e) => {
        const copyRoleByPosition = [...roleByPosition];
        let indexItem = copyRoleByPosition.findIndex(
            (item) => +item.id === +e.target.value
        );
        copyRoleByPosition[indexItem].isAssigned =
            !copyRoleByPosition[indexItem].isAssigned;
        setRoleByPosition([...copyRoleByPosition]);
    };
    useEffect(() => {
        getAllPosition();
        fetchAllRole();
    }, []);
    return (
        <div className="group-role-container">
            <div className="container">
                <div className="fs-2 fw-bold text-center text-primary">
                    Assign Role For Group
                </div>
                <div className="row group-position-select mt-2">
                    <div className="col-6">
                        <select
                            className="form-select"
                            value={selectedPosition}
                            onChange={(e) => handleOnChangePosition(e)}
                        >
                            <option value="">
                                -- Select group to assign --
                            </option>
                            {listPosition.length > 0 &&
                                listPosition.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                </div>
                <hr />
                {selectedPosition && (
                    <div className="row group-role-select">
                        <div className="select-item col-6">
                            {roleByPosition.length > 0 &&
                                roleByPosition.map((item) => {
                                    return (
                                        <div
                                            className="form-check"
                                            key={item.id}
                                        >
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={item.id}
                                                id={`role-id-${item.id}`}
                                                checked={item.isAssigned}
                                                onChange={(e) =>
                                                    handleChangeSelectRole(e)
                                                }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor={`role-id-${item.id}`}
                                            >
                                                {item.url}
                                            </label>
                                        </div>
                                    );
                                })}
                        </div>
                        <div>
                            <button
                                className="btn btn-warning"
                                onClick={() => handleToAssignRole()}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default GroupRole;
