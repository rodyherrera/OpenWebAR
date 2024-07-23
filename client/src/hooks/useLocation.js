import { useState, useEffect } from 'react';

const useLocation = () => {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null
    });
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(!'geolocation' in navigator){
            console.log('@hooks/useLocation.js: geolocation not supported by browser');
            setIsLoading(false);
            setIsError(true);
            return;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
            setIsLoading(false);
        }, () => {
            setIsError(true);
            setIsLoading(false);
        });
    }, []);

    return { location, isLoading, isError };
};

export default useLocation;