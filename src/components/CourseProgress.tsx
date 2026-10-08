import { useState } from "react";

interface CourseType {
    id: string;
    title: string;
    completedLessons: number;
    totalLessons: number;
}

interface CourseProgressProps {
    course?: CourseType;
    onCompleteLesson: () => void;
}

export default function CourseProgress({
    course,
    onCompleteLesson
}: CourseProgressProps) {
    if (!course) {
        return (
            <div className="bg-white p-6 mt-5 rounded-xl shadow-sm border border-dashed border-gray-300 text-center text-gray-500">
                <p>Оберіть курс зі списку, щоб переглянути детальний прогрес.</p>
            </div>
        )
    }

    // const [completedLessons, setCompletedLessons] = useState(0);
    const [currentLesson, setCurrentLesson] = useState(course?.completedLessons);
    const [lastActivity, setLastActivity] = useState("Курс не розпчато");

    // const totalLessons = 12;
    const progressPercentage = Math.round((course.completedLessons / course.totalLessons) * 100);

    console.log('Рендер компоненту CourseProgress');

    // const handleCompleteLesson = () => {
    //     if (completedLessons >= totalLessons) return;

    //     setCompletedLessons(prev => prev + 1);
    //     setCurrentLesson(prev => prev + 1);

    //     const currentTime = new Date().toLocaleTimeString("uk-UA");
    //     setLastActivity(`Оновлено ${currentTime}`);
    // }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 w-full max-width-sm">
            <h3 className="font-bold text-lg text-gray-800 mb-4">📈 Прогрес курсу: {course.title}</h3>

            <div className="space-y-4 mb-6">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-600">Пройдено уроків: </span>
                        <span className="font-bold text-blue-600">{course.completedLessons} / {course.totalLessons}</span>
                    </div>

                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progressPercentage}%` }}>
                        </div>
                    </div>
                </div>

                <div className="text-sm text-gray-600">
                    <p><span className="font-medium">Наступна тема:</span> Урок {currentLesson}</p>
                    <p><span className="font-medium">Остання активність:</span>{lastActivity}</p>
                </div>
            </div>

            <button
                onClick={onCompleteLesson}
                disabled={course.completedLessons === course.totalLessons}
                className="w-full bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-green-500 disabled:cursor-not-allowed">
                {course.completedLessons === course.totalLessons ? 'Курс завершено' : 'Позначити урок пройденим'}
            </button>
        </div>
    )

}