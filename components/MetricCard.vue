<template>
  <div class="metric-card">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
          {{ metric.title }}
        </p>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ formatValue(metric.value) }}
        </p>
      </div>
      <div class="text-3xl">
        {{ metric.icon }}
      </div>
    </div>
    
    <div class="mt-4 flex items-center">
      <span 
        :class="[
          'text-sm font-medium',
          metric.changeType === 'increase' 
            ? 'text-green-600 dark:text-green-400' 
            : 'text-red-600 dark:text-red-400'
        ]"
      >
        {{ metric.changeType === 'increase' ? '↗️' : '↘️' }}
        {{ Math.abs(metric.change) }}%
      </span>
      <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">
        vs прошлый период
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MetricCard } from '~/types'

interface Props {
  metric: MetricCard
}

defineProps<Props>()

const formatValue = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return value.toString()
}
</script>
