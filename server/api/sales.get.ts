// Mock API для данных продаж
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const period = query.period as string || 'week'

    // Симуляция задержки API
    await new Promise(resolve => setTimeout(resolve, 500))

    // Mock данные
    const mockData = [
        { date: "2024-06-01", amount: 1200, category: "Электроника" },
        { date: "2024-06-01", amount: 800, category: "Одежда" },
        { date: "2024-06-02", amount: 1500, category: "Электроника" },
        { date: "2024-06-02", amount: 600, category: "Книги" },
        { date: "2024-06-03", amount: 900, category: "Одежда" },
        { date: "2024-06-03", amount: 2000, category: "Электроника" },
        { date: "2024-06-04", amount: 700, category: "Книги" },
        { date: "2024-06-04", amount: 1800, category: "Электроника" },
        { date: "2024-06-05", amount: 1100, category: "Одежда" },
        { date: "2024-06-05", amount: 400, category: "Книги" },
        { date: "2024-06-06", amount: 1600, category: "Электроника" },
        { date: "2024-06-06", amount: 950, category: "Одежда" },
        { date: "2024-06-07", amount: 1300, category: "Электроника" },
        { date: "2024-06-07", amount: 750, category: "Книги" }
    ]

    // Фильтрация по периоду
    let filteredData = mockData

    if (period === 'today') {
        filteredData = mockData.filter(item => item.date === '2024-06-07')
    } else if (period === 'week') {
        filteredData = mockData.filter(item => {
            const date = new Date(item.date)
            const weekAgo = new Date('2024-06-01')
            return date >= weekAgo
        })
    } else if (period === 'month') {
        filteredData = mockData // Все данные за месяц
    }

    return {
        data: filteredData,
        period,
        total: filteredData.reduce((sum, item) => sum + item.amount, 0),
        count: filteredData.length
    }
})
