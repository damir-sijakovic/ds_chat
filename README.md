# DS_Chat
#### Version 0.50 

Frontend of chat app written in javascript using my own libs. Initially 
I was trying to find a model in which code would be separated and 
organised logically so that it can be extendable in future. So after five
rewrites I've ended up with what I want. Whole thing is written c-ish 
(in the same way that I write c code) so that it can be readable by non-js programmers.


## Libs

 * ds_utilities - collection of functions
 * ds_prefs - pair with localStorage load/save options
 
## Future plans

Write server (PHP part) of code.

## Project files

 * main.js - script that gets called from  &lt;body onLoad="main()"&gt;  
 * ui.js - functions controlling interface (html dom)    
 * resolve.js - resolves events and chat commands
 * prefs.js - project preferences
 * strings.js - project strings
 * demo.js - demo functions

### Copyright and license

Damir Šijaković (c) 2019, BSD Licence 
