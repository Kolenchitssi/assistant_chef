#!/bin/bash

changed_files=$(git diff --cached --name-only)

test_files=$(echo "$changed_files" | grep -E '(\.test\.jsx?$|\.test\.tsx?$)')

if [ -n "$test_files" ]; then
  echo "Запускаем тесты для изменённых файлов..."
  npx jest $test_files
else
  echo "Нет тестов для запуска."
fi
