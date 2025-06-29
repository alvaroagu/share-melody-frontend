"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProjectCardProps {
  postName: string;
  date: string;
  desing: string;
  postContent: string;
}

export function PostCard({
  postName,
  date,
  desing,
  postContent,
}: ProjectCardProps) {
  return (
    <>
      <Card className="bg-white rounded-sm shadow-none lg:w-md ">
        <CardHeader>
          <CardTitle>
            <p className="lg:text-xl lg:font-bold">{postName}</p>
          </CardTitle>
          <CardDescription></CardDescription>
          <CardAction></CardAction>
        </CardHeader>
        <CardContent></CardContent>
        <p className="text-center">
          {date} | {desing}
        </p>
        <p className="pl-6 ">{postContent}</p>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}
