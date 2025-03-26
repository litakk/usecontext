import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ToggleProps {}

const Toggle: React.FC<ToggleProps> = () => {
  return (
    <>
      <div>
        <div>
          <ToggleGroup type="single">
            <ToggleGroupItem value="users">All Users</ToggleGroupItem>
            <ToggleGroupItem value="active">Active</ToggleGroupItem>
            <ToggleGroupItem value="inactive">Inactive</ToggleGroupItem>
            <ToggleGroupItem value="pending">Pending</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </>
  );
};

export default Toggle;
