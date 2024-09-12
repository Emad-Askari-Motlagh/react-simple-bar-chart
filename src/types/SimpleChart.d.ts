declare module 'react_simple_bar_chart' {
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


    export default ReactMultiDateRange;
}
