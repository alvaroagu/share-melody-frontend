import { Providers } from "@/providers/providers";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
      <Providers>{children}</Providers>
      </body>
    </html>
  );
}
