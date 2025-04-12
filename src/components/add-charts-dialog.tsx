import Image from "next/image"
import { useAppContext } from "@/context/AppContext"

import { Dialog, DialogContent } from "@/components/ui/dialog"

interface AddChartsDialogProps {
  isOpen: boolean
  setOpen: (value: boolean) => void
}

function AddChartsDialog({ isOpen, setOpen }: AddChartsDialogProps) {
  const { addBlock } = useAppContext()
  const handleChartClick = (type: string, w: number, h: number) => {
    addBlock({ type, w, h })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div
              onClick={() => handleChartClick("bar", 308, 180)}
              className="w-full cursor-pointer"
            >
              <Image
                width={250}
                height={250}
                src="/assets/bar-chart.png"
                className="peer relative inline-flex overflow-hidden rounded-xl border-2 border-zinc-200/80 sm:flex"
                alt="Bar chart"
              />
              <span className="!mt-3 ml-1 text-sm font-medium">Bar chart</span>
            </div>
            <div
              onClick={() => handleChartClick("pie", 308, 150)}
              className="w-full cursor-pointer"
            >
              <Image
                width={250}
                height={250}
                src="/assets/pie-chart.png"
                className="peer relative inline-flex overflow-hidden rounded-xl border-2 border-zinc-200/80 sm:flex"
                alt="Pie chart"
              />
              <span className="!mt-3 ml-1 text-sm font-medium">Pie chart</span>
            </div>
          </div>
          <div
            onClick={() => handleChartClick("line", 308, 200)}
            className="col-span-2 cursor-pointer"
          >
            <Image
              width={250}
              height={150}
              src="/assets/line-chart.png"
              className="peer relative inline-flex h-fit w-full overflow-hidden rounded-xl border-2 border-zinc-200/80 sm:flex"
              alt="Line chart"
            />
            <span className="!mt-3 ml-1 text-sm font-medium">Line chart</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddChartsDialog
