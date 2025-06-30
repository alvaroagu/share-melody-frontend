"use client";

import { ContentLayout } from "@/components/layout/ContentLayout";
import { Button } from "@/components/ui/button";
import { useGetSheetMusicById } from "@/hooks/melody/useGetSheetMusicById";
import {
  AlertTriangle,
  Disc3,
  File,
  FileText,
  Gauge,
  Loader2,
  Music,
  ScrollText,
  User,
} from "lucide-react";
import { useParams } from "next/navigation";

const ShowSheetMusic = () => {
  const { sheet_music_id } = useParams<{ sheet_music_id: string }>();
  const {
    data: sheetMusic,
    isLoading,
    isError,
  } = useGetSheetMusicById(sheet_music_id);

  if (isLoading) {
    return (
      <ContentLayout title="Cargando partitura...">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </ContentLayout>
    );
  }

  if (isError || !sheetMusic) {
    return (
      <ContentLayout title="Error al cargar la partitura">
        <div className="flex flex-col items-center justify-center h-64 text-red-500">
          <AlertTriangle className="h-12 w-12 mb-4" />
          <p className="text-lg">
            No se pudo cargar la información de la partitura
          </p>
        </div>
      </ContentLayout>
    );
  }

  // Función para obtener el color de la dificultad
  const getDifficultyColor = (difficulty?: string) => {
    if (!difficulty) return "bg-gray-100 text-gray-800";

    const lowerCaseDiff = difficulty.toLowerCase();
    if (lowerCaseDiff.includes("fácil")) return "bg-green-100 text-green-800";
    if (lowerCaseDiff.includes("medio") || lowerCaseDiff.includes("intermedio"))
      return "bg-yellow-100 text-yellow-800";
    if (lowerCaseDiff.includes("difícil") || lowerCaseDiff.includes("avanzado"))
      return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <ContentLayout title={sheetMusic.title}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header con título y acciones */}
        <div className="bg-gradient-to-r from-red-600 to-pink-700 p-6 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Music className="h-8 w-8" />
              {sheetMusic.title}
            </h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20"
              >
                <FileText className="mr-2 h-4 w-4" />
                Descargar
              </Button>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Columna izquierda - Información básica */}
          <div className="md:col-span-2 space-y-6">
            {/* Descripción */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-700">
                <ScrollText className="h-5 w-5" />
                Descripción
              </h2>
              <p className="text-gray-600">
                {sheetMusic.description || "No hay descripción disponible"}
              </p>
            </div>

            {/* Detalles en cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Compositor */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Compositor
                </h3>
                <p className="flex items-center gap-2 text-gray-800">
                  <User className="h-4 w-4" />
                  {sheetMusic.composer || "Desconocido"}
                </p>
              </div>

              {/* Arreglista */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Arreglista
                </h3>
                <p className="flex items-center gap-2 text-gray-800">
                  <User className="h-4 w-4" />
                  {sheetMusic.arranger || "No aplica"}
                </p>
              </div>

              {/* Instrumento */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Instrumento
                </h3>
                <p className="flex items-center gap-2 text-gray-800">
                  <Disc3 className="h-4 w-4" />
                  {sheetMusic.instrument || "No especificado"}
                </p>
              </div>

              {/* Dificultad */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Dificultad
                </h3>
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4" />
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getDifficultyColor(
                      sheetMusic.difficulty
                    )}`}
                  >
                    {sheetMusic.difficulty || "No especificada"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Archivo */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg h-full flex flex-col">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-700">
                <File className="h-5 w-5" />
                Archivo de partitura
              </h2>

              {sheetMusic.file_path ? (
                <div className="flex-grow flex flex-col items-center justify-center gap-4 p-4 border-2 border-dashed border-gray-200 rounded-lg bg-white">
                  <FileText className="h-12 w-12 text-blue-500" />
                  <p className="text-center text-gray-600">
                    Partitura disponible
                  </p>
                  <Button className="mt-4">Ver partitura</Button>
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center gap-4 p-4 border-2 border-dashed border-gray-200 rounded-lg bg-white">
                  <AlertTriangle className="h-12 w-12 text-yellow-500" />
                  <p className="text-center text-gray-600">
                    No hay archivo disponible
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default ShowSheetMusic;
