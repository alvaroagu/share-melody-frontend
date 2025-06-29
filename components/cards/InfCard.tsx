"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface InfCardProps {
  title: string;
  InfContent: string;
}

export function InfCard({ title, InfContent }: InfCardProps) {
  return (
    <>
      <Card className="bg-opacity-100 border-none rounded-sm shadow-none lg:w-md ">
        <CardHeader>
          <CardTitle>
            <p className="font-medium text-lg lg:text-xl lg:font-bold">
              {title}:
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{InfContent}</p>
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </>
  );
}
