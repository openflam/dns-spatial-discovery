package s2_circle_coverer

import (
	"syscall/js"
)

// JSS2CellsInCircle is a wrapper around S2CellIDStrings to be called from JavaScript.
func JSS2CellsInCircle(this js.Value, p []js.Value) interface{} {
	// Get the center and radius from the JS arguments
	center := LatLng{
		Lat: p[0].Get("lat").Float(),
		Lng: p[0].Get("lng").Float(),
	}
	radius := p[1].Float()
	minLevel := p[2].Int()
	maxLevel := p[3].Int()
	maxCells := p[4].Int()

	// Get the covering cells
	covering, _ := S2CellsInCircle(center, radius, minLevel, maxLevel, maxCells)

	// Convert the Go slice to a JavaScript array
	coveringJsArray := js.Global().Get("Array").New(len(covering))
	for i, cell := range covering {
		coveringJsArray.SetIndex(i, js.ValueOf(cell.ToToken()))
	}

	return coveringJsArray
}
