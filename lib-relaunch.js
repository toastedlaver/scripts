// WScript.exe で実行した時は Cscript.exe でやり直す
// https://mogproject.blogspot.com/2012/04/re-launch-vbscript-with-cscript.html
function OzReLaunch()
{
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
		wsh.Run('%ComSpec% /c @echo CScript で開き直します&&cscript //NOLOGO ' + cmd + '&&pause', 1, false);
		// 1:ウィンドウをアクティブにして表示する。ウィンドウが最小化または最大化されている場合は、元のサイズと位置に戻る
		// false: run 終了を待たない
		WScript.Quit();
	}
}
