First attempt at rendering a psd in html.

To run:

in selector.js make sure your ip is set 'var reload = io.connect('http://192.168.0.18:3002');'


navigate to root and in the console run:
npm i

in index.js add a path to a psd to the path variable.

on the console run:

node server.js

output will be in index.html


TODO:

create a utilities file for creating elements, appending elements etc.

create a server libs folder and a libs folder. libs for shared client and server files.

get components.js require working so you dont have to require everything in the uiController.js.