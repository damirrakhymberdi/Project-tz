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

// Регистрируем все компоненты Chart.js
Chart.register(...registerables)

const initChart = () => {
  if (!chartCanvas.value) return

  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return

  // Уничтожаем предыдущий график
  if (chart) {
    chart.destroy()
  }

  const chartData = dashboardStore.chartData

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
            color: '#6b7280',
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: '#6366f1',
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
            color: 'rgba(107, 114, 128, 0.1)'
          },
          ticks: {
            color: '#6b7280'
          }
        },
        y: {
          grid: {
            color: 'rgba(107, 114, 128, 0.1)'
          },
          ticks: {
            color: '#6b7280',
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

// Инициализируем график при монтировании
onMounted(() => {
  nextTick(() => {
    initChart()
  })
})

// Обновляем график при изменении данных
watch(() => dashboardStore.chartData, () => {
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
