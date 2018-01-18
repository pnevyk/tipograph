## Notes

* All transformations are shown for english. It might differ for other languages.
* Non-breaking space is represented as ⍽ character.

# hyphens

<table>
<thead><tr><th>Description</th><th>Input</th><th>Output</th></tr></thead>
<tbody>
<tr><td>two consecutive hyphens surrounded by whitespaces into en dash</td><td>lorem -- ipsum</td><td>lorem – ipsum</td></tr>
<tr><td>keep two consecutive hyphens if not surrounded by whitespaces</td><td>lorem--ipsum --dolor</td><td>lorem–ipsum –dolor</td></tr>
<tr><td>three consecutive hyphens into em dash</td><td>lorem --- ipsum---dolor</td><td>lorem — ipsum — dolor</td></tr>
<tr><td>three consecutive hyphens at the end of line or input into em dash</td><td>lorem ipsum---<br />lorem ipsum---</td><td>lorem ipsum —<br />lorem ipsum —</td></tr>
<tr><td>hyphen surrounded by whitespaces into em dash</td><td>lorem - ipsum</td><td>lorem — ipsum</td></tr>
<tr><td>keep hyphen if not surrounded by whitespaces</td><td>lorem-ipsum -dolor</td><td>lorem-ipsum -dolor</td></tr>
<tr><td>hyphen surrounded by numbers into en dash</td><td>1-5</td><td>1–5</td></tr>
<tr><td>take only word spaces as possible whitespaces in hypen to dash rule</td><td>lorem -<br />ipsum lorem<br />- ipsum</td><td>lorem -<br />ipsum lorem<br />- ipsum</td></tr>
</tbody>
</table>

# math

<table>
<thead><tr><th>Description</th><th>Input</th><th>Output</th></tr></thead>
<tbody>
<tr><td>minus sign between numbers</td><td>3 - 2</td><td>3 − 2</td></tr>
<tr><td>minus sign right before number</td><td>-1</td><td>−1</td></tr>
<tr><td>multiplication sign between numbers</td><td>2 x 3 2x3 2 * 3 2*3</td><td>2 × 3 2x3 2 × 3 2*3</td></tr>
<tr><td>division sign between numbers</td><td>2 / 3 2/3</td><td>2 ÷ 3 2/3</td></tr>
<tr><td>plusminus sign</td><td>+- + -</td><td>± + -</td></tr>
<tr><td>inequality sign</td><td>!= ! =</td><td>≠ ! =</td></tr>
<tr><td>plusminus sign before number</td><td>+-3</td><td>±3</td></tr>
</tbody>
</table>

# quotes

<table>
<thead><tr><th>Description</th><th>Input</th><th>Output</th></tr></thead>
<tbody>
<tr><td>double straight quotes into curly quotes</td><td>"lorem ipsum"</td><td>“lorem ipsum”</td></tr>
<tr><td>double straight quotes inside parentheses into curly quotes</td><td>("lorem ipsum")</td><td>(“lorem ipsum”)</td></tr>
<tr><td>keep double straight quotes if they are not in a pair</td><td>"lorem ipsum</td><td>"lorem ipsum</td></tr>
<tr><td>keep double straight quotes if they do not represent actual quotes</td><td>" lorem ipsum"</td><td>" lorem ipsum"</td></tr>
<tr><td>keep double straight quotes if they are not in a pair</td><td>"lorem ipsum</td><td>"lorem ipsum</td></tr>
<tr><td>multiple double straight quotes into curly quotes</td><td>"lorem" "ipsum"</td><td>“lorem” “ipsum”</td></tr>
<tr><td>single straight quotes into curly quotes</td><td>'lorem ipsum'</td><td>‘lorem ipsum’</td></tr>
<tr><td>single straight quotes inside parentheses into curly quotes</td><td>('lorem ipsum')</td><td>(‘lorem ipsum’)</td></tr>
<tr><td>keep single straight quotes if they are not in a pair</td><td>'lorem ipsum</td><td>'lorem ipsum</td></tr>
<tr><td>keep single straight quotes if they are not in a pair</td><td>'lorem' ipsum'</td><td>‘lorem’ ipsum'</td></tr>
<tr><td>keep single straight quotes if they do not represent actual quotes</td><td>' lorem ipsum'</td><td>' lorem ipsum'</td></tr>
<tr><td>multiple single straight quotes into curly quotes</td><td>'lorem' 'ipsum'</td><td>‘lorem’ ‘ipsum’</td></tr>
<tr><td>two consecutive commas into double double open down quote if a matching quote is found</td><td>,,lorem" ,,ipsum''</td><td>„lorem” „ipsum”</td></tr>
<tr><td>keep two consecutive commas if no matching quote is found</td><td>lorem ,,ipsum</td><td>lorem ,,ipsum</td></tr>
<tr><td>comma into single open down quote in certain cases if a matching quote is found</td><td>lorem ,ipsum'</td><td>lorem ‚ipsum’</td></tr>
<tr><td>keep comma if it is probably comma</td><td>lorem, ipsum' lorem,ipsum' ,lorem</td><td>lorem, ipsum' lorem,ipsum' ,lorem</td></tr>
<tr><td>double straight quote after number into double prime (inch symbol)</td><td>123"</td><td>123″</td></tr>
<tr><td>single straight quote after number into single prime (foot symbol)</td><td>123'</td><td>123′</td></tr>
<tr><td>single straight quote between two letters into apostrophe</td><td>it's</td><td>it’s</td></tr>
<tr><td>single straight quote between two letters into apostrophe inside of single curly quotes</td><td>'it's'</td><td>‘it’s’</td></tr>
<tr><td>mixed single and double straight quotes also with apostrophes in various contexts</td><td>I wasn't a particular fan of the music in the '80s. And then she blurted, "I thought you said, 'I don't like '80s music'?"</td><td>I wasn’t a particular fan of the music in the ’80s. And then she blurted, “I thought you said, ‘I don’t like ’80s music’?”</td></tr>
</tbody>
</table>

# spaces

<table>
<thead><tr><th>Description</th><th>Input</th><th>Output</th></tr></thead>
<tbody>
<tr><td>trim multiple spaces into single one</td><td>lorem  ipsum dolor</td><td>lorem ipsum dolor</td></tr>
<tr><td>non-breaking space after paragraph symbol</td><td>¶ </td><td>¶<span style="font-size: 75%; opacity: 0.5">⍽</span></td></tr>
<tr><td>non-breaking space after section symbol</td><td>§ </td><td>§<span style="font-size: 75%; opacity: 0.5">⍽</span></td></tr>
<tr><td>non-breaking space after copyright symbol</td><td>© </td><td>©<span style="font-size: 75%; opacity: 0.5">⍽</span></td></tr>
<tr><td>non-breaking space after trademark symbol</td><td>™ </td><td>™<span style="font-size: 75%; opacity: 0.5">⍽</span></td></tr>
<tr><td>non-breaking space after registered trademark symbol</td><td>® </td><td>®<span style="font-size: 75%; opacity: 0.5">⍽</span></td></tr>
</tbody>
</table>

# symbols

<table>
<thead><tr><th>Description</th><th>Input</th><th>Output</th></tr></thead>
<tbody>
<tr><td>copyright</td><td>(c)  (c)  (C)  2(c)  2(C)  (c)</td><td>©<span style="font-size: 75%; opacity: 0.5">⍽</span> ©<span style="font-size: 75%; opacity: 0.5">⍽</span> ©<span style="font-size: 75%; opacity: 0.5">⍽</span> 2(c)  2(C)  ©<span style="font-size: 75%; opacity: 0.5">⍽</span></td></tr>
<tr><td>trademark</td><td>(tm)(tm) (TM)(TM) </td><td>™<span style="font-size: 75%; opacity: 0.5">⍽</span>™<span style="font-size: 75%; opacity: 0.5">⍽</span>™<span style="font-size: 75%; opacity: 0.5">⍽</span>™<span style="font-size: 75%; opacity: 0.5">⍽</span></td></tr>
<tr><td>registered trademark</td><td>(r)(r) (R)(R) </td><td>®<span style="font-size: 75%; opacity: 0.5">⍽</span>®<span style="font-size: 75%; opacity: 0.5">⍽</span>®<span style="font-size: 75%; opacity: 0.5">⍽</span>®<span style="font-size: 75%; opacity: 0.5">⍽</span></td></tr>
<tr><td>ellipsis</td><td>... a...z .... ......</td><td>… a…z .... ......</td></tr>
<tr><td>arrows</td><td><- -></td><td>← →</td></tr>
</tbody>
</table>

