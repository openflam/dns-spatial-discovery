package s2_circle_coverer

import (
	"testing"
)

func TestS2CellsInCircle(t *testing.T) {
	center := LatLng{Lat: 40.443987, Lng: -79.946361}
	radius := 50.0
	minLevel := 1
	maxLevel := 23
	maxCells := 10

	expectedCellTokens := []string{
		"8834f22145", "8834f221464", "8834f22146c", "8834f2214e4",
		"8834f2214f4", "8834f2214fc", "8834f221504", "8834f2215b",
		"8834f2215c4", "8834f2215cc",
	}

	cellIDs, err := S2CellsInCircle(center, radius, minLevel, maxLevel, maxCells)
	if err != nil {
		t.Errorf("Unexpected error: %v", err)
	}

	if len(cellIDs) != len(expectedCellTokens) {
		t.Errorf("Expected %d cell IDs, but got %d", len(expectedCellTokens), len(cellIDs))
	}

	for i, expectedCellToken := range expectedCellTokens {
		if cellIDs[i].ToToken() != expectedCellToken {
			t.Errorf("Expected cell ID %s, but got %s", expectedCellToken, cellIDs[i].ToToken())
		}
	}
}
