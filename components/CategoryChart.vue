<template>
  <div class="relative">
    <canvas ref="chartCanvas" width="400" height="200"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Chart, registerables } from 'chart.js'
import { useDashboardStore } from '~/stores/dashboard'

const dashboardStore = useDashboardStore()
const chartCanvas = ref<HTMLCanvasElement>()
let chart: Chart | null = null

// ✅ Тақырыпты parent-тен props арқылы аламыз
interface Props {
  isDark?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isDark: false
})

Chart.register(...registerables)

const getThemeColors = () => {
  return {
    text: props.isDark ? '#e2e8f0' : '#374151',
    textSecondary: props.isDark ? '#94a3b8' : '#6b7280',
    tooltipBg: props.isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(0, 0, 0, 0.8)',
    tooltipText: '#ffffff',
    border: props.isDark ? '#475569' : '#6366f1'
  }
}

const getCategoryData = () => {
  const categoryTotals: Record<string, number> = {}
  
  dashboardStore.salesData.forEach(sale => {
    categoryTotals[sale.category] = (categoryTotals[sale.category] || 0) + sale.amount
  })
  
  const categories = Object.keys(categoryTotals)
  const values = Object.values(categoryTotals)
  
  return {
    labels: categories,
    datasets: [{
      data: values,
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderColor: [
        'rgb(99, 102, 241)',
        'rgb(139, 92, 246)',
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
        'rgb(239, 68, 68)'
      ],
      borderWidth: 2
    }]
  }
}

const initChart = () => {
  if (!chartCanvas.value) return

  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return

  // Уничтожаем предыдущий график
  if (chart) {
    chart.destroy()
  }

  const chartData = getCategoryData()
  const colors = getThemeColors()

  chart = new Chart(ctx, {
    type: 'doughnut',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: {
            color: colors.textSecondary,
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: colors.tooltipBg,
          titleColor: colors.tooltipText,
          bodyColor: colors.tooltipText,
          borderColor: colors.border,
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: function(context) {
              const label = context.label || ''
              const value = context.parsed
              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
              const percentage = ((value / total) * 100).toFixed(1)
              return `${label}: ₸${value.toLocaleString()} (${percentage}%)`
            }
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart' as const
      },
      cutout: '60%'
    }
  })
}

// Инициализируем график при монтировании
onMounted(() => {
  nextTick(() => {
    initChart()
  })
})

// ✅ Props өзгергенде жаңарту
watch(() => props.isDark, () => {
  nextTick(() => {
    initChart()
  })
})

// Обновляем график при изменении данных
watch(() => dashboardStore.salesData, () => {
  nextTick(() => {
    initChart()
  })
}, { deep: true })

// Очищаем график при размонтировании
onUnmounted(() => {
  if (chart) {
    chart.destroy()
  }
})
</script>
