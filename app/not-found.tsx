"use client";
import { Music } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-dvh w-dvw flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center max-w-xl gap-y-4">
        <Music className="size-[110px] text-red-500" />
        <h1 className="font-bold text-7xl text-center">¡No Encontrado!</h1>
        <p className="text-lg text-muted-foreground text-center">
          Lo sentimos, pero la página que estabas buscando no pudo ser
          localizada. Es posible que se haya movido o ya no exista.
        </p>
      </div>
    </div>
  );
}
