
export default function Indicadores() {


    const dataTest = [
        { name: 'Efectivo', value: 10 },
        { name: 'Yape', value: 20 },
        { name: 'Tarjeta', value: 30 },
        { name: 'Transferencia', value: 40 },
    ];

    const COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6'];
    const pieData = dataTest.map((item, index) => ({
        name: item.name,
        value: item.value,
        fill: COLORS[index % COLORS.length],
    }));

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pieData.map((item) => (
                <div
                    key={item.name}
                    className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm"
                >
                    <span className="text-xs text-gray-500">{item.name}</span>
                    <span className="text-lg font-semibold text-gray-900">
                        S/ {item.value.toFixed(2)}
                    </span>
                </div>
            ))}
        </section>
    );
}