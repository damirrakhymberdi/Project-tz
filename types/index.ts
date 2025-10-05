// types/index.ts
export interface MetricCard {
    title: string
    value: number
    icon: string
    change: number
    changeType: 'increase' | 'decrease'
}

export interface SaleData {
    date: string
    amount: number
    category: string
}

export interface ChartData {
    labels: string[]
    datasets: {
        label: string
        data: number[]
        borderColor: string
        backgroundColor: string
        tension: number
    }[]
}