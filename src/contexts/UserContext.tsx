import React, { ReactNode, useState } from "react";
import { createContext } from "react";

interface Users {
    id?: number;
    name?: string;
    email?: string;
    status?: string;
    role?: string;
    lastActive?: string;
}
interface UserProvider {
    children: ReactNode;
}

interface UserType {
    users: Users[];
    setUsers: React.Dispatch<React.SetStateAction<Users[]>>;

    filtered: Users[];
    setFiltered: React.Dispatch<React.SetStateAction<Users[]>>;
}


 const UserContext = createContext<UserType | undefined>(undefined)

export const UserProvider: React.FC<UserProvider> = ({ children }) => {
    const [users, setUsers] = useState<Users[]>([])
    const [filtered, setFiltered] = useState<Users[]>([])
    return (
        <UserContext.Provider
            value={{ users, setUsers, filtered, setFiltered }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;