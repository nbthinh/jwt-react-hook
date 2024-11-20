import "./GroupRole.scss";
import { useState, useEffect } from "react";
import { fetchGroup } from "../../services/userService";
import { toast } from 'react-toastify';
import { fetchAllRoles, fetchRolesByGroup } from "../../services/roleService";
import _ from "lodash";

const GroupRole = (props) => {
    const [userGroups, setUserGroups] = useState([]);
    const [selectGroup, setSelectGroup] = useState("");
    const [listRoles, setListRoles] = useState([]);
    const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);
    useEffect(() => {
        getGroups();
        getAllRoles();
        // getRolesByGroup();
    }, []);

    const getGroups = async () => {
        let response = await fetchGroup();
        if (response && response.EC === 0) {
            setUserGroups(response.DT);
        }
        else {
            toast.error(response.EM);
        }
    }

    const getAllRoles = async () => {
        let data = await fetchAllRoles();
        if (data && +data.EC === 0) {
            console.log("data.DT = ", data.DT);
            setListRoles(data.DT)
        }
        else {
            toast.error(data.EM);
        }
    }

    const handleOnChangeGroup = async (value) => {
        setSelectGroup(value);
        if (value) {
            let data = await fetchRolesByGroup(value);
            if (data && +data.EC === 0) {
                let result = buildDataRolesByGroup(data.DT.Roles, listRoles);
                console.log("result = ", result);
                setAssignRolesByGroup(result);
            }
            else {
                toast.error(data.EM);
            }
        }
    }

    const buildDataRolesByGroup = (groupRoles, allRoles) => {
        let result = [];
        if (allRoles && allRoles.length > 0) {
            allRoles.map(role => {
                let object = {};
                object.id = role.id;
                object.url = role.url;
                object.description = role.description;
                object.isAssigned = false;
                if (groupRoles && groupRoles.length > 0) {
                    console.log(groupRoles);
                    object.isAssigned = groupRoles.some(item => {
                        console.log(item.url, object.url);
                        return item.url === object.url
                    });
                }
                result.push(object);
            })
        }
        return result;
    }

    const handleSelectRole = (value) => {
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
        let foundIndex = _assignRolesByGroup.findIndex(item => +item.id === +value)
        if (foundIndex > -1) {
            _assignRolesByGroup[foundIndex].isAssigned = !_assignRolesByGroup[foundIndex].isAssigned;
        }
        setAssignRolesByGroup(_assignRolesByGroup);
    }

    return (<div className="group-role-container">
        <div className="container">
            <div className="container mt-3">
                <h4>Group Roles:</h4>
                <div className="assign-group-role">
                    <div className="col-12 col-sm-6 form-group">
                        <label>Select group: (<span className="red">*</span>):</label>
                        <select
                            className={"form-select"}
                            onChange={(event) => handleOnChangeGroup(event.target.value)}
                        >
                            <option value="">Please select your group</option>
                            {userGroups.length > 0 && userGroups.map((item, index) => {
                                return <option key={`group-${index}`} value={item.id}>{item.name}</option>;
                            })}
                        </select>
                    </div>
                    <hr />
                    {
                        selectGroup &&
                        <div className="roles">
                            <h5>Assign roles: </h5>
                            {
                                assignRolesByGroup && assignRolesByGroup.length > 0 &&
                                assignRolesByGroup.map((item, index) => {
                                    return (
                                        <div className="form-check" key={`list-role-${index}`}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox" value={item.id}
                                                checked={item.isAssigned}
                                                id={`list-role-${index}`}
                                                onChange={(event) => handleSelectRole(event.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor={`list-role-${index}`}>
                                                {item.url}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                    <div className="mt-3">
                        <button className="btn btn-warning">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default GroupRole;