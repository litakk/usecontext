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
import { useState } from "react";
import { method, useApi } from "@/hooks/useApi";

interface ModalProps {
  setModal: (value: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ setModal }) => {
  const { fetchData } = useApi(import.meta.env.VITE_PUBLIC_PATH);
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModal(false);

    const fm = new FormData(e.target as HTMLFormElement);
    const formData = Object.fromEntries(fm.entries());

    const data = {
      id: Math.random().toString(),
      name: formData.name,
      email: formData.email,
      status: status || "pending",
      role: role || "viewer",
      lastActive: Math.floor(Math.random() * 7) + " hour ago",
    };

    console.log(data);

    const header = {
        "Content-Type": "application/json"
    }
        try {
       await fetchData("/users", method.post, data, header);
        } catch (error) {
          console.error("Error adding user:", error);
        }
  };

  return (
    <>
      <Dialog open={true} onOpenChange={setModal}>
        <DialogContent className="max-w-md p-6 bg-white rounded-lg shadow-xl">
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                Add New User
              </DialogTitle>
              <DialogDescription className="text-gray-500 text-sm">
                Create a new account with the following details.
              </DialogDescription>
            </DialogHeader>
            <Card className="p-4">
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Full Name</p>
                  <Input
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="mt-1"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <Input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Status</p>
                    <Select onValueChange={(value) => setStatus(value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={status} />
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
                    <Select onValueChange={(value) => setRole(value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={role} />
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
                    Add User
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;
