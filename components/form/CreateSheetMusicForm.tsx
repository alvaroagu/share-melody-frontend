"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  useCreateSheetMusic,
  useUpdateSheetMusic,
} from "@/actions/melody/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { SheetMusic } from "@/types";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface FormProps {
  onClose: () => void;
  initialData?: SheetMusic;
  isEditing?: boolean;
}
// { onClose }: FormProps
// lo de arriba va en prop
export function CreateSheetMusicForm({
  onClose,
  isEditing,
  initialData,
}: FormProps) {
  const FormSchema = z.object({
    title: z.string(),
    description: z.string(),
    arranger: z.string(),
    composer: z.string(),
    instrument: z.string(),
    difficulty: z.string(),
    file_path: z
      .instanceof(File)
      .refine((file) => file.size <= 5 * 1024 * 1024, "Máximo 5MB")
      .refine(
        (file) => file.type === "application/pdf",
        "Solo se permiten archivos PDF"
      )
      .optional(),
    // Otros campos del esquema...
  });

  type FormSchemaType = z.infer<typeof FormSchema>;

  const { createSheetMusic } = useCreateSheetMusic();
  const { updateSheetMusic } = useUpdateSheetMusic();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: initialData?.title || "",
      arranger: initialData?.arranger || "",
      composer: initialData?.composer || "",
      difficulty: initialData?.difficulty || "",
      //possible_consequences: initialData?.file_path || "",
      instrument: initialData?.instrument || "",
      description: initialData?.description,
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
    if (initialData && isEditing) {
      const value = {
        id: initialData.id,
        ...data,
      };
      await updateSheetMusic.mutateAsync(value);
    } else {
      try {
        await createSheetMusic.mutateAsync(data);
      } catch (error) {
        console.error("Error al crear el reporte:", error);
      }
    }
    onClose();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-3"
      >
        <FormLabel className="text-lg text-center">
          Formulario Partitura
        </FormLabel>

        <div className="flex gap-2 items-center justify-center">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Titulo</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Dificultad</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar localización" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="EASY">Facil</SelectItem>
                    <SelectItem value="MEDIUM">Medio</SelectItem>
                    <SelectItem value="HARD">Dificil</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2 items-center justify-center">
          <FormField
            control={form.control}
            name="composer"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Compositor</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="arranger"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Arreglado por: </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="instrument"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Instrumento</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar localización" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Guitarra">Guitarra</SelectItem>
                  <SelectItem value="Flauta">Flauta</SelectItem>
                  <SelectItem value="Teclado">Teclado</SelectItem>
                  <SelectItem value="Violin">Violin</SelectItem>
                  <SelectItem value="Arpa">Arpa</SelectItem>
                  <SelectItem value="Trompeta">Trompeta</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripcion </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Breve descripcion del peligro"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="flex justify-center items-center gap-2">
          <FormField
            control={form.control}
            name="file_path"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documento PDF</FormLabel>
                <div className="flex items-center gap-4">
                  {field.value && (
                    <div>
                      <p className="text-sm text-gray-500">
                        Archivo seleccionado:
                      </p>
                      <p className="font-semibold text-sm">
                        {field.value.name}
                      </p>
                    </div>
                  )}
                  <FormControl>
                    <Input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between items-center gap-x-4">
          <Separator className="flex-1" />
          <p className="text-muted-foreground">MELODY</p>
          <Separator className="flex-1" />
        </div>
        <Button disabled={createSheetMusic.isPending}>
          {createSheetMusic.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Enviar Reporte"
          )}
        </Button>
      </form>
    </Form>
  );
}
