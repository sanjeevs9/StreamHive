"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import axios from "axios"

export function CreateStreamDialog() {
  const [roomName, setRoomName] = useState("")
  const [yourName, setYourName] = useState("")
  const [enableChat, setEnableChat] = useState(true)
  const [viewersCanParticipate, setViewersCanParticipate] = useState(false)
  const router=useRouter();

  const handleCreate = async() => {
    // Handle stream creation logic here
await axios(`/api/get-participant-token?room=${roomName}&username=${yourName}`).then((res)=>{
  const data=res.data
  localStorage.setItem("token",data.token);
  router.push(`/room/${roomName}`)
}).catch((err)=>{
  console.log(err)
})
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full max-w-sm text-lg">
          Start Teaching
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new stream</DialogTitle>
          <DialogDescription>Set up your new teaching stream here.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="room-name" className="text-right">
              Room name
            </Label>
            <Input
              id="room-name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="your-name" className="text-right">
              Your name
            </Label>
            <Input
              id="your-name"
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="enable-chat" className="text-right">
              Enable chat
            </Label>
            <Switch
              id="enable-chat"
              checked={enableChat}
              onCheckedChange={setEnableChat}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="viewers-participate" className="text-right">
              Viewers can participate
            </Label>
            <Switch
              id="viewers-participate"
              checked={viewersCanParticipate}
              onCheckedChange={setViewersCanParticipate}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

