@echo off
setlocal enabledelayedexpansion

rem Объявляем переменную для хранения файлов
set "test_files="

rem Получим список подготовленных файлов
for /f "usebackq tokens=*" %%f in (`git diff --cached --name-only`) do (
    rem Проверяем, если файл является *.ts или *.tsx проектом
    echo %%f | findstr /r "\.ts$ \.tsx$" >nul
    if %errorlevel%==0 (
        rem Добавляем файл
        set "test_files=!test_files! %%f"
    )
)

if not "%test_files%"=="" (
    echo Запускаем тесты для: %test_files%
    npx jest --findRelatedTests --passWithNoTests %test_files%
) else (
    echo Нет тестов для запуска.
)

endlocal
