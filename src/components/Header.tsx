interface HeaderProps {
    studentName: string;
}

export default function Header({ studentName }: HeaderProps) {
    return (
        <header className="text-center bg-blue-700 text-white py-4">
            <h2 className="text-4xl font-bold uppercase mb-4">Електронний щоденник студента</h2>
            {/* Інтерполяція рядків */}
            <p className="text-l">Вітаємо, {studentName}! Гарного навчання!</p>
        </header>
    )
}