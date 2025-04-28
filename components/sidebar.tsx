"use client"

import React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  CalendarRange,
  FileText,
  Home,
  Settings,
  Users,
  Package,
  Target,
  Award,
  Calculator,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Gerenciador de Regras",
    href: "/regras",
    icon: Settings,
    submenu: [
      {
        title: "Vendedores",
        href: "/regras/vendedores",
        icon: Users,
      },
      {
        title: "Validade de Regras",
        href: "/regras/validade",
        icon: CalendarRange,
      },
      {
        title: "Produtos",
        href: "/regras/produtos",
        icon: Package,
      },
      {
        title: "Metas",
        href: "/regras/metas",
        icon: Target,
      },
      {
        title: "Premiação Trimestral",
        href: "/regras/premiacao-trimestral",
        icon: Award,
      },
    ],
  },
  {
    title: "Apuração",
    href: "/apuracao",
    icon: Calculator,
    submenu: [
      {
        title: "Definir Data",
        href: "/apuracao/definir-data",
        icon: CalendarRange,
      },
      {
        title: "Verificar Atingimento",
        href: "/apuracao/verificar-atingimento",
        icon: Target,
      },
      {
        title: "Apurar Comissionamento",
        href: "/apuracao/apurar-comissionamento",
        icon: Calculator,
      },
      {
        title: "Apurar Premiação Trimestral",
        href: "/apuracao/apurar-premiacao-trimestral",
        icon: Award,
      },
      {
        title: "Apuração da Equipe",
        href: "/apuracao/equipe",
        icon: Users,
      },
      {
        title: "Apuração Individual",
        href: "/apuracao/individual",
        icon: Users,
      },
    ],
  },
  {
    title: "Relatórios",
    href: "/relatorios",
    icon: FileText,
    submenu: [
      {
        title: "Apuração de Equipe",
        href: "/relatorios/equipe",
        icon: BarChart3,
      },
      {
        title: "Resultado Individual",
        href: "/relatorios/individual",
        icon: BarChart3,
      },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null)

  const toggleSubmenu = (title: string) => {
    if (openSubmenu === title) {
      setOpenSubmenu(null)
    } else {
      setOpenSubmenu(title)
    }
  }

  return (
    <div className="w-64 bg-slate-50 border-r h-screen overflow-y-auto">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Sistema de Comissionamento</h1>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.title}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={cn(
                      "flex items-center w-full p-2 rounded-md hover:bg-slate-200 transition-colors",
                      pathname.startsWith(item.href) && "bg-slate-200",
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.title}</span>
                    <span className="ml-auto">{openSubmenu === item.title ? "▼" : "▶"}</span>
                  </button>
                  {openSubmenu === item.title && (
                    <ul className="pl-6 mt-1 space-y-1">
                      {item.submenu.map((subitem) => (
                        <li key={subitem.title}>
                          <Link
                            href={subitem.href}
                            className={cn(
                              "flex items-center p-2 rounded-md hover:bg-slate-200 transition-colors",
                              pathname === subitem.href && "bg-slate-200 font-medium",
                            )}
                          >
                            <subitem.icon className="h-4 w-4 mr-3" />
                            <span>{subitem.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center p-2 rounded-md hover:bg-slate-200 transition-colors",
                    pathname === item.href && "bg-slate-200 font-medium",
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
