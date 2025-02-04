import {
  Action,
  ErrorType,
  NeuronState,
  NnsFunction,
  RewardStatus,
  Status,
  Topic,
} from "./governance";

export type SubnetResponse = {
  id: string;
  createdDate: string;
  updatedDate: string;
  registryVersion: number;
  recordVersion: number;
  startIndex: string;
  endIndex: string;
  subnetType: string;
  name: string;
  displayName: string;
  nodeCount: number;
  canisterIndex: number;
  canisterCount: number;
  nodes: CommonNodeResponse[];
};

export type CommonNodeResponse = {
  id: string;
  principal: {
    name: string;
  };
  operator: {
    id: string;
    name: string;
    operatorAllowance: number | null;
  };
  provider: {
    id: string;
    name: string;
  };
  subnet: {
    id: string;
    subnetType: string;
    displayName: string;
  };
};

export type NodeResponse = CommonNodeResponse & {
  createdDate: string;
};

export type NetworkResponse = {
  subnets: [id: string, name: string][];
  nodes: [
    id: string,
    subnetIdx: number,
    operatorIdx: number,
    providerIdx: number,
    name: string
  ][];
  principals: [id: string, name: string][];
};

export type TransactionType = "TRANSACTION" | "FEE" | "MINT" | "BURN";

export type PagedResponse<T> = {
  count: number;
  rows: T[];
};

export type EntitysResponse = PagedResponse<Entity>;

export type Entity = {
  id: string;
  name: string;
  imageUrl: string;
  url: string;
  description: string;
  principalCount: number;
  canisterCount: number;
  accountCount: number;
  neuronCount: number;
};

export type PrincipalsResponse = PagedResponse<APIPrincipal>;

export type APIPrincipal = {
  id: string;
  name: string;
  updatedDate: string;
  canisterCount: number;
  accountCount: number;
  accounts?: {
    id: string;
    balance: string;
  }[];
  operatorOf: CommonNodeResponse[];
  providerOf: CommonNodeResponse[];
  nodeCount?: number;
  providerOfCount?: number;
  isKyc: boolean;
  genesisAccount?: { id: string };
  entityId: string | null;
  entity?: { id: number; name: string };
  kyc?: { proposalId: number }[];
  publicTags: LabelTag[];
  node?: { id: string };
};

export type KycsResponse = PagedResponse<Kyc>;

export type Kyc = {
  id: string;
  principal: {
    id: string;
    name: string;
    accounts: Partial<Account>[];
    genesisAccount: {
      id: string;
    };
  };
  proposal: {
    id: number;
    decidedDate: string;
  };
};

export type NodeProviderRewardsResponse = PagedResponse<NodeProviderReward>;

export type NodeProviderReward = {
  id: string;
  proposalId: number;
  principal: APIPrincipal;
  account: Account;
};

export type TransactionsResponse = PagedResponse<Transaction>;

export type Transaction = {
  id: string;
  blockHeight: number;
  createdDate: string;
  senderId: string;
  sender: {
    name: string;
  } | null;
  receiverId: string;
  receiver: {
    name: string;
  } | null;
  type: TransactionType;
  amount: string;
  fee: string;
  memo: string;
};

export type AccountsResponse = PagedResponse<Account>;

export type Account = {
  id: string;
  name: string;
  principalId: string;
  principal?: {
    name: string;
    isKyc: boolean;
    kyc?: { proposalId: number }[];
  } | null;
  balance: string;
  first: string;
  sent: number;
  received: number;
  subaccount?: string;
  neuron?: Neuron;
  isNeuron: boolean;
  tx_count: number;
  tx_received_count: number;
  tx_sent_count: number;
  publicTags: LabelTag[];
};

export type CanistersResponse = PagedResponse<Canister>;

export type Canister = {
  id: string;
  principal?: {
    name: string;
  } | null;
  createdDate: string;
  latestVersionDate: string;
  status: "Running" | "Stopping" | "Stopped";
  controller: {
    name: string;
  } | null;
  controllerId: string | null;
  ancestors?: {
    id: string;
    name: string;
  }[];
  subnet: {
    subnetType: string;
    displayName: string;
  };
  subnetId: string;
  hasInterface: boolean;
  module: Partial<Module>;
  versions?: {
    createdDate: string;
    moduleHash: string;
  }[];
};

export type ModulesResponse = PagedResponse<Module>;

export type Module = {
  id: string;
  name: string;
  hasHttp: boolean;
  canisterCount: number;
  hasInterface: boolean;
  subnetCount: number;
  sourceUrl: string;
  source: string;
  candid: string;
};

export type ProposalsResponse = PagedResponse<Proposal>;

export type Proposal = {
  action: Action;
  decidedDate: string;
  errorMessage: string;
  errorType: ErrorType | null;
  executedDate: string;
  failedDate: string | null;
  id: number;
  nnsFunction: NnsFunction;
  payloadJson: string;
  proposalDate: string;
  proposerId: string;
  rejectCost: string;
  rewardEventRound: number;
  rewardStatus: RewardStatus;
  status: Status;
  summary: string;
  tallyDate: string;
  tallyNo: string;
  tallyTotal: string;
  tallyYes: string;
  topic: Topic;
  url: string;
};

export type NeuronsResponse = PagedResponse<Neuron>;

export type Neuron = {
  id: string;
  name: string;
  accountId: string;
  proposalCount: number;
  state: NeuronState;
  agingSinceDate: string;
  createdDate: string;
  dissolveDate: string;
  stake: string;
  votingPower: string;
  originalStake: string;
  genesisAccountId?: string;
};

export type NeuronAllocation = {
  count: number;
  stake: string;
  originalstake: string;
  mindissolvedate: string;
  maxdissolvedate: string;
  lockedCount: number;
  dissolvingCount: number;
  dissolvedCount: number;
  name: string;
};

export enum InvestorType {
  "Seed Round",
  "Early Contributor",
  "Both",
}
export enum GenesisAccountStatus {
  Unclaimed,
  Claimed,
  Forwarded,
  Donated,
}
export type GenesisAccountsResponse = PagedResponse<GenesisAccount>;
export type GenesisAccount = {
  id: string;
  earliestDissolveDate: string;
  neuronCount?: number;
  status: GenesisAccountStatus;
  investorType: InvestorType;
  isKyc: boolean;
  icpts: number;
  contributionType: string;
  contributionAmount: string;
  contributionTx: string;
};

export type StatsResponse = {
  canisters: number;
  controllers: number;
  subnets: number;
  accounts: number;
  txs: number;
  nodes: number;
  supply: string;
};

export type SparklineResponse = {
  currency: "ICP";
  timestamps: string[];
  prices: string[];
};

export type NomicsTickerResponse = {
  id: string;
  currency: string;
  symbol: string;
  name: string;
  logo_url: string;
  price: string;
  price_date: string;
  price_timestamp: string;
  circulating_supply?: string;
  max_supply?: string;
  market_cap?: string;
  rank: string;
  high: string;
  high_timestamp: string;
  "1d":
    | {
        volume: string;
        price_change: string;
        price_change_pct: string;
        volume_change: string;
        volume_change_pct: string;
        market_cap_change: string;
        market_cap_change_pct: string;
      }
    | undefined;
};

export type LabelTag = {
  label: string;
  count: number;
};

export type Tag = {
  accountId: string;
  principalId: string;
  label: string;
  note?: string;
  bookmarked?: boolean;
};

export type UserTags = { private: Tag[]; public: Tag[] };
