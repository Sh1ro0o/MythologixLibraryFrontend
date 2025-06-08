export class GetSeperateTransactionsCountRequest {
    hasBorrowedToday?: boolean; //default false
    hasReturnedToday?: boolean; //default false
    hasOverdueToday?: boolean; //default false
    userId?: string;
}