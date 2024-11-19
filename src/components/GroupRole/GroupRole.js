import "./GroupRole.scss";
import { useState, useEffect } from "react";
import { fetchGroup } from "../../services/userService";
import { toast } from 'react-toastify';
import { fetchAllRoles, fetchRolesByGroup } from "../../services/roleService";

const GroupRole = (props) => {
    const [userGroups, setUserGroups] = useState([]);
    const [selectGroup, setSelectGroup] = useState("");
    const [listRoles, setListRoles] = useState([]);
    useEffect(() => {
        getGroups();
        getAllRoles();
        getRolesByGroup();
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
            setListRoles(data.DT)
        }
        else {
            toast.error(data.EM);
        }
    }

    const getRolesByGroup = async () => {

        let data = await fetchRolesByGroup();
        console.log("data = ", data);
        if (data && +data.EC === 0) {
        }
        else {
            toast.error(data.EM);
        }
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
                        >
                            <option value="">Please select your group</option>
                            {userGroups.length > 0 && userGroups.map((item, index) => {
                                return <option key={`group-${index}`} value={item.id}>{item.name}</option>;
                            })}
                        </select>
                    </div>
                    <hr />
                    <div className="roles">
                        <h5>Assign roles: </h5>
                        {
                            listRoles && listRoles.length > 0 &&
                            listRoles.map((item, index) => {
                                return (
                                    <div className="form-check" key={`list-role-${index}`}>
                                        <input className="form-check-input" type="checkbox" value="" id={`list-role-${index}`} />
                                        <label className="form-check-label" for={`list-role-${index}`}>
                                            {item.url}
                                        </label>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default GroupRole;