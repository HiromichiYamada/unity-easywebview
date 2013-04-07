//
//  UIBannerWebView.m
//
//  Created by Torques Inc. on 13/03/29.
//
//

#import "UIBannerWebView.h"

@implementation UIBannerWebView

- (id)initWithFrame:(CGRect)frame
{
	self = [super initWithFrame:frame];
	if (self) {
		// Initialization code
	}
	return self;
}

/*
 // Only override drawRect: if you perform custom drawing.
 // An empty implementation adversely affects performance during animation.
 - (void)drawRect:(CGRect)rect
 {
 // Drawing code
 }
 */

//http://stackoverflow.com/questions/2899699/uiwebview-open-links-in-safari

-(BOOL) webView:(UIWebView *)inWeb
shouldStartLoadWithRequest:(NSURLRequest *)inRequest
 navigationType:(UIWebViewNavigationType)inType
{
	if ( inType == UIWebViewNavigationTypeLinkClicked )
	{
		[[UIApplication sharedApplication] openURL:[inRequest URL]];
		return NO;
	}
	
	return YES;
}

@end
