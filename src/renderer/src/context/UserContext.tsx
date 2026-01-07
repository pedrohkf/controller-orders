import React, { useState } from 'react'

type User = {
    name: string;
}

type UserContextType = {
    users: User[];
    createUser: (name:string ) => Promise<void>;
}


const UserContext = React.createContext<UserContextType>(undefined);

export default UserContext;
