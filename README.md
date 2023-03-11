# Тестовое задание для World of Worships

[`WoW test task github repository`](https://github.com/alexandrkaa/wow-test-task)

## Настройка проекта

1. Скачать репозиторий (git clone `URL`)
2. Установить зависимости (npm/yarn install в директории проекта)

## Cборка проекта

#### Запуск в режиме разработки

```
npm run dev
```

#### Сборка проекта

```
npm run build
```

## Используемые инструменты

1. React
2. Redux + toolkit
3. Axios
4. react-modal
5. react-loader-spinner

## Backend API endpoints

- https://vortex.worldofwarships.eu/api/encyclopedia/en/vehicles
- https://vortex.worldofwarships.eu/api/encyclopedia/en/nations
- https://vortex.worldofwarships.eu/api/encyclopedia/en/vehicle_types_common
- https://vortex.worldofwarships.eu/api/encyclopedia/en/media_path

## Реализованный функционал

1. Базовая верстка страницы сходная с оригинальным сайтом
2. Обращение к API для получения списка моделей кораблей
3. Вывод моделей на одной странице
4. Увеличение модели при клике на нее

## TODO

1. Паджинация
2. Запрос моделей частями (при тех возможности API)
3. Настройка Docker-контейнера для установки приложения
