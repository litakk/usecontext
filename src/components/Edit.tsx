import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { method, useApi } from "@/hooks/useApi";

interface EditProps {
  setModal: (value: boolean) => void;
  setSelected: React.Dispatch<React.SetStateAction<any[]>>;
  selected: {
    id?: number;
    name?: string;
    email?: string;
    status?: string;
    role?: string;
  };
}

const Edit: React.FC<EditProps> = ({ setModal, setSelected, selected }) => {
  const { fetchData } = useApi(import.meta.env.VITE_PUBLIC_PATH);
  
  // Состояния для формы
  const [name, setName] = useState(selected?.name || "");
  const [email, setEmail] = useState(selected?.email || "");
  const [role, setRole] = useState(selected?.role || "viewer");
  const [status, setStatus] = useState(selected?.status || "pending");

  useEffect(() => {
    setName(selected?.name || "");
    setEmail(selected?.email || "");
    setRole(selected?.role || "viewer");
    setStatus(selected?.status || "pending");
  }, [selected]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModal(false);

    const updatedUser = {
      ...selected,
      name,
      email,
      role,
      status,
    };

    console.log(updatedUser);

    try {
      await fetchData(`/users/${selected.id}`, method.put, updatedUser);
      setSelected((prev) =>
        prev.map((user) => (user.id === selected.id ? updatedUser : user))
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={setModal}>
      <DialogContent className="max-w-md p-6 bg-white rounded-lg shadow-xl">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Edit User
            </DialogTitle>
            <DialogDescription className="text-gray-500 text-sm">
              Update user details below.
            </DialogDescription>
          </DialogHeader>
          <Card className="p-4">
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Full Name</p>
                <Input
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="mt-1"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <Input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Status</p>
                  <Select
                    onValueChange={setStatus}
                    defaultValue={status}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Role</p>
                  <Select
                    onValueChange={setRole}
                    defaultValue={role}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-black text-white">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
