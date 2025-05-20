
export type EntityType = 'individual' | 'huf' | 'company' | 'society';
export type ServiceType = 
  | 'notices' 
  | 'rectification' 
  | 'grievances' 
  | 'assessment' 
  | 'penalty' 
  | 'transfer';

export interface IncomeRange {
  id: number;
  income: string;
  turnover: string;
  description: string;
}

export const incomeRanges: IncomeRange[] = [
  { 
    id: 1, 
    income: 'UPTO 15 LAKHS', 
    turnover: 'UPTO 100 LAKHS', 
    description: 'GROSS INCOME UPTO 15 LAKHS OR TURNOVER UPTO 100 LAKHS, WHICHEVER IS HIGHER' 
  },
  { 
    id: 2, 
    income: '16 to 25 LAKHS', 
    turnover: 'UPTO 500 LAKHS', 
    description: 'GROSS INCOME 16 to 25 LAKHS OR TURNOVER UPTO 500 LAKHS, WHICHEVER IS HIGHER' 
  },
  { 
    id: 3, 
    income: '26 to 50 LAKHS', 
    turnover: 'UPTO 1000 LAKHS', 
    description: 'GROSS INCOME 26 to 50 LAKHS OR TURNOVER UPTO 1000 LAKHS, WHICHEVER IS HIGHER' 
  },
  { 
    id: 4, 
    income: '51 to 100 LAKHS', 
    turnover: 'UPTO 5000 LAKHS', 
    description: 'GROSS INCOME 51 to 100 LAKHS OR TURNOVER UPTO 5000 LAKHS, WHICHEVER IS HIGHER' 
  },
  { 
    id: 5, 
    income: 'ABOVE 101 LAKHS', 
    turnover: '5001 LAKHS', 
    description: 'GROSS INCOME ABOVE 101 LAKHS OR TURNOVER 5001 LAKHS, WHICHEVER IS HIGHER' 
  },
];

export const serviceTypes = [
  { id: 'notices', name: 'Responses to Communications/Showcause Notices' },
  { id: 'rectification', name: 'Rectification Applications' },
  { id: 'grievances', name: 'Responses for handling Grievances' },
  { id: 'assessment', name: 'Responses to Assessment/Scrutiny/Demand Proceedings' },
  { id: 'penalty', name: 'Responses to Penalty Proceedings' },
  { id: 'transfer', name: 'Transfer Pricing Disputes' },
];

export const entityTypes = [
  { id: 'individual', name: 'Individual/Proprietorship' },
  { id: 'huf', name: 'HUF/Partnership/LLP' },
  { id: 'company', name: 'Pvt. Ltd. Company/Limited Company' },
  { id: 'society', name: 'Society/Association/BOI' },
];

// Fee structure based on the provided rate card
const feeStructure = {
  1: { // Upto 15L income or 100L turnover
    individual: {
      notices: 3000,
      rectification: 3000,
      grievances: 2500,
      assessment: 5000,
      penalty: 7500,
      transfer: 10000,
    },
    huf: {
      notices: 5000,
      rectification: 3000,
      grievances: 2500,
      assessment: 7500,
      penalty: 7500,
      transfer: 15000,
    },
    company: {
      notices: 7500,
      rectification: 5000,
      grievances: 2500,
      assessment: 10000,
      penalty: 10000,
      transfer: 25000,
    },
    society: {
      notices: 5000,
      rectification: 5000,
      grievances: 2500,
      assessment: 5000,
      penalty: 7500,
      transfer: 25000,
    },
  },
  2: { // 16-25L income or 500L turnover
    individual: {
      notices: 5000,
      rectification: 3000,
      grievances: 5000,
      assessment: 7500,
      penalty: 10000,
      transfer: 15000,
    },
    huf: {
      notices: 5000,
      rectification: 3000,
      grievances: 5000,
      assessment: 7500,
      penalty: 10000,
      transfer: 25000,
    },
    company: {
      notices: 7500,
      rectification: 5000,
      grievances: 5000,
      assessment: 15000,
      penalty: 10000,
      transfer: 50000,
    },
    society: {
      notices: 5000,
      rectification: 3000,
      grievances: 5000,
      assessment: 10000,
      penalty: 10000,
      transfer: 25000,
    },
  },
  3: { // 26-50L income or 1000L turnover
    individual: {
      notices: 7500,
      rectification: 5000,
      grievances: 7500,
      assessment: 10000,
      penalty: 10000,
      transfer: 25000,
    },
    huf: {
      notices: 7500,
      rectification: 5000,
      grievances: 7500,
      assessment: 10000,
      penalty: 10000,
      transfer: 25000,
    },
    company: {
      notices: 10000,
      rectification: 5000,
      grievances: 7500,
      assessment: 15000,
      penalty: 10000,
      transfer: 50000,
    },
    society: {
      notices: 10000,
      rectification: 5000,
      grievances: 7500,
      assessment: 10000,
      penalty: 10000,
      transfer: 30000,
    },
  },
  4: { // 51-100L income or 5000L turnover
    individual: {
      notices: 7500,
      rectification: 5000,
      grievances: 7500,
      assessment: 10000,
      penalty: 10000,
      transfer: 25000,
    },
    huf: {
      notices: 10000,
      rectification: 7500,
      grievances: 7500,
      assessment: 10000,
      penalty: 10000,
      transfer: 25000,
    },
    company: {
      notices: 10000,
      rectification: 7500,
      grievances: 7500,
      assessment: 15000,
      penalty: 10000,
      transfer: 50000,
    },
    society: {
      notices: 10000,
      rectification: 7500,
      grievances: 7500,
      assessment: 10000,
      penalty: 1000, // Note: there might be a typo in the original table (1000 vs 10000)
      transfer: 30000,
    },
  },
  5: { // Above 101L income or 5001L turnover
    individual: {
      notices: 10000,
      rectification: 7500,
      grievances: 10000,
      assessment: 15000,
      penalty: 15000,
      transfer: 30000,
    },
    huf: {
      notices: 15000,
      rectification: 7500,
      grievances: 7500,
      assessment: 10000,
      penalty: 10000,
      transfer: 40000,
    },
    company: {
      notices: 10000,
      rectification: 10000,
      grievances: 10000,
      assessment: 15000,
      penalty: 10000,
      transfer: 50000,
    },
    society: {
      notices: 10000,
      rectification: 7500,
      grievances: 7500,
      assessment: 10000,
      penalty: 10000,
      transfer: 40000,
    },
  },
};

export const calculateFee = (
  incomeRangeId: number,
  entityType: EntityType,
  serviceType: ServiceType
): number => {
  return feeStructure[incomeRangeId as keyof typeof feeStructure][entityType][serviceType];
};
