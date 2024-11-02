"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./ui/ModeToggle";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Items",
    url: "/items",
    icon: Inbox,
  },
];

export function AppSidebar() {
  const { theme, setTheme } = useTheme();
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(theme === 'dark');
  }, [theme]);
  
  const handleTheme = () => {
    if (dark) {
        setDark(false);
        setTheme('light');
    } else {
        setDark(true);
        setTheme('dark');
    }
  };
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <p className="hover:cursor-pointer" onClick={handleTheme}>
                    {dark !== null ? (dark===false ? "Dark Theme" : "Light Theme"): 'loading'}
                  </p>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
