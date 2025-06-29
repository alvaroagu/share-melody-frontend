"use client";
import {
  Home,
  User,
  FolderKanban,
  Code2,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavbarProps {
  onCollapseChange?: (isCollapsed: boolean) => void;
  title: string;
}

const Navbar = ({ onCollapseChange, title }: NavbarProps) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onCollapseChange?.(newState);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Botón de toggle para desktop (colapsar/expandir) */}
      <button
        className="fixed z-50 p-2 rounded-full shadow-lg transition-all
          bg-indigo-600 text-white hover:bg-indigo-700
          hidden lg:block
          top-4 left-4
          hover:scale-105"
        onClick={toggleCollapse}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* Botón de menú hamburguesa para móvil */}
      <button
        className="fixed z-50 p-2 rounded-full shadow-lg transition-all
          bg-black/50 text-white hover:bg-indigo-700
          lg:hidden
          top-4 left-4
          hover:scale-105"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? (
          <X className="w-4 h-4" />
        ) : (
          <Menu className="w-4 h-4" />
        )}
      </button>

      {/* Navbar vertical */}
      <nav
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-40 border-r border-gray-200
          ${isCollapsed ? "lg:w-20" : "lg:w-64"}
          ${
            isMobileMenuOpen
              ? "translate-x-0 w-64"
              : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="p-4 h-full flex flex-col items-start overflow-hidden">
          {/* Título - oculto en modo colapsado */}
          <h2
            className={`text-xl font-bold text-indigo-700 mb-8 pl-10 whitespace-nowrap
            ${isCollapsed ? "lg:opacity-0 lg:invisible" : "opacity-100"}`}
          >
            {title}
          </h2>

          {[
            { href: "/", icon: Home, text: "Inicio" },
            { href: "/about", icon: User, text: "Sobre mí" },
            { href: "/projects", icon: FolderKanban, text: "Proyectos" },
            { href: "/skills", icon: Code2, text: "Habilidades" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors group
                  ${
                    pathname === item.href
                      ? "bg-indigo-50 text-indigo-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-indigo-500"
                  }`}
              >
                <Icon className="w-5 h-5 min-w-[20px]" />
                <span
                  className={`whitespace-nowrap transition-all ${
                    isCollapsed ? "lg:opacity-0 lg:invisible" : "opacity-100"
                  }`}
                >
                  {item.text}
                </span>
                {/* Tooltip para modo colapsado */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.text}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Overlay para móvil */}
      <div
        className={`fixed inset-0 bg-black/75 bg-opacity-50 z-30 transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 lg:opacity-0 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } lg:hidden`}
        onClick={closeMobileMenu}
      />
    </>
  );
};

export default Navbar;
