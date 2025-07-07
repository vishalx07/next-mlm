package config

import "time"

var (
	DEFAULT_USER_ID   int32 = 1006090
	TOKEN_EXPIRE_TIME       = time.Hour * 24
	OTP_LENGTH              = 6
	OTP_EXPIRE_TIME         = time.Minute * 3
)
