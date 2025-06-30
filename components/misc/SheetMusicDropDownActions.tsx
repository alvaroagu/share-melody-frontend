import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SheetMusic } from "@/types";
import {
  ClipboardPen,
  EyeIcon,
  Loader2,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useDeleteSheetMusic } from "@/actions/melody/actions";
import { CreateSheetMusicForm } from "../form/CreateSheetMusicForm";

type SheetMusicDropDownActionsProps = {
  sheetMusic: SheetMusic;
};

const SheetMusicDropDownActions = ({
  sheetMusic,
}: SheetMusicDropDownActionsProps) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter();

  const { deleteSheetMusic } = useDeleteSheetMusic();

  const handleDelete = async (id: string | number) => {
    await deleteSheetMusic.mutateAsync(id.toString());
    setOpenDelete(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="center"
          className="flex-col gap-2 justify-center"
        >
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            <ClipboardPen className="size-5" />
            <p className="pl-2">Editar</p>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            <Trash2 className="size-5 text-red-500" />
            <p className="pl-2">Eliminar</p>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() =>
              router.push(`/melody/my_sheet_music/${sheetMusic.id}`)
            }
          >
            <EyeIcon className="size-5" />
            <p className="pl-2">Ver</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Diálogo para Eliminar */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              ¿Seguro que desea eliminar la partitura?
            </DialogTitle>
            <DialogDescription className="text-center p-2 mb-0 pb-0">
              Esta acción es irreversible y estaría eliminando por completo la
              partitura seleccionada.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col-reverse gap-2 md:gap-0">
            <Button
              className="bg-rose-400 hover:bg-white hover:text-black hover:border hover:border-black"
              onClick={() => setOpenDelete(false)}
              type="button"
            >
              Cancelar
            </Button>

            <Button
              disabled={deleteSheetMusic.isPending}
              className="hover:bg-white hover:text-black hover:border hover:border-black transition-all"
              onClick={() => handleDelete(sheetMusic.id)}
            >
              {deleteSheetMusic.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <p>Confirmar</p>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para Editar */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="flex flex-col max-w-2xl m-2">
          <DialogHeader>
            <DialogTitle className="text-center">Editar Partitura</DialogTitle>
          </DialogHeader>
          <CreateSheetMusicForm
            onClose={() => setOpenEdit(false)}
            initialData={sheetMusic}
            isEditing={true}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SheetMusicDropDownActions;
