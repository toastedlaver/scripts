// WScript.exe �Ŏ��s�������� Cscript.exe �ł�蒼��
// https://mogproject.blogspot.com/2012/04/re-launch-vbscript-with-cscript.html
var cscript_exe = WScript.Path + '\\cscript.exe';
if (WScript.FullName.toLowerCase() != cscript_exe.toLowerCase())
{
	var cmd = '"' + WScript.ScriptFullName + '"';
	for (var ii = 0; ii < WScript.Arguments.Length; ii++)
	{
		cmd += " " + WScript.Arguments(ii);
	}
	cscript_exe = '"' + cscript_exe + '"'; // �O�̂��� "" �ň͂�ł���
	var wsh = new ActiveXObject("WScript.Shell");
	wsh.run("%ComSpec% /c cscript //NOLOGO " + cmd + "&&pause", 1, false);
	// 1:�E�B���h�E���A�N�e�B�u�ɂ��ĕ\������B�E�B���h�E���ŏ����܂��͍ő剻����Ă���ꍇ�́A���̃T�C�Y�ƈʒu�ɖ߂�
	// false: run �I����҂��Ȃ�
	WScript.Quit();
}

// �������牺�ɖ{����������

// �������Ȃ���ΕW�����͂�����͂������
// (WScript.exe �Ŏ��s����� StdOut/StdIn �͎g���Ȃ�)

var args = [0, 0];

if (WScript.Arguments.Length > 0)
{
	args[0] = WScript.Arguments(0);
}
else
{
	WScript.StdOut.WriteLine("args[0] ����͂��ĉ�����");
	args[0] = WScript.StdIn.ReadLine();
}

if (WScript.Arguments.Length > 1)
{
	args[1] = WScript.Arguments(1);
}
else
{
	WScript.StdOut.WriteLine("args[1] ����͂��ĉ�����");
	args[1] = WScript.StdIn.ReadLine();
}

WScript.StdOut.WriteLine("args[0]=" + args[0]);
WScript.StdOut.WriteLine("args[1]=" + args[1]);
