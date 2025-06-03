// 指定フォルダの下位フォルダにある JPEG ファイルを一覧表示する HTML を作る

// GUI でフォルダ指定
//var shell = new ActiveXObject('Shell.Application');
//var filepath = shell.BrowseForFolder(0, 'Select folder', 512); // 0x200: フォルダ作成不可にする
//var list = findJpeg(filepath);

// 下記の様にすればフォルダを直接指定、複数指定もできる
var list = "";
list += findJpeg('F:\\.mkr\\done');
list += findJpeg('E:\\Downloads\\ut');
//list += findJpeg('F:\\.mkr\\arrangement');

CreateHtml("viewer.html", list.split('\n'));

WScript.quit(0);
// メイン処理はここまで。以下、関数

function CreateHtml(fpath, list)
{
	var header = '\
<html>\
<meta charset="UTF-8">\
<head>\
<title>画像ビューア</title>\
<head>\
<body>\
';
	var footer = '\
</body>\
</html>\
';
	var html = new ActiveXObject('ADODB.Stream'); // FileSystemObject 使うと Shift-JIS か UTF16 しか書けない

	html.Type = 2;				// Text
	html.charset = 'utf-8';
	html.Open();
	html.WriteText(header + '\n');

	WriteHtmlImage(html, list);

	html.WriteText(footer + '\n');
	html.SaveToFile(fpath, 2);	// ファイルが存在する場合は上書き
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

	// ファイルを検索
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

	// 下位フォルダも同様に検索
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
			if (img.Width > img.Height) // アスペクト比を保持
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
