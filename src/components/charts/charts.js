import React from "react"
import Image from "next/image"
import { useAppContext } from "@/context/AppContext"
import RGL, { WidthProvider } from "react-grid-layout"

import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

import { Trash } from "lucide-react"

import { Card } from "../ui/card"
import { BarChartMultiple } from "./bar-chart"
import { LineChart } from "./line-chart"
import { PieChartMultiple } from "./pie-chart"

const ReactGridLayout = WidthProvider(RGL)

/**
 * @typedef {Object} ChartItem
 * @property {string} key
 * @property {{ x: number, y: number, w: number, h: number }} dataGrid
 * @property {JSX.Element} graph
 * @property {string} heading
 */

/**
 * @typedef {Object} Props
 * @property {ChartItem[]} charts
 * @property {(chart: ChartItem) => void} addChart
 * @property {(key: string) => void} removeChart
 * @property {(layout: Layout[]) => void} updateLayout
 */

const initialCharts = [
  {
    key: "bar",
    dataGrid: { x: 0, y: 0, w: 3, h: 3 },
    graph: <BarChartMultiple />,
    static: true,
    heading: "Bar Chart",
  },
  {
    key: "Pie2",
    dataGrid: { x: 0, y: 0, w: 3, h: 6 },
    graph: <PieChartMultiple />,
    static: true,
    heading: "Pie2 Chart",
  },
  {
    key: "lineChart",
    dataGrid: { x: 3, y: 0, w: 9, h: 9 },
    graph: <LineChart />,
    static: true,
    heading: "Line Chart",
  },
]

class Blocks extends React.Component {
  render() {
    const { blocks, removeBlock, updateLayout } = this.props

    function handleClick(id) {
      removeBlock(id)
    }

    return (
      <ReactGridLayout
        className="layout"
        cols={12}
        rowHeight={30}
        width={1200}
        draggableHandle=".dragMe"
      >
        {blocks.map((block) => (
          <div key={block.key} data-grid={block.dataGrid}>
            <div className="relative h-full">
              {block.type === "image" ? (
                <div className="group relative h-full">
                  <Card className="dragMe group cursor-grab rounded-lg bg-gray-50 p-2 duration-300 hover:bg-gray-100 active:cursor-grabbing">
                    <Image
                      src={block.imageUrl}
                      alt={block.heading}
                      fill
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </Card>
                  <button
                    onClick={() => handleClick(block.key)}
                    className="absolute right-2 top-2 z-50 rounded-full border border-[#ffffffe0] bg-gray-50 p-2 transition-opacity duration-200 group-hover:block"
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              ) : (
                <div className="group relative h-full">
                  <>{block.graph}</>
                  <button
                    onClick={() => handleClick(block.key)}
                    className="absolute right-2 top-2  z-50 rounded-full border border-[#ffffffe0] !bg-gray-100 p-4 transition-opacity duration-200 group-hover:block"
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </ReactGridLayout>
    )
  }
}

const BlockWrappers = () => {
  const { blocks, addBlock, removeBlock, updateLayout } = useAppContext()

  const blockWithInitialCharts = [...initialCharts, ...blocks]

  return (
    <Blocks
      blocks={blockWithInitialCharts}
      addBlock={addBlock}
      removeBlock={removeBlock}
      updateLayout={updateLayout}
    />
  )
}

export default BlockWrappers
