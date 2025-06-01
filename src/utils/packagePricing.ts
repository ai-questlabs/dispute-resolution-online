
export type EntityType = 'individual' | 'huf' | 'company' | 'society';
export type ServiceType = 
  | 'communications' 
  | 'rectification' 
  | 'grievances' 
  | 'assessment' 
  | 'penalty' 
  | 'transfer';

export interface IncomeSlabPricing {
  slabId: number;
  slabName: string;
  description: string;
  pricing: {
    [key in EntityType]: {
      [key in ServiceType]: number;
    };
  };
}

export const incomeSlabs: IncomeSlabPricing[] = [
  {
    slabId: 1,
    slabName: 'Slab 1',
    description: 'GROSS INCOME UPTO 15 LAKHS OR TURNOVER UPTO 100 LAKHS, WHICHEVER IS HIGHER',
    pricing: {
      individual: {
        communications: 3000,
        rectification: 3000,
        grievances: 2500,
        assessment: 5000,
        penalty: 7500,
        transfer: 10000,
      },
      huf: {
        communications: 5000,
        rectification: 3000,
        grievances: 2500,
        assessment: 7500,
        penalty: 7500,
        transfer: 15000,
      },
      company: {
        communications: 7500,
        rectification: 5000,
        grievances: 2500,
        assessment: 10000,
        penalty: 10000,
        transfer: 25000,
      },
      society: {
        communications: 5000,
        rectification: 5000,
        grievances: 2500,
        assessment: 5000,
        penalty: 7500,
        transfer: 25000,
      },
    },
  },
  {
    slabId: 2,
    slabName: 'Slab 2',
    description: 'GROSS INCOME 16 to 25 LAKHS OR TURNOVER UPTO 500 LAKHS, WHICHEVER IS HIGHER',
    pricing: {
      individual: {
        communications: 5000,
        rectification: 3000,
        grievances: 5000,
        assessment: 7500,
        penalty: 10000,
        transfer: 15000,
      },
      huf: {
        communications: 5000,
        rectification: 3000,
        grievances: 5000,
        assessment: 7500,
        penalty: 10000,
        transfer: 25000,
      },
      company: {
        communications: 7500,
        rectification: 5000,
        grievances: 5000,
        assessment: 15000,
        penalty: 10000,
        transfer: 50000,
      },
      society: {
        communications: 5000,
        rectification: 3000,
        grievances: 5000,
        assessment: 10000,
        penalty: 10000,
        transfer: 25000,
      },
    },
  },
  {
    slabId: 3,
    slabName: 'Slab 3',
    description: 'GROSS INCOME 26 to 50 LAKHS OR TURNOVER UPTO 1000 LAKHS, WHICHEVER IS HIGHER',
    pricing: {
      individual: {
        communications: 7500,
        rectification: 5000,
        grievances: 7500,
        assessment: 10000,
        penalty: 10000,
        transfer: 25000,
      },
      huf: {
        communications: 7500,
        rectification: 5000,
        grievances: 7500,
        assessment: 10000,
        penalty: 10000,
        transfer: 25000,
      },
      company: {
        communications: 10000,
        rectification: 5000,
        grievances: 7500,
        assessment: 15000,
        penalty: 10000,
        transfer: 50000,
      },
      society: {
        communications: 10000,
        rectification: 5000,
        grievances: 7500,
        assessment: 10000,
        penalty: 10000,
        transfer: 30000,
      },
    },
  },
  {
    slabId: 4,
    slabName: 'Slab 4',
    description: 'GROSS INCOME 51 to 100 LAKHS OR TURNOVER UPTO 5000 LAKHS, WHICHEVER IS HIGHER',
    pricing: {
      individual: {
        communications: 7500,
        rectification: 5000,
        grievances: 7500,
        assessment: 10000,
        penalty: 10000,
        transfer: 25000,
      },
      huf: {
        communications: 10000,
        rectification: 7500,
        grievances: 7500,
        assessment: 10000,
        penalty: 10000,
        transfer: 25000,
      },
      company: {
        communications: 10000,
        rectification: 7500,
        grievances: 7500,
        assessment: 15000,
        penalty: 10000,
        transfer: 50000,
      },
      society: {
        communications: 10000,
        rectification: 7500,
        grievances: 7500,
        assessment: 10000,
        penalty: 1000,
        transfer: 30000,
      },
    },
  },
  {
    slabId: 5,
    slabName: 'Slab 5',
    description: 'GROSS INCOME ABOVE 101 LAKHS OR TURNOVER 5001 LAKHS, WHICHEVER IS HIGHER',
    pricing: {
      individual: {
        communications: 10000,
        rectification: 7500,
        grievances: 10000,
        assessment: 15000,
        penalty: 15000,
        transfer: 30000,
      },
      huf: {
        communications: 15000,
        rectification: 7500,
        grievances: 7500,
        assessment: 10000,
        penalty: 10000,
        transfer: 40000,
      },
      company: {
        communications: 10000,
        rectification: 10000,
        grievances: 10000,
        assessment: 15000,
        penalty: 10000,
        transfer: 50000,
      },
      society: {
        communications: 10000,
        rectification: 7500,
        grievances: 7500,
        assessment: 10000,
        penalty: 10000,
        transfer: 40000,
      },
    },
  },
];

export const entityTypes = [
  { id: 'individual', name: 'Individual/Proprietorship' },
  { id: 'huf', name: 'HUF/Partnership/LLP' },
  { id: 'company', name: 'Pvt. Ltd. Company/Limited Company' },
  { id: 'society', name: 'Society/Association/BOI' },
];

export const serviceTypes = [
  { id: 'communications', name: 'Responses to Communications/Showcause Notices' },
  { id: 'rectification', name: 'Rectification Applications' },
  { id: 'grievances', name: 'Responses for handling Grievances' },
  { id: 'assessment', name: 'Responses to Assessment/Scrutiny/Demand Proceedings' },
  { id: 'penalty', name: 'Responses to Penalty Proceedings' },
  { id: 'transfer', name: 'Transfer Pricing Disputes' },
];

export const getPackagePrice = (
  slabId: number,
  entityType: EntityType,
  serviceType: ServiceType
): number => {
  const slab = incomeSlabs.find(s => s.slabId === slabId);
  if (!slab) return 0;
  return slab.pricing[entityType][serviceType];
};
