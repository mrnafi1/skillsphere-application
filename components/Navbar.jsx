"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiMenu, FiX, FiLogOut, FiUser, FiBookOpen } from "react-icons/fi";

export default function Navbar() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await authClient.getSession();
      setSession(data);
      setLoading(false);
    };
    fetchSession();
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    setSession(null);
    toast.success("Logged out successfully!");
    router.push("/");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/profile", label: "My Profile" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-base-100/95 backdrop-blur-md border-b border-base-300 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center group-hover:bg-brand-600 transition-colors">
              <FiBookOpen className="text-white text-sm" />
            </div>
            <span className="font-heading font-bold text-xl text-white">
              Skill<span className="text-brand-500">Sphere</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-brand-500 bg-brand-500/10"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="w-24 h-9 shimmer rounded-lg" />
            ) : session?.user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={32}
                      height={32}
                      className="rounded-full ring-2 ring-brand-500/40 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center ring-2 ring-brand-500/40">
                      <FiUser className="text-brand-500 text-sm" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-slate-200">
                    {session.user.name?.split(" ")[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
                >
                  <FiLogOut className="text-sm" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-brand-500 hover:bg-brand-600 text-white transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-slate-300 hover:text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-base-200 border-b border-base-300 px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium mb-1 transition-all ${
                pathname === link.href
                  ? "text-brand-500 bg-brand-500/10"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-base-300 mt-3 pt-3">
            {session?.user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt="User"
                      width={28}
                      height={28}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-brand-500/20 flex items-center justify-center">
                      <FiUser className="text-brand-500 text-xs" />
                    </div>
                  )}
                  <span className="text-sm text-slate-200">{session.user.name}</span>
                </div>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="text-sm text-red-400 flex items-center gap-1"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center py-2 rounded-lg text-sm border border-base-300 text-slate-300"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center py-2 rounded-lg text-sm bg-brand-500 text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
