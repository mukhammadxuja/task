import Image from "next/image"

export default function Profile() {
  return (
    <div className="flex w-fit cursor-pointer items-center gap-3 rounded-xl bg-gray-50 px-2 py-1 duration-300 hover:bg-gray-100">
      <div className="h-10 w-10 rounded-full">
        <Image
          src="https://github.com/shadcn.png"
          alt="User Profile"
          width={28}
          height={28}
          className="h-10 w-10 rounded-full"
        />
      </div>
      <div className="text-sm font-medium text-black">
        <p className="truncate">Lee Robinson</p>
      </div>
    </div>
  )
}
