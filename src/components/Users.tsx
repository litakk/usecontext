import UserContext from "@/contexts/UserContext";
import { method, useApi } from "@/hooks/useApi";
import React, { useContext, useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Edit from "./Edit"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactFormState } from "react-dom/client";

interface UsersProps {}

const Users: React.FC<UsersProps> = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Users must be used within a ProductProvider");
  }

  const { filtered, setUsers } = context;
  const { fetchData } = useApi(import.meta.env.VITE_PUBLIC_PATH);
  useEffect(() => {
    fetchData("/users", method.get).then((res) => setUsers(res?.data));
  }, []);

  console.log(filtered);

  const [modal, setModal] = useState(false)
  const [selected, setSelected] = useState([])

console.log(selected);

const TrashUser = async (id: string) => {
  try { 
    await fetch(import.meta.env.VITE_PUBLIC_PATH + `/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
  } catch (e) {
    console.log(e);
    
  }
}

  return (
    <>
      <div className="shadow border-gray-200 border p-5 rounded-2xl">
        <Table className="rounded-lg w-full">
          <TableHeader>
            <TableRow className="border-gray-200 font-semibold text-left rounded-2xl">
              <TableHead className="px-6 text-gray-400 py-4">Name</TableHead>
              <TableHead className="text-gray-400 py-4 px-6">Email</TableHead>
              <TableHead className="py-4 px-6 text-gray-400">Status</TableHead>
              <TableHead className="px-6 py-4 text-gray-400">Role</TableHead>
              <TableHead className="text-gray-400 px-6 py-4">Last Active</TableHead>
              <TableHead className="py-4 px-6 text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-50 border">
                <TableCell className="font-medium text-gray-800 px-6 py-6">
                  {user.name}
                </TableCell>
                <TableCell className="font-normal py-6 px-6">
                  {user.email}
                </TableCell>
                <TableCell className="px-6 py-6">
                  <span
                    className={`text-xs font-semibold rounded-full px-3 py-1 ${
                      {
                        Active: "text-white bg-green-500",
                        Inactive: "text-black bg-gray-200",
                        Pending:
                          "text-orange-600 border border-orange-500 bg-orange-100",
                      }[user.status ?? ""] || "bg-gray-300 text-black"
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-6">{user.role}</TableCell>
                <TableCell className="py-6 px-6">{user.lastActive}</TableCell>
                <TableCell className="px-6 py-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="font-medium hover:text-blue-800 cursor-pointer">
                      Actions
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="flex items-center text-green-600"  onClick={() => { setModal(true); setSelected(user)}}>
                        <MdEdit className="mr-2"/> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center text-red-600" onClick={() => TrashUser(user.id)}>
                        <MdDelete className="mr-2 text-red-500"/> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {modal && <Edit setModal={setModal} selected={selected} setSelected={setSelected} />}
    </>
  );
};

export default Users;
