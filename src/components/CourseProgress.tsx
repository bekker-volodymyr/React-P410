import { useEffect, useState } from "react";
import type { CourseDetails, Module } from "../data/courses";
import { courseDetailsData } from "../data/courses";

interface CourseProgressProps {
  id: string | null;
  // onCompleteLesson: () => void;
}

export default function CourseProgress({
  id,
  // onCompleteLesson
}: CourseProgressProps) {
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const courseDetails = courseDetailsData.find((c) => c.id === id);
      if (courseDetails) {
        setCourseDetails(courseDetails);
        setError("");
      } else {
        setCourseDetails(null);
        setError(`Cannot find course with id ${id}`);
      }
      setIsLoading(false);

      return () => clearTimeout(timer);
    }, 2000);
  }, [id]);

  if (!courseDetails && !isLoading) {
    return (
      <div className="bg-white p-6 mt-5 rounded-xl shadow-sm border border-dashed border-gray-300 text-center text-gray-500">
        <p>Оберіть курс зі списку, щоб переглянути детальний прогрес.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white p-6 mt-5 rounded-xl shadow-sm border border-dashed border-gray-300 text-center text-gray-500">
        <p>Завантаження...</p>
      </div>
    );
  }

  if (error) {
    <div className="bg-red-50 p-6 mt-5 rounded-xl shadow-sm border border-dashed border-red-300 text-center text-red-500">
      <p>{error}</p>
    </div>;
  }

  const completedModules =
    courseDetails?.modules.filter((m) => m.isCompleted).length || 0;

  const progressPercentage = Math.min(
    100,
    Math.round((completedModules / (courseDetails?.modules.length || 1)) * 100),
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 w-full max-width-sm">
      <h3 className="font-bold text-lg text-gray-800 mb-4">
        📈 Прогрес курсу: {courseDetails?.title}
      </h3>

      <div className="space-y-4 mb-6">
        <div>
          <div>
            <p className="font-medium text-gray-600">
              {courseDetails?.description}
            </p>
          </div>

          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-600">Пройдено уроків: </span>
            <span className="font-bold text-blue-600">
              {completedModules} / {courseDetails?.modules.length}
            </span>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div>
          {courseDetails?.modules.map((m, index) => (
            <p>
              <span className="font-mono">{index + 1}.</span>{" "}
              <span className="font-bold tracking-wide">{m.name}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
