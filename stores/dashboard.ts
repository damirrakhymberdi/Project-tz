import { defineStore } from 'pinia'
import type { SaleData, FilterPeriod, DashboardState, MetricCard } from '~/types'

export const useDashboardStore = defineStore('dashboard', {
    state: (): DashboardState => ({
        salesData: [],
        selectedPeriod: {
            label: 'Неделя',
            value: 'week',
            startDate: '2024-06-01',
            endDate: '2024-06-07'
        },
        isLoading: false,
        error: null
    }),

    getters: {
        // Метрики для карточек
        metrics: (state): MetricCard[] => {
            const total = state.salesData.reduce((sum, item) => sum + item.amount, 0)
            const count = state.salesData.length
            const average = count > 0 ? total / count : 0
            const uniqueUsers = new Set(state.salesData.map(item => item.category)).size

            return [
                {
                    title: 'Общий доход',
                    value: total,
                    change: 12.5,
                    changeType: 'increase',
                    icon: '💰'
                },
                {
                    title: 'Заказы',
                    value: count,
                    change: 8.2,
                    changeType: 'increase',
                    icon: '📦'
                },
                {
                    title: 'Средний чек',
                    value: Math.round(average),
                    change: -2.1,
                    changeType: 'decrease',
                    icon: '💳'
                },
                {
                    title: 'Категории',
                    value: uniqueUsers,
                    change: 5.7,
                    changeType: 'increase',
                    icon: '🏷️'
                }
            ]
        },

        // Данные для графика
        chartData: (state) => {
            const categories = ['Электроника', 'Одежда', 'Книги']
            const dates = [...new Set(state.salesData.map(item => item.date))].sort()

            const datasets = categories.map((category, index) => {
                const colors = [
                    { bg: 'rgba(99, 102, 241, 0.1)', border: 'rgb(99, 102, 241)' },
                    { bg: 'rgba(139, 92, 246, 0.1)', border: 'rgb(139, 92, 246)' },
                    { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgb(16, 185, 129)' }
                ]

                const data = dates.map(date => {
                    return state.salesData
                        .filter(item => item.date === date && item.category === category)
                        .reduce((sum, item) => sum + item.amount, 0)
                })

                return {
                    label: category,
                    data,
                    backgroundColor: colors[index].bg,
                    borderColor: colors[index].border,
                    tension: 0.4
                }
            })

            return {
                labels: dates.map(date => {
                    const d = new Date(date)
                    return d.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })
                }),
                datasets
            }
        }
    },

    actions: {
        async fetchSalesData(period: string = 'week') {
            this.isLoading = true
            this.error = null

            try {
                const { data } = await $fetch('/api/sales', {
                    query: { period }
                })

                this.salesData = data
                this.selectedPeriod = this.getPeriodConfig(period)
            } catch (error) {
                this.error = 'Ошибка загрузки данных'
                console.error('Error fetching sales data:', error)
            } finally {
                this.isLoading = false
            }
        },

        getPeriodConfig(period: string): FilterPeriod {
            const periods = {
                today: {
                    label: 'Сегодня',
                    value: 'today',
                    startDate: '2024-06-07',
                    endDate: '2024-06-07'
                },
                week: {
                    label: 'Неделя',
                    value: 'week',
                    startDate: '2024-06-01',
                    endDate: '2024-06-07'
                },
                month: {
                    label: 'Месяц',
                    value: 'month',
                    startDate: '2024-06-01',
                    endDate: '2024-06-30'
                }
            }

            return periods[period as keyof typeof periods] || periods.week
        }
    }
})
