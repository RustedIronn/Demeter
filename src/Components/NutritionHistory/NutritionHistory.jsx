import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getNutritionTotals } from "../../assets/utils/nutritionAnalytics";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { Form } from "react-bootstrap";

import "./NutritionHistory.css";

export default function NutritionHistory() {
    
    const [metric, setMetric] = useState("calories");

const dataPoints = useSelector(
  (state) => state.personal.data_points
);
  
const chartData = useMemo(() => {
  return dataPoints.map((day) => ({
    date: day.date,
    ...getNutritionTotals(day.intake_list),
  }));
}, [dataPoints]);

  return (
    <div className="NutritionHistory">
  <h4>📈 Nutrition History</h4>

  <Form.Select
    className="mb-3"
    value={metric}
    onChange={(e) => setMetric(e.target.value)}
  >
    <option value="calories">Calories</option>
    <option value="protein">Protein</option>
    <option value="carbs">Carbs</option>
    <option value="fat">Fat</option>
  </Form.Select>

  <ResponsiveContainer
    width="100%"
    height={250}
  >
    <LineChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="date" />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey={metric}
        stroke="#4CAF50"
        strokeWidth={3}
      />
    </LineChart>
  </ResponsiveContainer>
</div>
  );
}