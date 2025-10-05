<template>
  <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      📅 Фильтр по периоду
    </h3>
    
    <div class="flex flex-wrap gap-3">
      <button
        v-for="period in periods"
        :key="period.value"
        @click="selectPeriod(period.value)"
        :class="[
          'filter-button',
          { 'active': dashboardStore.selectedPeriod.value === period.value }
        ]"
      >
        {{ period.label }}
      </button>
    </div>
    
    <!-- Custom Date Range (заглушка) -->
    <div class="mt-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        🚧 Произвольный диапазон дат будет добавлен в следующих версиях
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from '~/stores/dashboard'

const dashboardStore = useDashboardStore()

const periods = [
  { label: 'Сегодня', value: 'today' },
  { label: 'Неделя', value: 'week' },
  { label: 'Месяц', value: 'month' }
]

const selectPeriod = async (period: string) => {
  await dashboardStore.fetchSalesData(period)
}
</script>
