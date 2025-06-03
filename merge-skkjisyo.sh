#!/bin/sh
# 複数箇所にある SKK ユーザー辞書をマージ
# 1. GNU Emacs Win 版 (EUC-JP, CRLF)
# 2. SKK FEP (UTF16 BOM)
# 3. GNU Emacs Linux 版 (EUC-JP, LF)

USERDIC1=~/.skk-jisyo
USERDIC2=`cygpath ${APPDATA}`/SKKFEP/skkuser.txt
USERDIC3=/cygdrive/z/.skk-jisyo

if [ ! -v ${TEMP} ]; then
	TEMP=/tmp
fi

NEWDIC="${TEMP}/$$skk-jisyo"
TEMPDIC1="${TEMP}/$$skk-jisyo1"
TEMPDIC2="${TEMP}/$$skk-jisyo2"

BACKDIC1=`dirname "${USERDIC1}"`/`basename "${USERDIC1}"`.yesterday
BACKDIC2=`dirname "${USERDIC2}"`/`basename "${USERDIC2}"`.yesterday
BACKDIC3=`dirname "${USERDIC3}"`/`basename "${USERDIC3}"`.yesterday

echo SKK ユーザー辞書を更新しています...
# バックアップ
cp -f "${USERDIC1}" "${BACKDIC1}"
cp -f "${USERDIC2}" "${BACKDIC2}"
cp -f "${USERDIC3}" "${BACKDIC3}"

# 文字コード変換する。ツールが EUC-JP LF しか対応していないため、一度 EUC-JP LF に統一する。
# ※3 は最初から EUC-JP LF なので変換の必要なし
nkf -e -Lu "${USERDIC1}" > "${TEMPDIC1}"
nkf -e -Lu "${USERDIC2}" > "${TEMPDIC2}"

# skkdic-expr2 は Win でコンパイルされているので Win のパスにして渡す必要がある
# 入力辞書の文字コード EUC-JP (LF) でないと無視される模様 (エラーくらい出してくれ…)。 出力は EUC-JP (LF) になる。
skkdic-expr2 `cygpath -w "${TEMPDIC1}"` + `cygpath -w "${TEMPDIC2}"` + `cygpath -w "${USERDIC3}"` > "${NEWDIC}"

# 文字コードを元に戻して上書き
nkf -e -Lw "${NEWDIC}" > "${USERDIC1}"
nkf -w16L -Lw "${NEWDIC}" > "${USERDIC2}"
cp -f "${NEWDIC}" "${USERDIC3}"
rm -f "${NEWDIC}" "${TEMPDIC1}" "${TEMPDIC3}"

#nkf --guess "${USERDIC1}"
#nkf --guess "${USERDIC2}"
#nkf --guess "${USERDIC3}"

echo 終了!!
