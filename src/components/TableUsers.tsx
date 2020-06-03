import React from 'react';
import { connect } from "react-redux";
import { state, user, pagination } from "../reducer/index";

import Pagination from "./Pagination";

import delUser from "../utilities/delUser";

interface props {
    users: Array<user>,
    pagination: pagination,
    initialUsers: Function,
    editUser: Function,
    delUser: Function
};

function TableUsers(props: props) {
    React.useEffect(() => {
        fetch("http://77.120.241.80:8911/api/users")
            .then(res => res.json())
            .then(res => props.initialUsers(res));
    }, []);

    let showUsers: Array<JSX.Element> | null = null;
    if (props.users.length !== 0) {
        showUsers = Array();
        let start: number = props.pagination.selectedPage * props.pagination.outputToPage;
        let end: number = start + props.pagination.outputToPage;

        if (end > props.users.length) end = props.users.length;

        for (; start < end; ++start) {
            let user = props.users[start];
            let i = start;
            showUsers.push(
                <tr>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.desc}</td>
                    <td className="options">
                        <i
                            className="fa fa-pencil-square-o"
                            aria-hidden="true"
                            onClick={() => {props.editUser(i)}}
                        />
                        <i
                            className="fa fa-times-circle"
                            aria-hidden="true"
                            onClick={() => {props.delUser(user.id, i)}}
                        />
                    </td>
                </tr>
            );
        };
    };

    return (
        <React.Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">name</th>
                        <th scope="col">surname</th>
                        <th scope="col">desc</th>
                        <th scope="col">options</th>
                    </tr>
                </thead>
                <tbody>
                    {showUsers}
                </tbody>
            </table>
            <Pagination />
        </React.Fragment>
    );
};

export default connect(
    (state: state) => ({
        users: state.users,
        pagination: state.pagination
    }),
    (dispatch) => ({
        initialUsers: (arr: Array<user>) => {
            dispatch({ type: "INITIALUSERS", arr });
        },
        editUser: (i: number) => {
            dispatch({ type: "EDITUSER", i})
        },
        delUser: (id: number, i: number) => {
            delUser(id, i, dispatch);
        }
    })
)(TableUsers);