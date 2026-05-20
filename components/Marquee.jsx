export default function Marquee() {
  const announcementMessages = [
    "🎉 New Course: Complete Web Development Bootcamp",
    "🔥 Trending: Python for Data Science",
    "⚡ Special Discount on Annual Memberships — 40% OFF",
    "🎨 New Course: UI/UX Design Masterclass",
    "🚀 Join 50,000+ Students Learning on SkillSphere",
    "💼 New Course: Digital Marketing Strategy",
    "🏆 Top Rated: Advanced JavaScript & TypeScript",
    "🎓 Free Preview Available on All Courses",
  ];

  // Duplicate messages for seamless infinite scroll effect
  const duplicatedMessages = [...announcementMessages, ...announcementMessages];

  return (
    <div className="bg-brand-500/10 border-y border-brand-500/20 py-3 overflow-hidden">
      <div className="flex whitespace-nowrap marquee-track">
        {duplicatedMessages.map((message, index) => (
          <span 
            key={`announcement-${index}`} 
            className="inline-flex items-center gap-2 mx-8 text-sm text-slate-300 font-medium"
          >
            {message}
            <span className="text-brand-500/40">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
