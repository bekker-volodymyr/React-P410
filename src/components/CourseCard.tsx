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
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        margin: "10px",
        borderRadius: "8px",
      }}
    >
      <h2>{title}</h2>
      <p>Викладач: {teacher}</p>
      <p>Кредити: {credits}</p>

      <div style={{ color: isActive ? "green" : "gray", fontWeight: "bold" }}>
        {isActive ? "В процесі вивчення..." : "Курс завершено"}
      </div>
    </div>
  );
}
