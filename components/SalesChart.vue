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
    grid: props.isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(107, 114, 128, 0.1)',
    tooltipBg: props.isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(0, 0, 0, 0.8)',
    tooltipText: '#ffffff',
    border: props.isDark ? '#475569' : '#6366f1'
  }
}

const initChart = () => {
  if (!chartCanvas.value) return
  
  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return
  
  if (chart) {
    chart.destroy()
  }
  
  const chartData = dashboardStore.chartData
  const colors = getThemeColors()
  
  chart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            color: colors.textSecondary,
            usePointStyle: true,
            padding: 20
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
          intersect: false,
          mode: 'index' as const
        }
      },
      scales: {
        x: {
          grid: {
            color: colors.grid
          },
          ticks: {
            color: colors.textSecondary
          }
        },
        y: {
          grid: {
            color: colors.grid
          },
          ticks: {
            color: colors.textSecondary,
            callback: function(value) {
              return '₸' + value.toLocaleString()
            }
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index' as const
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart' as const
      }
    }
  })
}

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

watch(() => dashboardStore.chartData, () => {
  nextTick(() => {
    initChart()
  })
}, { deep: true })

onUnmounted(() => {
  if (chart) {
    chart.destroy()
  }
})
</script>
