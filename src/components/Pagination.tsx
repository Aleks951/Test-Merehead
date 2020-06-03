import React from "react";
import { connect } from "react-redux";
import { state, pagination } from "../reducer/index";

interface props {
    pagination: pagination,
    selectPage: Function
};

function Pagination(props: props) {
    let numbers: Array<JSX.Element> | null = null;
    let pagination = props.pagination;

    if (pagination.pages !== 0) {
        numbers = Array();
        for (let i: number = 1; i <= pagination.pages; ++i) {
            numbers.push(
                <li
                    className={i - 1 === pagination.selectedPage ? "page-item active" : "page-item"}
                >
                    <button
                        className="page-link"
                        onClick={() => { props.selectPage(i - 1) }}
                    >
                        {i}
                    </button>
                </li>
            );
        };
    };

    return (
        <div className="wrap-pagination">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => { props.selectPage("prev") }}
                        >
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    {numbers}
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => { props.selectPage("next") }}
                        >
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default connect(
    (state: state) => ({
        pagination: state.pagination
    }),
    (dispatch) => ({
        selectPage: (value: number | string) => {
            dispatch({ type: "SELECTPAGE", value });
        }
    })
)(Pagination);