"use client";
import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import Link from "next/link";
import { FiTrendingUp, FiArrowRight } from "react-icons/fi";

export default function TrendingCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((data) => {
        // Pick courses sorted by students (most enrolled = trending)
        const trending = data
          .sort((a, b) => b.students - a.students)
          .slice(0, 3);
        setCourses(trending);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-base-200/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="section-tag">
              <FiTrendingUp /> New Releases
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
              Trending Right Now
            </h2>
            <p className="text-slate-400 mt-2">
              Most enrolled courses this month — don&apos;t miss out
            </p>
          </div>
          <Link
            href="/courses"
            className="flex items-center gap-2 text-brand-500 hover:text-brand-400 font-semibold text-sm transition-colors"
          >
            See All <FiArrowRight />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card bg-base-200 border border-base-300 overflow-hidden">
                <div className="h-44 shimmer" />
                <div className="p-4 space-y-3">
                  <div className="h-5 shimmer rounded w-3/4" />
                  <div className="h-3 shimmer rounded w-1/2" />
                  <div className="h-8 shimmer rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
