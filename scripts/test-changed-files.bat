@echo off
setlocal enabledelayedexpansion

rem Объявляем переменную для хранения файлов тестов
set "test_files="

rem Получим список изменённых файлов, подготовленных для коммита
for /f "usebackq tokens=*" %%f in (`git diff --cached --name-only`) do (
    rem Проверяем, если файл соответствует шаблону теста
    echo %%f | findstr /r "\.test\.jsx\? \.test\.tsx\?" >nul
    if %errorlevel%==0 (
        rem Добавляем файл в список
        set "test_files=!test_files! %%f"
    )
)

if defined test_files (
    echo Запускаем тесты для: !test_files!
    npx jest !test_files!
) else (
    echo Нет тестов для запуска.
)

endlocal
