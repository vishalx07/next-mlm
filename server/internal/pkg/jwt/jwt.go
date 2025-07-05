package jwt

import (
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
	config "github.com/vishalx07/next-mlm/internal/config"
	cuid "github.com/vishalx07/next-mlm/internal/pkg/cuid"
	enums "github.com/vishalx07/next-mlm/internal/pkg/types/enums"
)

const APP_NAME = "grpc-auth"

type CustomClaims struct {
	Purpose enums.Session `json:"purpose"`
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
	// validate purpose
	if c.Purpose == "" {
		return errors.New("invalid token: missing purpose")
	}
	if err := c.Purpose.IsValid(); err != nil {
		return fmt.Errorf("invalid token purpose: %w", err)
	}

	return nil
}

type GenerateTokenArgs struct {
	Id      string
	Purpose enums.Session
	Expiry  time.Duration
	Env     *config.Env
}

func GenerateToken(args *GenerateTokenArgs) (string, error) {
	secretKey := []byte(args.Env.JWTSecret)

	claims := &CustomClaims{
		args.Purpose,
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

type TokenClaims struct {
	Id      string        `json:"id"`
	Purpose enums.Session `json:"purpose"`
}

type VerifyTokenArgs struct {
	Token   string
	Purpose enums.Session
	Env     *config.Env
}

func VerifyToken(args *VerifyTokenArgs) (*TokenClaims, error) {
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
		return nil, fmt.Errorf("error parsing token: %w", err)
	}
	claims, ok := token.Claims.(*CustomClaims)
	if !ok {
		return nil, errors.New("unexpected claims type in token")
	}
	if claims.Purpose != args.Purpose {
		return nil, errors.New("invalid token: purpose doesn't match")
	}
	if !token.Valid {
		return nil, errors.New("invalid token")
	}

	return &TokenClaims{claims.Subject, claims.Purpose}, nil
}
