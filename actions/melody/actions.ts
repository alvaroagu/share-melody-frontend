import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface SheetMusicData {
  title: string;
  description: string;
  composer: string;
  arranger: string;
  instrument: string;
  difficulty: string;
  file_path?: File;
}

interface UpdateSheetMusic {
  id: string;
  title: string;
  description: string;
  composer: string;
  arranger: string;
  instrument: string;
  difficulty: string;
  file_path?: File;
}

export const useCreateSheetMusic = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: async (data: SheetMusicData) => {
      await axiosInstance.post("/sheet-music", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sheet-music"] });
      toast.success("Subido!", {
        description: ` La partitura se ha subido correctamente.`,
      });
    },
    onError: (error) => {
      toast.error("Oops!", {
        description: "No se pudo subir la partitura...",
      });
      console.log(error);
    },
  });
  return {
    createSheetMusic: createMutation,
  };
};

export const useDeleteSheetMusic = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: number | string) => {
      await axiosInstance.delete(`/sheet-music/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sheet-music"] });
      toast.success("¡Eliminado!", {
        description: `¡La partitura ha sido eliminado correctamente!`,
      });
    },
    onError: (e) => {
      toast.error("Oops!", {
        description: "¡Hubo un error al eliminar la partitura!",
      });
    },
  });

  return {
    deleteSheetMusic: deleteMutation,
  };
};

export const useUpdateSheetMusic = () => {
  const queryClient = useQueryClient();
  const updateAnalysesMutation = useMutation({
    mutationKey: ["analysis"],
    mutationFn: async (data: UpdateSheetMusic) => {
      await axiosInstance.patch(`/sheet-music/${data.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sheet-music"] });
      toast.success("¡Actualizado!", {
        description: `La partitura ha sido actualizada correctamente.`,
      });
    },
    onError: (error) => {
      toast.error("Oops!", {
        description: "No se pudo actualizar la partitura...",
      });
      console.log(error);
    },
  });
  return {
    updateSheetMusic: updateAnalysesMutation,
  };
};
