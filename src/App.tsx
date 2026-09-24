import "./App.css";
import Header from "./components/Header";
import CourseCard from "./components/CourseCard";

function App() {
  return (
    <div>
      <Header studentName="Володимир" />
      <CourseCard title="React JS" teacher="Володимир Юркевіч" credits={10} />

      <CourseCard title="HTML/CSS" teacher="Володимир Юркевіч" />
    </div>
  );
}

export default App;
