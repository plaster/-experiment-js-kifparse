function () {
	var kifparse = {};

	var alist2map = function(alist) {
		var res = {};
		for (var i = 0; i < alist.length; ++i) {
			var k = alist[i][0];
			var v = alist[i][1];
			res[k] = v;
		}
		return res;
	};
	var alist2rmap = function(alist) {
		var res = {};
		for (var i = 0; i < alist.length; ++i) {
			var k = alist[i][0];
			var v = alist[i][1];
			res[v] = k;
		}
		return res;
	};
	var map = function(cb, list) {
		var res = [];
		for (var i = 0; i < list.length; ++i) {
			res[i] = cb(list[i]);
		}
		return res;
	};

	var piece_list =
	[["歩"  ,"FU"]
	,["香"  ,"KY"]
	,["桂"  ,"KE"]
	,["銀"  ,"GI"]
	,["金"  ,"KI"]
	,["角"  ,"KA"]
	,["飛"  ,"HI"]
	,["玉"  ,"OU"]
	,["と"  ,"TO"]
	,["成香","NY"]
	,["成桂","NK"]
	,["成銀","NG"]
	,["馬"  ,"UM"]
	,["龍"  ,"RY"]
	];

	var piece_map = alist2map(piece_list);
	var piece_rmap = alist2rmap(piece_list);
	var pat_piece = map(function(x){return x[0];}, piece_list).join('|');

	var coord_list =
	[["1",1]
	,["2",2]
	,["3",3]
	,["4",4]
	,["5",5]
	,["6",6]
	,["7",7]
	,["8",8]
	,["9",9]
	,["１",1]
	,["２",2]
	,["３",3]
	,["４",4]
	,["５",5]
	,["６",6]
	,["７",7]
	,["８",8]
	,["９",9]
	,["一",1]
	,["二",2]
	,["三",3]
	,["四",4]
	,["五",5]
	,["六",6]
	,["七",7]
	,["八",8]
	,["九",9]
	];

	var coord_map = alist2map(coord_list);
	var pat_coord = map(function(x){return x[0];}, coord_list).join('|');

	var t2sec = function(timestr) {
		var matchres;
		if (matchres = timestr.match(/^(?:(?: *(\d+):)? *(\d+):)? *(\d+)$/)) {
			var hh = matchres[1] ? Number(matchres[1]) : 0;
			var mm = matchres[2] ? Number(matchres[2]) : 0;
			var ss = matchres[3] ? Number(matchres[3]) : 0;
			return ss + 60 * (mm + 60 * hh);
		} else {
			return false;
		}
	};

	var re_move = new RegExp(
			'^ *'
			+ '(' + '[0-9]+' + ')'
			+ ' +'
			+ '(?:'
				+ '(?:'
					+ '(' + pat_coord + ')'
					+ '(' + pat_coord + ')'
				+ '|(同)'
				+ ')'
				+ '　*'
				+ '(' + pat_piece + ')'
				+ '(成?)'
				+ '(?:'
					+ '\\('
						+ '(' + pat_coord + ')'
						+ '(' + pat_coord + ')'
					+ '\\)'
					+ '|(打)'
				+ ')'
			+ '|(投了)'
			+ ')'
			+ ' *'
			+ '\\('
				+ ' *([^ ]*) */ *([^ ]*) *'
			+ '\\)'
			);

	var parse_line = function(line) {
		var matchres;
		if (matchres = line.match(re_move)) {
			var mvsrc = (matchres[7] && matchres[8])
			? { "x":coord_map[matchres[7]], "y":coord_map[matchres[8]] }
			: false;
			var mvdst = (matchres[2] && matchres[3])
			? { "x":coord_map[matchres[2]], "y":coord_map[matchres[3]] }
			: false;
			if (matchres[10]) {
				if (matchres[10] === '投了') {
					return {
						"TYPE" : "MOVE"
					,	"PIECE" : "TORYO"
					,	"SERIAL" : Number(matchres[1])
					,	"SPENT" : t2sec(matchres[11])
					,	"SPTOTAL" : t2sec(matchres[12])
					};
				}
			}
			return {
				"TYPE" : "MOVE"
			,	"SERIAL" : Number(matchres[1])
			,	"PIECE" : piece_map[matchres[5]]
			,	"MVSRC" : mvsrc
			,	"MVDST" : mvdst
			,	"PROMOTE" : (matchres[6] ? true : false)
			,	"SPENT" : t2sec(matchres[11])
			,	"SPTOTAL" : t2sec(matchres[12])
			};
		} else if (matchres = line.match(/^\*(.*)$/)) {
			return {
				"TYPE" : "NOTE"
			,	"TEXT" : matchres[1]
			};
		} else if (matchres = line.match(/^手合割：(.*)$/)) {
			var handicap = matchres[1].replace(/　/g,"");
			return {
				"TYPE" : "HANDICAP"
			,	"HANDICAP" :
					( handicap === "平手" ? "PL"
					: "不明"
					)
			};
		} else if (matchres = line.match(/^先手：(.*)$/)) {
			var name = matchres[1];
			return {
				"TYPE" : "PLAYER"
			,	"PLAYER" : 1
			,	"NAME" : name
			};
		} else if (matchres = line.match(/^後手：(.*)$/)) {
			var name = matchres[1];
			return {
				"TYPE" : "PLAYER"
			,	"PLAYER" : 2
			,	"NAME" : name
			};
		} else {
			// should be syntax error?
			return null;
		}
	};

	kifparse.parse_line = parse_line;
}
