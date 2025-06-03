@echo off
@rem 日々バックアップ処理
setlocal

set BKUP_DIR="%OneDrive%"\ozawa\backup

@rem SKK 辞書バックアップ
set SKK_BKUP_DIR=%BKUP_DIR%\skk

copy /y %USERPROFILE%\.skk-jisyo %SKK_BKUP_DIR%\ddskk\
copy /y %USERPROFILE%\AppData\Roaming\SKKFEP\skkuser.txt %SKK_BKUP_DIR%\skkfep\
