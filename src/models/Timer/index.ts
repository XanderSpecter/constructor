export interface Timer {
    id: string;
    time: number;
    type: 'main' | 'break' | 'system';
}
