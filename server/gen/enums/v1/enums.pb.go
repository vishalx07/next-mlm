// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.36.6
// 	protoc        (unknown)
// source: enums/v1/enums.proto

package enumsv1

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
	unsafe "unsafe"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type UserRole int32

const (
	UserRole_USER_ROLE_UNSPECIFIED UserRole = 0
	UserRole_USER_ROLE_USER        UserRole = 1
	UserRole_USER_ROLE_ADMIN       UserRole = 2
)

// Enum value maps for UserRole.
var (
	UserRole_name = map[int32]string{
		0: "USER_ROLE_UNSPECIFIED",
		1: "USER_ROLE_USER",
		2: "USER_ROLE_ADMIN",
	}
	UserRole_value = map[string]int32{
		"USER_ROLE_UNSPECIFIED": 0,
		"USER_ROLE_USER":        1,
		"USER_ROLE_ADMIN":       2,
	}
)

func (x UserRole) Enum() *UserRole {
	p := new(UserRole)
	*p = x
	return p
}

func (x UserRole) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (UserRole) Descriptor() protoreflect.EnumDescriptor {
	return file_enums_v1_enums_proto_enumTypes[0].Descriptor()
}

func (UserRole) Type() protoreflect.EnumType {
	return &file_enums_v1_enums_proto_enumTypes[0]
}

func (x UserRole) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use UserRole.Descriptor instead.
func (UserRole) EnumDescriptor() ([]byte, []int) {
	return file_enums_v1_enums_proto_rawDescGZIP(), []int{0}
}

type UserStatus int32

const (
	UserStatus_USER_STATUS_UNSPECIFIED UserStatus = 0
	UserStatus_USER_STATUS_ACTIVE      UserStatus = 1
	UserStatus_USER_STATUS_BLOCKED     UserStatus = 2
)

// Enum value maps for UserStatus.
var (
	UserStatus_name = map[int32]string{
		0: "USER_STATUS_UNSPECIFIED",
		1: "USER_STATUS_ACTIVE",
		2: "USER_STATUS_BLOCKED",
	}
	UserStatus_value = map[string]int32{
		"USER_STATUS_UNSPECIFIED": 0,
		"USER_STATUS_ACTIVE":      1,
		"USER_STATUS_BLOCKED":     2,
	}
)

func (x UserStatus) Enum() *UserStatus {
	p := new(UserStatus)
	*p = x
	return p
}

func (x UserStatus) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (UserStatus) Descriptor() protoreflect.EnumDescriptor {
	return file_enums_v1_enums_proto_enumTypes[1].Descriptor()
}

func (UserStatus) Type() protoreflect.EnumType {
	return &file_enums_v1_enums_proto_enumTypes[1]
}

func (x UserStatus) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use UserStatus.Descriptor instead.
func (UserStatus) EnumDescriptor() ([]byte, []int) {
	return file_enums_v1_enums_proto_rawDescGZIP(), []int{1}
}

type AuthProvider int32

const (
	AuthProvider_AUTH_PROVIDER_UNSPECIFIED    AuthProvider = 0
	AuthProvider_AUTH_PROVIDER_EMAIL_PASSWORD AuthProvider = 1
	AuthProvider_AUTH_PROVIDER_GOOGLE         AuthProvider = 2
	AuthProvider_AUTH_PROVIDER_LINKEDIN       AuthProvider = 3
)

// Enum value maps for AuthProvider.
var (
	AuthProvider_name = map[int32]string{
		0: "AUTH_PROVIDER_UNSPECIFIED",
		1: "AUTH_PROVIDER_EMAIL_PASSWORD",
		2: "AUTH_PROVIDER_GOOGLE",
		3: "AUTH_PROVIDER_LINKEDIN",
	}
	AuthProvider_value = map[string]int32{
		"AUTH_PROVIDER_UNSPECIFIED":    0,
		"AUTH_PROVIDER_EMAIL_PASSWORD": 1,
		"AUTH_PROVIDER_GOOGLE":         2,
		"AUTH_PROVIDER_LINKEDIN":       3,
	}
)

func (x AuthProvider) Enum() *AuthProvider {
	p := new(AuthProvider)
	*p = x
	return p
}

func (x AuthProvider) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (AuthProvider) Descriptor() protoreflect.EnumDescriptor {
	return file_enums_v1_enums_proto_enumTypes[2].Descriptor()
}

func (AuthProvider) Type() protoreflect.EnumType {
	return &file_enums_v1_enums_proto_enumTypes[2]
}

func (x AuthProvider) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use AuthProvider.Descriptor instead.
func (AuthProvider) EnumDescriptor() ([]byte, []int) {
	return file_enums_v1_enums_proto_rawDescGZIP(), []int{2}
}

var File_enums_v1_enums_proto protoreflect.FileDescriptor

const file_enums_v1_enums_proto_rawDesc = "" +
	"\n" +
	"\x14enums/v1/enums.proto\x12\benums.v1*N\n" +
	"\bUserRole\x12\x19\n" +
	"\x15USER_ROLE_UNSPECIFIED\x10\x00\x12\x12\n" +
	"\x0eUSER_ROLE_USER\x10\x01\x12\x13\n" +
	"\x0fUSER_ROLE_ADMIN\x10\x02*Z\n" +
	"\n" +
	"UserStatus\x12\x1b\n" +
	"\x17USER_STATUS_UNSPECIFIED\x10\x00\x12\x16\n" +
	"\x12USER_STATUS_ACTIVE\x10\x01\x12\x17\n" +
	"\x13USER_STATUS_BLOCKED\x10\x02*\x85\x01\n" +
	"\fAuthProvider\x12\x1d\n" +
	"\x19AUTH_PROVIDER_UNSPECIFIED\x10\x00\x12 \n" +
	"\x1cAUTH_PROVIDER_EMAIL_PASSWORD\x10\x01\x12\x18\n" +
	"\x14AUTH_PROVIDER_GOOGLE\x10\x02\x12\x1a\n" +
	"\x16AUTH_PROVIDER_LINKEDIN\x10\x03B\x8f\x01\n" +
	"\fcom.enums.v1B\n" +
	"EnumsProtoP\x01Z2github.com/vishalx07/next-mlm/gen/enums/v1;enumsv1\xa2\x02\x03EXX\xaa\x02\bEnums.V1\xca\x02\bEnums\\V1\xe2\x02\x14Enums\\V1\\GPBMetadata\xea\x02\tEnums::V1b\x06proto3"

var (
	file_enums_v1_enums_proto_rawDescOnce sync.Once
	file_enums_v1_enums_proto_rawDescData []byte
)

func file_enums_v1_enums_proto_rawDescGZIP() []byte {
	file_enums_v1_enums_proto_rawDescOnce.Do(func() {
		file_enums_v1_enums_proto_rawDescData = protoimpl.X.CompressGZIP(unsafe.Slice(unsafe.StringData(file_enums_v1_enums_proto_rawDesc), len(file_enums_v1_enums_proto_rawDesc)))
	})
	return file_enums_v1_enums_proto_rawDescData
}

var file_enums_v1_enums_proto_enumTypes = make([]protoimpl.EnumInfo, 3)
var file_enums_v1_enums_proto_goTypes = []any{
	(UserRole)(0),     // 0: enums.v1.UserRole
	(UserStatus)(0),   // 1: enums.v1.UserStatus
	(AuthProvider)(0), // 2: enums.v1.AuthProvider
}
var file_enums_v1_enums_proto_depIdxs = []int32{
	0, // [0:0] is the sub-list for method output_type
	0, // [0:0] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_enums_v1_enums_proto_init() }
func file_enums_v1_enums_proto_init() {
	if File_enums_v1_enums_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: unsafe.Slice(unsafe.StringData(file_enums_v1_enums_proto_rawDesc), len(file_enums_v1_enums_proto_rawDesc)),
			NumEnums:      3,
			NumMessages:   0,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_enums_v1_enums_proto_goTypes,
		DependencyIndexes: file_enums_v1_enums_proto_depIdxs,
		EnumInfos:         file_enums_v1_enums_proto_enumTypes,
	}.Build()
	File_enums_v1_enums_proto = out.File
	file_enums_v1_enums_proto_goTypes = nil
	file_enums_v1_enums_proto_depIdxs = nil
}
