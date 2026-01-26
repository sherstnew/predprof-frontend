"use client";

import { Send, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { TaskSchema } from "@/lib/client";
import { Loader2, Check, X } from "lucide-react";
import { useState } from "react";
import { checkAnswer } from "@/app/actions";

export default function TaskPageClient({ task }: { task: TaskSchema | null }) {
    const [answer, setAnswer] = useState<string>("");
    const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleCheckAnswer() {
        setLoading(true);
        setCorrectAnswer(null);
        setIsCorrect(null);
        try {
            const result = await checkAnswer(answer, task ? task.id : "");
            if (result.correct) {
                setIsCorrect(true);
                setCorrectAnswer("Ответ верный!");
            } else {
                setIsCorrect(false);
                setCorrectAnswer(`Правильный ответ: ${result.correct_answer}`);
            }
        } finally {
            setLoading(false);
        }
    }

    if (!task) {
        return <div>Задание не найдено</div>;
    }

    return (
        <div className="flex justify-start flex-col h-full gap-5 px-10">
            <nav
                className="flex items-center gap-3 px-3 pt-2 bg-accent rounded-xl overflow-x-scroll shadow-xl"
                style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#00000050 transparent",
                }}
            >
                <Button className="size-9">1</Button>
                <Button className="size-9">
                    <Plus className="size-4" />
                </Button>
            </nav>
            <div className="flex flex-col content-between flex-1 pt-2 py-10 w-full">
                <div className="flex flex-col flex-1 gap-3">
                    <span className="opacity-50">
                        {task.subject} - {task.theme}
                    </span>
                    <header className="text-3xl font-medium">
                        {task.title}
                    </header>
                    <div className="mt-5 w-2/3 text-justify">
                        {task.task_text}
                    </div>
                </div>
                <div className="flex gap-5 items-center justify-start max-w-1/2 flex-wrap">
                    {correctAnswer && (
                        <div
                            className={`w-full p-3 rounded-md flex items-center gap-3 text-sm ${
                                isCorrect
                                    ? 'bg-green-50 text-green-800 border border-green-100'
                                    : 'bg-red-50 text-red-800 border border-red-100'
                            }`}
                        >
                            {isCorrect ? (
                                <Check className="h-5 w-5 text-green-600" />
                            ) : (
                                <X className="h-5 w-5 text-red-600" />
                            )}
                            <div className="break-words">{correctAnswer}</div>
                        </div>
                    )}
                    <div className="w-full pt-3 text-sm">
                        Введите свой ответ в поле ниже:
                    </div>

                    <div className="w-full flex items-stretch gap-5">
                        <Input
                            placeholder="Ваш ответ"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                        <Button
                            className="flex gap-3 items-center"
                            onClick={handleCheckAnswer}
                            disabled={loading}
                            aria-busy={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Проверка...</span>
                                </>
                            ) : (
                                <>
                                    <span>Отправить</span>
                                    <Send />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
