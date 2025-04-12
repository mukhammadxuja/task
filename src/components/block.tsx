import { useRef, useState } from "react"
import { useAppContext } from "@/context/AppContext"
import { ChevronDown } from "lucide-react"

import { BarChartMultiple } from "./charts/bar-chart"
import { LineChart } from "./charts/line-chart"
import { PieChartMultiple } from "./charts/pie-chart"

interface BlockProps {
  block: {
    type: string
    id: string
    w: number
    h: number
  }
}

export const Block = ({ block }: BlockProps) => {
  const { updateBlock } = useAppContext()
  const [isResizing, setIsResizing] = useState(false)

  const blockRef = useRef<HTMLDivElement>(null)

  const colSpan = Math.ceil(block.w / 154)
  const rowSpan = Math.ceil(block.h / 10)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)

    const startX = e.clientX
    const startY = e.clientY
    const startWidth = blockRef.current?.offsetWidth || block.w
    const startHeight = blockRef.current?.offsetHeight || block.h

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX)
      const newHeight = startHeight + (moveEvent.clientY - startY)

      const minWidth = 154
      const minHeight = 60

      if (newWidth >= minWidth && newHeight >= minHeight) {
        updateBlock(block.id, {
          w: newWidth,
          h: newHeight,
        })
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
  }

  return (
    <div
      ref={blockRef}
      className="relative h-full rounded-xl bg-white shadow-md transition-all duration-100"
      style={{
        gridColumnEnd: `span ${colSpan}`,
        gridRowEnd: `span ${rowSpan}`,
        ...(isResizing && {
          width: `${block.w}px`,
          height: `${block.h}px`,
        }),
      }}
    >
      {block.type === "bar" && (
        <BarChartMultiple id={block.id} width={block.w} height={block.h} />
      )}
      {block.type === "line" && (
        <LineChart id={block.id} width={block.w} height={block.h} />
      )}
      {block.type === "pie" && (
        <PieChartMultiple id={block.id} width={block.w} height={block.h} />
      )}

      <ChevronDown
        onMouseDown={handleMouseDown}
        className="absolute bottom-1 right-1 h-5 w-5 -rotate-45 cursor-nwse-resize text-muted-foreground"
      />
    </div>
  )
}
