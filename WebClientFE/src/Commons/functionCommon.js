

const someCommonValues = ['common', 'values'];

export const formatMoney = (price) => {
    //Do something with the input
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const justAnAlert = () => {
    alert('hello');
};