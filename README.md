unity-easywebview
=================

A native plugin for Unity to implement the UIWebView easily.

# Introduction

unity-easywebview is a native plugin for using webview easily.
It works on iOS only.

unity-easywebview is based on "unity-webview-integration" https://github.com/keijiro/unity-webview-integration .

# How to use

## Add WebView

```js
static function AddWebRect( url : String, left : int, top: int, width : int, height : int, viewname : String );
```

## Remove WebView

```js
static function RemoveWebRectByName(viewname : String);
```

# Example

```js
// add AD area for the title scene.
EasyWebview.RemoveWebRectByName("http://url/to/ad.html", 0, 0, 320, 50, "AD-for-Title");

// remove AD area for the title scene.
EasyWebview.RemoveWebRectByName("AD-for-Title");
```

# License

MIT License

Copyright (C) 2013 Torques Inc.
Copyright (C) 2011 Keijiro Takahashi

This software is provided 'as-is', without any express or implied warranty. In no event will the authors be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
2. Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
3. This notice may not be removed or altered from any source distribution.
