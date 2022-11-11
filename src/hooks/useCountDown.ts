import moment from 'moment';
import { format } from 'path';
import { useEffect, useState } from 'react';
import { appConfig } from 'src/config/IConfig';
import { formatNumber } from 'src/helpers/formatNumber';

const useCountDown = () => {
    const [currentDate, setCurrentDate] = useState(new Date().getTime());

    const countDate = new Date(appConfig.endDate).getTime();
    const time = countDate - currentDate;
    
    const days = moment.duration(time).days();
    const hours = moment.duration(time).hours();
    const minutes = moment.duration(time).minutes();
    const seconds = moment.duration(time).seconds();

    useEffect(() => {
        if (time <= 0) return;
        const timeOut = setInterval(() => {
            setCurrentDate((prev) => new Date().getTime());
        }, 1000);
        return () => {
            clearTimeout(timeOut);
        };
    }, [time]);

    return {
        time,
        days: formatNumber(days),
        hours: formatNumber(hours),
        minutes: formatNumber(minutes),
        seconds: formatNumber(seconds),
    };
};
export default useCountDown;
