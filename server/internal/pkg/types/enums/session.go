package enums

import "fmt"

type Session string

const (
	Session_USER_SESSION  Session = "x-session"
	Session_ADMIN_SESSION Session = "x-admin-session"
)

var VaildSessions = []Session{Session_USER_SESSION, Session_ADMIN_SESSION}

func (s Session) String() string {
	return string(s)
}

func (s Session) IsValid() error {
	for _, session := range VaildSessions {
		if s == session {
			return nil
		}
	}
	return fmt.Errorf("invalid session value: %s", s)
}
