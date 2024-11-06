package js_wrapper

import (
	"syscall/js"

	"github.com/openflam/dns-spatial-discovery/js/s2-circle-coverer-go/s2_circle_coverer"
	"github.com/openflam/dns-spatial-discovery/js/s2-circle-coverer-go/s2_utils"
)

// JSS2CellsInCircle is a wrapper around S2CellIDStrings to be called from JavaScript.
func JSS2CellsInCircle(this js.Value, p []js.Value) interface{} {
	// Get the center and radius from the JS arguments
	center := s2_circle_coverer.LatLng{
		Lat: p[0].Get("lat").Float(),
		Lng: p[0].Get("lng").Float(),
	}
	radius := p[1].Float()
	minLevel := p[2].Int()
	maxLevel := p[3].Int()
	maxCells := p[4].Int()

	// Get the covering cells
	covering, _ := s2_circle_coverer.S2CellsInCircle(center, radius, minLevel, maxLevel, maxCells)

	// Convert the Go slice to a JavaScript array
	coveringJsArray := js.Global().Get("Array").New(len(covering))
	for i, cell := range covering {
		coveringJsArray.SetIndex(i, js.ValueOf(cell.ToToken()))
	}

	return coveringJsArray
}

// JSS2BinaryIDToToken is a wrapper around S2BinaryIDToToken to be called from JavaScript.
func JSS2BinaryIDToToken(this js.Value, p []js.Value) interface{} {
	binaryID := p[0].String()
	return s2_utils.S2BinaryIDToToken(binaryID)
}

// JSS2TokenToBinaryID is a wrapper around S2TokenToBinaryID to be called from JavaScript.
func JSS2TokenToBinaryID(this js.Value, p []js.Value) interface{} {
	token := p[0].String()
	return s2_utils.S2TokenToBinaryID(token)
}
