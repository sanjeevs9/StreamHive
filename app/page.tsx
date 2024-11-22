import { CreateStreamDialog } from "@/components/create-stream-dialog"
import { JoinStreamDialog } from "@/components/join-stream-dialog"
import { ThemeToggle } from "@/components/theme-toggle"
import {signIn} from "next-auth/react"

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors bg-background text-foreground">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-6xl font-bold tracking-tighter bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          EduStream
        </h1>
        
        <p className="text-xl text-muted-foreground">
          Welcome to the future of interactive learning. Start your live class or join an existing session - bringing education to life, in real-time.
        </p>

        <div className="space-y-4">
          <CreateStreamDialog />
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <JoinStreamDialog />
        </div>

        <div className="fixed top-4 right-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

