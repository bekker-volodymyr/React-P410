import clsx from "clsx";

interface CourseCardProps {
  title: string;
  teacher: string;
  credits?: number;
  isActive: boolean;
}

export default function CourseCard({
  title,
  teacher,
  credits = 0,
  isActive,
}: CourseCardProps) {
  return (
    <div
      className={clsx(
        "p-5 m-2 rounded-lg border-2 shadow-sm transition-all hover:shadow-md w-72",
        isActive ? "border-green-500 bg-green-50" : "border-gray-300 bg-white",
      )}
    >
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2">Викладач: {teacher}</p>
      <p className="text-gray-600 mt-2">Кредити: {credits}</p>

      <div
        className={clsx(
          "mt-4 font-semibold text-sm px-3 py-1 inline-block rounded-full",
          isActive
            ? "bg-green-200 text-green-800"
            : "bg-gray-200 text-gray-700",
        )}
      >
        {isActive ? "В процесі вивчення..." : "Курс завершено"}
      </div>
    </div>
  );
}
