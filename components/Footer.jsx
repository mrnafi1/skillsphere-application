import Link from "next/link";
import {
  FiBookOpen, FiMail, FiPhone, FiMapPin,
  FiTwitter, FiGithub, FiLinkedin, FiYoutube,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-base-200 border-t border-base-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <FiBookOpen className="text-white text-sm" />
              </div>
              <span className="font-heading font-bold text-xl text-white">
                Skill<span className="text-brand-500">Sphere</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Your gateway to world-class learning. Upgrade your skills with
              expert-led courses and grow your career.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
                { icon: FiGithub, href: "https://github.com", label: "GitHub" },
                { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: FiYoutube, href: "https://youtube.com", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-base-300 flex items-center justify-center text-slate-400 hover:text-brand-500 hover:bg-brand-500/10 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/courses", label: "All Courses" },
                { href: "/courses?category=Development", label: "Development" },
                { href: "/courses?category=Design", label: "Design" },
                { href: "/courses?category=Marketing", label: "Marketing" },
                { href: "/profile", label: "My Profile" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-brand-500 text-sm transition-colors flex items-center gap-1"
                  >
                    › {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              {[
                { href: "#", label: "Terms & Conditions" },
                { href: "#", label: "Privacy Policy" },
                { href: "#", label: "Cookie Policy" },
                { href: "#", label: "Refund Policy" },
                { href: "#", label: "Accessibility" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-brand-500 text-sm transition-colors flex items-center gap-1"
                  >
                    › {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@skillsphere.dev"
                  className="flex items-center gap-3 text-slate-400 hover:text-brand-500 text-sm transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-base-300 group-hover:bg-brand-500/10 flex items-center justify-center transition-colors">
                    <FiMail size={14} className="text-brand-500" />
                  </div>
                  hello@skillsphere.dev
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801800000000"
                  className="flex items-center gap-3 text-slate-400 hover:text-brand-500 text-sm transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-base-300 group-hover:bg-brand-500/10 flex items-center justify-center transition-colors">
                    <FiPhone size={14} className="text-brand-500" />
                  </div>
                  +880 1780256748
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-base-300 flex items-center justify-center">
                    <FiMapPin size={14} className="text-brand-500" />
                  </div>
                  Sylhet, Bangladesh
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-base-300 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} SkillSphere. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Built with <span className="text-brand-500">♥</span> using Next.js & MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
}
