import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import { method } from "../hooks/useApi";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProductListProps {}

interface Product {
  id: number;
  name: string;
  email: string;
  status: string;
  role: string;
  lastActive: string;
}

const ProductList: React.FC<ProductListProps> = () => {
  const [users, setUsers] = useState<Product[]>([]);
  const { fetchData, error, loading } = useApi(
    import.meta.env.VITE_PUBLIC_PATH
  );

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchData("/users", method.get); // укажите правильный endpoint
      if (response) {
        setUsers(response.data);
      }
    };

    getProducts();
  }, [fetchData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <>
      <div>
        <div className="w-[50%] flex justify-between mx-auto">
          <h1>User Management</h1>
          <Button>Add User</Button>
        </div>

        <div>
          {users.map((user) => (
            <div key={user.id}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell  className="text-right">{user.lastActive}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
