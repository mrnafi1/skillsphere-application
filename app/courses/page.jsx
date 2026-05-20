

"use client";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import CourseCard from "@/components/CourseCard";
import { FiSearch, FiFilter } from "react-icons/fi";
import { useSearchParams } from "next/navigation";

const categories = ["All", "Development", "Design", "Marketing"];

function CoursesContent() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const searchParams = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/courses")
      .then((r) => r.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-base-100 pt-20">
      <div className="bg-base-200/50 border-b border-base-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="section-tag">📚 All Courses</div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-3">
            Explore Our Courses
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Browse all courses across Development, Design, and Marketing. Find your next skill.
          </p>
          <div className="relative max-w-xl mt-6">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              type="text"
              placeholder="Search courses by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-base-300 border border-base-300 focus:border-brand-500 focus:outline-none text-white placeholder-slate-400 text-sm transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-56 flex-shrink-0">
            <div className="bg-base-200 border border-base-300 rounded-2xl p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <FiFilter className="text-brand-500" />
                <h3 className="font-heading font-bold text-white text-sm">Filter by Category</h3>
              </div>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-brand-500 text-white"
                        : "text-slate-400 hover:text-white hover:bg-base-300"
                    }`}
                  >
                    {cat === "All" ? "🌐 " : cat === "Development" ? "💻 " : cat === "Design" ? "🎨 " : "📣 "}
                    {cat}
                    <span className="float-right text-xs opacity-60">
                      {cat === "All"
                        ? courses.length
                        : courses.filter((c) => c.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-400 text-sm">
                {loading ? "Loading..." : `${filtered.length} course${filtered.length !== 1 ? "s" : ""} found`}
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
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
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">No courses found</h3>
                <p className="text-slate-400">Try a different search term or category</p>
                <button
                  onClick={() => { setSearch(""); setActiveCategory("All"); }}
                  className="mt-4 px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CoursesContent />
    </Suspense>
  );
}