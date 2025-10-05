<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900">
    <!-- Header -->
    <header class="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              📊 Аналитический дашборд
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="toggleTheme"
              class="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
            >
              {{ isDark ? '☀️' : '🌙' }}
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Period Filters -->
      <div class="mb-8">
        <PeriodFilters />
      </div>

      <!-- Loading State -->
      <div v-if="dashboardStore.isLoading" class="flex justify-center items-center py-12">
        <div class="loading-spinner"></div>
        <span class="ml-3 text-gray-600 dark:text-gray-400">Загрузка данных...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="dashboardStore.error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
        <div class="flex items-center">
          <span class="text-red-600 dark:text-red-400">❌</span>
          <span class="ml-2 text-red-700 dark:text-red-300">{{ dashboardStore.error }}</span>
        </div>
      </div>

      <!-- Dashboard Content -->
      <div v-else class="space-y-8">
        <!-- Metrics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            v-for="metric in dashboardStore.metrics"
            :key="metric.title"
            :metric="metric"
          />
        </div>

        <!-- Charts -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Sales Chart -->
          <div class="chart-container">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📈 Динамика продаж
            </h2>
            <SalesChart />
          </div>

          <!-- Category Chart -->
          <div class="chart-container">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              🥧 Распределение по категориям
            </h2>
            <CategoryChart />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from '~/stores/dashboard'

// SEO
useHead({
  title: 'Аналитический дашборд',
  meta: [
    { name: 'description', content: 'Интерактивный дашборд для анализа продаж' }
  ]
})

const dashboardStore = useDashboardStore()
const isDark = ref(false)

// Загружаем данные при монтировании
onMounted(async () => {
  await dashboardStore.fetchSalesData()
})

// Переключение темы
const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>
