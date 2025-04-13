"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { toast } from "sonner"

import { BarChartMultiple } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { PieChartMultiple } from "@/components/charts/pie-chart"

interface BlockItem {
  key: string
  type: BlockType
  dataGrid: {
    x: number
    y: number
    w: number
    h: number
  }
  graph?: JSX.Element
  imageUrl?: string
  heading: string
}

type BlockType = "bar" | "line" | "pie" | "image"

interface AppContextType {
  blocks: BlockItem[]
  addBlock: (type: BlockType, imageUrl?: string) => void
  removeBlock: (key: string) => void
  updateLayout: (
    newLayout: { i: string; x: number; y: number; w: number; h: number }[]
  ) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider")
  }
  return context
}

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [blocks, setBlocks] = useState<BlockItem[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem("blocks")
      if (saved) setBlocks(JSON.parse(saved))
    } catch (error) {
      console.error("Failed to load from localStorage", error)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("blocks", JSON.stringify(blocks))
  }, [blocks])

  const addBlock = (type: BlockType, imageUrl?: string) => {
    const id = Date.now().toString()
    const last = blocks[blocks.length - 1]
    const nextX = last?.dataGrid.x + last?.dataGrid.w || 0
    const x = nextX + 3 > 12 ? 0 : nextX
    const y = nextX + 3 > 12 ? (last?.dataGrid.y || 0) + last?.dataGrid.h : 0

    const blockMap: Record<BlockType, BlockItem> = {
      bar: {
        key: `bar-${id}`,
        type: "bar",
        dataGrid: { x, y, w: 3, h: 4 },
        graph: <BarChartMultiple />,
        heading: "Bar Chart",
      },
      line: {
        key: `line-${id}`,
        type: "line",
        dataGrid: { x, y, w: 3, h: 4 },
        graph: <LineChart />,
        heading: "Line Chart",
      },
      pie: {
        key: `pie-${id}`,
        type: "pie",
        dataGrid: { x, y, w: 3, h: 4 },
        graph: <PieChartMultiple />,
        heading: "Pie Chart",
      },
      image: {
        key: `image-${id}`,
        type: "image",
        dataGrid: { x, y, w: 3, h: 4 },
        imageUrl: imageUrl || "https://via.placeholder.com/300",
        heading: "Image Block",
      },
    }

    setBlocks((prev) => [...prev, blockMap[type]])

    toast("Block added successfully")
  }

  const removeBlock = (key: string) => {
    console.log("Removing", key)
    setBlocks((prev) => prev.filter((c) => c.key !== key))
  }

  const updateLayout = (
    newLayout: { i: string; x: number; y: number; w: number; h: number }[]
  ) => {
    setBlocks((prev) =>
      prev.map((block) => {
        const layoutItem = newLayout.find((l) => l.i === block.key)
        return layoutItem
          ? {
              ...block,
              dataGrid: {
                x: layoutItem.x,
                y: layoutItem.y,
                w: layoutItem.w,
                h: layoutItem.h,
              },
            }
          : block
      })
    )
  }

  return (
    <AppContext.Provider
      value={{
        blocks,
        addBlock,
        removeBlock,
        updateLayout,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
