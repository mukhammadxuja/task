"use client"

import { useAppContext } from "@/context/AppContext"
import { Trash } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function LineChart({
  id,
  width,
  height,
}: {
  id: string
  width?: number
  height?: number
}) {
  const { removeBlock } = useAppContext()

  const handleDelete = (id: string) => {
    removeBlock(id)
  }
  return (
    <Card className="group relative h-full w-full cursor-grab rounded-lg bg-gray-50 p-1.5 duration-300 hover:bg-gray-100 active:cursor-grabbing">
      <CardContent className="h-full bg-white">
        <ChartContainer
          config={chartConfig}
          style={{ width: "100%", height: "100%" }}
        >
          <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <button
        onClick={() => handleDelete(id)}
        className="absolute right-2 top-2 hidden rounded-full border border-[#ffffffe0] bg-gray-50 p-2 transition-opacity duration-200 group-hover:block"
      >
        <Trash className="h-5 w-5 text-red-500" />
      </button>
    </Card>
  )
}
