interface CourseCardProps {
  title: string;
  onSelect: () => void;
}

export default function CourseCard({ title, onSelect }: CourseCardProps) {
  return (
    <div
      onClick={onSelect}
      className="p-5 m-2 rounded-lg border-2 shadow-sm transition-all border-blue-400 hover:shadow-md w-72"
    >
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    </div>
  );
}
