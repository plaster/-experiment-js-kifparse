(function() {
	if (! window.kifparse) {
		window.kifparse = {};
	}
	var _kifparse = window.kifparse;

	var parse_line = function(line) {
		var re = /^ *(\d+) +([１２３４５６７８９][１２３４５６７８９一二三四五六七八九]|同)　*(歩|と|香|成香|桂|成桂|銀|成銀|金|角|馬|飛|龍|玉)(成?)(打|\(\d\d\)) *\((.*)\/(.*)\)/;
		var matchres;
		if (matchres = line.match(re)) {
			return matchres;
		}
	};
	_kifparse.parse_line = parse_line
})();
