"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[url('/main-page-image.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Contenido (encima de la capa opaca) */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-10">
        <h1 className="text-6xl font-bold pb-20 text-white">Share Melody</h1>
        <Link href="/login">
          <Button className="bg-red-500 hover:bg-red-600">
            Iniciar sesión
          </Button>
        </Link>
      </div>
    </div>
  );
}
