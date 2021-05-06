import { useLocation } from "react-router-dom";




export const formatMoney = (price) => {
    if(typeof (price) === 'undefined') return;
    //Do something with the input
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " VNĐ";
};

export const formatPage = () => {
    window.scrollTo(0, 0);
}

export function getParam(str, paramProp) {

    const params = new URLSearchParams(str);
    return params.get(paramProp);
}
