'use client'
import { ModeToggle } from "@/components/ui/ModeToggle";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [dark, setDark] = useState(true);
  const { setTheme } = useTheme()
  const handleTheme = ()=>{
    if(dark)
    {
      setDark(false);
      setTheme('light');
    }else 
    {
      setDark(true);
      setTheme('dark');
    }
  }
  return (
    <div className="m-20">
        <p className="text-3xl">Welcome to Accounting Application</p>
    </div>
  );
}
