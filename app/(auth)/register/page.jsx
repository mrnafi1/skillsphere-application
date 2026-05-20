"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiImage, FiBookOpen, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", image: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        image: form.image || undefined,
      });
      if (error) {
        toast.error(error.message || "Registration failed");
      } else {
        toast.success("Account created! Please log in. 🎉");
        router.push("/login");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google login failed");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-20">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
              <FiBookOpen className="text-white" />
            </div>
            <span className="font-heading font-bold text-2xl text-white">
              Skill<span className="text-brand-500">Sphere</span>
            </span>
          </Link>
          <h1 className="font-heading text-3xl font-bold text-white">Create account</h1>
          <p className="text-slate-400 text-sm mt-1">Start your learning journey today</p>
        </div>

        <div className="bg-base-200 border border-base-300 rounded-2xl p-6 sm:p-8">
          {/* Google Button */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-base-300 hover:border-slate-500 bg-base-300 hover:bg-base-300/80 text-white text-sm font-medium transition-all mb-5"
          >
            {googleLoading ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <FcGoogle size={18} />
            )}
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-base-300" />
            <span className="text-slate-500 text-xs">or register with email</span>
            <div className="flex-1 h-px bg-base-300" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-slate-300 font-medium block mb-1.5">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-base-300 border border-base-300 focus:border-brand-500 focus:outline-none text-white placeholder-slate-500 text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-300 font-medium block mb-1.5">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-base-300 border border-base-300 focus:border-brand-500 focus:outline-none text-white placeholder-slate-500 text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-300 font-medium block mb-1.5">
                Photo URL <span className="text-slate-500 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-base-300 border border-base-300 focus:border-brand-500 focus:outline-none text-white placeholder-slate-500 text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-300 font-medium block mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Min. 6 characters"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-base-300 border border-base-300 focus:border-brand-500 focus:outline-none text-white placeholder-slate-500 text-sm transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPass ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <><span className="loading loading-spinner loading-xs" /> Creating account...</>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-5">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-500 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
