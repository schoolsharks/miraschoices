import { PieChart, Pie, Cell } from "recharts";

const SemiCircleProgress = ({ value }: { value: number }) => {
  const percentage = Math.min(100, Math.max(0, value)); 
  const data = [
    { value: percentage }, 
    { value: 100 - percentage }, 
  ];
  
  const COLORS = ["#FF3B30", "#000"]; 

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <PieChart width={350} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="100%"
          startAngle={180}
          endAngle={0}
          innerRadius={120}
          outerRadius={160}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default SemiCircleProgress;
