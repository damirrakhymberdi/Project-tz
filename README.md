# 📊 Nuxt 3 Analytics Dashboard

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3.0-00DC82?style=flat&logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.0-FF6384?style=flat&logo=chart.js&logoColor=white)](https://www.chartjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Интерактивный дашборд для анализа продаж и пользовательской активности, построенный на Nuxt 3 с использованием TypeScript, Chart.js и Tailwind CSS.

## 🚀 Live Demo
[Посмотреть демо](https://damirrakhymberdi.github.io/Project-tz/)

## 🚀 Возможности

- **📈 Интерактивные графики** - Динамика продаж по категориям с использованием Chart.js
- **📅 Фильтрация по периодам** - Сегодня, Неделя, Месяц
- **📊 Ключевые метрики** - Общий доход, количество заказов, средний чек, уникальные категории
- **🌙 Темная/светлая тема** - Переключение между темами
- **📱 Адаптивный дизайн** - Корректное отображение на всех устройствах
- **⚡ Высокая производительность** - Оптимизированные компоненты и состояние

## 🛠 Технологии

- **Framework**: Nuxt 3 (Vue 3 Composition API)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js
- **State Management**: Pinia
- **Build Tool**: Vite

## 📁 Структура проекта

```
project/
├── assets/
│   └── css/
│       └── main.css          # Основные стили и темы
├── components/
│   ├── CategoryChart.vue     # Круговая диаграмма категорий
│   ├── MetricCard.vue        # Карточка метрики
│   ├── PeriodFilters.vue     # Фильтры по периодам
│   └── SalesChart.vue        # Линейный график продаж
├── pages/
│   └── index.vue             # Главная страница дашборда
├── server/
│   └── api/
│       └── sales.get.ts      # Mock API для данных продаж
├── stores/
│   └── dashboard.ts          # Pinia store для состояния
├── types/
│   └── index.ts              # TypeScript типы
├── nuxt.config.ts            # Конфигурация Nuxt
└── package.json
```

## 🏗 Архитектура

### Компоненты
- **PeriodFilters** - Фильтрация данных по временным периодам
- **MetricCard** - Отображение ключевых показателей
- **SalesChart** - Линейный график динамики продаж
- **CategoryChart** - Круговая диаграмма распределения по категориям

### Состояние (Pinia Store)
- **dashboard.ts** - Управление данными дашборда, метриками и графиками

### API
- **sales.get.ts** - Mock API endpoint для получения данных продаж

## 🎨 Кастомизация

### Цветовая схема
```css
:root {
  --primary-color: #6366f1;    /* Индиго */
  --secondary-color: #8b5cf6;  /* Фиолетовый */
  --success-color: #10b981;    /* Зеленый */
  --warning-color: #f59e0b;    /* Оранжевый */
  --error-color: #ef4444;      /* Красный */
}
```

### Анимации
- Плавные переходы при смене данных
- Анимация загрузки графиков
- Hover эффекты для интерактивности

## 🚀 Установка и запуск

### Требования
- Node.js 18+ 
- npm или yarn

### Установка
```bash
# Клонирование репозитория
git clone <repository-url>
cd project

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev
```

### Доступные команды
```bash
npm run dev      # Запуск в режиме разработки
npm run build    # Сборка для продакшена
npm run preview  # Предварительный просмотр сборки
npm run generate # Генерация статического сайта
```

## 📊 Данные

### Mock данные
Проект использует mock данные для демонстрации функциональности:

```typescript
interface SaleData {
  date: string      // Дата продажи
  amount: number    // Сумма продажи
  category: string  // Категория товара
}
```

### Категории товаров
- Электроника
- Одежда  
- Книги

### Периоды фильтрации
- **Сегодня** - Данные за текущий день
- **Неделя** - Данные за последние 7 дней
- **Месяц** - Данные за весь месяц

## 🔧 Конфигурация

### Nuxt конфигурация
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',        // Управление состоянием
    '@nuxtjs/tailwindcss' // CSS фреймворк
  ],
  css: ['~/assets/css/main.css']
})
```

## 📱 Адаптивность

Дашборд полностью адаптивен и корректно отображается на:
- **Desktop** - Полная функциональность
- **Tablet** - Адаптированная сетка
- **Mobile** - Вертикальная компоновка

## 🎯 Производительность

### Оптимизации
- Ленивая загрузка компонентов
- Мемоизация вычислений в Pinia store
- Оптимизированные Chart.js конфигурации
- CSS с использованием Tailwind CSS

### Метрики
- Время загрузки: < 2 секунд
- Размер бандла: ~500KB
- Lighthouse Score: 90+

## 🚧 Планы развития

- [ ] Произвольный диапазон дат
- [ ] Экспорт данных в CSV/PDF
- [ ] Уведомления о важных событиях
- [ ] Интеграция с реальным API
- [ ] Дополнительные типы графиков
- [ ] Многоязычность

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

MIT License

## 👨‍💻 Автор

Создано для демонстрации возможностей Nuxt 3 и современных веб-технологий.

---

**Примечание**: Это демонстрационный проект с mock данными. Для продакшена требуется интеграция с реальным API и дополнительная настройка.