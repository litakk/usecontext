import { useState } from "react";
import { Button } from "./ui/button";
import { IoIosAddCircle } from "react-icons/io";
import Modal from "./Modal";

interface HeaderTextProps {}

const HeaderText: React.FC<HeaderTextProps> = () => {

const [modal, setModal] = useState(false)

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-2xl">User Management</h1>
          <p className="text-gray-500">
            Manage your users, their roles and permissions.
          </p>
        </div>

        <div>
          <Button onClick={() => setModal(true)}>
            <IoIosAddCircle />
            Add User
          </Button>
        </div>
      </div>


      {modal && <Modal setModal={setModal}/>}
    </>
  );
};

export default HeaderText;
