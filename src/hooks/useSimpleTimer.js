// A component to measuer the time of the component
// This can't be use multiple times since all components will refer to the same value.
import { useState, useEffect } from 'react';

const useSimpleTimer = () => {

    const [state, setState] = useState({
        timerValue: 0,
        prevTime: Date.now()
    });

    useEffect(() => {

        const watchDog = setInterval(() => {
            const now = Date.now();
            setState(ps => {
                /*
                * Enable to the following to see yourself the difference is not always 1000 seconds.
                * On my machine the interval was 1000 +/- 20 ms.
                */
                // console.log('Here is the time difference in milliseconds', (now - ps.prevTime));
                return ({
                    timerValue: ps.timerValue + (now - ps.prevTime),
                    prevTime: now
                })
            });
        }, 1000);

        return () => {
            clearInterval(watchDog);
        }

        //eslint-disable-next-line
    }, []);

    return Math.round(state.timerValue / 1000);
}

export default useSimpleTimer;