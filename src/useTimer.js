import { useState, useEffect, useRef } from 'react';

const REFRESH_FREQ = 1000;

const useTimer = () => {

    const watchDogRef = useRef(0);
    const [paused, setPaused] = useState(false);
    const [timer, setTimer] = useState({
        timerValue: 0,
        lastTime: Date.now(),
    });

    const refreshTimer = () => {
        const now = Date.now();
        setTimer(ps => ({
            timerValue: ps.timerValue + (now - ps.lastTime),
            lastTime: now,
        }));
    }

    const resetTimer = () => {
        setTimer(() => ({
            timerValue: 0,
            lastTime: Date.now(),
        }))
    }

    useEffect(() => {

        // Starting timer for the first time.
        if (!watchDogRef.current && !paused) {
            watchDogRef.current = setInterval(refreshTimer, REFRESH_FREQ);
        }

        /***************** Important Note *****************
        * The following is commented since the returned function is implemented when the strict mode 
        * mode in development or use (npm run build && serve -s build) command
        * in order for the code to run as expected on a production environment.
        * 
        * To install serve use the command (npm install -g serve).
        *****************/

        // Clearing the watchDogRef interval upon unmount if it is already set.
        return () => {
            if (watchDogRef.current)
                clearInterval(watchDogRef.current);
        }

        //eslint-disable-next-line
    }, []);



    useEffect(() => {

        // paused turned true, so we clear the interval.
        if (paused) {
            // Clearing the interval.
            clearInterval(watchDogRef.current);
            // Clearing the reference to the interval.
            watchDogRef.current = 0;
            // Updating the timer with remaining of the second when the value is set to pause as the timer will not be updated.
            refreshTimer();
        }

        // paused turned false, so we resume the timer
        else if (!watchDogRef.current) {
            // Setting last time to now() since we need to calculate the time from the moment timer was resumed.
            setTimer(ps => ({ ...ps, lastTime: Date.now() }));
            // Creating creating the watchdog interval.
            watchDogRef.current = setInterval(refreshTimer, REFRESH_FREQ);
        }

    }, [paused]);


    return {
        timerValue: Math.round(timer.timerValue / 1000),
        paused,
        setPaused,
        resetTimer,
    };
}

export default useTimer;