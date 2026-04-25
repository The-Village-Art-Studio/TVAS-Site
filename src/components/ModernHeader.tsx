"use client"

import {useTranslations, useLocale} from 'next-intl';
import {Link, usePathname, useRouter} from '@/i18n/routing';
import Image from 'next/image';
import {
  LayoutDashboard,
  Palette,
  Mic,
  Users,
  Calendar,
  Layers,
  Menu,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"
import { useDrag } from "@use-gesture/react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { BlobMode } from "./shared/LavaLampBackground"

interface HeaderProps {
  cycleLavaMode: () => void
  currentLavaMode: BlobMode
  nextLavaMode: BlobMode
}

export default function ModernHeader({ cycleLavaMode, currentLavaMode, nextLavaMode }: HeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('Navigation');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { href: "/", label: t('home'), icon: LayoutDashboard },
    { href: "/showcase", label: t('showcase'), icon: Palette },
    { href: "/podcast", label: t('podcast'), icon: Mic },
    { href: "/workshops", label: t('workshops'), icon: Calendar },
    { href: "/members", label: t('members'), icon: Users },
    { href: "/about", label: t('about'), icon: Layers },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'fr' : 'en';
    router.replace(pathname, {locale: nextLocale});
  }

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }, [pathname])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMobileMenuOpen])

  const bindDrawerDrag = useDrag(
    ({ down, movement: [mx], direction: [dx], velocity: [vx] }) => {
      if (!down && mx > 100 && dx > 0 && vx > 0.5) {
        setIsMobileMenuOpen(false)
      }
    },
    { axis: "x", filterTaps: true, eventOptions: { passive: false } },
  )

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] h-16 w-[calc(100%-2rem)] max-w-7xl bg-background/80 backdrop-blur-lg border border-border/50 rounded-2xl shadow-2xl transition-all">
        <div className="container mx-auto flex items-center justify-between px-6 h-full">
          <Link
            href="/"
            className="flex items-center gap-3 text-xl font-extrabold text-primary hover:scale-[1.02] transition-transform"
          >
            <Image src="/logo.png" width={32} height={32} alt="The Village Art Studio Logo" className="object-contain" />
            <span className="inline-block tracking-tighter text-foreground font-bold text-lg sm:text-xl font-heading whitespace-nowrap">The Village Art Studio</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                  pathname === item.href 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 border-l pl-4 ml-2">
               <Button variant="ghost" size="sm" asChild>
                 <Link href="/contact" className="font-bold">{t('contact')}</Link>
               </Button>
               <Button size="sm" className="rounded-full px-6 font-bold shadow-lg shadow-primary/20" asChild>
                 <Link href="/partnerships">{t('partnerships')}</Link>
               </Button>
               <Button variant="outline" size="sm" onClick={toggleLanguage} className="rounded-full px-4 font-bold border-primary/20 hover:bg-primary hover:text-white transition-colors">
                 {locale === 'en' ? 'FR' : 'EN'}
               </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground ml-2"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={toggleMobileMenu}
          />
          <div
            ref={drawerRef}
            {...bindDrawerDrag()}
            className={cn(
              "fixed top-0 right-0 h-full w-[280px] bg-background shadow-2xl z-[70] transition-transform duration-300 ease-out border-l",
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold text-primary">Menu</span>
                <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-bold transition-colors",
                      pathname === item.href 
                        ? "bg-primary/10 text-primary" 
                        : "text-foreground hover:bg-muted"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
              
              <div className="mt-auto border-t pt-6 space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-between rounded-xl h-12 text-lg font-bold border-primary/20"
                  onClick={() => {
                    toggleLanguage()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <span>Language</span>
                  <span>{locale === 'en' ? 'FR' : 'EN'}</span>
                </Button>

                <Button asChild className="w-full justify-center rounded-xl h-12 text-lg font-bold bg-primary text-white shadow-lg shadow-primary/20">
                  <Link href="/partnerships" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('partnerships')}
                  </Link>
                </Button>
                <Button variant="outline" className="w-full rounded-xl h-12 font-bold" asChild>
                   <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>{t('contact')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
