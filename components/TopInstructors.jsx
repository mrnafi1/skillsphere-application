import Image from "next/image";
import { FiStar, FiUsers, FiBookOpen } from "react-icons/fi";

const instructors = [
  {
    name: "Sarah Johnson",
    role: "Full-Stack Developer",
    image: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=f97316&color=fff&size=200",
    rating: 4.9,
    students: 18420,
    courses: 3,
    bio: "10+ years building web applications at Google and Meta. Passionate about teaching clean, scalable code.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    name: "Alex Chen",
    role: "Senior UI/UX Designer",
    image: "https://ui-avatars.com/api/?name=Alex+Chen&background=8b5cf6&color=fff&size=200",
    rating: 4.8,
    students: 11250,
    courses: 2,
    bio: "Design lead at Airbnb with 8+ years of experience. Created design systems used by millions of users.",
    tags: ["Figma", "UX Research", "Branding"],
  },
  {
    name: "Dr. James Wright",
    role: "Data Scientist & ML Engineer",
    image: "https://ui-avatars.com/api/?name=James+Wright&background=22c55e&color=fff&size=200",
    rating: 4.9,
    students: 22100,
    courses: 2,
    bio: "PhD in Computer Science from MIT. Worked on AI systems at Tesla and published 20+ research papers.",
    tags: ["Python", "ML", "Deep Learning"],
  },
  {
    name: "Maya Patel",
    role: "Digital Marketing Expert",
    image: "https://ui-avatars.com/api/?name=Maya+Patel&background=0ea5e9&color=fff&size=200",
    rating: 4.7,
    students: 26570,
    courses: 2,
    bio: "Grew multiple brands from zero to 7-figure revenue. Ex-Head of Marketing at a Fortune 500 company.",
    tags: ["SEO", "Paid Ads", "Analytics"],
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
        {instructors.map((ins) => (
          <div
            key={ins.name}
            className="card bg-base-200 border border-base-300 card-glow text-center overflow-hidden group"
          >
            <div className="p-6 pb-4">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <Image
                  src={ins.image}
                  alt={ins.name}
                  fill
                  className="rounded-2xl object-cover ring-2 ring-brand-500/30 group-hover:ring-brand-500 transition-all"
                />
              </div>
              <h3 className="font-heading font-bold text-white text-base">{ins.name}</h3>
              <p className="text-brand-500 text-xs font-medium mt-1">{ins.role}</p>
              <p className="text-slate-400 text-xs mt-3 leading-relaxed line-clamp-2">{ins.bio}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 justify-center mt-3">
                {ins.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-base-300 text-slate-300 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="border-t border-base-300 px-4 py-3 grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-yellow-400 font-bold text-sm flex items-center justify-center gap-0.5">
                  <FiStar size={11} className="fill-current" /> {ins.rating}
                </div>
                <div className="text-slate-500 text-xs">Rating</div>
              </div>
              <div>
                <div className="text-white font-bold text-sm flex items-center justify-center gap-0.5">
                  <FiUsers size={11} /> {(ins.students / 1000).toFixed(1)}K
                </div>
                <div className="text-slate-500 text-xs">Students</div>
              </div>
              <div>
                <div className="text-white font-bold text-sm flex items-center justify-center gap-0.5">
                  <FiBookOpen size={11} /> {ins.courses}
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
