export default (outputtopage: number, numberOfGoods: number) => {
    let pages: number = 0;

    if (numberOfGoods % outputtopage != 0) {
        pages = (numberOfGoods - (numberOfGoods % outputtopage)) / outputtopage + 1;
    } else {
        pages = numberOfGoods / outputtopage;
    };

    return pages;
};