import { motion } from "framer-motion";
import "./SummaryCard.css";

export default function SummaryCard({
  icon,
  title,
  value,
  subtitle,
  accent,
}) {
  return (
    <motion.div
  className="SummaryCard"
  whileHover={{
    y: -5,
  }}
>
      <div className="SummaryCardHeader">
        <div
          className="SummaryCardIcon"
          style={{ color: accent }}
        >
          {icon}
        </div>

        <span>{title}</span>
      </div>

      <h2>{value}</h2>

      <p>{subtitle}</p>
    </motion.div>
  );
}