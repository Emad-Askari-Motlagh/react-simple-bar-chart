"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var fa_1 = require("react-icons/fa");
require("./SimpleChart.css");
var ChartComponent = function (_a) {
    // Pagination state
    var data = _a.data, containerStyle = _a.containerStyle, GuidComponent = _a.GuidComponent, currentPage = _a.currentPage, yAxisExtension = _a.yAxisExtension, xAxis = _a.xAxis, yAxisLength = _a.yAxisLength, onNavigateNext = _a.onNavigateNext, onNavigatePrevious = _a.onNavigatePrevious;
    // Render cells based on pagination
    var renderCells = function () {
        var isOnRange = function (hour, beginHour, endHour) {
            return hour >= beginHour && hour < endHour;
        };
        var start = 0;
        var end = yAxisLength;
        return (react_1.default.createElement("div", { className: "chart-container" }, xAxis.map(function (r, dayIndex) {
            var dayEvents = (data === null || data === void 0 ? void 0 : data.length)
                ? data.filter(function (_a) {
                    var key = _a.key;
                    return key === r.key;
                })
                : data;
            var cells = [];
            var _loop_1 = function (i) {
                var eventsAtHour = (dayEvents === null || dayEvents === void 0 ? void 0 : dayEvents.length) > 0 && (dayEvents === null || dayEvents === void 0 ? void 0 : dayEvents.length) < 4
                    ? dayEvents.filter(function (_a) {
                        var beginNumber = _a.beginNumber, endNumber = _a.endNumber;
                        return isOnRange(i, beginNumber, endNumber);
                    })
                    : [];
                var totalEvents = eventsAtHour.length;
                var eventCells = totalEvents > 0 ? (eventsAtHour.map(function (event, eventIndex) {
                    return (react_1.default.createElement("div", { key: eventIndex, style: {
                            width: "".concat((100 / (dayEvents === null || dayEvents === void 0 ? void 0 : dayEvents.length)) * 0.9, "%"),
                            overflow: 'hidden',
                        } },
                        react_1.default.createElement(ChartItem, { currentIndex: dayIndex, quantity: yAxisLength + 1, color: event.color, startCell: data[dayIndex] ? data[dayIndex].beginNumber : 0, endCell: data[dayIndex] ? data[dayIndex].endNumber : 0 })));
                })) : (react_1.default.createElement(ChartItem, { quantity: yAxisLength + 1, color: "transparent", currentIndex: 0, startCell: data[i] ? data[i].beginNumber : 0, endCell: data[i] ? data[i].endNumber : 0 }));
                cells.push(react_1.default.createElement("div", { key: "".concat(dayIndex, "-").concat(i), style: {
                        position: "relative",
                        display: "flex",
                        justifyContent: (dayEvents === null || dayEvents === void 0 ? void 0 : dayEvents.length) == 1 ? "center" : "space-between",
                        alignItems: "center",
                        alignSelf: "center",
                        boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                        width: "100%",
                        overflow: "hidden",
                    } }, eventCells));
            };
            for (var i = start; i <= end; i++) {
                _loop_1(i);
            }
            return (react_1.default.createElement("div", { key: dayIndex },
                react_1.default.createElement("div", { style: {
                        fontWeight: "900",
                        fontSize: "12px",
                        color: r.color ? r.color : "#fff",
                    } }, r.type),
                react_1.default.createElement("div", { style: {
                        display: "flex",
                        flexDirection: "column-reverse",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid gray",
                    } }, cells)));
        })));
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "arrows-container" },
            react_1.default.createElement("button", { onClick: onNavigatePrevious, className: "arrows-wrapper" },
                react_1.default.createElement(fa_1.FaArrowLeft, { style: { fontSize: "12px" } }),
                react_1.default.createElement("span", null, "Previous Page")),
            react_1.default.createElement("span", null, currentPage),
            react_1.default.createElement("button", { onClick: onNavigateNext, className: "arrows-wrapper" },
                react_1.default.createElement("span", null, "Next Page"),
                react_1.default.createElement(fa_1.FaArrowRight, { style: { fontSize: "12px" } }))),
        GuidComponent,
        react_1.default.createElement("div", { style: {
                width: "100%",
                display: "grid",
                gridTemplateColumns: "10% 90%",
                gridTemplateRows: "auto",
            } },
            react_1.default.createElement("div", { className: "chart-times" }, new Array(yAxisLength + 1).fill("").map(function (_, i) { return (react_1.default.createElement("div", { key: i, className: "cells", style: {
                    color: "white",
                    fontSize: "8px",
                    borderRadius: "20px",
                    height: "20px",
                } }, "".concat(i, " ").concat(yAxisExtension ? yAxisExtension : ""))); })),
            renderCells())));
};
var ChartItem = function (_a) {
    var quantity = _a.quantity, color = _a.color, currentIndex = _a.currentIndex, startCell = _a.startCell, endCell = _a.endCell;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { style: {
                width: "10px",
                backgroundColor: color,
                minWidth: "100%",
                height: "20px",
                borderRadius: currentIndex + 1 === startCell ? '20px' : 0
            } })));
};
exports.default = ChartComponent;
