package jwt

import (
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
	config "github.com/vishalx07/next-mlm/internal/config"
	cuid "github.com/vishalx07/next-mlm/internal/pkg/cuid"
)

const APP_NAME = "next-mlm"

type CustomClaims struct {
	jwt.RegisteredClaims
}

var _ jwt.ClaimsValidator = (*CustomClaims)(nil)

func (c *CustomClaims) Validate() error {
	// validate id
	if c.Subject == "" {
		return errors.New("invalid token: missing subject")
	}
	if err := cuid.Validate(c.Subject); err != nil {
		return fmt.Errorf("invalid token subject: %w", err)
	}

	return nil
}

type GenerateTokenArgs struct {
	Id     string
	Expiry time.Duration
	Env    *config.Env
}

func GenerateToken(args *GenerateTokenArgs) (string, error) {
	secretKey := []byte(args.Env.JWTSecret)

	claims := &CustomClaims{
		jwt.RegisteredClaims{
			Subject:   args.Id,                                         // Subject: Unique user identifier
			Issuer:    APP_NAME,                                        // Issuer: Identifies the entity that issued the token
			Audience:  jwt.ClaimStrings{args.Env.ApiUrl},               // Audience claim: Identifies the intended audience
			IssuedAt:  jwt.NewNumericDate(time.Now()),                  // Issued At: Token creation timestamp
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(args.Expiry)), // Expiration Time: Token expiration timestamp
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString(secretKey)
	if err != nil {
		return "", fmt.Errorf("failed to sign JWT: %w", err)
	}

	return signedToken, nil
}

type VerifyTokenArgs struct {
	Token string
	Env   *config.Env
}

func VerifyToken(args *VerifyTokenArgs) (id string, err error) {
	secretKey := []byte(args.Env.JWTSecret)

	token, err := jwt.ParseWithClaims(
		args.Token,
		&CustomClaims{},
		func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unsupported signing method in token: %v", token.Header["alg"])
			}

			return secretKey, nil
		},
		jwt.WithIssuer(APP_NAME),
		jwt.WithAudience(args.Env.ApiUrl),
	)

	if err != nil {
		return "", fmt.Errorf("error parsing token: %w", err)
	}
	claims, ok := token.Claims.(*CustomClaims)
	if !ok {
		return "", errors.New("unexpected claims type in token")
	}
	if !token.Valid {
		return "", errors.New("invalid token")
	}

	return claims.Subject, nil
}
