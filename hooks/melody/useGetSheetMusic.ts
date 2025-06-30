import axiosInstance from "@/lib/axios";
import { SheetMusic } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchSheetMusic = async (): Promise<SheetMusic[]> => {
  const { data } = await axiosInstance.get("/sheet-music");
  return data;
};

export const useGetSheetMusic = () => {
  return useQuery<SheetMusic[]>({
    queryKey: ["sheet-music"],
    queryFn: fetchSheetMusic,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
