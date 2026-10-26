# TypeScript Diary CLI

Рабочее приложение дневника на TypeScript с командной строкой.

## Установка

```bash
npm install
```

## Сборка

```bash
npm run build
```

## Использование

```bash
# Добавить запись
node dist/cli.js add "Моя запись" "Содержание записи"

# Показать все записи
node dist/cli.js list

# Показать запись по ID
node dist/cli.js view 1

# Удалить запись по ID
node dist/cli.js delete 1

# Помощь
node dist/cli.js help
```

## Файлы

- `src/diary.ts` - основная логика работы с дневником
- `src/cli.ts` - интерфейс командной строки
- `diary.json` - файл для хранения записей
