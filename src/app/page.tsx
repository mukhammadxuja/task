"use client"

import { useState } from "react"
import { useAppContext } from "@/context/AppContext"

import AddChartsDialog from "@/components/add-charts-dialog"
import AddImageDialog from "@/components/add-image-dialog"
import { Block } from "@/components/block"
import FloatingNav from "@/components/floating-nav"
import Navbar from "@/components/navbar"

export default function Home() {
  const [openImageUpload, setOpenImageUpload] = useState(false)
  const [openCharts, setOpenCharts] = useState(false)
  const { blocks } = useAppContext()
  return (
    <main className="mx-auto w-full px-4 py-4 lg:max-w-[1280px] lg:py-8 xl:px-0">
      <Navbar />

      <FloatingNav
        setOpenImageUpload={setOpenImageUpload}
        setOpenCharts={setOpenCharts}
      />

      <div
        className="mt-8 grid auto-rows-[10px] grid-cols-4 gap-4 lg:mt-14 lg:grid-cols-6" //auto-rows-[10px]
        style={{
          gridAutoFlow: "row dense",
        }}
      >
        {blocks.map((block) => (
          <Block key={block.id} block={block} />
        ))}
      </div>

      {/* Dialogs */}
      <AddImageDialog isOpen={openImageUpload} setOpen={setOpenImageUpload} />
      <AddChartsDialog isOpen={openCharts} setOpen={setOpenCharts} />
    </main>
  )
}
