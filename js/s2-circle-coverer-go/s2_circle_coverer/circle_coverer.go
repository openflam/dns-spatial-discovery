// Code inspired by code in: https://github.com/akhenakh/ws2

package s2_circle_coverer

import (
	"errors"
	"math"

	"github.com/golang/geo/s2"
)

// LatLng represents a latitude and longitude.
type LatLng struct {
	Lat, Lng float64
}

const earthCircumferenceMeter = 40075017

func s2RadialAreaMeters(radius float64) float64 {
	r := (radius / earthCircumferenceMeter) * math.Pi * 2
	return math.Pi * r * r
}

// S2CellsInCircle takes a LatLng as center and the radius of the circle
// and returns a list of S2 Cell IDs that cover the circle.
func S2CellsInCircle(center LatLng, radius float64, minLevel, maxLevel, maxCells int) ([]s2.CellID, error) {
	if minLevel < 0 || minLevel > 30 {
		return nil, errors.New("minLevel must be between 0 and 30")
	}
	if radius < 0 {
		return nil, errors.New("radius must be positive")
	}

	// Convert LatLng points to s2.Point
	centerPoint := s2.PointFromLatLng(s2.LatLngFromDegrees(center.Lat, center.Lng))
	cap := s2.CapFromCenterArea(centerPoint, s2RadialAreaMeters(radius))

	// Create a RegionCoverer
	rc := &s2.RegionCoverer{
		MinLevel: minLevel,
		MaxLevel: maxLevel,
		MaxCells: maxCells,
	}
	// Get the covering cells
	covering := rc.InteriorCovering(cap)

	if len(covering) == 0 {
		// Sometimes for small radius, the internal covering is empty.
		// because of the maxLevel. In this case we use the external covering.
		covering = rc.Covering(cap)
	}

	return covering, nil
}
