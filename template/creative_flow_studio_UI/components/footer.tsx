import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import StudioLogoIcon from "@/components/icons/studio-logo-icon"

export default function Footer() {
  const socialLinks = [
    { name: "GitHub", icon: Github, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ]

  const footerNav = [
    { name: "Showcase", href: "/showcase" },
    { name: "Blog", href: "/blog" },
    { name: "Create", href: "/create" },
    { name: "Contact", href: "#" },
  ]

  return (
    <footer className="relative z-10 border-border bg-background/30 backdrop-blur-sm mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors mb-4"
            >
              <StudioLogoIcon className="w-7 h-7 text-primary" />
              <span className="text-lg sm:text-xl">Creative Flow Studio</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Creative Flow Studio: Engineering Tomorrow's Reality.
            </p>
          </div>
          <div className="md:mx-auto">
            <h4 className="text-foreground font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              {footerNav.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:ml-auto">
            <h4 className="text-foreground font-semibold mb-4">Network</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <link.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-border text-center text-xs text-muted-foreground/70">
          <p>&copy; {new Date().getFullYear()} Creative Flow Studio. The Future is Fluid.</p>
        </div>
      </div>
    </footer>
  )
}
