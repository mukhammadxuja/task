import Breadcrumb from "./ui/breadcrumb"
import Profile from "./ui/profile"

function Navbar() {
  return (
    <nav className="fixed left-1/2 top-4 z-50 mb-4 flex flex w-full -translate-x-1/2 items-center items-center justify-between gap-3 rounded-[16px] bg-white bg-opacity-60 px-[.75rem] py-1.5 backdrop-blur lg:mb-8 lg:max-w-[1280px]">
      <Breadcrumb title="Welcome" />
      <Profile />
    </nav>
  )
}

export default Navbar
