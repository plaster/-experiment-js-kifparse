// vi: set ft=javascript :
(function() {
	if (! window.kifparse) {
		window.kifparse = {};
	}
	var _kifparse = window.kifparse;

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

	var piece_list =
	[["\u6b69"  ,"FU"]
	,["\u9999"  ,"KY"]
	,["\u6842"  ,"KE"]
	,["\u9280"  ,"GI"]
	,["\u91d1"  ,"KI"]
	,["\u89d2"  ,"KA"]
	,["\u98db"  ,"HI"]
	,["\u7389"  ,"OU"]
	,["\u3068"  ,"TO"]
	,["\u6210\u9999","NY"]
	,["\u6210\u6842","NK"]
	,["\u6210\u9280","NG"]
	,["\u99ac"  ,"UM"]
	,["\u9f8d"  ,"RY"]
	];

	var piece_map = alist2map(piece_list);
	var piece_rmap = alist2rmap(piece_list);

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
	,["\uff11",1]
	,["\uff12",2]
	,["\uff13",3]
	,["\uff14",4]
	,["\uff15",5]
	,["\uff16",6]
	,["\uff17",7]
	,["\uff18",8]
	,["\uff19",9]
	,["\u4e00",1]
	,["\u4e8c",2]
	,["\u4e09",3]
	,["\u56db",4]
	,["\u4e94",5]
	,["\u516d",6]
	,["\u4e03",7]
	,["\u516b",8]
	,["\u4e5d",9]
	];

	var coord_map = alist2map(coord_list);

	var parse_line = function(line) {
		// TODO: gen from piece_list / coord_list
		var re = /^ *(\d+) +([\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19][\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d]|\u540c)\u3000*(\u6b69|\u3068|\u9999|\u6210\u9999|\u6842|\u6210\u6842|\u9280|\u6210\u9280|\u91d1|\u89d2|\u99ac|\u98db|\u9f8d|\u7389)(\u6210?)(\u6253|\(\d\d\)) *\((.*)\/(.*)\)/;
		var matchres;
		if (matchres = line.match(re)) {
			return matchres;
		}
	};
	_kifparse.parse_line = parse_line;
})();
