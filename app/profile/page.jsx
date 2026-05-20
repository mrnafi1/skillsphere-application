"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";
import { authClient } from "@/lib/auth-client";
import {
  FiUser, FiMail, FiEdit2, FiBookOpen,
  FiAward, FiCalendar, FiClock,
} from "react-icons/fi";

function ProfileContent() {
  const [session, setSession] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await authClient.getSession();
      setSession(data);

      const res = await fetch("/api/enroll");
      const enData = await res.json();
      if (Array.isArray(enData)) setEnrollments(enData);

      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 pt-20 px-4">
        <div className="max-w-4xl mx-auto py-10 space-y-6">
          <div className="h-32 shimmer rounded-2xl" />
          <div className="h-48 shimmer rounded-2xl" />
        </div>
      </div>
    );
  }

  const user = session?.user;
  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })
    : "Recently";

  return (
    <div className="min-h-screen bg-base-100 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Profile Card */}
        <div className="bg-base-200 border border-base-300 rounded-2xl overflow-hidden mb-6">
          {/* Header Banner */}
          <div className="h-24 bg-gradient-to-r from-brand-500/20 via-violet-500/10 to-brand-500/5" />

          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-10 mb-4">
              {/* Avatar */}
              <div className="relative">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={80}
                    height={80}
                    className="rounded-2xl ring-4 ring-base-200 object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-brand-500/20 ring-4 ring-base-200 flex items-center justify-center">
                    <FiUser className="text-brand-500 text-2xl" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h1 className="font-heading text-2xl font-bold text-white">
                  {user?.name || "User"}
                </h1>
                <p className="text-slate-400 text-sm">Student at SkillSphere</p>
              </div>
              <Link
                href="/profile/update"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500/10 hover:bg-brand-500 text-brand-500 hover:text-white border border-brand-500/30 hover:border-brand-500 text-sm font-medium transition-all"
              >
                <FiEdit2 size={14} /> Edit Profile
              </Link>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-base-300">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <FiMail className="text-blue-400 text-sm" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Email</div>
                  <div className="text-sm text-white font-medium truncate max-w-[140px]">
                    {user?.email}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-base-300">
                <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <FiAward className="text-green-400 text-sm" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Enrolled</div>
                  <div className="text-sm text-white font-medium">
                    {enrollments.length} Course{enrollments.length !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-base-300">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <FiCalendar className="text-purple-400 text-sm" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Joined</div>
                  <div className="text-sm text-white font-medium">{joinDate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="bg-base-200 border border-base-300 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <FiBookOpen className="text-brand-500" />
            <h2 className="font-heading font-bold text-white text-lg">My Courses</h2>
            <span className="ml-auto badge badge-sm badge-ghost">{enrollments.length}</span>
          </div>

          {enrollments.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-heading font-semibold text-white mb-1">No courses yet</h3>
              <p className="text-slate-400 text-sm mb-4">Start learning by enrolling in a course</p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 text-white text-sm font-medium"
              >
                <FiBookOpen size={14} /> Browse Courses
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {enrollments.map((en) => (
                <div
                  key={en._id}
                  className="flex items-center justify-between p-4 rounded-xl bg-base-300 hover:border hover:border-brand-500/20 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                      <FiBookOpen className="text-brand-500 text-sm" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">{en.courseTitle}</div>
                      <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                        <FiClock size={10} />
                        Enrolled {new Date(en.enrolledAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/courses/${en.courseId}`}
                    className="text-brand-500 hover:text-brand-400 text-xs font-medium transition-colors"
                  >
                    Continue →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <ProfileContent />
    </PrivateRoute>
  );
}
