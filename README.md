# File in Input

Upcasts an `<input type="text">` element to a widget which allows the user to select a file from the server.
It then puts the URL of that file into the input element.

This widget is intended for the Webhandle framework and works pretty seamlessly there. It will work fine in
other cases as well, but you'd have to have to set up a source of files (not too hard) for this component to
use.

## Install

```bash
npm install @webhandle/file-in-input
```

## Usage 

### Use the widget directly
Find an input element, then send it to the view

```js
import FileInInputView from '@webhandle/file-in-input/file-in-input-view.mjs'

let fileInput = document.querySelector('input.fileUrl')
let view = new FileInInputView({
	input: fileInput
})
view.render()
view.appendTo(fileInput.parentElement)

```

### Upcast everything on a page

```js
import upcastFileSelectors from '@webhandle/file-in-input'
upcastFileSelectors()
```

By default, this will select all elements like `input[data-file-dir]`. `data-file-dir` will also be
used as the starting location within the browsed file tree. (It can be the empty string.)


## Notes

It's safe to invoke the upcast multiple times, since the code sets an attribute on the input element
to mark that it has already been processed.

The original input element is absolutely positioned off the left edge of the screen when the widget
is rendered.


## Styling

It would work without styling, but looks better with.

```less
import "node_modules/@webhandle/file-in-input/less/components.less"

```
