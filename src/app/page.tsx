"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FaUserGraduate,
  FaBookOpen,
  FaChalkboardTeacher,
  FaChartLine,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { JSX } from "react";

const studentTrend = [
  { week: "Week 1", students: 10 },
  { week: "Week 2", students: 12 },
  { week: "Week 3", students: 16 },
  { week: "Week 4", students: 20 },
];

const tutorHours = [
  { week: "Week 1", Tutor1: 5, Tutor2: 8, Tutor3: 10 },
  { week: "Week 2", Tutor1: 7, Tutor2: 10, Tutor3: 12 },
  { week: "Week 3", Tutor1: 10, Tutor2: 12, Tutor3: 14 },
  { week: "Week 4", Tutor1: 12, Tutor2: 14, Tutor3: 18 },
];

const subjectTrend = [
  { week: "Week 1", Math: 4, Science: 3, English: 3 },
  { week: "Week 2", Math: 5, Science: 4, English: 3 },
  { week: "Week 3", Math: 6, Science: 5, English: 4 },
  { week: "Week 4", Math: 8, Science: 6, English: 5 },
];

const weeklySummary = [
  {
    week: "Week 3",
    comparisons: [
      { subjectA: "Math", subjectB: "Science", valueA: 6, valueB: 5 },
      { subjectA: "Math", subjectB: "English", valueA: 6, valueB: 4 },
    ],
  },
  {
    week: "Week 4",
    comparisons: [
      { subjectA: "Math", subjectB: "Science", valueA: 8, valueB: 6 },
      { subjectA: "Science", subjectB: "English", valueA: 6, valueB: 5 },
    ],
  },
];

export default function Page() {
  return (
    <main className="min-h-screen p-6 bg-gray-100 text-gray-800">
      <motion.h1
        className="text-3xl font-bold mb-6 flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaChartLine className="text-blue-600" /> Tutoring Dashboard
      </motion.h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <CardItem icon={<FaUserGraduate />} label="Total Students" value="20" />
        <CardItem
          icon={<FaBookOpen />}
          label="Most Popular Subject"
          value="Math"
        />
        <CardItem
          icon={<FaChalkboardTeacher />}
          label="Top Tutor"
          value="Tutor 3"
        />
        <CardItem icon={<FaChartLine />} label="Total Hours" value="84 hrs" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard
          title="Students Over Time"
          data={studentTrend}
          lines={[{ dataKey: "students", stroke: "#6366F1" }]}
        />
        <ChartCard
          title="Tutor Hours Per Week"
          data={tutorHours}
          lines={[
            { dataKey: "Tutor1", stroke: "#3B82F6" },
            { dataKey: "Tutor2", stroke: "#10B981" },
            { dataKey: "Tutor3", stroke: "#F59E0B" },
          ]}
        />
        <ChartCard
          title="Subject Popularity Over Time"
          data={subjectTrend}
          lines={[
            { dataKey: "Math", stroke: "#EF4444" },
            { dataKey: "Science", stroke: "#8B5CF6" },
            { dataKey: "English", stroke: "#0EA5E9" },
          ]}
        />
      </div>

      {/* Weekly Summary Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {weeklySummary.map((week) => (
          <motion.div
            key={week.week}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-md font-semibold mb-2">
                {week.week} Summary
              </h3>
              <div className="space-y-2">
                {week.comparisons.map((c, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>
                      {c.subjectA} vs {c.subjectB}
                    </span>
                    <span className="font-medium text-gray-900">
                      {c.valueA} vs {c.valueB}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}

type LineConfig = {
  dataKey: string;
  stroke: string;
};

function CardItem({
  icon,
  label,
  value,
}: {
  icon: JSX.Element;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-2xl text-blue-600">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-lg">{value}</p>
      </div>
    </motion.div>
  );
}

function ChartCard<T extends { week: string }>({
  title,
  data,
  lines,
}: {
  title: string;
  data: T[];
  lines: LineConfig[];
}) {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          {lines.map(({ dataKey, stroke }) => (
            <Line
              key={dataKey}
              type="monotone"
              dataKey={dataKey}
              stroke={stroke}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
