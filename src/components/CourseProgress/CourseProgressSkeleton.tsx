export default function CourseProgressSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 w-full max-w-sm animate-pulse">
      {/* Заголовок курсу */}
      <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4"></div>

      <div className="space-y-4 mb-6">
        <div>
          {/* Опис курсу (2 рядки для імітації тексту) */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>

          {/* Текст прогресу (Пройдено уроків: X / Y) */}
          <div className="flex justify-between items-center mb-2">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </div>

          {/* Прогрес-бар */}
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div className="bg-gray-200 h-2.5 rounded-full w-full"></div>
          </div>
        </div>

        {/* Список модулів (5 пунктів) */}
        <div className="space-y-3 pt-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              {/* Номер модуля */}
              <div className="h-4 bg-gray-200 rounded w-4 shrink-0"></div>
              {/* Назва модуля (різна ширина для реалістичності) */}
              <div
                className={`h-4 bg-gray-200 rounded ${
                  index % 2 === 0 ? "w-3/4" : "w-2/3"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
