"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PrivateRoute from "@/components/PrivateRoute";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiArrowLeft, FiUser, FiImage, FiSave } from "react-icons/fi";

function UpdateProfileContent() {
  const [form, setForm] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      setSession(data);
      if (data?.user) {
        setForm({
          name: data.user.name || "",
          image: data.user.image || "",
        });
      }
    });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setLoading(true);
    try {
      const { error } = await authClient.updateUser({
        name: form.name,
        image: form.image || undefined,
      });
      if (error) {
        toast.error(error.message || "Update failed");
      } else {
        toast.success("Profile updated successfully! ✨");
        router.push("/profile");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 pt-20">
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-10">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-500 text-sm transition-colors mb-8"
        >
          <FiArrowLeft /> Back to Profile
        </Link>

        <div className="bg-base-200 border border-base-300 rounded-2xl p-6 sm:p-8">
          {/* Preview */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-20 h-20 mb-3">
              {form.image ? (
                <Image
                  src={form.image}
                  alt="Preview"
                  fill
                  className="rounded-2xl object-cover ring-2 ring-brand-500/40"
                  onError={() => {}}
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-brand-500/10 ring-2 ring-brand-500/20 flex items-center justify-center">
                  <FiUser className="text-brand-500 text-2xl" />
                </div>
              )}
            </div>
            <h1 className="font-heading text-xl font-bold text-white">Update Profile</h1>
            <p className="text-slate-400 text-sm mt-1">Change your name and avatar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-base-300 border border-base-300 focus:border-brand-500 focus:outline-none text-white placeholder-slate-500 text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-300 font-medium block mb-1.5">
                Photo URL
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
              <p className="text-slate-500 text-xs mt-1.5">Paste an image URL to update your avatar</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <><span className="loading loading-spinner loading-xs" /> Saving...</>
              ) : (
                <><FiSave size={14} /> Save Changes</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function UpdateProfilePage() {
  return (
    <PrivateRoute>
      <UpdateProfileContent />
    </PrivateRoute>
  );
}
