#pragma strict

private var screenScale : float;

function Start () {
	// for scaling.
	screenScale		= Screen.width / 320.0f;
	var sh : float	= Screen.height / screenScale;
	
	// Set AD : 320x50 from web.
//	EasyWebview.AddWebRect("http://www.torques.jp/banner/bannerTorquesPics.html", 0, 200, 320, 50, "Banner0");
	// Set AD : 320x50 from Bundle.
EasyWebview.AddBundleWebRect("myhtml", "mybanner", "html", 0, 200, 320, 50, "Banner0");

	reloadAD();
}

function Update () {

}

function OnGUI() {
	if( GUI.Button ( Rect(0,70*screenScale, Screen.width,100*screenScale),
			"reload AD" ) ){
		reloadAD();
	}
}


function reloadAD() {
	// If AD exists, remove it.
	EasyWebview.RemoveWebRectByName("Banner1");

	// Set AD : 320x50
	EasyWebview.AddWebRect("http://www.torques.jp/banner/bannerOSSSampler.html", 0, 0, 320, 50, "Banner1");
	
}
