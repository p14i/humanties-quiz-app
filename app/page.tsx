import { topics } from "@/data/quizData";
import TopicCard from "@/components/TopicCard";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 30, 30, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 30, 30, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(255,0,60,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-red-500 text-xs font-bold tracking-[0.3em] uppercase mb-4">
            Humanities Quiz
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
            Expand Your{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #ff2020, #ff6060, #ff0040)",
                filter: "drop-shadow(0 0 20px rgba(255,30,30,0.8))",
              }}
            >
              Mind
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Six fascinating subjects. Sixty challenging questions. Test your knowledge across the
            full spectrum of the humanities.
          </p>
          {/* Stats bar */}
          <div className="flex items-center justify-center gap-8 mt-8">
            {[
              { label: "Topics", value: "6" },
              { label: "Questions", value: "60" },
              { label: "Format", value: "MCQ" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-red-400">{s.value}</div>
                <div className="text-gray-600 text-xs uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Topic grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map((topic, i) => (
            <TopicCard key={topic.id} topic={topic} index={i} />
          ))}
        </div>

        <p className="text-center text-gray-700 text-xs mt-12 tracking-widest uppercase">
          Select a topic to begin
        </p>
      </div>
    </main>
  );
}
