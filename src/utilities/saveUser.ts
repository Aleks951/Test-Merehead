import { form } from "../reducer/index";

export default (form: form, dispatch: Function) => {
    if (form.desc === "" || form.name === "" || form.surname === "") return;

    let adress: string = "";
    let method: string = "";
    if (form.newUser) {
        adress = 'http://77.120.241.80:8911/api/users';
        method = "POST";
    } else {
        adress = `http://77.120.241.80:8911/api/user/${form.id}`;
        method = "PUT";
    };

    let newForm = {
        ...form
    };

    delete newForm.id;
    delete newForm.newUser;

    fetch(adress, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newForm)
    })
        .then(res => res.json())
        .then((res) => {
            dispatch({ type: "SAVEUSER", res });
        });
};