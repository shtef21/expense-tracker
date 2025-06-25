import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

export const ExpenseChart = ({ data }) => (
  <LineChart
    width={700}
    height={400}
    data={data}
    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="monthStr" />
    <YAxis label={{ value: '€ Euros', angle: -90, position: 'insideLeft' }} />
    <Tooltip formatter={(value) => `€${value}`} />
    <Legend />
    <Line
      type="monotone"
      dataKey="amount"
      stroke="#82ca9d"
      strokeWidth={3}
      activeDot={{ r: 8 }}
    />
  </LineChart>
);
