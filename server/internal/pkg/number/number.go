package number

import (
	"log"
	"math/rand"
	"time"
)

// random number
var globalRand *rand.Rand = rand.New(rand.NewSource(time.Now().UnixNano()))

func GenerateRandomNumber(max int) int {
	if max <= 0 {
		log.Fatal("Maximum value must be a positive integer.")
	}
	return globalRand.Intn(max) + 1
}

func GenerateRandomNumberInRange(min, max int) int {
	if min > max {
		log.Fatal("Minimum value cannot be greater than maximum value.")
	}
	return globalRand.Intn(max-min+1) + min
}

func GenerateRandomNumberOfDigits(length int) int {
	if length <= 0 {
		log.Fatal("Length must be a positive integer.")
	}
	min := intPow(10, length-1)
	max := intPow(10, length) - 1
	return GenerateRandomNumberInRange(min, max)
}

func intPow(base, exp int) int {
	result := 1
	for exp > 0 {
		if exp%2 == 1 {
			result *= base
		}
		base *= base
		exp /= 2
	}
	return result
}
