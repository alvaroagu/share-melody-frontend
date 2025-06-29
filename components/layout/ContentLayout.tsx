import Footer from "./Footer";
import Navbar from "./Navbar";
import { useState } from "react";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar onCollapseChange={setIsNavCollapsed} title={title} />
        {/* Contenedor principal con márgenes dinámicos */}
        <main
          className={`flex-grow transition-all duration-300 ease-in-out
          pt-0 pb-8 px-4 sm:px-6 
          ${isNavCollapsed ? "lg:pl-24" : "lg:pl-72"}`}
        >
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
