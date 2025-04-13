"use client"

import { useState } from "react"
import Image from "next/image"
import { Laptop, Smartphone } from "lucide-react"

import { Button } from "./ui/button"

interface FloatingNavProps {
  setOpenImageUpload: (value: boolean) => void
  setOpenCharts: (value: boolean) => void
}

function FloatingNav({ setOpenImageUpload, setOpenCharts }: FloatingNavProps) {
  const [desktop, setDesktop] = useState(true)

  return (
    <div className="fixed bottom-[1.5rem] md:bottom-[2.5rem] left-1/2 z-[999] flex -translate-x-1/2 items-center gap-3 rounded-[16px] border border-[#ffffffe0] bg-white bg-opacity-60 px-[.75rem] py-1.5 shadow-fancy backdrop-blur">
      <div className="flex items-center gap-2">
        <Button
          title="Image & Video"
          onClick={() => setOpenImageUpload(true)}
          size="sm"
          variant="secondary"
          className="flex items-center justify-center p-1 duration-300 hover:bg-gray-200"
        >
          <Image
            className="rounded-lg"
            width={28}
            height={28}
            src="/assets/image.png"
            alt="image"
          />
        </Button>

        <Button
          title="Charts"
          onClick={() => setOpenCharts(true)}
          size="sm"
          variant="secondary"
          className="flex items-center justify-center p-1 duration-300 hover:bg-gray-200"
        >
          <Image
            className="rounded-lg"
            width={28}
            height={28}
            src="/assets/chart.png"
            alt="chart image"
          />
        </Button>
      </div>

      <div className="hidden md:block h-6 w-[1.5px] bg-gray-300" />

      <div className="hidden items-center gap-2 md:flex">
        <Button
          title="Desktop"
          size="sm"
          className="flex items-center justify-center px-2 py-1"
          variant={desktop ? "default" : "secondary"}
          onClick={() => setDesktop(true)}
        >
          <Laptop className="h-6 w-6" />
        </Button>
        <Button
          title="Mobile"
          size="sm"
          className="flex items-center justify-center px-2 py-1"
          variant={desktop ? "secondary" : "default"}
          onClick={() => setDesktop(false)}
        >
          <Smartphone className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

export default FloatingNav
