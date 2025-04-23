"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export function Navbar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link href="/" className="text-xl font-bold">
          SwiftSheet
        </Link>
        <nav className="flex items-center gap-4">
          <Link 
            href="/" 
            className={`text-sm ${pathname === "/" ? "text-white font-medium" : "text-primary-foreground/80 hover:text-white"}`}
          >
            Home
          </Link>
          <Link 
            href="/features" 
            className={`text-sm ${pathname === "/features" ? "text-white font-medium" : "text-primary-foreground/80 hover:text-white"}`}
          >
            Features
          </Link>
          <Link 
            href="/pricing" 
            className={`text-sm ${pathname === "/pricing" ? "text-white font-medium" : "text-primary-foreground/80 hover:text-white"}`}
          >
            Pricing
          </Link>
          <Link 
            href="/contact" 
            className={`text-sm ${pathname === "/contact" ? "text-white font-medium" : "text-primary-foreground/80 hover:text-white"}`}
          >
            Contact
          </Link>
          {user ? (
            <>
              <Button asChild variant="secondary" size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button onClick={() => signOut()} variant="ghost" size="sm" className="text-primary-foreground">
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="text-primary-foreground">
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button asChild variant="secondary" size="sm">
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}