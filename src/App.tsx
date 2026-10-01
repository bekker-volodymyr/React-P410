import { useState } from "react";
import Header from "./components/Header";
import CourseCard from "./components/CourseCard";
import Section from "./components/Section";

const myCourses = [
  {
    id: "c1",
    title: "HTML/CSS",
    teacher: "Володимир Юркевіч",
    credits: 10,
    isActive: false,
  },
  {
    id: "c2",
    title: "JavaScript",
    teacher: "Володимир Юркевіч",
    credits: 20,
    isActive: false,
  },
  {
    id: "c3",
    title: "React JS",
    teacher: "Володимир Юркевіч",
    isActive: true,
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

  const filteredCourses = myCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
              <CourseCard key={course.id} {...course} />
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
  );
}

export default App;
