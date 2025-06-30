import { LoginForm } from "@/components/form/login";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Toaster } from "sonner";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Sección de imagen (50%) */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-red-500">
        <div className="relative w-full h-full max-w-2xl max-h-[70vh]">
          <Image
            src="https://0q13aoua0x.ufs.sh/f/iFwLeXYUurfRzkVcyc0QwUV3g1QhNrXKS8xTOIqckDti2nJa"
            alt="Share Melody Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Sección de formulario (50%) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-white">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-none md:shadow-md md:border">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Share Melody
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LoginForm />
              <div className="mt-4 text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <Link
                  href="/register"
                  className="text-indigo-600 hover:underline"
                >
                  Regístrate
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Toaster de Sonner */}
      <Toaster position="top-center" richColors />
    </div>
  );
}
