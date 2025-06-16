"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditCard, ShoppingCart, Clock, FileText, LogOut, Receipt } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/caissier/dashboard",
    icon: CreditCard,
  },
  {
    title: "Nouvelle Vente",
    url: "/caissier/nouvelle-vente",
    icon: ShoppingCart,
  },
  {
    title: "Commandes en Attente",
    url: "/caissier/commandes-attente",
    icon: Clock,
  },
  {
    title: "Historique",
    url: "/caissier/historique",
    icon: FileText,
  },
  {
    title: "Reçus",
    url: "/caissier/recus",
    icon: Receipt,
  },
]

export function CaissierSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/caissier/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-green-600 text-white">
                  <CreditCard className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">CimentPro</span>
                  <span className="text-xs">Caisse</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between p-2">
              <ThemeToggle />
              <Button variant="ghost" size="sm">
                <LogOut className="size-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
