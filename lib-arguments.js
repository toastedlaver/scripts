// 引数付きで起動されていなければ標準入力から入力させる
// ※CScript 実行環境前提 (WScript.exe で実行すると StdOut/StdIn は使えない)
// 使用例:
// case1: script を引数なしで実行した場合
//   var args = new OzArguments(WScript.Arguments);
//   args.GetLength();					// 引数: 0
//   var a1 = args.GetValue(0, 'input arg0');	// input arg0 のプロンプトを出し、ユーザーが入力した値を 0 番目に格納してその値を返す
//
// case2: script に foo の引数を与えて実行した場合
//   var args = new OzArguments(WScript.Arguments);
//   args.GetLength();					// 引数: 1
//   var a1 = args.GetValue(0, 'input arg0');	// ユーザーが入力した値を 0 番目の値 (foo) を返す

function OzArguments(args)
{
	// private
	var _args = [];

	for (var ii = 0; ii < args.Length; ii++) // WScript.Arguments は配列ではないので大文字 Length
	{
		_args.push(args(ii));
	}

	// public な部分をハッシュで return することでインスタンスの様に使えるようにする
	return {
		GetLength : function() { return _args.length; }, // 配列は小文字の length
		GetValue : function(index, prompt)
		{
			if ( prompt == undefined ) { prompt = 'please input argument No:' + index; }
			var result;
			if (_args.Length <= index)
			{
				// Length = 3; index = 5 の場合
				// | 0 | 1 | 2 | → | 0 | 1 | 2 | 3 | 4 | 5 |
				// |---+---+---|    |---+---+---+---+---+---|
				// | x | y | z |    | x | y | z |空 |空 | t |
				for (var ii = _args.Length; ii <= index; ii++)
				{
					_args.push(undefined);
				}
			}

			if (_args[index] == undefined)
			{
				WScript.StdOut.WriteLine(prompt);
				_args[index] = WScript.StdIn.ReadLine();
			}
			return _args[index];
		}
	};
}
