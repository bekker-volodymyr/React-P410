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
  return (
    <div>
      <Header studentName="Володимир" />

      <Section title="Мої курси">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {myCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              teacher={course.teacher}
              credits={course.credits}
              isActive={course.isActive}
            />
          ))}
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
