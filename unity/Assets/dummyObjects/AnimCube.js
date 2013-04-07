#pragma strict

function Start () {

}

function Update () {
	transform.Rotate(0, 10.0f*Time.deltaTime, 0);
}