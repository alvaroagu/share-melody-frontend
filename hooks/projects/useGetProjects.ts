import axiosInstance from "@/lib/axios";
import { Project } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchProjects = async (): Promise<Project[]> => {
  const { data } = await axiosInstance.get("/projects");
  return data;
};

export const useGetProjects = () => {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
