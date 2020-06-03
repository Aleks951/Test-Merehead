export default (id: number, i: number, dispatch: Function) => {
    fetch(`http://77.120.241.80:8911/api/user/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        dispatch({ type: "DELUSER", i });
    });
};