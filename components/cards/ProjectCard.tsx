"use client";
import Image from "next/image";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToolIcon } from "../misc/ToolIcon";

interface ProjectCardProps {
  projectName: string;
  projectDescription: string;
  urlImage: string;
  languageImage?: string;
  languages?: string;
}

export function ProjectCard({
  projectName,
  projectDescription,
  urlImage,
  languageImage = "https://0q13aoua0x.ufs.sh/f/iFwLeXYUurfRp1PaJphsUZKzomr0NLAkT2bceChMIqXSx5Fp",
  languages = "C++",
}: ProjectCardProps) {
  return (
    <>
      <Card className="bg-white/60">
        <CardHeader>
          <CardTitle>{projectName}</CardTitle>
          <CardDescription></CardDescription>
          <CardAction></CardAction>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center">
          <Image
            src={urlImage}
            width={350}
            height={350}
            alt="Picture of the author"
            className="rounded-md"
          />
        </CardContent>
        <p className="p-6">{projectDescription}</p>
        <CardFooter className=" flex flex-col justify-end items-start gap-2">
          <p className="font-medium">Técnologias Utilizadas</p>
          <div className="flex flex-row gap-4">
            <ToolIcon toolName={languages} toolIMG={languageImage} />
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
