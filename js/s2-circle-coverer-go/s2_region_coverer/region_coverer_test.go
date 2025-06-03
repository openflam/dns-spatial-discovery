package s2_region_coverer

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

func TestS2CellsInPolygon(t *testing.T) {
	points := []LatLng{
		{Lat: 40.44429846010715, Lng: -79.94669946190957},
		{Lat: 40.44371924497608, Lng: -79.94686586366188},
		{Lat: 40.443629974816474, Lng: -79.94637211419868},
		{Lat: 40.443837579655906, Lng: -79.94627390988558},
		{Lat: 40.44432129644406, Lng: -79.94628209357846},
		{Lat: 40.44429846010715, Lng: -79.94669946190957},
	}
	minLevel := 1
	maxLevel := 23
	maxCells := 10

	expectedCellTokens := []string{
		"8834f22145", "8834f221464", "8834f22146c", "8834f22148c",
		"8834f221494", "8834f2214f", "8834f221504", "8834f22150c",
		"8834f22151c", "8834f2215b",
	}

	cellIDs, err := S2CellsInPolygon(points, minLevel, maxLevel, maxCells)
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
