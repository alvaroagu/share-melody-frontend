"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Music,
  Users,
  Upload,
  Download,
  Share2,
  MessageSquare,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ContentLayout } from "@/components/layout/ContentLayout";

export default function MusicDashboard() {
  return (
    <ContentLayout title="Dashboard ">
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <header className="bg-gradient-to-r from-red-600 to-pink-800 text-white p-6">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Share Melody</h1>
            </div>
            <Button variant="secondary" className="hidden md:flex">
              Unirse ahora
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto p-6">
          {/* Hero Section */}
          <section className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Comparte tu pasión por la música
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Únete a nuestra comunidad de músicos donde puedes compartir
              partituras, colaborar en proyectos y descubrir nuevas piezas
              musicales.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Upload className="h-5 w-5" />
                Subir partitura
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Users className="h-5 w-5" />
                Ver comunidad
              </Button>
            </div>
          </section>

          {/* Features Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Music className="h-10 w-10 mb-4 text-red-600" />
                <CardTitle>Partituras compartidas</CardTitle>
                <CardDescription>
                  Accede a miles de partituras subidas por nuestra comunidad
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Share2 className="h-10 w-10 mb-4 text-red-600" />
                <CardTitle>Colaboración</CardTitle>
                <CardDescription>
                  Trabaja con otros músicos en arreglos y composiciones
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageSquare className="h-10 w-10 mb-4 text-red-600" />
                <CardTitle>Foros musicales</CardTitle>
                <CardDescription>
                  Discute técnicas, instrumentos y teoría musical
                </CardDescription>
              </CardHeader>
            </Card>
          </section>

          {/* Community Section */}
          <section className="mb-12">
            <Tabs defaultValue="recent">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Partituras recientes</h3>
                <TabsList>
                  <TabsTrigger value="recent">Recientes</TabsTrigger>
                  <TabsTrigger value="popular">Populares</TabsTrigger>
                  <TabsTrigger value="featured">Destacadas</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="recent">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Card key={item} className="group">
                      <CardHeader>
                        <div className="flex items-center space-x-3 mb-3">
                          <Avatar>
                            <AvatarImage src={`/avatars/0${item}.png`} />
                            <AvatarFallback>U{item}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Usuario {item}</p>
                            <p className="text-sm text-gray-500">
                              Hace {item} día{item !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                        <CardTitle>Partitura #{item}</CardTitle>
                        <CardDescription>
                          {item === 1 && "Sonata para piano en Do mayor"}
                          {item === 2 &&
                            "Aranjamiento para cuarteto de cuerdas"}
                          {item === 3 && "Partitura completa de jazz"}
                          {item === 4 && "Ejercicios de escalas para violín"}
                          {item === 5 && "Composición original para banda"}
                          {item === 6 && "Transcripción de canción popular"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            Descargar
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <MessageSquare className="h-4 w-4" />
                            {item * 3}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">¿Listo para unirte?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Regístrate ahora y comienza a compartir tus partituras con una
              comunidad global de músicos apasionados.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Input placeholder="Tu correo electrónico" className="flex-1" />
              <Button className="whitespace-nowrap">Registrarse gratis</Button>
            </div>
          </section>
        </main>
      </div>
    </ContentLayout>
  );
}
