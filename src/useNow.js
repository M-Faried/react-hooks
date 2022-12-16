import { useState, useEffect } from 'react';


const useNow = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime(`${now.getHours()} : ${now.getMinutes()} : ${now.getSeconds()}`);
        }, 1000);

        return () => {
            clearInterval(interval);
        }

    }, []);

    return time;
}

export default useNow;