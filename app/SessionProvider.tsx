"use client"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/components/theme-provider"
export default function Provider({children}:any){

    return (
       
        <div>
        <SessionProvider>
        
            {children}
            
        </SessionProvider>
        </div>
       
    )
}