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
import { formatCurrency } from "../utils/format";

type ChartProps = {
  incomeTotal: number;
  expenseTotal: number;
};

export function Chart({ incomeTotal, expenseTotal }: ChartProps) {
  const data = [
    { name: "Entradas", value: incomeTotal },
    { name: "Saídas", value: expenseTotal },
  ];

  return (
    <section className="chart-section">
      <div className="chart-card">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.16)" />
            <XAxis dataKey="name" stroke="currentColor" />
            <YAxis stroke="currentColor" tickFormatter={(value) => `R$ ${value}`} />
            <Tooltip formatter={(value) => (typeof value === "number" ? formatCurrency(value) : value)} />
            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.name === "Entradas" ? "#16a34a" : "#dc2626"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
