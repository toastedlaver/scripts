@echo off
@rem emacs を emacsclient 経由で起動する。 WinMerge 等のツールと emacs の連携用
setlocal EnableDelayedExpansion
set EMACS_BIN_DIR="%ProgramFiles%"\Emacs\emacs-30.1\bin

@rem TODO: server がない (i.e. emacs のプロセスがない) 場合のケアができていない
set OPTION=-n -f "%USERPROFILE%\.emacs.d\server\server" -a %EMACS_BIN_DIR%\runemacs.exe

if not "%1"=="" (
	set OPTION=!OPTION! %1
	if not "%2"=="" (
		set OPTION=!OPTION! +%~2
		if not "%3"=="" (
			set OPTION=!OPTION!:%~3
		)
	)
)

%EMACS_BIN_DIR%\emacsclientw.exe %OPTION%
@echo on
