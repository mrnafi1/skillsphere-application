import Image from "next/image";
import Link from "next/link";
import { FiStar, FiClock, FiUsers, FiArrowRight } from "react-icons/fi";

const levelColors = {
  Beginner: "badge-success",
  Intermediate: "badge-warning",
  Advanced: "badge-error",
};

const categoryColors = {
  Development: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Design: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Marketing: "bg-green-500/10 text-green-400 border-green-500/20",
};

export default function CourseCard({ course }) {
  return (
    <article className="card bg-base-200 border border-base-300 card-glow transition-all duration-300 overflow-hidden group hover:border-brand-500/40">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={course.image}
          alt={`${course.title} course thumbnail`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-200 via-transparent to-transparent" />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2 py-1 rounded-lg border ${categoryColors[course.category] || "bg-base-300 text-slate-300"}`}>
            {course.category}
          </span>
        </div>
        {/* Level badge */}
        <div className="absolute top-3 right-3">
          <span className={`badge badge-sm ${levelColors[course.level] || "badge-ghost"}`}>
            {course.level}
          </span>
        </div>
      </div>

      <div className="card-body p-4">
        <h3 className="font-heading font-bold text-white text-base leading-snug line-clamp-2 group-hover:text-brand-500 transition-colors duration-300">
          {course.title}
        </h3>
        <p className="text-slate-400 text-xs mb-2 font-medium">by {course.instructor}</p>

        {/* Rating & Meta */}
        <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
          <span className="flex items-center gap-1 text-yellow-400 font-semibold">
            <FiStar size={11} className="fill-current" />
            {course.rating}
          </span>
          <span className="flex items-center gap-1">
            <FiUsers size={11} />
            {course.students?.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <FiClock size={11} />
            {course.duration}
          </span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-auto">
          <span className="font-heading font-bold text-brand-500 text-lg">
            ${course.price}
          </span>
          <Link
            href={`/courses/${course.id}`}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-brand-500/10 hover:bg-brand-500 text-brand-500 hover:text-white text-xs font-semibold border border-brand-500/30 hover:border-brand-500 transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/20"
            aria-label={`View details for ${course.title}`}
          >
            View Details <FiArrowRight size={12} />
          </Link>
        </div>
      </div>
    </article>
  );
}
