"use client";

import Link from "next/link";
import { Topic } from "@/data/quizData";

interface TopicCardProps {
  topic: Topic;
  index: number;
}

const glowColors: Record<string, string> = {
  "neon-cyan": "hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] border-cyan-500 hover:border-cyan-300",
  "neon-pink": "hover:shadow-[0_0_30px_rgba(255,0,128,0.6)] border-pink-500 hover:border-pink-300",
  "neon-yellow": "hover:shadow-[0_0_30px_rgba(255,255,0,0.6)] border-yellow-400 hover:border-yellow-200",
  "neon-green": "hover:shadow-[0_0_30px_rgba(0,255,100,0.6)] border-green-400 hover:border-green-200",
  "neon-orange": "hover:shadow-[0_0_30px_rgba(255,100,0,0.6)] border-orange-400 hover:border-orange-200",
  "neon-red": "hover:shadow-[0_0_30px_rgba(255,30,30,0.7)] border-red-500 hover:border-red-300",
};

const textColors: Record<string, string> = {
  "neon-cyan": "text-cyan-400",
  "neon-pink": "text-pink-400",
  "neon-yellow": "text-yellow-300",
  "neon-green": "text-green-400",
  "neon-orange": "text-orange-400",
  "neon-red": "text-red-400",
};

export default function TopicCard({ topic, index }: TopicCardProps) {
  const glow = glowColors[topic.color] ?? glowColors["neon-cyan"];
  const text = textColors[topic.color] ?? textColors["neon-cyan"];

  return (
    <Link href={`/quiz/${topic.id}`} className="block group">
      <div
        className={`
          relative bg-black/60 backdrop-blur-sm border rounded-xl p-6
          transition-all duration-300 cursor-pointer
          hover:bg-black/80 hover:scale-[1.03]
          ${glow}
        `}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex items-start gap-4">
          <span className="text-4xl">{topic.icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className={`text-xl font-bold mb-1 ${text}`}>{topic.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{topic.description}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-gray-500 text-xs">{topic.questions.length} Questions</span>
          <span className={`text-xs font-semibold tracking-widest uppercase ${text} opacity-70 group-hover:opacity-100 transition-opacity`}>
            Start Quiz →
          </span>
        </div>
      </div>
    </Link>
  );
}
