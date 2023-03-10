import React,{ useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { Spin } from 'antd';


export const AuthContext = React.createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const history = useNavigate();
    const [isLoading,setIsLoading] = useState(true);
    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user) => {
            if(user){
                const {displayName, email, uid, photoURL} = user;
                setUser(
                    {
                        displayName,
                        email,
                        uid,
                        photoURL
                    }
                );

                setIsLoading(false);
                history('/');
                return;
            }

            setUser({});
            setIsLoading(false);
            history('/login');
        });

        return () => {
            unsubscribed();
        };
    }, [history] )
  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <Spin style={{ position: 'fixed', inset: 0 }} /> : children}
    </AuthContext.Provider>
  )
}

export default AuthProvider