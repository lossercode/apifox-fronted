import { useState,useEffect } from 'react';
// import { getUser } from '../services/userService';
 
export default function useUser() {
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        // getUser().then((res) => {
        // setUser(res.data);
        // });
    }, []);
    return user;
}