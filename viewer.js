// �w��t�H���_�̉��ʃt�H���_�ɂ��� JPEG �t�@�C�����ꗗ�\������ HTML �����

// GUI �Ńt�H���_�w��
//var shell = new ActiveXObject('Shell.Application');
//var filepath = shell.BrowseForFolder(0, 'Select folder', 512); // 0x200: �t�H���_�쐬�s�ɂ���
//var list = findJpeg(filepath);

// ���L�̗l�ɂ���΃t�H���_�𒼐ڎw��A�����w����ł���
var list = "";
list += findJpeg('F:\\.mkr\\done');
list += findJpeg('E:\\Downloads\\ut');
//list += findJpeg('F:\\.mkr\\arrangement');

CreateHtml("viewer.html", list.split('\n'));

WScript.quit(0);
// ���C�������͂����܂ŁB�ȉ��A�֐�

function CreateHtml(fpath, list)
{
	var header = '\
<html>\
<meta charset="UTF-8">\
<head>\
<title>�摜�r���[�A</title>\
<head>\
<body>\
';
	var footer = '\
</body>\
</html>\
';
	var html = new ActiveXObject('ADODB.Stream'); // FileSystemObject �g���� Shift-JIS �� UTF16 ���������Ȃ�

	html.Type = 2;				// Text
	html.charset = 'utf-8';
	html.Open();
	html.WriteText(header + '\n');

	WriteHtmlImage(html, list);

	html.WriteText(footer + '\n');
	html.SaveToFile(fpath, 2);	// �t�@�C�������݂���ꍇ�͏㏑��
	html.Close();

	var wsh = new ActiveXObject('WScript.Shell');
	wsh.Run(fpath);
}

function findJpeg(path)
{
	var fso = new ActiveXObject('Scripting.FileSystemObject');
	var rtn = "";
	var folder = fso.GetFolder(path);
	var files = new Enumerator(folder.files);

	// �t�@�C��������
	for (; !files.atEnd(); files.moveNext())
	{
		var name = files.item();
		var ext = fso.GetExtensionName(name);
		if ((ext == "jpg") || (ext == "jpeg"))
		{
			rtn += name;
			rtn += "\n";
		}
	}

	// ���ʃt�H���_�����l�Ɍ���
	var subs = new Enumerator(folder.SubFolders);
	for (; !subs.atEnd(); subs.moveNext())
	{
		rtn += findJpeg(subs.item());
	}

	return rtn;
}

function WriteHtmlImage(as, ary)
{
	var img  = new ActiveXObject("WIA.ImageFile");
	as.WriteText('<p>\n');
	for (var ii in ary)
	{
		if (ary[ii] != '')
		{
			var w = 0;
			var h = 0;
			img.LoadFile(ary[ii]);
			if (img.Width > img.Height) // �A�X�y�N�g���ێ�
			{
				w = 180;
				h = Math.ceil(img.Height * w / img.Width);
			}
			else
			{
				h = 120;
				w = Math.ceil(img.Width * h / img.Height);
			}
			as.WriteText('<a href="file://' + ary[ii] + '">' + '<img src="file://' + ary[ii].toString() + '" border="0" width="' + w + '" height="' + h + '"></a>');
			as.WriteText('\n');
		}
	}
	as.WriteText('</p>\n');
}
