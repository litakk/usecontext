import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci"; // search icon
import UserContext from "@/contexts/UserContext";

const Search: React.FC = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("Search must be used within a UserProvider");
    }

    const { users, setFiltered } = context;
    const [search, setSearch] = useState("");

    useEffect(() => {
        const filteredUsers = users.filter((user) =>
            user.name?.toLowerCase().includes(search.toLowerCase().trim())
        );
        setFiltered(filteredUsers);
        console.log("Filtered users:", filteredUsers);
    }, [users, search, setFiltered]);

    return (
        <div className="relative my-5">
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
                placeholder="Search users..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
};

export default Search;
