// stores/dashboard.ts
import { defineStore } from 'pinia'

export interface SaleData {
    date: string
    amount: number
    category: string
}

export interface MetricCard {
    title: string
    value: number
    icon: string
    change: number
    changeType: 'increase' | 'decrease'
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

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        salesData: [] as SaleData[],
        isLoading: false,
        error: null as string | null,
        selectedPeriod: { value: 'month', label: 'Месяц' }
    }),

    getters: {
        metrics(): MetricCard[] {
            const totalSales = this.salesData.reduce((sum, sale) => sum + sale.amount, 0)
            const avgSale = totalSales / (this.salesData.length || 1)

            return [
                {
                    title: 'Общие продажи',
                    value: totalSales,
                    icon: '💰',
                    change: 12.5,
                    changeType: 'increase'
                },
                {
                    title: 'Средний чек',
                    value: Math.round(avgSale),
                    icon: '📊',
                    change: 8.3,
                    changeType: 'increase'
                },
                {
                    title: 'Транзакций',
                    value: this.salesData.length,
                    icon: '🛒',
                    change: 15.2,
                    changeType: 'increase'
                },
                {
                    title: 'Клиентов',
                    value: Math.round(this.salesData.length * 0.7),
                    icon: '👥',
                    change: -2.4,
                    changeType: 'decrease'
                }
            ]
        },

        chartData(): ChartData {
            // Группируем по датам
            const dailyTotals: Record<string, number> = {}

            this.salesData.forEach(sale => {
                const date = new Date(sale.date).toLocaleDateString('ru-RU', {
                    month: 'short',
                    day: 'numeric'
                })
                dailyTotals[date] = (dailyTotals[date] || 0) + sale.amount
            })

            return {
                labels: Object.keys(dailyTotals),
                datasets: [{
                    label: 'Продажи (₸)',
                    data: Object.values(dailyTotals),
                    borderColor: 'rgb(99, 102, 241)',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4
                }]
            }
        }
    },

    actions: {
        async fetchSalesData(period: string = 'month') {
            this.isLoading = true
            this.error = null

            try {
                // Симуляция API запроса
                await new Promise(resolve => setTimeout(resolve, 1000))

                // Генерируем тестовые данные
                const categories = ['Электроника', 'Одежда', 'Продукты', 'Спорт', 'Книги']
                const data: SaleData[] = []

                const daysCount = period === 'today' ? 1 : period === 'week' ? 7 : 30

                for (let i = 0; i < daysCount * 5; i++) {
                    const date = new Date()
                    date.setDate(date.getDate() - Math.floor(i / 5))

                    data.push({
                        date: date.toISOString(),
                        amount: Math.floor(Math.random() * 50000) + 10000,
                        category: categories[Math.floor(Math.random() * categories.length)]
                    })
                }

                this.salesData = data
                this.selectedPeriod = {
                    value: period,
                    label: period === 'today' ? 'Сегодня' : period === 'week' ? 'Неделя' : 'Месяц'
                }

            } catch (err) {
                this.error = 'Ошибка при загрузке данных'
                console.error(err)
            } finally {
                this.isLoading = false
            }
        }
    }
})