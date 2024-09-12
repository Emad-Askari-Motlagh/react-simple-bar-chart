simple_react_bar_chart
#The module is still in test process
react-simple-bar-chart is a simple React component for visualizing and selecting ranges on a calendar.(max 3 for each row) It's designed to be flexible and easy to integrate into your React applications.

🚀 Features

Dynamic rows: Allows users to see multiple data in one row but not more than 3.
Customizable: Easily customize the appearance of the chart.

⚠️ Under Testing

This library is currently under testing and development. You can use it but maybe still there is some issues. While we are working hard to make it stable and reliable, please be aware that some features may be experimental or subject to change. We appreciate your feedback and contributions to my github.

OBS!
The app works on matching keys on data and xAxis.(if xAxis and data has same key then data values show up in chart)

📦 Installation

To install simple_react_bar_chart, use npm or yarn:

bash
Copy code
npm install simple_react_bar_chart
or

bash
Copy code
yarn add react-simple-bar-chart

![Simple example](./assets/readme-pic.jpg)

Example of use

```jsx
import ChartComponent from "simple_react_bar_chart";
import { useState } from "react";
interface Data {
  key: number;
  beginNumber: number;
  endNumber: number;
  color: string;
  type: string;
}
const data: { [key: number]: Data[] } = {
  1: [
    {
      type: "Apple",
      beginNumber: 1,
      endNumber: 9,
      color: "orange",
      key: 2,
    },
    {
      type: "Samsung",
      beginNumber: 3,
      endNumber: 6,
      color: "green",
      key: 2,
    },
    {
      type: "Other",
      beginNumber: 2,
      endNumber: 8,
      color: "red",
      key: 2,
    },
  ],
  2: [
    {
      type: "Apple",
      beginNumber: 4,
      endNumber: 8,
      color: "orange",
      key: 1,
    },
    {
      type: "Samsung",
      beginNumber: 3,
      endNumber: 6,
      color: "green",
      key: 2,
    },
  ],
};
const xAxis = [
  {
    type: "Jan",

    color: "#fff",
    key: 1,
  },
  {
    type: "Feb",

    color: "#fff",
    key: 2,
  },
  {
    type: "March",

    color: "#fff",
    key: 3,
  },
  {
    type: "Apr",

    color: "#fff",
    key: 4,
  },
  {
    type: "May",

    color: "#fff",
    key: 5,
  },
  {
    type: "Jun",

    color: "#fff",
    key: 6,
  },
  {
    type: "Jul",

    color: "#fff",
    key: 7,
  },
  {
    type: "Aug",

    color: "#fff",
    key: 8,
  },
  {
    type: "Sep",

    color: "#fff",
    key: 9,
  },
  {
    type: "Oct",

    color: "#fff",
    key: 10,
  },
  {
    type: "Nov",

    color: "#fff",
    key: 11,
  },
  {
    type: "Dec",

    color: "#fff",
    key: 12,
  },
];

export interface DayData {
  key: number;
  beginNumber: number; // Hour in the day (e.g., 9 for 9:00 AM)
  endNumber: number; // Hour in the day (e.g., 17 for 5:00 PM)
  color: string; // Color to represent the event
}
interface RowsData {
  key: number;
  color: "";
  type: "";
}
const yAxisLength = 14;
const App = () => {
  const [page, setPage] = useState(1);
  return (
    <div
      style={{
        height: "500px",
        maxWidth: "700px",
        margin: "auto",
        marginTop: "10%",
      }}>
      <ChartComponent
        onNavigateNext={() => setPage((cur) => cur + 1)}
        onNavigatePrevious={() => setPage((cur) => (page > 1 ? cur - 1 : 1))}
        currentPage={page}
        xAxis={xAxis as RowsData[]}
        yAxisExtension=". 000"
        yAxisLength={yAxisLength}
        containerStyle={{ color: "white" }}
        data={(data as any)[page] as DayData[]}
        GuidComponent={<GuidComponent page={page} />}
      />
    </div>
  );
};

// // To filter duplicates by `type` (or any key)
const uniqueData = Object.values(data)
  .flatMap((r) => r)
  .filter(
    (obj, index, self) => index === self.findIndex((t) => t.type === obj.type)
  );

// Render the filtered data

const GuidComponent = ({ page }: { page: number }) => {
  return (
    <div
      className="guid-colors-parent"
      style={{ color: "white" }}>
      <>
        {uniqueData.map((r, index) => (
          <span key={index}>
            <span
              className="guid-colors-shape"
              style={{ backgroundColor: r.color }}></span>
            <span>{r.type}</span>
          </span>
        ))}
      </>
    </div>
  );
};
export default App;

```
