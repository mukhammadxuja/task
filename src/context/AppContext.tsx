"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

interface Block {
  id: string
  type: string
  x: number
  y: number
  w: number
  h: number
}

type ChartType = "bar" | "line" | "pie"

interface ChartItem {
  key: string
  type: ChartType
  dataGrid: {
    x: number
    y: number
    w: number
    h: number
  }
  heading: string
  graph: React.ReactNode
}

interface AppContextType {
  blocks: Block[]
  charts: ChartItem[]
  addBlock: ({ type, w, h }: { type: string; w: number; h: number }) => void
  updateBlock: (id: string, updates: Partial<Block>) => void
  removeBlock: (id: string) => void
  addChart: (chart: ChartItem) => void
  removeChart: (key: string) => void
  updateLayout: (newLayout: { i: string; x: number; y: number; w: number; h: number }[]) => void
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
  const [charts, setCharts] = useState<ChartItem[]>([])
  const [blocks, setBlocks] = useState<Block[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("charts")
    if (saved) setCharts(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("charts", JSON.stringify(charts))
  }, [charts])

  const addChart = (chart: ChartItem) => {
    setCharts((prev) => [...prev, chart])
  }

  const removeChart = (key: string) => {
    setCharts((prev) => prev.filter((c) => c.key !== key))
  }

  const updateLayout = (newLayout: { i: string; x: number; y: number; w: number; h: number }[]) => {
    setCharts((prev) =>
      prev.map((chart) => {
        const layoutItem = newLayout.find((l) => l.i === chart.key)
        return layoutItem
          ? {
              ...chart,
              dataGrid: {
                x: layoutItem.x,
                y: layoutItem.y,
                w: layoutItem.w,
                h: layoutItem.h,
              },
            }
          : chart
      })
    )
  }
  const addBlock = ({ type, w, h }: { type: string; w: number; h: number }) => {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      type,
      x: 0,
      y: 0,
      w,
      h,
    }
    setBlocks((prev) => [...prev, newBlock])
  }

  const updateBlock = (id: string, updates: Partial<Block>) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, ...updates } : block))
    )
  }

  const removeBlock = (id: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id))
  }

  return (
    <AppContext.Provider
      value={{
        blocks,
        charts,
        addBlock,
        updateBlock,
        removeBlock,
        addChart,
        removeChart,
        updateLayout,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
