# Rostelecom Analytics

Фронтенд аналитической платформы Ростелекома. Проект реализован на React, TypeScript и Vite с использованием Ant Design, CSS Modules, Redux Toolkit, React Router и Storybook.

## Команды

```bash
npm install
npm run dev
npm run storybook
npm run typecheck
npm run lint
npm run stylelint
npm run format:check
```

Команда `npm run build` создаёт production-сборку и запускается только при явном согласовании.

## Архитектура

Проект следует Feature-Sliced Design (FSD). Направление зависимостей:

```text
app → pages → widgets → features → entities → shared
```

Срез импортирует только нижележащие слои через их публичный API. Импорты между срезами одного слоя и обращения к внутренним файлам другого среза запрещены.

### Реализовано

```text
src/
  app/       # providers, router, layout, store, global styles, Storybook templates
  pages/     # market-radar, investment-navigator, deal-calculator
  shared/    # UI Kit, configuration, formatting utilities and shared styles
```

- `app/providers` подключает Router, Redux Provider, русскую локаль и тему Ant Design.
- `app/router` задаёт маршруты и общий `AppLayout`.
- `app/layout` содержит верхнюю глобальную панель и боковую навигацию.
- `pages/*` содержат визуальные прототипы экранов и изолированные demo-данные в `model/mock-data.ts`.
- `shared/ui` содержит переиспользуемый UI Kit: `AppShell`, `PageHeader`, `DataPanel`, `KpiCard`, `FilterBar`, `LogoSlot`.
- `shared/config` содержит тему Ant Design и маршруты; `shared/lib` — форматтеры значений.

Текущие показатели, организации, проекты и расчёты являются демонстрационными. Реальный API, авторизация, экспорт, генерация коммерческого предложения и расчётная логика ещё не реализованы.

### Алиасы

| Алиас         | Слой                           |
| ------------- | ------------------------------ |
| `@app/*`      | `src/app/*`                    |
| `@pages/*`    | `src/pages/*`                  |
| `@widgets/*`  | `src/widgets/*`                |
| `@features/*` | `src/features/*`               |
| `@entities/*` | `src/entities/*`               |
| `@shared/*`   | `src/shared/*`                 |
| `@/*`         | `src/*` — технический fallback |

Внутри одного среза допустимы относительные импорты. Между слоями используйте алиас и публичный `index.ts` среза.

### Следующие модули

Папки `widgets`, `features` и `entities` пока намеренно не созданы: срез появляется только при самостоятельной ответственности, а не заранее.

| Направление              | Будущие entities                                | Будущие features и widgets                                                   |
| ------------------------ | ----------------------------------------------- | ---------------------------------------------------------------------------- |
| Радар присутствия        | `organization`, `territory`, `market-signal`    | фильтрация рынка, карта покрытия, экспорт выборки, таблица организаций       |
| Инвестиционный навигатор | `investment-project`, `tender`, `project-event` | поиск и фильтрация, подписка на изменения, карточка проекта, карта, timeline |
| Калькулятор сделок       | `deal`, `solution-item`, `price-analogue`       | параметры расчёта, пересчёт стоимости, сохранение расчёта, генерация КП      |
| Сквозные сценарии        | `user`, `notification`, `export-job`            | авторизация/2FA, уведомления, экспорт CSV/CRM, генерация DOC                 |

### Правила для нового среза

1. Создавайте `entity`, `feature` или `widget` только при наличии собственной предметной ответственности.
2. Публикуйте внешний API среза через `index.ts`; не импортируйте внутренние `ui`, `model` или `api` другого среза.
3. `shared/ui` содержит только универсальные компоненты без предметной логики.
4. Локальное состояние храните в компоненте, воспроизводимые фильтры — в URL. Redux Toolkit используйте только для общего клиентского состояния; серверные данные подключайте через RTK Query после утверждения API-контрактов.
5. Каждый новый компонент должен использовать стрелочную функцию и завершаться `export default`. Внутренние функции и утилиты могут использовать именованный экспорт, если это улучшает их API.
6. Для UI-компонентов добавляйте истории Storybook: минимум `default`, а для компонентов с данными также `loading`, `empty` и `error`.
7. Моковые данные маркируйте как демонстрационные и не выдавайте их за реальные.

## Документация

- [Дизайн-концепция](docs/brand/design-concept.md)
- [Спецификации экранов](docs/pages/)
- [Физическая модель данных](docs/physical-database-model.md)
- [Технический фундамент](docs/frontend/foundation.md)
