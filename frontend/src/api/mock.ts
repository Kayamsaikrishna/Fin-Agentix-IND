export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface Loan {
    id: string;
    borrower: string;
    amount: number;
    status: string;
  }
  
  export interface LoanDetails extends Loan {
    interestRate: number;
    term: number;
    repaymentSchedule: any[];
  }
  
  const users: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
  ];
  
  const loans: Loan[] = [
    { id: '101', borrower: 'John Doe', amount: 10000, status: 'Approved' },
    { id: '102', borrower: 'Jane Smith', amount: 15000, status: 'Pending' },
  ];
  
  const loanDetails: LoanDetails[] = [
    {
      id: '101',
      borrower: 'John Doe',
      amount: 10000,
      status: 'Approved',
      interestRate: 5,
      term: 12,
      repaymentSchedule: [
        { month: 1, payment: 856.07 },
        { month: 2, payment: 856.07 },
      ],
    },
    {
      id: '102',
      borrower: 'Jane Smith',
      amount: 15000,
      status: 'Pending',
      interestRate: 6,
      term: 24,
      repaymentSchedule: [],
    },
  ];
  
  export const getUsers = (): Promise<User[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(users);
      }, 500);
    });
  };
  
  export const getUser = (id: string): Promise<User | undefined> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(users.find(user => user.id === id));
      }, 500);
    });
  };
  
  export const getLoans = (): Promise<Loan[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(loans);
      }, 500);
    });
  };
  
  export const getLoanDetails = (id: string): Promise<LoanDetails | undefined> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(loanDetails.find(loan => loan.id === id));
      }, 500);
    });
  };
  