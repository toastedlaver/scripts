// ログイン時のアプリ自動起動用スクリプト
// 2025年になって、スタートアップフォルダの実行が遅過ぎることに気付いた
// (自動実行に設定した Teams が起動して、更に時間が経ってからやっと実行される)
// それでは困るので、タスクスケジューラで「ログオン時に」起動させる
// ⇒複数のアプリをスケジューラに登録させるのは手間なので、スクリプトから起動の形にする

// (追記)
// タスクスケジューラで起動すると、優先度クラスが normal ではく、それより低い belownormal で起動するため
// 優先度 normal で起動するよう処理を変更

// 下記パスのディレクトリに置いたファイル (or ショートカット) を実行していきます
var dir_startup = 'C:\\Users\\ozawa\\AppData\\Local\\_mytool\\startup';

// 以下、本処理
var fsys = new ActiveXObject('Scripting.FileSystemObject');
if (!fsys.FolderExists(dir_startup))
{
	WScript.Echo(dir_startup + ' がありません。');
	WScript.Quit();
}

var dir = fsys.GetFolder(dir_startup)
if (dir.Files.Count == 0)
{
	WScript.Echo('実行するファイルがありません。');
	WScript.Quit();
}

var wsh = new ActiveXObject("WScript.Shell");
for (var enu_files = new Enumerator(dir.Files); !enu_files.atEnd(); enu_files.moveNext())
{
	var file = enu_files.item();

	// cmd.exe から start コマンドでオプション指定して起動
	// 優先度: <高> realtime → high → abovenormal → normal → belownormal → low <低>
	// ただし、 start は "" を解釈できないため、空白を含むパス/ファイルを扱うため 8.3 形式の短縮パスを渡す
	var exec = 'cmd /c start /b /normal ' + file.ShortPath;
	//WScript.Echo(exec);
	wsh.run(exec, 0, false); // 0=ウィンドウを非アクティブにして実行, false=コマンドの終了待ちしない
}
