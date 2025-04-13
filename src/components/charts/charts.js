import React from "react"
import { useAppContext } from "@/context/AppContext"
import RGL, { WidthProvider } from "react-grid-layout"

import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

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
    heading: "Bar Chart",
  },
  {
    key: "Pie2",
    dataGrid: { x: 0, y: 0, w: 3, h: 6 },
    graph: <PieChartMultiple />,
    heading: "Pie2 Chart",
  },
  {
    key: "lineChart",
    dataGrid: { x: 3, y: 0, w: 9, h: 9 },
    graph: <LineChart />,
    heading: "Line Chart",
  },
]

class Charts extends React.Component {
  render() {
    const { charts } = this.props

    return (
      <div className="mt-8 md:mt-16 lg:mt-20">
        <ReactGridLayout
          className="layout"
          cols={12}
          rowHeight={30}
          // width={1200}
          draggableHandle=".dragMe"
          onLayoutChange={this.props.updateLayout}
        >
          {charts.map((chart) => (
            <div key={chart.key} data-grid={chart.dataGrid}>
              <div className="relative h-full">{chart.graph}</div>
            </div>
          ))}
        </ReactGridLayout>
      </div>
    )
  }
}

const ChartsWrapper = () => {
  const { charts, addChart, removeChart, updateLayout } = useAppContext()

  const chartWithInitialCharts = [...initialCharts, ...charts]

  return (
    <Charts
      charts={chartWithInitialCharts}
      addChart={addChart}
      removeChart={removeChart}
      updateLayout={updateLayout}
    />
  )
}

export default ChartsWrapper
