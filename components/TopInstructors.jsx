import Image from "next/image";
import { FiStar, FiUsers, FiBookOpen } from "react-icons/fi";

// Featured instructors data with their credentials and expertise
const featuredInstructors = [
  {
    fullName: "Sarah Johnson",
    jobTitle: "Full-Stack Developer",
    profileImage: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=f97316&color=fff&size=200",
    averageRating: 4.9,
    totalStudents: 18420,
    totalCourses: 3,
    shortBio: "10+ years building web applications at Google and Meta. Passionate about teaching clean, scalable code.",
    expertiseTags: ["React", "Node.js", "MongoDB"],
  },
  {
    fullName: "Alex Chen",
    jobTitle: "Senior UI/UX Designer",
    profileImage: "https://ui-avatars.com/api/?name=Alex+Chen&background=8b5cf6&color=fff&size=200",
    averageRating: 4.8,
    totalStudents: 11250,
    totalCourses: 2,
    shortBio: "Design lead at Airbnb with 8+ years of experience. Created design systems used by millions of users.",
    expertiseTags: ["Figma", "UX Research", "Branding"],
  },
  {
    fullName: "Dr. James Wright",
    jobTitle: "Data Scientist & ML Engineer",
    profileImage: "https://ui-avatars.com/api/?name=James+Wright&background=22c55e&color=fff&size=200",
    averageRating: 4.9,
    totalStudents: 22100,
    totalCourses: 2,
    shortBio: "PhD in Computer Science from MIT. Worked on AI systems at Tesla and published 20+ research papers.",
    expertiseTags: ["Python", "ML", "Deep Learning"],
  },
  {
    fullName: "Maya Patel",
    jobTitle: "Digital Marketing Expert",
    profileImage: "https://ui-avatars.com/api/?name=Maya+Patel&background=0ea5e9&color=fff&size=200",
    averageRating: 4.7,
    totalStudents: 26570,
    totalCourses: 2,
    shortBio: "Grew multiple brands from zero to 7-figure revenue. Ex-Head of Marketing at a Fortune 500 company.",
    expertiseTags: ["SEO", "Paid Ads", "Analytics"],
  },
];

export default function TopInstructors() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="section-tag mx-auto w-fit">🏆 World-Class Faculty</div>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
          Meet Our Top Instructors
        </h2>
        <p className="text-slate-400 mt-3 max-w-xl mx-auto">
          Industry veterans who bring real-world experience to every lesson
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredInstructors.map((instructor) => (
          <div
            key={instructor.fullName}
            className="card bg-base-200 border border-base-300 card-glow text-center overflow-hidden group"
          >
            <div className="p-6 pb-4">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <Image
                  src={instructor.profileImage}
                  alt={`${instructor.fullName} - ${instructor.jobTitle}`}
                  fill
                  className="rounded-2xl object-cover ring-2 ring-brand-500/30 group-hover:ring-brand-500 transition-all"
                />
              </div>
              <h3 className="font-heading font-bold text-white text-base">{instructor.fullName}</h3>
              <p className="text-brand-500 text-xs font-medium mt-1">{instructor.jobTitle}</p>
              <p className="text-slate-400 text-xs mt-3 leading-relaxed line-clamp-2">{instructor.shortBio}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 justify-center mt-3">
                {instructor.expertiseTags.map((skillTag) => (
                  <span key={skillTag} className="text-xs bg-base-300 text-slate-300 px-2 py-0.5 rounded-full">
                    {skillTag}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="border-t border-base-300 px-4 py-3 grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-yellow-400 font-bold text-sm flex items-center justify-center gap-0.5">
                  <FiStar size={11} className="fill-current" /> {instructor.averageRating}
                </div>
                <div className="text-slate-500 text-xs">Rating</div>
              </div>
              <div>
                <div className="text-white font-bold text-sm flex items-center justify-center gap-0.5">
                  <FiUsers size={11} /> {(instructor.totalStudents / 1000).toFixed(1)}K
                </div>
                <div className="text-slate-500 text-xs">Students</div>
              </div>
              <div>
                <div className="text-white font-bold text-sm flex items-center justify-center gap-0.5">
                  <FiBookOpen size={11} /> {instructor.totalCourses}
                </div>
                <div className="text-slate-500 text-xs">Courses</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
