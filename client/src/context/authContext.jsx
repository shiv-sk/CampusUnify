/* eslint-disable no-undef */
import { createContext , useContext, useState } from "react";
const authContext = createContext();
const useAuth = ()=>useContext(authContext);
const AuthProvider = ({children})=>{
    const [user , setUser] = useState(()=>{
        const savedUser = sessionStorage.getItem("User");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    
    const registerUser = (user)=>{
        sessionStorage.setItem("User" , JSON.stringify(user));
        setUser(user);
    }
    const loginUser = (user)=>{
        sessionStorage.setItem("User" , JSON.stringify(user));
        setUser(user);
    }
    const logoutUser = ()=>{
        sessionStorage.clear();
        setUser(null);
    }
    return (
        <authContext.Provider value={{user , registerUser , loginUser , logoutUser}}>
            {children}
        </authContext.Provider>
    );
}

export {useAuth , AuthProvider , authContext};