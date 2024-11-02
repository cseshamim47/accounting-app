"use client";

import React from "react";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const pieChartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];
const pieChartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", income: 186, expense: 80 },
  { month: "February", income: 305, expense: 200 },
  { month: "March", income: 237, expense: 120 },
  { month: "April", income: 73, expense: 190 },
  { month: "May", income: 209, expense: 130 },
  { month: "June", income: 214, expense: 140 },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "#2563eb",
  },
  expense: {
    label: "Expense",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const Dashboard = () => {
  const totalVisitors = React.useMemo(() => {
    return pieChartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);
  return (
    <div className="m-6 w-full space-y-8">
      <div className="w-full">
        <p className="text-5xl font-bold">Items</p>
      </div>

      <div className="w-full dark:bg-slate-900 bg-gray-100 rounded-lg p-6 space-y-4">
        <div className="flex gap-4 items-center">
          <p className="font-bold text-xl">Invoices & Expenses </p>
          <p className="text-sm">This fiscal year </p>
        </div>
        <div className="rounded-md border bg-white dark:bg-inherit">
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="income" fill="var(--color-income)" radius={4} />
              <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      <div className="w-full dark:bg-slate-900 bg-gray-100 rounded-lg p-6 space-y-4">
        <p className="font-bold text-xl">Money Coming In</p>
        <div className="grid grid-cols-3 gap-4 w-full">
          <div className="rounded-xl bg-white dark:bg-inherit dark:border p-3">
            <p>Coming Due (1-30 days)</p>
            <p className="text-2xl">€0.00</p>
          </div>
          <div className="rounded-xl bg-gray-200 dark:bg-inherit dark:border p-3">
            <p>Coming Due (31-60 days)</p>
            <p className="text-2xl">€0.00</p>
          </div>
          <div className="rounded-xl bg-red-300 dark:bg-inherit dark:border p-3 text-red-700 dark:text-red-500">
            <p>Overdue </p>
            <p className="text-2xl">€0.00</p>
          </div>
        </div>
      </div>

      <div className="w-full dark:bg-slate-900 bg-gray-100 rounded-lg p-6 space-y-4">
        <p className="font-bold text-xl">Money Going Out</p>
        <div className="grid grid-cols-3 gap-4 w-full">
          <div className="rounded-xl bg-white dark:bg-inherit dark:border p-3">
            <p>Coming Due (1-30 days)</p>
            <p className="text-2xl">€1750.49</p>
          </div>
          <div className="rounded-xl bg-gray-200 dark:bg-inherit dark:border p-3">
            <p>Coming Due (31-60 days)</p>
            <p className="text-2xl">€0.00</p>
          </div>
          <div className="rounded-xl bg-red-300 dark:bg-inherit dark:border p-3 text-red-700 dark:text-red-500">
            <p>Overdue </p>
            <p className="text-2xl">€0.00</p>
          </div>
        </div>
      </div>

      <div className="w-full dark:bg-slate-900 bg-gray-100 rounded-lg p-6 space-y-4">
        <div className="flex gap-4 items-center">
          <p className="font-bold text-xl">Top Expenses </p>
          <p className="text-sm">This fiscal year </p>
        </div>
        <div className="rounded-md border bg-white dark:bg-inherit">
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Pie Chart - Donut with Text</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={pieChartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={pieChartData}
                    dataKey="visitors"
                    nameKey="browser"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {totalVisitors.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Visitors
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
