import axiosInstance from "@/lib/axios";
import { SheetMusic } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchSheetMusicById = async (
  sheet_music_id: string | number
): Promise<SheetMusic> => {
  const { data } = await axiosInstance.get(`/sheet-music/${sheet_music_id}`);
  return data;
};

export const useGetSheetMusicById = (sheet_music_id: string | number) => {
  return useQuery<SheetMusic>({
    queryKey: ["sheet-music-id", sheet_music_id],
    queryFn: () => fetchSheetMusicById(sheet_music_id),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
