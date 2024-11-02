import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { userState, useEffect, useState } from "react";
import { fetchGroup, createNewUser } from "../../services/userService";
import { toast } from 'react-toastify';
import _ from "lodash";

const ModalUser = (props) => {
    const { action, dataModalUser } = props;
    const [userGroups, setUserGroups] = useState([]);
    const defaultUserValue = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: ''
    }
    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true
    }
    const [userData, setUserData] = useState(defaultUserValue);
    const [validInputs, setValidInputs] = useState(validInputsDefault);
    useEffect(() => {
        getGroups();
        // if (props.action === "UPDATE") {
        //     console.log("UPDATE = ", props.dataModalUser);
        //     setUserData(props.dataModalUser)
        // }
    }, [])

    useEffect(() => {
        if (action === "UPDATE") {
            console.log("UPDATE = ", dataModalUser);
            setUserData({...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : ""})
        }
    }, [dataModalUser])

    useEffect(() => {
        if (action === "CREATE") {
            if (userGroups && userGroups.length > 0) {
                setUserData({...userData, group: userGroups[0].id})
            }
        }
    }, [action])

    const getGroups = async () => {
        let response = await fetchGroup();
        if (response && response.data && response.data.EC === 0) {
            setUserGroups(response.data.DT);
            if (response.data.DT && response.data.DT.length > 0) {
                let groups = response.data.DT;
                setUserData({...userData, group: groups[0].id})
            }
        }
        else {
            toast.error(response.data.EM);
        }
    }
    const handleOnchangeInput = (value, name) => {
        const _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    }
    const checkValidateInputs = () => {
        setValidInputs(validInputsDefault);
        console.log("userData = ", userData);
        let arr = ['email', 'phone', 'password', 'group'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                toast.error(`Empty input: ${arr[i]} `);
                check = false;
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);
                break;
            }
        }
        return check;
    }

    const handleConfirmUser = async () => {
        let check = checkValidateInputs();
        if (check === true) {
            let res = await createNewUser({...userData, group: userData.group});
            console.log("check response = ", res);
            if (res && res.data && res.data.EC === 0 ) {
                toast.success("Create success");
                props.onHide();
                setUserData({...defaultUserValue, group: userGroups[0].id});
            }
            if (res && res.data && res.data.EC !== 0) {
                toast.error(res.data.EM);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[res.data.DT] = false;
                setValidInputs(_validInputs);
            }
        }
    }
    const handleCloseModalUser = () => {
        props.onHide();
        setUserData(defaultUserValue);
        setValidInputs(validInputsDefault);
    }
    return (
        <>
            <Modal
                size="lg"
                show={props.show}
                className="modal-user"
                onHide={() => handleCloseModalUser()}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>
                            {props.action === "CREATE" ? "Create new user" : "Edit user"}
                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label>Email address (<span className="red">*</span>) :</label>
                            <input disabled={action === "CREATE" ? false : true}
                                className={validInputs.email ? "form-control" : "form-control is-invalid"}
                                type="email" value={userData.email}
                                onChange={(event) => handleOnchangeInput(event.target.value, "email")}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Phone number (<span className="red">*</span>) :</label>
                            <input disabled={action === "CREATE" ? false : true}
                                className={validInputs.phone ? "form-control" : "form-control is-invalid"}
                                type="text" value={userData.phone}
                                onChange={(event) => handleOnchangeInput(event.target.value, "phone")}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Username :</label>
                            <input
                                className={validInputs.username ? "form-control" : "form-control is-invalid"}
                                type="text" value={userData.username}
                                onChange={(event) => handleOnchangeInput(event.target.value, "username")}    
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            { action === "CREATE" &&
                                <>
                                    <label>Password (<span className="red">*</span>) :</label>
                                    <input
                                        className={validInputs.password ? "form-control" : "form-control is-invalid"}
                                        type="password" value={userData.password}
                                        onChange={(event) => handleOnchangeInput(event.target.value, "password")}
                                    />
                                </>
                            }
                        </div>
                        <div className="col-12 col-sm-12 form-group">
                            <label>Address :</label>
                            <input
                                className={validInputs.address ? "form-control" : "form-control is-invalid"}
                                type="text" value={userData.address}
                                onChange={(event) => handleOnchangeInput(event.target.value, "address")}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Gender :</label>
                            <select
                                value={userData.sex}
                                className={validInputs.sex ? "form-select" : "form-select is-invalid"}
                                onChange={(event) => handleOnchangeInput(event.target.value, "sex")}
                            >
                                <option defaultValue value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Group (<span className="red">*</span>) :</label>
                            <select
                                className={validInputs.group ? "form-select" : "form-select is-invalid"}
                                onChange={(event) => handleOnchangeInput(event.target.value, "group")}
                                value={userData.group}
                            >
                                {userGroups.length > 0 && userGroups.map((item, index) => {
                                    return <option key={`group-${index}`} value={item.id}>{item.name}</option>;
                                })}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalUser()}>Close</Button>
                    <Button
                        variant="primary"
                        onClick={() => handleConfirmUser()}    
                    >
                        { action === "CREATE" ? "Save" : "Update" }
                    </Button>
                </Modal.Footer>
            </Modal>
                </>
    );
}

export default ModalUser;