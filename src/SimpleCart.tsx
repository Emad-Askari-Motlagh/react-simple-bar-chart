import React, { CSSProperties, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./SimpleChart.css";

interface Data {
  key: number;
  beginNumber: number;
  endNumber: number;
  color: string;
}

interface RowsData {
  key: number;
  color: string;
  type: string;
}

interface ChartComponentProps {
  data: Data[];
  GuidComponent: JSX.Element;
  containerStyle: CSSProperties;
  yAxisExtension?: string;
  xAxis: RowsData[];
  yAxisLength: number;
  onNavigateNext: () => void;
  onNavigatePrevious: () => void;
  currentPage: number;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  data,
  containerStyle,
  GuidComponent,
  currentPage,

  yAxisExtension,
  xAxis,
  yAxisLength,
  onNavigateNext,
  onNavigatePrevious,
}) => {
  // Pagination state

  // Render cells based on pagination
  const renderCells = () => {
    const isOnRange = (hour: number, beginHour: number, endHour: number) => {
      return hour >= beginHour && hour < endHour;
    };

    const start = 0;
    const end = yAxisLength;

    return (
      <div className="chart-container">
        {xAxis.map((r, dayIndex) => {
          const dayEvents = data?.length
            ? data.filter(({ key }) => key === r.key)
            : data;
          let cells: any = [];

          for (let i = start; i <= end; i++) {
            const eventsAtHour =
              dayEvents?.length > 0 && dayEvents?.length < 4
                ? dayEvents.filter(({ beginNumber, endNumber }) =>
                    isOnRange(i, beginNumber, endNumber)
                  )
                : [];

            const totalEvents = eventsAtHour.length;

            const eventCells =
              totalEvents > 0 ? (
                eventsAtHour.map((event, eventIndex) => {
                   
                  return (
                    <div
                      key={eventIndex}
                      style={{
                        width: `${(100 / dayEvents?.length) * 0.9}%`,
                        
                            overflow:'hidden',   

                      }}>
               
                      <ChartItem
                      currentIndex={dayIndex}
                        quantity={yAxisLength + 1}
                        color={event.color}
                        startCell={data[dayIndex]?data[dayIndex].beginNumber:0}
                        endCell={data[dayIndex]?data[dayIndex].endNumber:0}
                      />
                    </div>
                  );
                })
              ) : (
                <ChartItem
                  quantity={yAxisLength + 1}
                  color="transparent"
                  currentIndex={0}
                  startCell={data[i]?data[i].beginNumber:0}
                        endCell={data[i]?data[i].endNumber:0}
                />
              );

            cells.push(
              <div
                key={`${dayIndex}-${i}`}
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent:
                    dayEvents?.length == 1 ? "center" : "space-between",
                  alignItems: "center",
                  alignSelf: "center",
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              
                  width: "100%",

                  overflow: "hidden",
                }}>
                {eventCells}
              </div>
            );
          }

          return (
            <div key={dayIndex}>
              <div
                style={{
                  fontWeight: "900",
                  fontSize: "12px",
                  color: r.color ? r.color : "#fff",
                }}>
                {r.type}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column-reverse",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid gray",
                }}>
                {cells}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {/* Pagination Controls */}
      <div className="arrows-container">
        <button
          onClick={onNavigatePrevious}
          className="arrows-wrapper">
          <FaArrowLeft style={{ fontSize: "12px" }} />
          <span>Previous Page</span>
        </button>
        <span>{currentPage}</span>
        <button
          onClick={onNavigateNext}
          className="arrows-wrapper">
          <span>Next Page</span>
          <FaArrowRight style={{ fontSize: "12px" }} />
        </button>
      </div>
      {GuidComponent}
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "10% 90%",
          gridTemplateRows: "auto",
        }}>
        <div className="chart-times">
          {new Array(yAxisLength + 1).fill("").map((_, i) => (
            <div
              key={i}
              className="cells"
              style={{
                color: "white",
                fontSize: "8px",
                borderRadius: "20px",
                height: "20px",
              }}>{`${i} ${yAxisExtension ? yAxisExtension : ""}`}</div>
          ))}
        </div>
        {renderCells()}
      </div>
    </div>
  );
};

const ChartItem = ({
  quantity,
  color,
  currentIndex,
  startCell,endCell
}: {
  quantity: number;
  color: string;
  currentIndex:number;  startCell:number,endCell:number
}) => (
  <div>
    <div
      style={{
        width: "10px",
        backgroundColor: color,
        minWidth: "100%",
        height: "20px",
        borderRadius:currentIndex+1===startCell?'20px':0
      }}></div>
  </div>
);

export default ChartComponent;
