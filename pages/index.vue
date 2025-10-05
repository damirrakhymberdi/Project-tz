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
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
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
          <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📈 Динамика продаж
            </h2>
            <div class="h-64">
              <SalesChart :isDark="isDark" />
            </div>
          </div>

          <!-- Category Chart -->
          <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              🥧 Распределение по категориям
            </h2>
            <div class="h-64">
              <CategoryChart :isDark="isDark" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from '~/stores/dashboard'

useHead({
  title: 'Аналитический дашборд',
  meta: [
    { name: 'description', content: 'Интерактивный дашборд для анализа продаж' }
  ]
})

const dashboardStore = useDashboardStore()
const isDark = ref(false)

onMounted(async () => {
  await dashboardStore.fetchSalesData()
  
  // Системалық настройкадан тақырып алу
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (prefersDark) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<style>
.chart-container {
  @apply bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6;
}

.metric-card {
  @apply bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6 transition-all hover:shadow-md;
}

.filter-button {
  @apply px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors;
}

.filter-button.active {
  @apply bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700;
}
</style>