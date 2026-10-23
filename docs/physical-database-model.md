# Физическая модель базы данных

## Назначение

Модель поддерживает три модуля экосистемы: «Радар присутствия», «Инвестиционный навигатор» и «Калькулятор сделок». Основное хранилище — PostgreSQL с PostGIS; внешние государственные и коммерческие источники загружаются через API/ETL в контур приложения и не имеют прямых внешних ключей к нашей БД.

```mermaid
flowchart LR
    subgraph External[Внешние источники]
        FNS[ФНС]
        EIS[ЕИС / госзакупки]
        Cadastre[Кадастр]
        Registry[Реестры инвестиций]
        Prices[Поставщики цен оборудования и ПО]
    end

    subgraph Integration[integration]
        Sources[(data_sources)]
        Imports[(import_records)]
        Exports[(exports)]
    end

    subgraph Platform[PostgreSQL + PostGIS]
        Auth[auth\nПользователи и роли]
        Reference[reference\nСправочники]
        Geo[geo\nРегионы и геометрия]
        Market[market\nРынок и организации]
        Investment[investment\nПроекты и тендеры]
        Pricing[pricing\nРасчеты и КП]
        Notification[notification\nПодписки и уведомления]
        Audit[audit\nЖурнал действий]
    end

    FNS --> Sources
    EIS --> Sources
    Cadastre --> Sources
    Registry --> Sources
    Prices --> Sources
    Sources --> Imports
    Imports --> Market
    Imports --> Investment
    Imports --> Pricing

    Auth --> Market
    Auth --> Pricing
    Auth --> Notification
    Reference --> Market
    Reference --> Investment
    Reference --> Pricing
    Geo --> Market
    Geo --> Investment
    Market --> Investment
    Investment --> Pricing
    Notification --> Investment
    Market --> Exports
    Investment --> Exports
    Pricing --> Exports
    Auth --> Audit
    Market --> Audit
    Investment --> Audit
    Pricing --> Audit
```

## Карта схем и таблиц

```mermaid
flowchart TB
    subgraph auth[auth]
        users[users\nPK id]
        roles[roles\nPK id]
        user_roles[user_roles\nPK user_id + role_id]
        users --> user_roles
        roles --> user_roles
    end

    subgraph reference[reference]
        industries[industries\nPK id]
        stages[project_stages\nPK id]
        needs[need_types\nPK id]
        finance[financing_schemes\nPK id]
    end

    subgraph geo[geo]
        regions[regions\nPK id]
        municipalities[municipalities\nPK id\nFK region_id]
        regions --> municipalities
    end

    subgraph market[market]
        organizations[organizations\nPK id\nFK industry_id, municipality_id]
        financials[financial_indicators\nPK id\nFK organization_id, source_id]
        relationships[customer_relationships\nPK id\nFK organization_id, manager_id]
        organizations --> financials
        organizations --> relationships
    end

    subgraph investment[investment]
        projects[projects\nPK id\nFK initiator_organization_id, industry_id, stage_id]
        objects[project_objects\nPK id\nFK project_id, municipality_id]
        events[events\nPK id\nFK project_id, source_id]
        project_needs[project_needs\nPK project_id + need_type_id]
        tenders[tenders\nPK id\nFK project_id, source_id]
        projects --> objects
        projects --> events
        projects --> project_needs
        projects --> tenders
    end

    subgraph pricing[pricing]
        calculations[deal_calculations\nPK id\nFK author_id, region_id, industry_id]
        items[calculation_items\nPK id\nFK calculation_id]
        historical[historical_projects\nPK id]
        analogs[calculation_analogs\nPK calculation_id + historical_project_id]
        offers[commercial_offers\nPK id\nFK calculation_id]
        calculations --> items
        calculations --> analogs
        historical --> analogs
        calculations --> offers
    end

    industries --> organizations
    municipalities --> organizations
    users --> relationships
    organizations --> projects
    industries --> projects
    stages --> projects
    municipalities --> objects
    needs --> project_needs
    users --> calculations
    regions --> calculations
    industries --> calculations
    finance --> calculations
```

## Связи предметной области

```mermaid
erDiagram
    USERS ||--o{ USER_ROLES : has
    ROLES ||--o{ USER_ROLES : assigns
    REGIONS ||--o{ MUNICIPALITIES : contains
    MUNICIPALITIES ||--o{ ORGANIZATIONS : locates
    INDUSTRIES ||--o{ ORGANIZATIONS : classifies
    ORGANIZATIONS ||--o{ FINANCIAL_INDICATORS : has
    ORGANIZATIONS ||--o{ CUSTOMER_RELATIONSHIPS : has_history
    USERS ||--o{ CUSTOMER_RELATIONSHIPS : manages
    ORGANIZATIONS ||--o{ PROJECTS : initiates
    PROJECT_STAGES ||--o{ PROJECTS : sets_stage
    PROJECTS ||--o{ PROJECT_OBJECTS : includes
    PROJECTS ||--o{ EVENTS : has
    PROJECTS ||--o{ TENDERS : includes
    PROJECTS ||--o{ PROJECT_NEEDS : requires
    NEED_TYPES ||--o{ PROJECT_NEEDS : categorizes
    USERS ||--o{ DEAL_CALCULATIONS : creates
    DEAL_CALCULATIONS ||--o{ CALCULATION_ITEMS : contains
    DEAL_CALCULATIONS ||--o{ CALCULATION_ANALOGS : compares
    HISTORICAL_PROJECTS ||--o{ CALCULATION_ANALOGS : used_as_analog
    DEAL_CALCULATIONS ||--o{ COMMERCIAL_OFFERS : generates
```

## Направление связей

```text
regions 1 ─── N municipalities 1 ─── N organizations
organizations 1 ─── N financial_indicators
organizations 1 ─── N customer_relationships
organizations 1 ─── N projects 1 ─── N project_objects
                                  ├── N events
                                  ├── N tenders
                                  └── N project_needs N ─── 1 need_types

users 1 ─── N deal_calculations 1 ─── N calculation_items
                                     ├── N calculation_analogs N ─── 1 historical_projects
                                     └── N commercial_offers
```

## Правила целостности

- У организации один ИНН: `UNIQUE (inn)`.
- У финансового показателя одна запись на организацию, год и источник: `UNIQUE (organization_id, reporting_year, source_id)`.
- Один источник не может повторно загрузить тот же тендер: `UNIQUE (source_id, external_number)`.
- Одна подписка может содержать много условий; удаление подписки каскадно удаляет её условия.
- Удаление инвестиционного проекта каскадно удаляет его объекты, события, потребности и связи с аналогичными сущностями.
- Удаление расчёта каскадно удаляет позиции расчёта и привязки к аналогам; коммерческое предложение удалять каскадно нельзя, если оно уже отправлено клиенту.
- Файлы DOCX и экспортируемые CSV хранятся в объектном хранилище. В БД сохраняется только ключ объекта `document_storage_key` или `storage_key`.

## Критичные индексы

```text
market.organizations(inn)
market.financial_indicators(organization_id, reporting_year DESC)
investment.projects(stage_id, industry_id, started_on)
investment.events(project_id, occurred_at DESC)
investment.tenders(published_at DESC, deadline_at)
pricing.historical_projects(industry_id, region_id, project_type)
notification.notifications(user_id, read_at, created_at DESC)
GIST-индексы: boundary и location во всех пространственных таблицах
```
