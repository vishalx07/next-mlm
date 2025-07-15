package enums

import (
	"database/sql/driver"
	"fmt"
)

type OtpPurpose string

const (
	OtpPurpose_LOGIN           OtpPurpose = "LOGIN"
	OtpPurpose_REGISTER        OtpPurpose = "REGISTER"
	OtpPurpose_FORGOT_PASSWORD OtpPurpose = "FORGOT_PASSWORD"
)

func (o OtpPurpose) String() string {
	return string(o)
}

func (r *OtpPurpose) Scan(src interface{}) error {
	switch v := src.(type) {
	case []byte:
		*r = OtpPurpose(v)
		return nil
	case string:
		*r = OtpPurpose(v)
		return nil
	default:
		return fmt.Errorf("OtpPurpose: cannot scan %T", src)
	}
}

func (r OtpPurpose) Value() (driver.Value, error) {
	return string(r), nil
}
