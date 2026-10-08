import { useState } from "react";
import Header from "./components/Header";
import CourseCard from "./components/CourseCard";
import Section from "./components/Section";
import CourseProgress from "./components/CourseProgress";
import FocusTimer from "./components/FocusTimer";


const myCourses = [
  {
    id: "c1",
    title: "HTML/CSS",
    teacher: "Володимир Юркевіч",
    credits: 10,
    isActive: false,
    completedLessons: 12,
    totalLessons: 12
  },
  {
    id: "c2",
    title: "JavaScript",
    teacher: "Володимир Юркевіч",
    credits: 20,
    isActive: true,
    completedLessons: 15,
    totalLessons: 20
  },
  {
    id: "c3",
    title: "React JS",
    teacher: "Володимир Юркевіч",
    isActive: true,
    completedLessons: 2,
    totalLessons: 15
  },
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const [userProfile, setUserProfile] = useState({
    name: "Володимир Юркевіч",
    group: "P-410",
    isOnline: true,
  });

  const handleTransfer = () => {
    setUserProfile({ ...userProfile, isOnline: !userProfile.isOnline });
  };

  const [courses, setCourses] = useState(myCourses);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCompleteLesson = (courseId: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId ?
          { ...course, completedLessons: course.completedLessons + 1 } : course,
      ),
    );
  };

  return (
    <div>
      <Header studentName={userProfile.name} />

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
        <aside className="w-full md:w-1/3 flex flex-col gap-6">
          <CourseProgress
            course={selectedCourse}
            onCompleteLesson={() => selectedCourseId && handleCompleteLesson(selectedCourseId)} />

          <FocusTimer />
        </aside>

        <Section title="Мої курси">
          <input
            type="text"
            placeholder="Пошук курсу..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-2">
            Пошук за назвою курсу: <strong>{searchQuery}</strong>
          </p>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {filteredCourses.length != 0 ? (
              filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  {...course}
                  isSelected={selectedCourseId === course.id}
                  onSelect={() => setSelectedCourseId(course.id)} />
              ))
            ) : (
              <p className="text-gray-500">Курсів не знайдено.</p>
            )}
          </div>
        </Section>

        <Section title="Мої завдання">
          <p>Тут будуть домашні завдання...</p>
        </Section>

        <Section title="Мої заняття">
          <p>Тут будуть відвідані та майбутні заняття...</p>
        </Section>
      </div>
    </div>
  );
}

export default App;
