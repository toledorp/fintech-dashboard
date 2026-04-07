import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type ChartProps = {
  incomeTotal: number;
  expenseTotal: number;
};

export function Chart({ incomeTotal, expenseTotal }: ChartProps) {
  const data = [
    { name: "Entradas", value: incomeTotal },
    { name: "Saídas", value: expenseTotal },
  ];

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <section className="chart-section">
      <div className="section-header">
        <h2>Resumo gráfico</h2>
      </div>

      <div className="chart-card">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(148, 163, 184, 0.16)"
            />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" tickFormatter={(value) => `R$ ${value}`} />
            <Tooltip
              formatter={(value) =>
                typeof value === "number" ? formatCurrency(value) : value
              }
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid rgba(148, 163, 184, 0.18)",
                borderRadius: "12px",
                color: "#e5e7eb",
              }}
            />
            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.name === "Entradas" ? "#16a34a" : "#dc2626"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
