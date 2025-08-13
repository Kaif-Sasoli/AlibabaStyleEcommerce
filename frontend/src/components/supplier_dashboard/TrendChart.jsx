import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';

const data = [
  { time: '8 AM', today: 20, yesterday: 15 },
  { time: '10 AM', today: 45, yesterday: 25 },
  { time: '12 PM', today: 15, yesterday: 30 },
  { time: '2 PM', today: 38, yesterday: 28 },
  { time: '4 PM', today: 30, yesterday: 20 },
];

export default function TrendsChart() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          {/* <XAxis dataKey="time" /> */}
          {/* <YAxis /> */}
          <Tooltip />
          <Line type="monotone" dataKey="yesterday" stroke="#d3d3d3" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="today" stroke="#2563eb" strokeWidth={2} dot={{ stroke: '#2563eb', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
