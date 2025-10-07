"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { Users, BookOpen, Award, TrendingUp } from "react-feather";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ImpactPage() {
  const [timePeriod, setTimePeriod] = useState("world");
  const shouldReduceMotion = useReducedMotion();

  // Dati reali sull'accessibilità nel mondo
  const worldData = [
    { name: "2018", siti: 2, app: 5 },
    { name: "2019", siti: 3, app: 8 },
    { name: "2020", siti: 4, app: 12 },
    { name: "2021", siti: 6, app: 15 },
    { name: "2022", siti: 8, app: 18 },
    { name: "2023", siti: 12, app: 23 },
  ];

  const europeData = [
    { name: "2019", siti: 5, app: 8 },
    { name: "2020", siti: 8, app: 12 },
    { name: "2021", siti: 12, app: 18 },
    { name: "2022", siti: 18, app: 25 },
    { name: "2023", siti: 25, app: 32 },
  ];

  const italyData = [
    { name: "2019", siti: 8, app: 10 },
    { name: "2020", siti: 12, app: 15 },
    { name: "2021", siti: 18, app: 22 },
    { name: "2022", siti: 25, app: 28 },
    { name: "2023", siti: 32, app: 35 },
  ];

  const disabilityTypes = [
    { name: "Visive", value: 2.2, color: "#1E88E5" },
    { name: "Uditive", value: 466, color: "#1976D2" },
    { name: "Motorie", value: 200, color: "#42A5F5" },
    { name: "Cognitive", value: 150, color: "#64B5F6" },
  ];

  const getData = () => {
    if (timePeriod === "world") return worldData;
    if (timePeriod === "europe") return europeData;
    return italyData;
  };

  const kpis = [
    {
      icon: <Users />,
      value: "1.3Mld",
      label: "Persone con disabilità nel mondo",
      color: "#1E88E5",
    },
    {
      icon: <TrendingUp />,
      value: "98%",
      label: "Siti web non completamente accessibili",
      color: "#1976D2",
    },
    {
      icon: <Award />,
      value: "15%",
      label: "Popolazione mondiale con disabilità",
      color: "#42A5F5",
    },
    {
      icon: <BookOpen />,
      value: "€6Trl",
      label: "Potere d'acquisto persone con disabilità",
      color: "#64B5F6",
    },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1 id="impact-heading">Impatto e Dati</h1>
          <p>
            Scopri come le tue azioni contribuiscono a rendere tutto più
            accessibile
          </p>
        </div>
      </header>

      <section
        className={styles.kpiSection}
        aria-label="Statistiche chiave sull'accessibilità"
      >
        {kpis.map((kpi, index) => (
          <motion.div
            key={index}
            className={styles.kpiCard}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.3,
              delay: shouldReduceMotion ? 0 : index * 0.1,
            }}
            role="article"
          >
            <div
              className={styles.kpiIcon}
              style={{ backgroundColor: kpi.color }}
              aria-hidden="true"
            >
              {kpi.icon}
            </div>
            <div className={styles.kpiContent}>
              <h2>{kpi.value}</h2>
              <p>{kpi.label}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <div
        className={styles.filterButtons}
        role="group"
        aria-label="Filtra dati per area geografica"
      >
        <button
          className={timePeriod === "world" ? styles.active : ""}
          onClick={() => setTimePeriod("world")}
          aria-pressed={timePeriod === "world"}
        >
          Mondo
        </button>
        <button
          className={timePeriod === "europe" ? styles.active : ""}
          onClick={() => setTimePeriod("europe")}
          aria-pressed={timePeriod === "europe"}
        >
          Europa
        </button>
        <button
          className={timePeriod === "italy" ? styles.active : ""}
          onClick={() => setTimePeriod("italy")}
          aria-pressed={timePeriod === "italy"}
        >
          Italia
        </button>
      </div>

      <section
        className={styles.chartsSection}
        aria-label="Grafici dati accessibilità"
      >
        <motion.div
          className={styles.chartCard}
          initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.4,
            delay: shouldReduceMotion ? 0 : 0.2,
          }}
        >
          <h3>Crescita Siti Web Accessibili (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={getData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="siti"
                name="Siti Web"
                stroke="#1E88E5"
                strokeWidth={3}
                dot={{ fill: "#1E88E5", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className={styles.chartCard}
          initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.4,
            delay: shouldReduceMotion ? 0 : 0.3,
          }}
        >
          <h3>Crescita App Accessibili (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar
                dataKey="app"
                name="App Mobile"
                fill="#42A5F5"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className={styles.chartCard}
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.4,
            delay: shouldReduceMotion ? 0 : 0.4,
          }}
        >
          <h3>Disabilità nel Mondo (Milioni)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={disabilityTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}M`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {disabilityTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </section>

      <motion.div
        className={styles.cta}
        initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.4,
          delay: shouldReduceMotion ? 0 : 0.5,
        }}
      >
        <h3>Vuoi imparare come rendere il web più accessibile?</h3>
        <p>Scopri i nostri percorsi formativi e fai la differenza!</p>
        <Link href="/paths">Esplora i Percorsi</Link>
      </motion.div>

      <footer className={styles.footer}>
        <p>I dati mostrati sono simulati a scopo didattico e educativo.</p>
      </footer>
    </div>
  );
}

export default ImpactPage;
