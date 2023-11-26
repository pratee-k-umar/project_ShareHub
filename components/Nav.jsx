"use client";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Search from "@/components/Search";
import { usePathname } from "next/navigation";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function Nav() {
  const { data: session } = useSession();
  const pathName = usePathname()
  const redirection = async () => {
    await signOut({ callbackUrl: "/" })
  }
  return (
    <nav className="flex justify-center w-full sticky top-0 bg-white z-40">
      <div className="pt-6 flex sm:flex-row justify-between mx-2 md:mx-0 sm:w-1/2 w-full">
        <Link href="/" className="flex">
          <Image src="/assets/images/logo.png" width={80} height={80} alt="logo" />
        </Link>
        <div className="desktop_style sm:flex hidden p-2">
          <div>
            {session?.user ? (
              <div className="flex justify-center items-center gap-5">
                <Search />
                {pathName === "/profile" && (
                  <button className="sign_out" onClick={redirection}>Sign Out</button>
                )}
                <Link href="/profile">
                  {session?.user.image ? (
                    <Image src={session?.user.image} width={45} height={45} alt="creator_image" className="rounded-full object-contan border cursor-pointer" />
                  ) : (
                    <AccountCircleIcon className="rounded-full object-contan border cursor-pointer" />
                  )}
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex sm:hidden relative">
          <div>
            {session?.user ? (
              <div className="flex justify-center items-center">
                <div className="flex items-center gap-4">
                  <Search />
                  {pathName === "/profile" && (
                  <button className="sign_out" onClick={redirection}>Sign Out</button>)}
                  <Link href="/profile">
                    {session?.user.image ? (
                      <Image src={session?.user.image} width={45} height={45} alt="creator_image" className="rounded-full object-contan border cursor-pointer" />
                    ) : (
                      <AccountCircleIcon className="rounded-full object-contan border cursor-pointer" />
                    )}
                  </Link>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
