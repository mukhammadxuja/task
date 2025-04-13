import { Dialog, DialogContent } from "@/components/ui/dialog"

import FileUploader from "./file-uploader"
import { useAppContext } from "@/context/AppContext"

interface AddImageDialogProps {
  isOpen: boolean
  setOpen: (value: boolean) => void
}

function AddImageDialog({ isOpen, setOpen }: AddImageDialogProps) {
  const { addBlock } = useAppContext()
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <FileUploader addBlock={addBlock} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}

export default AddImageDialog
