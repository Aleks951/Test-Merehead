import React from 'react';
import { connect } from "react-redux";
import { state, form } from "../reducer/index";

import saveUser from "../utilities/saveUser";

interface props {
    form: form,
    closeForm: Function,
    changesInputForm: Function,
    saveUser: Function
};

function Form(props: props) {
    return (
        <div className="wrap-form">
            <div className="form-group my-wrap">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        className="form-control"
                        value={props.form.name}
                        onChange={(e) => { props.changesInputForm("name", e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Surname</label>
                    <input
                        className="form-control"
                        value={props.form.surname}
                        onChange={(e) => { props.changesInputForm("surname", e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Desc</label>
                    <input
                        className="form-control"
                        value={props.form.desc}
                        onChange={(e) => { props.changesInputForm("desc", e.target.value) }}
                    />
                </div>
                <div className="wrap-buttons-form">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => { props.saveUser(props.form) }}
                    >Save</button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => { props.closeForm() }}
                    >Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default connect(
    (state: state) => ({
        form: state.form
    }),
    (dispatch) => ({
        closeForm: () => {
            dispatch({ type: "CLOSEFORM" })
        },
        changesInputForm: (name: string, value: string) => {
            dispatch({ type: "CHANGESINPUTFORM", name, value });
        },
        saveUser: (form: form) => {
            saveUser(form, dispatch);
        }
    })
)(Form);