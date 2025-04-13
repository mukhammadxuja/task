"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import { BarChartMultiple } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { PieChartMultiple } from "@/components/charts/pie-chart"

interface Block {
  id: string
  type: string
  x: number
  y: number
  w: number
  h: number
}

type ChartType = "bar" | "line" | "pie"

type ChartItem = {
  key: string
  type: ChartType
  dataGrid: { x: number; y: number; w: number; h: number }
  graph: JSX.Element
  heading: string
}

interface AppContextType {
  blocks: Block[]
  charts: ChartItem[]
  addBlock: ({ type, w, h }: { type: string; w: number; h: number }) => void
  updateBlock: (id: string, updates: Partial<Block>) => void
  removeBlock: (id: string) => void
  addChart: (type: ChartType) => void
  removeChart: (key: string) => void
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
  const [charts, setCharts] = useState<ChartItem[]>([])
  const [blocks, setBlocks] = useState<Block[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("charts")
    if (saved) setCharts(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("charts", JSON.stringify(charts))
  }, [charts])

  const addChart = (type: ChartType) => {
    const id = Date.now().toString()

    const lastChart = charts[charts.length - 1]
    const nextX = lastChart?.dataGrid?.x + lastChart?.dataGrid?.w || 0

    const x = nextX + 3 > 12 ? 0 : nextX
    const y =
      nextX + 3 > 12
        ? (lastChart?.dataGrid?.y || 0) + lastChart?.dataGrid?.h
        : 0

    const chartMap: Record<ChartType, ChartItem> = {
      bar: {
        key: `bar-${id}`,
        type: "bar",
        dataGrid: { x, y, w: 3, h: 3 },
        graph: <BarChartMultiple />,
        heading: "Bar Chart",
      },
      line: {
        key: `line-${id}`,
        type: "line",
        dataGrid: { x, y, w: 3, h: 3 },
        graph: <LineChart />,
        heading: "Line Chart",
      },
      pie: {
        key: `pie-${id}`,
        type: "pie",
        dataGrid: { x, y, w: 3, h: 3 },
        graph: <PieChartMultiple />,
        heading: "Pie Chart",
      },
    }

    setCharts((prev) => [...prev, chartMap[type]])
  }

  const removeChart = (key: string) => {
    setCharts((prev) => prev.filter((c) => c.key !== key))
  }

  const updateLayout = (
    newLayout: { i: string; x: number; y: number; w: number; h: number }[]
  ) => {
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
