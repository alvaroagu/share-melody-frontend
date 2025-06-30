"use client";

import { ContentLayout } from "@/components/layout/ContentLayout";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetSheetMusic } from "@/hooks/melody/useGetSheetMusic";
import LoadingPage from "@/components/misc/LoadingPage";

const SheetMusicPage = () => {
  const { data, isLoading, isError } = useGetSheetMusic();

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <ContentLayout title="Mis partituras">
      <div className="flex flex-col gap-y-2 pt-10">
        {data && <DataTable columns={columns} data={data} />}
        {isError && (
          <p className="text-sm text-muted-foreground">
            Ha ocurrido un error al cargar los reportes...
          </p>
        )}
      </div>
    </ContentLayout>
  );
};

export default SheetMusicPage;
