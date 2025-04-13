"use client"

import { useRef, useState } from "react"
import { Download, ImageIcon, ImagePlus, Upload, X } from "lucide-react"

import { Button } from "./ui/button"

type Props = {
  addBlock: (type: "image", imageUrl: string) => void
  setOpen: (open: boolean) => void
}

export default function FileUploader({ addBlock, setOpen }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleUpload = () => {
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      addBlock("image", imageUrl)
      setFile(null)
      setOpen(false)
    }
  }

  const handleRemove = () => {
    setFile(null)
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-col items-center justify-center rounded-2xl border bg-gray-100 p-1">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="w-full max-w-md cursor-pointer rounded-2xl border-2 border-dashed border-gray-300 bg-white px-1 py-10 text-center"
        >
          <input
            type="file"
            ref={inputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <p className="text-sm font-medium text-gray-700">
                Drop and drop or browse files
              </p>
            </div>
            <p className="text-xs text-gray-500">Maximum 5 MB file size</p>
          </div>
        </div>
      </div>

      {file && (
        <div className="flex w-full items-center justify-center rounded-2xl border bg-gray-100 p-1">
          <div className="relative flex w-full max-w-md items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
            <div className="flex items-center gap-2 overflow-hidden">
              <ImageIcon className="h-5 w-5 shrink-0 text-gray-500" />
              <span className="truncate text-sm text-gray-800">
                {file.name}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-3 text-sm text-gray-500">
              <span>{formatSize(file.size)}</span>
              <a
                href={URL.createObjectURL(file)}
                download={file.name}
                className="hover:text-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                <Download className="h-4 w-4" />
              </a>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleRemove()
            }}
            className="px-2 hover:opacity-80"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {file && (
        <Button
          size="sm"
          onClick={handleUpload}
          className="flex items-center gap-2 px-5"
        >
          <ImagePlus className="mr-2 h-4 w-4" />
          <span>Add image</span>
        </Button>
      )}
    </div>
  )
}
