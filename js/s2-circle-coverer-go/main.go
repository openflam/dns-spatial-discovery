package main

import (
	"syscall/js"

	"github.com/openvps/dns-spatial-discovery/js/s2-circle-coverer-go/js_wrapper"
)

func main() {
	c := make(chan struct{}, 0)
	js.Global().Set("s2CircleCovererGo", js.FuncOf(js_wrapper.JSS2CellsInCircle))
	js.Global().Set("s2BinaryIDToTokenGo", js.FuncOf(js_wrapper.JSS2BinaryIDToToken))
	js.Global().Set("s2TokenToBinaryIDGo", js.FuncOf(js_wrapper.JSS2TokenToBinaryID))
	<-c
}
