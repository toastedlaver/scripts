// WScript.exe で実行した時は Cscript.exe でやり直す
// https://mogproject.blogspot.com/2012/04/re-launch-vbscript-with-cscript.html
var cscript_exe = WScript.Path + '\\cscript.exe';
if (WScript.FullName.toLowerCase() != cscript_exe.toLowerCase())
{
	var cmd = '"' + WScript.ScriptFullName + '"';
	for (var ii = 0; ii < WScript.Arguments.Length; ii++)
	{
		cmd += " " + WScript.Arguments(ii);
	}
	cscript_exe = '"' + cscript_exe + '"'; // 念のため "" で囲んでおく
	var wsh = new ActiveXObject("WScript.Shell");
	wsh.run("%ComSpec% /c cscript //NOLOGO " + cmd + "&&pause", 1, false);
	// 1:ウィンドウをアクティブにして表示する。ウィンドウが最小化または最大化されている場合は、元のサイズと位置に戻る
	// false: run 終了を待たない
	WScript.Quit();
}

// ここから下に本処理を書く

// 引数がなければ標準入力から入力させる例
// (WScript.exe で実行すると StdOut/StdIn は使えない)

var args = [0, 0];

if (WScript.Arguments.Length > 0)
{
	args[0] = WScript.Arguments(0);
}
else
{
	WScript.StdOut.WriteLine("args[0] を入力して下さい");
	args[0] = WScript.StdIn.ReadLine();
}

if (WScript.Arguments.Length > 1)
{
	args[1] = WScript.Arguments(1);
}
else
{
	WScript.StdOut.WriteLine("args[1] を入力して下さい");
	args[1] = WScript.StdIn.ReadLine();
}

WScript.StdOut.WriteLine("args[0]=" + args[0]);
WScript.StdOut.WriteLine("args[1]=" + args[1]);
