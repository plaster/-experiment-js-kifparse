dist/kifparse.js: src/kifparse.js.in src/mbu.pl
	mkdir -p dist
	perl src/mbu.pl < $< > $@
