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
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 shadow-sm mb-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-gray-600"><i className="fa-solid fa-arrow-left"></i></button>
        <h1 className="text-xl font-bold text-green-800">Lesson</h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{lesson.title}</h2>
          <div className="space-y-2 text-gray-600 text-sm leading-relaxed">
            {lesson.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-bold text-gray-800 text-lg">Quiz</h3>
          {lesson.questions.map((q, qIdx) => {
            const isCorrect = answers[qIdx] === q.correct;
            const isWrong = submitted && answers[qIdx] !== -1 && !isCorrect;
            
            return (
              <div key={qIdx} className="bg-white p-5 rounded-xl shadow-sm">
                <p className="font-bold text-gray-800 mb-3">{qIdx + 1}. {q.q}</p>
                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = answers[qIdx] === oIdx;
                    let borderClass = "border-gray-200";
                    let bgClass = "bg-white";
                    let textClass = "text-gray-600";

                    if (submitted) {
                      if (oIdx === q.correct) {
                        borderClass = "border-green-500";
                        bgClass = "bg-green-50";
                        textClass = "text-green-800 font-bold";
                      } else if (isSelected && !isCorrect) {
                        borderClass = "border-red-500";
                        bgClass = "bg-red-50";
                        textClass = "text-red-800";
                      }
                    } else if (isSelected) {
                      borderClass = "border-yellow-500";
                      bgClass = "bg-yellow-50";
                      textClass = "text-yellow-900 font-bold";
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => !submitted && selectAnswer(qIdx, oIdx)}
                        className={`w-full text-left p-3 rounded-lg border-2 ${borderClass} ${bgClass} ${textClass} transition-all`}
                        disabled={submitted}
                      >
                        {opt}
                        {submitted && oIdx === q.correct && <i className="fa-solid fa-check float-right text-green-600"></i>}
                        {submitted && isSelected && !isCorrect && <i className="fa-solid fa-times float-right text-red-600"></i>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={answers.includes(-1)}
            className={`w-full py-3 rounded-lg font-bold shadow-md transition ${
              answers.includes(-1) 
                ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                : "bg-green-700 text-white hover:bg-green-800"
            }`}
          >
            Submit Answers
          </button>
        ) : (
          <div className="bg-green-100 p-4 rounded-xl text-center border border-green-200">
            <p className="text-green-800 font-bold text-lg">
              You scored {score} / {lesson.questions.length}
            </p>
            <button 
              onClick={() => router.back()}
              className="mt-3 text-green-700 font-bold underline"
            >
              Back to Lessons
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

