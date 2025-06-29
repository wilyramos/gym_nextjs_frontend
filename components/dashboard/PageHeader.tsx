export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
        <header className="mb-8 pb-4 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-gray-500 text-lg mt-1">{subtitle}</p>}
        </header>
    );
}
