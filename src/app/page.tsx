"use client"

import { useState } from "react"

import AddChartsDialog from "@/components/add-charts-dialog"
import AddImageDialog from "@/components/add-image-dialog"
import BlockWrappers from "@/components/charts/charts"
import FloatingNav from "@/components/floating-nav"
import Navbar from "@/components/navbar"

export default function Home() {
  const [openImageUpload, setOpenImageUpload] = useState(false)
  const [openCharts, setOpenCharts] = useState(false)

  return (
    <main className="mx-auto w-full px-4 py-4 lg:max-w-[1280px] lg:py-8 xl:px-0 mt-10">
      <Navbar />

      <FloatingNav
        setOpenImageUpload={setOpenImageUpload}
        setOpenCharts={setOpenCharts}
      />

      <BlockWrappers />

      {/* Dialogs */}
      <AddImageDialog isOpen={openImageUpload} setOpen={setOpenImageUpload} />
      <AddChartsDialog isOpen={openCharts} setOpen={setOpenCharts} />
    </main>
  )
}
