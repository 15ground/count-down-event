import moment from 'moment';
import { useEffect, useState } from 'react';
import { appConfig } from 'src/config/IConfig';
import { formatNumber } from 'src/helpers/formatNumber';

const useCountDown = () => {
    const [currentDate, setCurrentDate] = useState(new Date().getTime());

    const countDate = new Date(appConfig.expiredDate).getTime();
    const remainingTime = countDate - currentDate;

    const days = Math.floor(moment.duration(remainingTime).asDays());
    const hours = moment.duration(remainingTime).hours();
    const minutes = moment.duration(remainingTime).minutes();
    const seconds = moment.duration(remainingTime).seconds();

    useEffect(() => {
        if (remainingTime <= 0) return;
        const timeOut = setInterval(() => {
            setCurrentDate((prev) => new Date().getTime());
        }, 1000);
        return () => {
            clearTimeout(timeOut);
        };
    }, [remainingTime]);

    return {
        time: remainingTime,
        days: formatNumber(days),
        hours: formatNumber(hours),
        minutes: formatNumber(minutes),
        seconds: formatNumber(seconds),
    };
};
export default useCountDown;
