import { Dialog, DialogContent } from "@/components/ui/dialog"

import FileUploader from "./file-uploader"

interface AddImageDialogProps {
  isOpen: boolean
  setOpen: (value: boolean) => void
}

function AddImageDialog({ isOpen, setOpen }: AddImageDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <FileUploader />
      </DialogContent>
    </Dialog>
  )
}

export default AddImageDialog
