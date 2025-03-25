import React, {ReactNode, useState} from "react";

interface Users {
    id: number;
    name: string;
    email: string;
    status: string;
    role: string;
    lastActive: string;
}

interface UserProvider {
childred: ReactNode;
}

interface UserType {
    users: Users[];
    setUsers: React.Dispatch
}