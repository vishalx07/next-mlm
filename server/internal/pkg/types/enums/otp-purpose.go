package enums

type OtpPurpose string

const (
	OtpPurpose_LOGIN           OtpPurpose = "LOGIN"
	OtpPurpose_REGISTER        OtpPurpose = "REGISTER"
	OtpPurpose_FORGOT_PASSWORD OtpPurpose = "FORGOT_PASSWORD"
)

func (r OtpPurpose) String() string {
	return string(r)
}
