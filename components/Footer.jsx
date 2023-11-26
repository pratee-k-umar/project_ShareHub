import Image from "next/image"


export default function Footer() {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-slate-200 w-full md:w-1/2 mx-auto p-2 flex justify-between">
      <p className="text-gray-500 text-sm md:text-lg mt-1 ml-2">Developer: Prateek Kumar</p>
      <Image src="/assets/images/devprofile.jpg" width={37} height={37} alt="devprofile" className="rounded-full w-8 h-8 md:w-9 md:h-9" />
    </div>
  )
}