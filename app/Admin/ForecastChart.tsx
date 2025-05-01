import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Dimensions, Text } from "react-native";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

type Tx = {
  transaction_date: string;
  transaction_mode: string;
  Total_Amount: number;
};

type ForecastResp = {
  dates: string[];              // next 7 days, e.g. "2025-04-26"
  predicted_spending: number[]; // forecast dollars
};

export default function ForecastChart() {
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string|null>(null);
  const [labels, setLabels]   = useState<string[]>([]);
  const [actual, setActual]   = useState<(number|null)[]>([]);
  const [forecast, setFc]     = useState<(number|null)[]>([]);

  useEffect(() => {
    async function load() {
      try {
        // 1) fetch history + forecast
        const [histRes, fcRes] = await Promise.all([
          axios.get<Tx[]>("/Transactions/"),
          axios.get<ForecastResp>("/predict_transactions/"),
        ]);

        const txs      = histRes.data;
        const { dates: futDates, predicted_spending } = fcRes.data;

        // 2) build dayMap in Chicago time
        const revenueModes = ["Cash", "Card", "Flex Dollars"];
        const dayMap = new Map<string, number>();
        txs.forEach(tx => {
          if (!revenueModes.includes(tx.transaction_mode)) return;
          // Group by Chicago date
          const day = new Date(tx.transaction_date)
            .toLocaleDateString("sv-SE", { timeZone: "America/Chicago" });
          dayMap.set(day, (dayMap.get(day) || 0) + tx.Total_Amount);
        });

        // 3) sort days and grab last 7
        const allDays = Array.from(dayMap.keys()).sort();
        const last7   = allDays.slice(-7);
        const actual7 = last7.map(d => dayMap.get(d)!);

        // 4) convert future dates to Chicago display too
        const futChicago = futDates.map(d =>
          new Date(d + "T00:00:00")   // ensure ISO date
            .toLocaleDateString("sv-SE", { timeZone: "America/Chicago" })
        );

        // 5) stitch into 14-day arrays
        setLabels([ ...last7, ...futChicago ]);
        setActual([ ...actual7, ...new Array(futChicago.length).fill(null) ]);
        setFc([ ...new Array(last7.length).fill(null), ...predicted_spending ]);

      } catch (e) {
        console.error(e);
        setError("Failed to load forecast data");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;
  if (error)   return <Text style={[styles.center, styles.error]}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Actual Revenue (last 7 days)",
              data: actual,
              borderColor: "blue",
              fill: false,
              tension: 0.3,
            },
            {
              label: "Forecast Revenue (next 7 days)",
              data: forecast,
              borderColor: "red",
              borderDash: [5,5],
              fill: false,
              tension: 0.3,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { ticks: { maxRotation: 45, minRotation: 45 } },
            y: { beginAtZero: true, title: { display: true, text: "Revenue ($)" } },
          },
          plugins: {
            legend: { position: "bottom" as const },
            title: { display: true, text: "14-Day Revenue" },
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 60,
    height: 300,
  },
  center: {
    textAlign: "center",
    marginTop: 20,
  },
  error: {
    color: "red",
  },
});
