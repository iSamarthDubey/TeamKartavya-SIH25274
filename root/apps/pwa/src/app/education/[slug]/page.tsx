'use client';

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const LESSONS = {
  hedging: {
    title: "What is hedging?",
    body: [
      "Hedging means locking in a future price today so that a bad price move later does not hurt you as much.",
      "In Krishi Hedge we use simple forward contracts so a farmer knows a minimum price for part of the harvest.",
    ],
    questions: [
      {
        q: "Why do farmers hedge?",
        options: [
          "To gamble more on prices",
          "To reduce risk of price fall",
          "To always get the highest price",
        ],
        correct: 1,
      },
      {
        q: "What does a forward contract fix?",
        options: ["Only quantity", "Only quality", "Price and basic terms for a future date"],
        correct: 2,
      },
      {
        q: "Is hedging the same as speculation?",
        options: ["Yes", "No"],
        correct: 1,
      },
    ],
  },
  forecast: {
    title: "How to read our forecast",
    body: [
      "The forecast shows a likely range for mandi prices over 7, 30 and 90 days.",
      "Bands and words like 'up', 'flat' or 'uncertain' help you see direction and risk, not a guaranteed price.",
    ],
    questions: [
      {
        q: "What does the forecast show?",
        options: [
          "Exact future prices",
          "A range and direction for prices",
          "Only yesterday's price",
        ],
        correct: 1,
      },
      {
        q: "Should you treat the forecast as a guarantee?",
        options: ["Yes", "No"],
        correct: 1,
      },
      {
        q: "Which timeframes are highlighted?",
        options: ["1 and 2 days", "7, 30 and 90 days", "1 year only"],
        correct: 1,
      },
    ],
  },
} as const;

interface PageProps {
  params: { slug: string };
}

export default function LessonPage({ params }: PageProps) {
  const router = useRouter();
  const lessonKey = params.slug as keyof typeof LESSONS;
  const lesson = LESSONS[lessonKey] ?? LESSONS.hedging;

  const [answers, setAnswers] = useState<number[]>(Array(lesson.questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!submitted) return 0;
    return lesson.questions.reduce((acc, q, idx) => (answers[idx] === q.correct ? acc + 1 : acc), 0);
  }, [answers, lesson.questions, submitted]);

  function selectAnswer(qIndex: number, optionIndex: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = optionIndex;
      return next;
    });
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-[420px] bg-white px-4 pb-20 pt-4 text-sm">
      <header className="mb-3 flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700"
        >
          Back
        </button>
        <div>
          <h1 className="text-lg font-semibold text-zinc-900">{lesson.title}</h1>
          <p className="text-[11px] text-zinc-600">Short lesson with 3 quick questions.</p>
        </div>
      </header>

      <section className="space-y-3 text-xs text-zinc-700">
        {lesson.body.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </section>

      <section className="mt-4 space-y-3 text-xs">
        {lesson.questions.map((q, qIndex) => (
          <div key={qIndex} className="rounded-2xl border border-zinc-100 bg-white p-3 shadow-sm">
            <p className="text-[11px] font-medium text-zinc-700">Q{qIndex + 1}. {q.q}</p>
            <div className="mt-2 space-y-1">
              {q.options.map((opt, optIndex) => {
                const selected = answers[qIndex] === optIndex;
                const correct = submitted && q.correct === optIndex;
                const wrong = submitted && selected && !correct;
                return (
                  <button
                    key={optIndex}
                    type="button"
                    onClick={() => selectAnswer(qIndex, optIndex)}
                    className={`flex w-full items-center justify-between rounded-full border px-3 py-1 text-[11px] ${
                      correct
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                        : wrong
                        ? 'border-red-400 bg-red-50 text-red-800'
                        : selected
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                        : 'border-zinc-200 bg-white text-zinc-800'
                    }`}
                  >
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-4 space-y-2 text-xs">
        <button
          onClick={handleSubmit}
          className="w-full rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
        >
          Check answers
        </button>
        {submitted && (
          <p className="text-center text-[11px] text-emerald-800">
            You got {score} / {lesson.questions.length} correct.
          </p>
        )}
      </section>
    </main>
  );
}

