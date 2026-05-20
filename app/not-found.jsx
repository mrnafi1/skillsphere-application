import Link from "next/link";
import { FiHome, FiBookOpen } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="font-heading text-[120px] font-extrabold text-base-200 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-brand-500/10 rounded-2xl flex items-center justify-center">
              <FiBookOpen className="text-brand-500 text-3xl" />
            </div>
          </div>
        </div>

        <h1 className="font-heading text-3xl font-bold text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-400 leading-relaxed mb-8">
          Looks like this page went on a study break. The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium transition-all"
          >
            <FiHome size={14} /> Go Home
          </Link>
          <Link
            href="/courses"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-base-300 hover:border-slate-400 text-slate-300 hover:text-white text-sm font-medium transition-all"
          >
            <FiBookOpen size={14} /> Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
