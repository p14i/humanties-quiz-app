import { topics } from "@/data/quizData";
import QuizEngine from "@/components/QuizEngine";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ topic: string }>;
}

export async function generateStaticParams() {
  return topics.map((t) => ({ topic: t.id }));
}

export async function generateMetadata({ params }: Props) {
  const { topic: topicId } = await params;
  const topic = topics.find((t) => t.id === topicId);
  return { title: topic ? `${topic.title} Quiz` : "Quiz" };
}

export default async function QuizPage({ params }: Props) {
  const { topic: topicId } = await params;
  const topic = topics.find((t) => t.id === topicId);

  if (!topic) notFound();

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 30, 30, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 30, 30, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,0,40,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10">
        <QuizEngine topic={topic} />
      </div>
    </div>
  );
}
