import { FiClock, FiTarget, FiRepeat, FiBookOpen, FiHeadphones, FiEdit3 } from "react-icons/fi";

// Science-backed learning strategies for students
const learningStrategies = [
  {
    iconComponent: FiClock,
    tipTitle: "Study in Short Bursts",
    tipDescription: "Use the Pomodoro technique — 25 minutes of focused study, 5-minute break. Your brain retains more with consistent short sessions.",
    iconColor: "text-orange-400",
    cardBackground: "bg-orange-500/10 border-orange-500/20",
  },
  {
    iconComponent: FiTarget,
    tipTitle: "Set Clear Goals",
    tipDescription: "Define what you want to achieve before each session. A specific goal like 'finish section 3' beats vague 'study more'.",
    iconColor: "text-blue-400",
    cardBackground: "bg-blue-500/10 border-blue-500/20",
  },
  {
    iconComponent: FiRepeat,
    tipTitle: "Practice Daily",
    tipDescription: "Consistency beats intensity. 30 minutes every day produces dramatically better results than 5 hours on weekends.",
    iconColor: "text-green-400",
    cardBackground: "bg-green-500/10 border-green-500/20",
  },
  {
    iconComponent: FiBookOpen,
    tipTitle: "Take Notes Actively",
    tipDescription: "Don't just watch — pause, summarize in your own words. The act of rewriting information cements it into long-term memory.",
    iconColor: "text-purple-400",
    cardBackground: "bg-purple-500/10 border-purple-500/20",
  },
  {
    iconComponent: FiHeadphones,
    tipTitle: "Remove Distractions",
    tipDescription: "Phone on silent, notifications off. Studies show it takes 23 minutes to regain full focus after a single distraction.",
    iconColor: "text-yellow-400",
    cardBackground: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    iconComponent: FiEdit3,
    tipTitle: "Teach What You Learn",
    tipDescription: "Explain concepts out loud or write about them. The Feynman Technique reveals gaps in your understanding instantly.",
    iconColor: "text-red-400",
    cardBackground: "bg-red-500/10 border-red-500/20",
  },
];

export default function LearningTips() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-base-200/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="section-tag mx-auto w-fit">📌 Study Smarter</div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Learning Tips from Our Experts
          </h2>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto">
            Science-backed techniques to help you learn faster, retain more, and stay motivated
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {learningStrategies.map((strategy) => (
            <div
              key={strategy.tipTitle}
              className={`border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20 ${strategy.cardBackground}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${strategy.cardBackground} border`}>
                <strategy.iconComponent className={`text-xl ${strategy.iconColor}`} />
              </div>
              <h3 className="font-heading font-bold text-white text-lg mb-2">
                {strategy.tipTitle}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{strategy.tipDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
