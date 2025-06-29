"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ToolIconProps {
  toolName: string;
  toolIMG: string;
  size?: number; // Make size optional
}

export function ToolIcon({ toolName, toolIMG, size = 6 }: ToolIconProps) {
  // Use a template literal to dynamically set the height and width
  const avatarSizeClass = `h-${size} w-${size}`;

  return (
    <>
      <div className="flex items-center gap-2">
        {" "}
        {/* Added gap and items-center for better alignment */}
        <div>
          <Avatar className={`${avatarSizeClass} text-black`}>
            <AvatarImage src={toolIMG} />
            <AvatarFallback>
              {toolName.substring(0, 2).toUpperCase()}
            </AvatarFallback>{" "}
            {/* Improved AvatarFallback */}
          </Avatar>
        </div>
        <div>{toolName}</div>
      </div>
    </>
  );
}
