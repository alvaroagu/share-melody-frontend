"use client";

import { ContentLayout } from "@/components/layout/ContentLayout";

// app/melody/about/page.tsx
export default function AboutPage() {
  return (
    <ContentLayout title="Generador">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Acerca del Generador de Música
        </h1>
        <p className="mb-4">
          Esta aplicación utiliza inteligencia artificial para generar música
          basada en tus descripciones.
        </p>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Cómo funciona:</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Describe el tipo de música que deseas</li>
            <li>Selecciona la duración</li>
            <li>Nuestra IA generará una pieza musical única</li>
          </ul>
        </div>
      </div>
    </ContentLayout>
  );
}
