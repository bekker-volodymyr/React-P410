import Header from "./components/Header";
import CourseCard from "./components/CourseCard";

function App() {
  return (
    <div>
      <Header studentName="Володимир" />

      <CourseCard
        title="React JS"
        teacher="Володимир Юркевіч"
        credits={10}
        isActive={true}
      />
      <CourseCard
        title="HTML/CSS"
        teacher="Володимир Юркевіч"
        isActive={false}
      />
    </div>
  );
}

export default App;
