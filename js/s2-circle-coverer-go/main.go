package main

import (
	"syscall/js"

	"github.com/openvps/dns-spatial-discovery/js/s2-circle-coverer-go/s2_circle_coverer"
)

func main() {
	c := make(chan struct{}, 0)
	js.Global().Set("s2CircleCovererGo", js.FuncOf(s2_circle_coverer.JSS2CellsInCircle))
	<-c
}
