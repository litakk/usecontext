import React from "react";
import { Input } from "@/components/ui/input"

interface SearchProps {
    
}
 
const Search: React.FC<SearchProps> = () => {
    return ( 
        <div className="my-5">
        
        <Input placeholder="search" className="w-[50%]  mx-auto " />

        
        </div>
     );
}
 
export default Search;