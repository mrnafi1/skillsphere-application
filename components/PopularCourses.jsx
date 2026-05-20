"use client";
import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function PopularCourses() {
  const [topRatedCourses, setTopRatedCourses] = useState([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);

  useEffect(() => {
    // Fetch and display top 3 highest-rated courses
    fetch("/api/courses")
      .then((response) => response.json())
      .then((coursesData) => {
        const sortedByRating = coursesData
          .sort((firstCourse, secondCourse) => secondCourse.rating - firstCourse.rating)
          .slice(0, 3);
        setTopRatedCourses(sortedByRating);
        setIsLoadingCourses(false);
      })
      .catch(() => setIsLoadingCourses(false));
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="section-tag">🔥 Most Popular</div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Top Picks For You
          </h2>
          <p className="text-slate-400 mt-2">
            Highest-rated courses loved by thousands of students
          </p>
        </div>
        <Link
          href="/courses"
          className="flex items-center gap-2 text-brand-500 hover:text-brand-400 font-semibold text-sm transition-colors whitespace-nowrap"
        >
          View All Courses <FiArrowRight />
        </Link>
      </div>

      {isLoadingCourses ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((skeletonIndex) => (
            <div key={`skeleton-${skeletonIndex}`} className="card bg-base-200 border border-base-300 overflow-hidden">
              <div className="h-44 shimmer" />
              <div className="p-4 space-y-3">
                <div className="h-5 shimmer rounded w-3/4" />
                <div className="h-3 shimmer rounded w-1/2" />
                <div className="h-3 shimmer rounded w-full" />
                <div className="h-8 shimmer rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRatedCourses.map((courseItem) => (
            <CourseCard key={courseItem.id} course={courseItem} />
          ))}
        </div>
      )}
    </section>
  );
}
