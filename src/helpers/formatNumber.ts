export const formatNumber = (number: number) => {
    return number < 0 ? '00' : number < 10 ? `0${number}` : number;
};
