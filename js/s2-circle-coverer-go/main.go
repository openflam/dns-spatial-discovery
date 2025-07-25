package main

import (
	"syscall/js"

	"github.com/openflam/dns-spatial-discovery/js/s2-circle-coverer-go/js_wrapper"
)

func main() {
	c := make(chan struct{})
	js.Global().Set("s2CircleCovererGo", js.FuncOf(js_wrapper.JSS2CellsInCircle))
	js.Global().Set("s2PolygonCovererGo", js.FuncOf(js_wrapper.JSS2CellsInPolygon))
	js.Global().Set("s2BinaryIDToTokenGo", js.FuncOf(js_wrapper.JSS2BinaryIDToToken))
	js.Global().Set("s2TokenToBinaryIDGo", js.FuncOf(js_wrapper.JSS2TokenToBinaryID))
	<-c
}
