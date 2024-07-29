package s2_circle_coverer

import (
	"strconv"

	"github.com/golang/geo/s2"
)

func S2BinaryIDToToken(binaryId string) string {
	id, err := strconv.ParseUint(binaryId, 2, 64)
	if err != nil {
		return ""
	}
	return s2.CellID(id).ToToken()
}

func S2TokenToBinaryID(token string) string {
	id := uint64(s2.CellIDFromToken(token))
	return strconv.FormatUint(id, 2)
}
