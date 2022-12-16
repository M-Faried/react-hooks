import { useEffect, useState } from 'react';


const useMouseLocation = () => {
    const [mouseLocation, setMouseLocation] = useState({
        x: 0,
        y: 0
    });

    useEffect(() => {
        const updateMouseLocation = e => {
            setMouseLocation({
                x: e.clientX,
                y: e.clientY
            })
        }
        document.addEventListener('mousemove', updateMouseLocation);
        return () => {
            document.removeEventListener('mousemove', updateMouseLocation);
        }
    }, []);


    return mouseLocation;
}

export default useMouseLocation;