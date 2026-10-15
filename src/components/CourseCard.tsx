interface CourseCardProps {
  title: string;
}

export default function CourseCard({ title }: CourseCardProps) {
  return (
    <div className="p-5 m-2 rounded-lg border-2 shadow-sm transition-all hover:shadow-md w-72">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    </div>
  );
}
