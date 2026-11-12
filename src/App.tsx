import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { type CourseDetails } from "./data/courses";
import api from "./api/client";

import CourseProgressWrapper from "./components/CourseProgress/CourseProgressWrapper";
import LoginForm from "./components/LoginForm";
import EditProfileFrom from "./components/EditProfileForm";
import Header from "./components/Header";
import CourseCard from "./components/CourseCard";
import Section from "./components/Section";
import FocusTimer from "./components/FocusTimer";

const fetchCourses = async (): Promise<CourseDetails[]> => {
  const response = await api.get("/api/courses/");

  if (!response.status) {
    throw new Error("Failed to fetch courses");
  }

  return response.data;
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginModal, setIsLoginModal] = useState(false);

  const [userProfile, setUserProfile] = useState({
    name: "Володимир Юркевіч",
    group: "P-410",
    isOnline: true,
  });

  const handleTransfer = () => {
    setUserProfile({ ...userProfile, isOnline: !userProfile.isOnline });
  };

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  const filteredCourses = data
    ? data.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const courseContent = isPending ? (
    <div className="text-gray-500">Завантажуємо курси...</div>
  ) : isError ? (
    <div className="text-rose-400">
      Помилка при завантажені курсів: {error.message}
    </div>
  ) : filteredCourses.length != 0 ? (
    filteredCourses.map((course) => (
      <CourseCard
        key={course.id}
        title={course.title}
        onSelect={() => setSelectedCourseId(course.id)}
      />
    ))
  ) : (
    <p className="text-gray-500">Курсів не знайдено.</p>
  );

  return (
    <div>
      <Header id={1} />

      <button
        onClick={() => setIsLoginModal(!isLoginModal)}
        className="absolute z-100 right-4 top-4 font-bold bg-blue-950 px-4 py-2 text-lg text-white rounded-xl hover:scale-[1.1] transition-all"
      >
        {isLoginModal ? "Закрити" : "Увійти"}
      </button>

      {isLoginModal && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex flex-col justify-center items-center bg-slate-600/30">
          <LoginForm />
        </div>
      )}

      <EditProfileFrom />

      <div className="p-5 m-2 w-72">
        <p className="text-gray-600 mt-2">Група: {userProfile.group}</p>
        <p className="text-gray-600 mt-2">
          Статус:{" "}
          {userProfile.isOnline ? (
            <span className="text-green-500">Онлайн</span>
          ) : (
            <span className="text-red-500">Офлайн</span>
          )}
        </p>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleTransfer}
        >
          {userProfile.isOnline ? "Вийти з онлайн" : "Увійти в онлайн"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <aside className="w-full flex flex-col gap-6 ml-4">
          <CourseProgressWrapper id={selectedCourseId} />

          <FocusTimer />
        </aside>

        <div className="flex flex-col">
          <Section title="Мої курси">
            <input
              type="text"
              placeholder="Пошук курсу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="flex flex-wrap">{courseContent}</div>
          </Section>

          <Section title="Мої завдання">
            <p>Тут будуть домашні завдання...</p>
          </Section>

          <Section title="Мої заняття">
            <p>Тут будуть відвідані та майбутні заняття...</p>
          </Section>
        </div>
      </div>
    </div>
  );
}

export default App;
