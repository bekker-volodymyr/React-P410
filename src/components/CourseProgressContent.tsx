import { use, useOptimistic, useTransition, useState } from "react";

import { type CourseDetails, type Module } from "../data/courses";
import { CheckCircle, CheckCircle2 } from "lucide-react";

export default function CourseProgressContent({
  coursePromise,
}: {
  coursePromise: Promise<CourseDetails>;
}) {
  const initialDetails = use(coursePromise);

  const [courseDetails, setCourseDetails] =
    useState<CourseDetails>(initialDetails);

  const [isPending, startTransition] = useTransition();

  const [optimisticDetails, setOptimisticDetails] = useOptimistic(
    courseDetails,
    (currentDetails, moduleName: string) => {
      const updatedModules = currentDetails.modules.map((m) =>
        m.name === moduleName ? { ...m, isCompleted: !m.isCompleted } : m,
      );

      const completedCount = updatedModules.filter((m) => m.isCompleted).length;

      return {
        ...currentDetails,
        modules: updatedModules,
        completedModules: completedCount,
      };
    },
  );

  const completedModules = optimisticDetails.modules.filter(
    (m) => m.isCompleted,
  ).length;

  const progressPercentage = Math.min(
    100,
    Math.round(
      (completedModules / (optimisticDetails.modules.length || 1)) * 100,
    ),
  );

  const handleToggleModule = async (module: Module) => {
    startTransition(async () => {
      setOptimisticDetails(module.name);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (Math.random() > 0.85) {
          throw new Error("Помилка сервера");
        }

        const updatedModules = courseDetails.modules.map((m) =>
          m.name === module.name ? { ...m, isCompleted: !m.isCompleted } : m,
        );

        setCourseDetails({
          ...courseDetails,
          modules: updatedModules,
          completedModules: updatedModules.filter((m) => m.isCompleted).length,
        });
      } catch (error) {
        alert("Не вдалося оновити статус уроку. Спробуйте ще раз.");
      }
    });
  };

  return (
    <div className="bg-white p-6 mt-5 rounded-xl shadow-sm border border-gray-200 w-full">
      <h3 className="font-bold text-lg text-gray-800 mb-4">
        📈 Прогрес курсу: {optimisticDetails.title}
      </h3>

      <div className="space-y-4 mb-6">
        <div>
          <div>
            <p className="font-medium text-gray-600 mb-3">
              {optimisticDetails.description}
            </p>
          </div>

          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-600">Пройдено уроків: </span>
            <span className="font-bold text-blue-600">
              {completedModules} / {optimisticDetails.modules.length}
            </span>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-2">
          {optimisticDetails.modules.map((m, index) => (
            <div
              key={m.name}
              className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <span className="font-mono text-gray-400">{index + 1}.</span>
                <span
                  className={`text-sm ${m.isCompleted ? "line-through text-gray-400" : "font-medium text-gray-700"}`}
                >
                  {m.name}
                </span>
              </div>

              <button
                disabled={isPending}
                onClick={() => handleToggleModule(m)}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  m.isCompleted ? "text-green-700" : "text-gray-700"
                } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {m.isCompleted ? <CheckCircle /> : <CheckCircle2 />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
