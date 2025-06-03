// ウィンドウを全て最小化して画面をロックする

var sha = new ActiveXObject("shell.application");
sha.MinimizeAll();

var wsh = new ActiveXObject("WScript.Shell");
wsh.run("rundll32.exe user32.dll,LockWorkStation");
