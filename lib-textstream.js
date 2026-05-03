// テキストファイルを扱うためのクラス
// 使用例:
//   var txt = new OzTextStream(filepath, charset, separator);	// filepath を開く (ない場合は空バッファを作成)
//                                                              //   charset : 'UTF-8'(default) / 'UTF-16LE' / 'UTF-16BE' / 'Shift-JIS' / 'EUC-JP'
//                                                              //   separator :  'CRLF'(default) / 'LF' / 'CR'
//   read = txt.Read();									// 一行読み込む (末端の場合 null を返す)
//   txt.Write(str);									// ストリームに書き込む (改行つき)
//   txt.Write(str, false);								// ストリームに書き込む (改行なし)
//   txt.Close();										// ストリームを保存して閉じる

function OzTextStream (filepath, charset, separator)
{
	// --- private area ---
	var _filepath = filepath;
	var _charset = charset == undefined ? 'UTF-8' : charset;
	var _adodb = new ActiveXObject('ADODB.Stream');
	var _need_to_save = false;

	WScript.Echo('Create Stream' + '\n  Path: ' + _filepath + '\n  Charset: ' + charset);

	try
	{
		_adodb.Open();
		_adodb.Charset = (charset == undefined) ? 'UTF-8' : charset;
		_adodb.Type = 2;		// 2=adTypeText(default), 1=adTypeBinary;

		separator = (separator == undefined) ? 'CRLF' : separator; // Win なので CRLF をデフォとする

		// LineSeparator の設定: 読み出し/書き込み時にこの値が参照される
		if (separator == 'LF')
		{
			_adodb.LineSeparator = 10; // adLF
		}
		else if (separator == 'CR')
		{
			_adodb.LineSeparator = 13; // adCR
		}
		else
		{
			_adodb.LineSeparator = -1; // adCRLF (Default)
		}

		var _fso = new ActiveXObject('Scripting.FileSystemObject');
		if (_fso.FileExists(_filepath))
		{
			_adodb.LoadFromFile(_filepath);
			WScript.Echo('Load: ' + _adodb.LineSeparator);
		}
		else
		{
			_need_to_save = true;
		}

		// --- public area ---
		return {
			Read : function () {
				if (_adodb.EOF)
				{
					return null;
				}
				return _adodb.ReadText(-2); // -1=adReadAll(default) / -2=adReadLine / 正の数…文字数
			},
			Write : function (str, put_separator) {
				if (put_separator == undefined) { put_separator = true; } // デフォルトは改行入れる
				_adodb.WriteText(str, put_separator ? 1 : 0); // LineSeparator 書き込み: 0=adWriteChar(書かない。default), 1=adWriteLine(書く)
				_need_to_save = true;
			},
			Close : function (charset) {
				if (_need_to_save)
				{
					if (charset != undefined)
					{
						_adodb.Charset = charset;
					}
					_adodb.SaveToFile(_filepath);
					WScript.Echo('Saved.');
				}
				WScript.Echo('Close.');
				_adodb.Close();
			}
		};
	}
	catch(err)
	{
		WScript.Echo(err);
		_adodb.Close();
		throw err;
	}
}
