import { Loader2 } from "lucide-react";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex flex-col z-10 w-dvw h-dvh items-center justify-center gap-10">
      <div>
        <h1 className="text-2xl">CARGANDO PAGINA..</h1>
      </div>
      <div>
        <Loader2 className="size-20 animate-spin" />
      </div>
    </div>
  );
};

export default LoadingPage;
