#pragma strict

// Easy Webview integration plug-in for Unity iOS.
// Torques Inc.

import System.Runtime.InteropServices;

private static var isClearCache : boolean;

private var lastRequestedUrl : String;
private var loadRequest : boolean;

private static var	dicViews : Hashtable;	// 名前とTag(int > 0)の対応辞書.

/**
 *	指定名のタグ(int)
 *	@return	0：未定義, 1..：存在するタグ.
 */
static function getTagForName( viewname : String ){
	if( dicViews ){
		if( dicViews.ContainsKey(viewname) ){
			return dicViews[viewname];
		}
		else{
			return 0;	// 未定義.
		}
	}
	else{
		dicViews	= new Hashtable();
		return 0;	// 未定義.
	}
}

/**
 *	指定名のタグを生成.
 */
static function createNewTagForName( viewname : String ){
	var cand : int	= 10;	// 候補.
	for (var key : String in dicViews.Keys ) {
		var cTag : int	= dicViews[key];
		if( cand <= cTag ){
			cand	= cTag+1;	// 最大値より1だけ大きく.
		}
	}
	if( !dicViews ){
		dicViews	= new Hashtable();
	}
	dicViews[viewname] = cand;	// add.
	Debug.Log( "createNewTagForName -- ["+cand.ToString()+"]("+viewname+")" );
	return cand;
}

#if UNITY_EDITOR
// Unity Editor implementation.

static function AddWebRect( url : String, left : int, top: int, width : int, height : int, viewname : String) {
	// not implemented.
}
static function AddBundleWebRect(
	pathname : String, filename : String, filetype : String,
	left : int, top: int, width : int, height : int,
	viewname : String ){
	// not implemented.
}
static function RemoveWebRectByName( viewname : String ){
	// not implemented.
}

#elif UNITY_IPHONE
// iOS platform implementation.

@DllImportAttribute("__Internal") static private function _WebViewPluginAddWebRect(url : String, left : int, top : int, width : int, height : int, isClearCache : boolean, tagTarget : int) {}
@DllImportAttribute("__Internal") static private function _WebViewPluginAddBundleWebRect(pathname : String, filename : String, filetype : String, left : int, top : int, width : int, height : int, isClearCache : boolean, tagTarget : int) {}
@DllImportAttribute("__Internal") static private function _WebViewPluginRemoveByTag(tagTarget : int) {}

// for easy using (from web).
static function AddWebRect( url : String,
	left : int, top: int, width : int, height : int,
	viewname : String )
{
	Debug.Log( "AddWebRect" );
	
	var tagTarget : int	= getTagForName( viewname );
	if( tagTarget <= 0 ){
		tagTarget	= createNewTagForName( viewname );	// create and set.
	}
	_WebViewPluginAddWebRect(url, left, top, width, height, true, tagTarget);
}

// for easy using (from bundle).
// @param pathname (/Assets/StreamingAssets/)pathname(/filename.html)
// @param filename (path/)filename(.html)
// @param filetype (filename).html
static function AddBundleWebRect(
	pathname : String, filename : String, filetype : String,
	left : int, top: int, width : int, height : int,
	viewname : String )
{
	Debug.Log( "AddBundleWebRect" );
	
	var tagTarget : int	= getTagForName( viewname );
	if( tagTarget <= 0 ){
		tagTarget	= createNewTagForName( viewname );	// create and set.
	}
	_WebViewPluginAddBundleWebRect("Data/Raw/"+pathname, filename, filetype,
		left, top, width, height, true, tagTarget);
}

// for easy using (to remove).
static function RemoveWebRectByName( viewname : String )
{
	Debug.Log( "RemoveWebRectByName" );
	var tagTarget : int	= getTagForName( viewname );
	if( tagTarget <= 0 ){
		// not found.
	}
	else{
		_WebViewPluginRemoveByTag( tagTarget );
	}
}

#elif UNITY_ANDROID
// Android platform implementation.

// for easy using.
static function AddWebRect( url : String, left : int, top: int, width : int, height : int, viewname : String) {
	// not implemented.
}
static function AddBundleWebRect(
	pathname : String, filename : String, filetype : String,
	left : int, top: int, width : int, height : int,
	viewname : String ){
	// not implemented.
}
static function RemoveWebRectByName( viewname : String )
{
	// not implemented.
}

#endif
