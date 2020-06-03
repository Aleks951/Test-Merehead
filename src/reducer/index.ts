import paginationFunction from "../utilities/pagination";

export interface user {
    id: number,
    name: string,
    surname: string,
    desc: string
};

export interface form extends user {
    newUser: boolean
};

export interface pagination {
    outputToPage: number,
    pages: number,
    selectedPage: number
};

export interface state {
    users: Array<user>,
    pagination: pagination,
    showForm: boolean,
    form: form
};

const initialState: state = {
    showForm: false,
    users: new Array(),
    pagination: {
        outputToPage: 5,
        pages: 0,
        selectedPage: 0
    },
    form: {
        id: 0,
        name: "",
        surname: "",
        desc: "",
        newUser: false
    }
};

let userID: number = 0;

export default (state = initialState, action: any) => {
    // ADDUSER
    if (action.type === "ADDUSER") {
        let form: form = {
            id: 0,
            name: "",
            surname: "",
            desc: "",
            newUser: true
        };

        return {
            ...state,
            showForm: true,
            form
        };
    };

    // EDITUSER
    if (action.type === "EDITUSER") {
        let form: form = {
            ...state.users[action.i],
            newUser: false
        };

        userID = action.i;

        return {
            ...state,
            showForm: true,
            form
        };
    };

    // CHANGESINPUTFORM
    if (action.type === "CHANGESINPUTFORM") {
        let form: any = {
            ...state.form
        };

        form[action.name] = action.value;

        return {
            ...state,
            form
        };
    };

    // CLOSEFORM
    if (action.type === "CLOSEFORM") {
        return {
            ...state,
            showForm: false
        };
    };

    // SAVEUSER
    if (action.type === "SAVEUSER") {
        let users = [
            ...state.users
        ];

        if (state.form.newUser) {
            users.push(action.res);
        } else {
            users[userID] = action.res;
        };

        let pagination = {
            ...state.pagination,
            pages: paginationFunction(state.pagination.outputToPage, users.length)
        };

        return {
            ...state,
            users,
            pagination,
            showForm: false
        };
    };

    // DELUSER
    if (action.type === "DELUSER") {
        let users = [
            ...state.users
        ];

        users.splice(action.i, 1);

        let pagination = {
            ...state.pagination,
            pages: paginationFunction(state.pagination.outputToPage, users.length)
        };

        return {
            ...state,
            users,
            pagination
        };
    };
    
    // INITIALUSERS
    if (action.type === "INITIALUSERS") {
        let pagination = {
            ...state.pagination,
            pages: paginationFunction(state.pagination.outputToPage, action.arr.length)
        };

        return {
            ...state,
            users: action.arr,
            pagination
        };
    };

    // SELECTPAGE
    if (action.type === "SELECTPAGE") {
        let pagination = {
            ...state.pagination
        };
        if (isNaN(action.value * 1)) {
            if (action.value === "prev") {
                pagination.selectedPage = pagination.selectedPage === 0 ? 0 : --pagination.selectedPage;
            } else {
                pagination.selectedPage = pagination.selectedPage === pagination.pages - 1 ? pagination.pages - 1 : ++pagination.selectedPage;
            };
        } else {
            pagination.selectedPage = action.value;
        };

        return {
            ...state,
            pagination
        };
    };

    return state;
};