
import DarkModeToggle from "./DarkModeToggle";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "#resume" },
  { label: "Blog", href: "#blog" }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <DarkModeToggle />
      {/* Navbar */}
      <nav className="fixed left-0 top-0 w-full z-40 flex justify-center py-4 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-transparent backdrop-blur-md">
        <div className="flex space-x-8 px-6">
          <a href="/" className="text-2xl font-bold gradient-text tracking-tight select-none">Udhaya Sankar U</a>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-lg font-medium text-white/80 hover:text-blue-glow transition story-link"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
      {/* Space for navbar */}
      <div className="h-20" />
      <main>{children}</main>
    </div>
  );
}
