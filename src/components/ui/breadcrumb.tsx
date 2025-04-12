import Link from "next/link"
import { ChevronRight } from "lucide-react"

function Breadcrumb({
  title,
  subtitle = "",
  animation = true,
  className,
}: {
  title: string
  subtitle?: string
  color?: string
  animation?: boolean
  interval?: number
  className?: string
}) {
  const Component = subtitle ? Link : "span"

  const titleLink = title.toLowerCase().split(" ").join("-")

  return (
    <div className={`flex w-fit items-center gap-1 md:gap-1.5 ${className}`}>
      <span className="flex items-center gap-0.5 md:gap-1">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 cursor-pointer rounded-md bg-gray-100 p-1 text-black duration-200 hover:bg-gray-200"
          >
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
        </Link>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 rotate-[-20deg] text-[#717171]"
        >
          <path
            fillRule="evenodd"
            d="M15.256 3.042a.75.75 0 0 1 .449.962l-6 16.5a.75.75 0 1 1-1.41-.513l6-16.5a.75.75 0 0 1 .961-.449Z"
            clipRule="evenodd"
          />
        </svg>
      </span>

      <Component
        href={subtitle ? `/${titleLink}` : ""}
        className={`whitespace-nowrap text-sm font-medium text-[#717171] duration-200 hover:text-black md:text-base ${
          subtitle ? "cursor-pointer" : "cursor-text"
        }`}
      >
        {title}
      </Component>

      {subtitle && (
        <div className="flex items-center gap-1 md:gap-1.5">
          <ChevronRight className="h-4 w-4 text-[#717171]" />
          <p className="cursor-text text-sm font-medium text-[#717171] duration-200 hover:text-black md:text-base">
            {animation ? <>{title}</> : <>{subtitle}</>}
          </p>
        </div>
      )}
    </div>
  )
}

export default Breadcrumb
