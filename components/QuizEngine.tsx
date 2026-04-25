"use client";

import { useState } from "react";
import { Topic } from "@/data/quizData";
import Link from "next/link";

interface QuizEngineProps {
  topic: Topic;
}

export default function QuizEngine({ topic }: QuizEngineProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(topic.questions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = topic.questions[current];
  const isAnswered = selected !== null;
  const isCorrect = selected === question.correctAnswer;
  const score = answers.filter((a, i) => a === topic.questions[i].correctAnswer).length;

  function handleSelect(idx: number) {
    if (isAnswered) return;
    const updated = [...answers];
    updated[current] = idx;
    setSelected(idx);
    setAnswers(updated);
    setShowExplanation(true);
  }

  function handleNext() {
    if (current < topic.questions.length - 1) {
      setCurrent(current + 1);
      setSelected(answers[current + 1]);
      setShowExplanation(answers[current + 1] !== null);
    } else {
      setFinished(true);
    }
  }

  function handlePrev() {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(answers[current - 1]);
      setShowExplanation(answers[current - 1] !== null);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setAnswers(Array(topic.questions.length).fill(null));
    setShowExplanation(false);
    setFinished(false);
  }

  if (finished) {
    const pct = Math.round((score / topic.questions.length) * 100);
    const grade =
      pct >= 90 ? "Excellent!" : pct >= 70 ? "Great Job!" : pct >= 50 ? "Good Effort!" : "Keep Studying!";

    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center">
          <div className="bg-black/70 border border-red-500/50 rounded-2xl p-10 shadow-[0_0_60px_rgba(255,30,30,0.3)]">
            <div className="text-6xl mb-4">{pct >= 70 ? "🎉" : pct >= 50 ? "📖" : "💡"}</div>
            <h2 className="text-3xl font-black text-white mb-2">{grade}</h2>
            <p className="text-gray-400 mb-8">You completed the {topic.title} quiz</p>
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#1a1a1a" strokeWidth="12" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke={pct >= 70 ? "#00ff64" : pct >= 50 ? "#ffcc00" : "#ff3030"}
                  strokeWidth="12"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - pct / 100)}`}
                  strokeLinecap="round"
                  style={{ filter: `drop-shadow(0 0 8px ${pct >= 70 ? "#00ff64" : pct >= 50 ? "#ffcc00" : "#ff3030"})` }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white">{score}</span>
                <span className="text-gray-400 text-sm">/ {topic.questions.length}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-8 text-sm">
              {topic.questions.map((q, i) => (
                <div
                  key={i}
                  className={`rounded-lg p-2 font-bold ${
                    answers[i] === q.correctAnswer
                      ? "bg-green-900/40 text-green-400 border border-green-700"
                      : "bg-red-900/40 text-red-400 border border-red-700"
                  }`}
                >
                  Q{i + 1} {answers[i] === q.correctAnswer ? "✓" : "✗"}
                </div>
              ))}
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-all hover:shadow-[0_0_20px_rgba(255,30,30,0.5)]"
              >
                Retry Quiz
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold rounded-lg transition-all border border-gray-600"
              >
                All Topics
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors text-sm">
            ← All Topics
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xl">{topic.icon}</span>
            <span className="text-gray-300 font-semibold">{topic.title}</span>
          </div>
          <span className="text-gray-500 text-sm">
            {current + 1} / {topic.questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-800 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500 rounded-full shadow-[0_0_8px_rgba(255,30,30,0.7)]"
            style={{ width: `${((current + 1) / topic.questions.length) * 100}%` }}
          />
        </div>

        {/* Question card */}
        <div className="bg-black/70 border border-gray-700 rounded-2xl p-8 mb-4 shadow-[0_0_40px_rgba(255,30,30,0.1)]">
          <p className="text-xs text-red-400 font-bold tracking-widest uppercase mb-4">
            Question {current + 1}
          </p>
          <h2 className="text-white text-xl font-semibold leading-relaxed mb-8">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, idx) => {
              let style =
                "border border-gray-700 bg-gray-900/50 text-gray-300 hover:border-red-500/60 hover:bg-red-950/20 hover:text-white";
              if (isAnswered) {
                if (idx === question.correctAnswer) {
                  style = "border border-green-500 bg-green-950/40 text-green-300 shadow-[0_0_12px_rgba(0,255,100,0.3)]";
                } else if (idx === selected) {
                  style = "border border-red-500 bg-red-950/40 text-red-300 shadow-[0_0_12px_rgba(255,30,30,0.3)]";
                } else {
                  style = "border border-gray-800 bg-gray-900/30 text-gray-600";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 font-medium ${style} ${
                    !isAnswered ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div
            className={`rounded-xl p-5 mb-4 border ${
              isCorrect
                ? "bg-green-950/30 border-green-700/50 text-green-300"
                : "bg-red-950/30 border-red-700/50 text-red-300"
            }`}
          >
            <p className="font-bold text-sm mb-1">{isCorrect ? "✓ Correct!" : "✗ Incorrect"}</p>
            <p className="text-sm leading-relaxed opacity-90">{question.explanation}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 justify-between">
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className="px-5 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-gray-700"
          >
            ← Prev
          </button>
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(255,30,30,0.5)]"
          >
            {current === topic.questions.length - 1 ? "Finish Quiz" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
