import { CurveFactory, curveMonotoneX, curveStepAfter } from "d3";
import { UseQueryResult } from "react-query";
import useCanisterCounts from "../../lib/hooks/useCanisterCounts";
import useNetworkCounts from "../../lib/hooks/useNetworkCounts";

export type ChartId =
  | "subnets"
  | "nodes"
  | "operators"
  | "providers"
  | "canisters"
  | "transactions";

export type ChartType = {
  id: ChartId;
  hook?: () => UseQueryResult<any, unknown>;
  heading?: string;
  dataKey?: string;
  curve?: CurveFactory;
  description?: JSX.Element;
};

export const ChartTypes: ChartType[] = [
  {
    id: "subnets",
    hook: useNetworkCounts,
    heading: "Subnets over Time",
    dataKey: "subnets",
    curve: curveStepAfter,
  },
  {
    id: "nodes",
    hook: useNetworkCounts,
    heading: "Nodes over Time",
    dataKey: "nodes",
    curve: curveStepAfter,
  },
  {
    id: "operators",
    hook: useNetworkCounts,
    heading: "Node Operators over Time",
    dataKey: "operators",
    curve: curveStepAfter,
  },
  {
    id: "providers",
    hook: useNetworkCounts,
    heading: "Node Providers over Time",
    dataKey: "providers",
    curve: curveStepAfter,
  },
  {
    id: "canisters",
    hook: useCanisterCounts,
    heading: "Total Canisters over Time",
    dataKey: "createdCount",
    curve: curveMonotoneX,
    description: (
      <div>
        <p>New canisters created by day.</p>
        <p className="text-gray-500 text-xs">
          Note: Canisters created before June 6, 2021 are missing exact creation
          dates.
        </p>
      </div>
    ),
  },
  {
    id: "transactions",
    heading: "ICP Transactions over Time",
  },
];
