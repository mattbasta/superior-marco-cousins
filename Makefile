all: dart

dart:
	dart2js script/main.dart -o main.js
