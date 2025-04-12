import { useRef, useState } from "react"
import Image from "next/image"
import { Plus, Trash } from "lucide-react"

export default function AddImage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleClick = () => {
    if (!imageUrl) {
      fileInputRef.current?.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation() // rasm ustiga bosilganda input ochilmasligi uchun
    setImageUrl(null)
  }

  return (
    <div
      className="group relative flex h-[200px] w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed duration-300 hover:bg-gray-50"
      onClick={handleClick}
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {imageUrl ? (
        <>
          <Image
            src={imageUrl}
            alt="Uploaded"
            layout="fill"
            objectFit="cover"
          />
          <button
            className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-1 text-gray-600 opacity-0 transition-opacity hover:text-red-600 group-hover:opacity-100"
            onClick={handleRemoveImage}
            title="Remove image"
          >
            <Trash className="h-4 w-4" />
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Image
            className="rounded-lg"
            width={28}
            height={28}
            src="/assets/image.png"
            alt="placeholder"
          />
          <p className="text-center text-sm font-medium text-gray-500">
            Add Image
          </p>
          <Plus className="absolute right-5 top-5 h-4 w-4 text-gray-400" />
        </div>
      )}
    </div>
  )
}
