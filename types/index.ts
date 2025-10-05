// Типы данных для дашборда
export interface SaleData {
    date: string
    amount: number
    category: string
}

export interface MetricCard {
    title: string
    value: number
    change: number
    changeType: 'increase' | 'decrease'
    icon: string
}

export interface FilterPeriod {
    label: string
    value: string
    startDate: string
    endDate: string
}

export interface ChartData {
    labels: string[]
    datasets: {
        label: string
        data: number[]
        backgroundColor: string
        borderColor: string
        tension: number
    }[]
}

export interface DashboardState {
    salesData: SaleData[]
    selectedPeriod: FilterPeriod
    isLoading: boolean
    error: string | null
}
