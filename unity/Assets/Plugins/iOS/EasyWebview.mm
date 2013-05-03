// Easy Webview integration plug-in for Unity iOS.

#import <Foundation/Foundation.h>
#import "UIBannerWebView.h"

extern UIViewController *UnityGetGLViewController(); // Root view controller of Unity screen.

#pragma mark Plug-in Functions

// for easy using (from web).
extern "C" void _WebViewPluginAddWebRect(const char* url,
		int left, int top, int width, int height,
		bool isClearCache,
		int tagTarget )
{
	UIViewController *rootViewController = UnityGetGLViewController();
	UIBannerWebView*  wv;
	if( tagTarget > 0 ){
		wv	= (UIBannerWebView*)[rootViewController.view viewWithTag:tagTarget];
	}

	if( wv == nil ){
		// create.
		NSLog( @"Create UIWebView for %d", tagTarget );
		wv = [[UIBannerWebView alloc] initWithFrame:rootViewController.view.frame];
		wv.hidden = NO;
		wv.tag	= tagTarget;
		[rootViewController.view addSubview:wv];
	}
	else{
		NSLog( @"Found UIWebView for %d", tagTarget );
	}

	// set the frame.
	wv.frame = CGRectMake(left, top, width, height);

	// load.
	if (isClearCache) {
		[[NSURLCache sharedURLCache] removeAllCachedResponses];
	}
	[wv loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:[NSString stringWithUTF8String:url]]]];
	
//	[wv autorelease];
	
	// delegate.
	wv.delegate	= wv;
}

// for easy using (from bundle).
extern "C" void _WebViewPluginAddBundleWebRect(
		const char* pathname, const char* filename, const char* filetype,
		int left, int top, int width, int height,
		bool isClearCache,
		int tagTarget )
{
	UIViewController *rootViewController = UnityGetGLViewController();
	UIBannerWebView*  wv;
	if( tagTarget > 0 ){
		wv	= (UIBannerWebView*)[rootViewController.view viewWithTag:tagTarget];
	}

	if( wv == nil ){
		// create.
		NSLog( @"Create UIWebView for %d", tagTarget );
		wv = [[UIBannerWebView alloc] initWithFrame:rootViewController.view.frame];
		wv.hidden = NO;
		wv.tag	= tagTarget;
		[rootViewController.view addSubview:wv];
	}
	else{
		NSLog( @"Found UIWebView for %d", tagTarget );
	}

	// set the frame.
	wv.frame = CGRectMake(left, top, width, height);

	NSString*	strPathname	= [NSString stringWithCString:pathname encoding:NSUTF8StringEncoding];
	NSString*	strFilename	= [NSString stringWithCString:filename encoding:NSUTF8StringEncoding];
	NSString*	strFiletype	= [NSString stringWithCString:filetype encoding:NSUTF8StringEncoding];
	NSString* path	= [[NSBundle mainBundle] pathForResource:strFilename
											ofType:strFiletype
											inDirectory:strPathname];

	// load.
	if (isClearCache) {
		[[NSURLCache sharedURLCache] removeAllCachedResponses];
	}
	[wv loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:path]]];
	
//	[wv autorelease];
	
	// delegate.
	wv.delegate	= wv;
}

// for easy using (to remove).
extern "C" void _WebViewPluginRemoveByTag( int tagTarget )
{
	UIViewController *rootViewController = UnityGetGLViewController();
	UIView*	targetView	= [rootViewController.view viewWithTag:tagTarget];
	[targetView removeFromSuperview];
}
