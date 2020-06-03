import React from 'react';
import { connect } from "react-redux";
import { state } from "../reducer/index";

import TableUsers from "./TableUsers";
import Form from "./Form";

interface props {
    showForm: boolean,
    addUser: Function
};

function App(props: props) {
    return (
        <React.Fragment>
            {props.showForm ? <Form /> : null}
            <div className="wrap-button-create-user">
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {props.addUser()}}
                >Создать пользователя</button>
            </div>
            <TableUsers />
        </React.Fragment>
    );
};

export default connect(
    (state: state) => ({
        showForm: state.showForm
    }),
    (dispatch) => ({
        addUser: () => {
            dispatch({ type: "ADDUSER" });
        }
    })
)(App);