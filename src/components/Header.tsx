import { useEffect, useState } from "react";

interface StudentData {
  name: string;
}

interface HeaderProps {
  id: number;
}

export default function Header({ id }: HeaderProps) {
  const [student, setStudent] = useState<null | StudentData>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, []);

  if (student === null) {
    return (
      <header className="bg-blue-900 text-center py-3 text-white">
        Завантаження...
      </header>
    );
  }

  return (
    <header className="bg-blue-900 text-center py-3 text-white">
      <h2 className="text-2xl font-bold tracking-wide">
        Електронний щоденник студента
      </h2>
      <p className="text-lg tracking-wide">
        Вітаємо, {student?.name}! Гарного навчання!
      </p>
    </header>
  );
}
