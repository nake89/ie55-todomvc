

Reading material to develop for IE 5.5
- https://www.w3.org/TR/html4/
- https://www.w3.org/TR/CSS1/
- https://www-archive.mozilla.org/js/language/E262-3.pdf
- https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html
- https://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/ecma-script-language-binding.html
- https://johnresig.com/projects/flexible-javascript-events/
- https://docs.oracle.com/cd/E19957-01/816-6408-10/handlers.htm
- https://web.archive.org/web/20081122054907/https://msdn.microsoft.com/en-us/library/ms533051
- https://learn.microsoft.com/en-us/previous-versions//ms531079(v=vs.85)?redirectedfrom=MSDN
- https://blog.jquery.com/2006/08/26/jquery-10/
- https://releases.jquery.com/jquery/#jquery-all-1.x
- https://web.archive.org/web/20061031140510/http://jquery.com/
- https://en.wikipedia.org/wiki/JScript
- https://www-archive.mozilla.org/js/js15.html
- https://docstore.mik.ua/orelly/webprog/jscript/ch17_01.htm
- https://stackoverflow.com/questions/524696/how-to-create-a-style-tag-with-javascript
- http://www.richinstyle.com/bugs/ie5.html
- http://www.javascriptkit.com/cutpastejava.shtml
- https://web.archive.org/web/20050703022222/http://javascript.internet.com/
- https://www.adoma.cdc-habitat.fr/core/crossbrowser_rte/demo.php
- https://premiumsoftware.net/cleditor/
- https://web.archive.org/web/20080221054224/http://batiste.dosimple.ch/blog/posts/2007-09-11-1/rich-text-editor-jquery.html
- https://stackoverflow.com/questions/5127409/do-ie-browsers-ie6-7-8-support-font-face
- https://www.kirsle.net/wizards/embedded-fonts.html
- http://www.quirksmode.org/js/keys.html
- https://stackoverflow.com/questions/171542/proper-ie6-html-element-dimensions

# Notes

I incorrectly thought that IE 5.5 did not support document.getElementById.
Because it was said that it was only supported since DOM LEVEL 2.
Here: https://www.w3schools.com/jsref/met_document_getelementbyid.asp
I emailed them to fix it.
Also jQuery 1.0 uses document.getElementById. And it supported IE5.5
It also used innerHTML. But I have yet to read more about that.
jQuery 1.0 also seems to use the style to dynamically set styles.
I might be mistaken about this. I need to read the source more.
But this is a DOM 2 feature. But it is of course possible that IE5.5 already
implemented some DOM 2 features.

