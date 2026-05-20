"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  FiStar, FiClock, FiUsers, FiArrowLeft,
  FiCheck, FiBookOpen, FiAward, FiPlay,
} from "react-icons/fi";

const levelColors = {
  Beginner: "badge-success",
  Intermediate: "badge-warning",
  Advanced: "badge-error",
};

function CourseDetailContent() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    authClient.getSession().then(({ data }) => setSession(data));
  }, []);

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((data) => {
        const found = data.find((c) => String(c.id) === String(id));
        setCourse(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetch("/api/enroll")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEnrolled(data.some((e) => String(e.courseId) === String(id)));
        }
      })
      .catch(() => {});
  }, [id]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course.id, courseTitle: course.title }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Enrolled successfully! 🎉");
        setEnrolled(true);
      } else {
        toast.error(data.error || "Enrollment failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 pt-20 px-4">
        <div className="max-w-6xl mx-auto py-10 space-y-6">
          <div className="h-8 shimmer rounded w-1/3" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-80 shimmer rounded-2xl" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-5 shimmer rounded w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-5xl mb-4">📭</div>
        <h2 className="font-heading text-2xl font-bold text-white mb-2">Course not found</h2>
        <Link href="/courses" className="text-brand-500 hover:underline text-sm">
          ← Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 pt-20">
      {/* Back */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-500 text-sm transition-colors"
        >
          <FiArrowLeft /> Back to Courses
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left — Image */}
          <div>
            <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden ring-1 ring-base-300">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className={`badge ${levelColors[course.level]}`}>{course.level}</span>
                <span className="bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                  {course.category}
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: FiStar, value: course.rating, label: "Rating", color: "text-yellow-400" },
                { icon: FiUsers, value: `${(course.students / 1000).toFixed(1)}K`, label: "Students", color: "text-blue-400" },
                { icon: FiClock, value: course.duration, label: "Duration", color: "text-green-400" },
              ].map((stat) => (
                <div key={stat.label} className="bg-base-200 border border-base-300 rounded-xl p-3 text-center">
                  <stat.icon className={`mx-auto mb-1 ${stat.color}`} size={16} />
                  <div className="font-bold text-white text-sm">{stat.value}</div>
                  <div className="text-slate-500 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Details */}
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
              {course.title}
            </h1>
            <p className="text-brand-500 font-medium mb-4">by {course.instructor}</p>
            <p className="text-slate-300 leading-relaxed mb-6">{course.description}</p>

            {/* Price + Enroll */}
            <div className="bg-base-200 border border-base-300 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="font-heading text-3xl font-extrabold text-brand-500">
                    ${course.price}
                  </span>
                  <span className="text-slate-400 text-sm ml-2 line-through">
                    ${(course.price * 2).toFixed(2)}
                  </span>
                  <span className="ml-2 badge badge-sm badge-success">50% OFF</span>
                </div>
              </div>
              <button
                onClick={handleEnroll}
                disabled={enrolling || enrolled}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  enrolled
                    ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default"
                    : "bg-brand-500 hover:bg-brand-600 text-white hover:scale-[1.01]"
                }`}
              >
                {enrolling ? (
                  <><span className="loading loading-spinner loading-xs" /> Enrolling...</>
                ) : enrolled ? (
                  <><FiAward /> Enrolled — Start Learning</>
                ) : (
                  <><FiPlay /> Enroll Now</>
                )}
              </button>
            </div>

            {/* Curriculum */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FiBookOpen className="text-brand-500" />
                <h2 className="font-heading font-bold text-white text-lg">Course Curriculum</h2>
              </div>
              <div className="space-y-2">
                {course.curriculum?.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-base-200 border border-base-300 hover:border-brand-500/30 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                      <FiCheck className="text-brand-500 text-xs" />
                    </div>
                    <span className="text-slate-300 text-sm">{item}</span>
                    <span className="ml-auto text-slate-500 text-xs">Lesson {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CourseDetailPage() {
  return (
    <PrivateRoute>
      <CourseDetailContent />
    </PrivateRoute>
  );
}
