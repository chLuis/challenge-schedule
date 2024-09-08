import { DeleteEmpanada } from "@/actions/empanada";
import { DeleteIcon } from "lucide-react";
import { toast } from "sonner";

export default function DeleteEmpa({ id }: { id: string }) {
  const handleDelete = async () => {
    const response = await DeleteEmpanada(id);
    if (response.deletedCount >= 1) return toast.success("Empanada eliminada");
  };

  return (
    <DeleteIcon
      onClick={handleDelete}
      className="w-6 h-6 animate-bounce text-red-600"
    />
  );
}
