import Image from "next/image"

export default function Profile() {
  return (
    <div className="flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-gray-50 px-2 py-1 duration-300 hover:bg-gray-100 md:gap-3">
      <div className="h-8 w-8 rounded-full md:h-10 md:w-10">
        <Image
          src="https://github.com/shadcn.png"
          alt="User Profile"
          width={28}
          height={28}
          className="h-8 w-8 rounded-full md:h-10 md:w-10"
        />
      </div>
      <div className="text-xs font-medium text-black md:text-sm">
        <p className="truncate">Lee Robinson</p>
      </div>
    </div>
  )
}
