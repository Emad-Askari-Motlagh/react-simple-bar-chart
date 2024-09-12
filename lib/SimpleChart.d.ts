import React, { CSSProperties } from "react";
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
declare const ChartComponent: React.FC<ChartComponentProps>;
export default ChartComponent;
//# sourceMappingURL=SimpleChart.d.ts.map