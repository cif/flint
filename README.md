## What is this?
Flint started out as a project used to compile and coffeescript > javascript application, stylus > css, precompile templates etc. which is very similar to brunch.io. 
Fast forward two years. Flint supports an **express server** and complied coffeescript "responders" providing **purely isomorphic data modeling**. 
There's no reason the client and the server shouldn't **share model definitions, relationships and most importantly validation**.
Think of "responders" as simply "server side controllers". They provide a super-thin default but have the ability to behave as any other controller in a Rails or PHP app would. 
Files are watched and complied realtime into a node module just like your client-side apps compile into browser ready .js files.  
On the client side, Flint utlizes **Backbone.js, Socket.IO, Handlebars and Stylus**

## Where can I learn more?
Documentation  [available online](http://useflint.org:3030/docs/) with plenty more coming very soon!

## License
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.