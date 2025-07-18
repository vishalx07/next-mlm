// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.36.6
// 	protoc        (unknown)
// source: types/v1/user.proto

package typesv1

import (
	v1 "github.com/vishalx07/next-mlm/gen/enums/v1"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	timestamppb "google.golang.org/protobuf/types/known/timestamppb"
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

type User struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	Id            string                 `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	UserId        int32                  `protobuf:"varint,2,opt,name=user_id,json=userId,proto3" json:"user_id,omitempty"`
	Fullname      string                 `protobuf:"bytes,3,opt,name=fullname,proto3" json:"fullname,omitempty"`
	Email         string                 `protobuf:"bytes,4,opt,name=email,proto3" json:"email,omitempty"`
	Role          v1.UserRole            `protobuf:"varint,5,opt,name=role,proto3,enum=enums.v1.UserRole" json:"role,omitempty"`
	Status        v1.UserStatus          `protobuf:"varint,6,opt,name=status,proto3,enum=enums.v1.UserStatus" json:"status,omitempty"`
	Avatar        string                 `protobuf:"bytes,7,opt,name=avatar,proto3" json:"avatar,omitempty"`
	Country       string                 `protobuf:"bytes,8,opt,name=country,proto3" json:"country,omitempty"`
	PhoneNumber   string                 `protobuf:"bytes,9,opt,name=phone_number,json=phoneNumber,proto3" json:"phone_number,omitempty"`
	ReferralId    int32                  `protobuf:"varint,10,opt,name=referral_id,json=referralId,proto3" json:"referral_id,omitempty"`
	Level         uint32                 `protobuf:"varint,11,opt,name=level,proto3" json:"level,omitempty"`
	Providers     []v1.AuthProvider      `protobuf:"varint,12,rep,packed,name=providers,proto3,enum=enums.v1.AuthProvider" json:"providers,omitempty"`
	CreatedAt     *timestamppb.Timestamp `protobuf:"bytes,13,opt,name=created_at,json=createdAt,proto3" json:"created_at,omitempty"`
	UpdatedAt     *timestamppb.Timestamp `protobuf:"bytes,14,opt,name=updated_at,json=updatedAt,proto3" json:"updated_at,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *User) Reset() {
	*x = User{}
	mi := &file_types_v1_user_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *User) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*User) ProtoMessage() {}

func (x *User) ProtoReflect() protoreflect.Message {
	mi := &file_types_v1_user_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use User.ProtoReflect.Descriptor instead.
func (*User) Descriptor() ([]byte, []int) {
	return file_types_v1_user_proto_rawDescGZIP(), []int{0}
}

func (x *User) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *User) GetUserId() int32 {
	if x != nil {
		return x.UserId
	}
	return 0
}

func (x *User) GetFullname() string {
	if x != nil {
		return x.Fullname
	}
	return ""
}

func (x *User) GetEmail() string {
	if x != nil {
		return x.Email
	}
	return ""
}

func (x *User) GetRole() v1.UserRole {
	if x != nil {
		return x.Role
	}
	return v1.UserRole(0)
}

func (x *User) GetStatus() v1.UserStatus {
	if x != nil {
		return x.Status
	}
	return v1.UserStatus(0)
}

func (x *User) GetAvatar() string {
	if x != nil {
		return x.Avatar
	}
	return ""
}

func (x *User) GetCountry() string {
	if x != nil {
		return x.Country
	}
	return ""
}

func (x *User) GetPhoneNumber() string {
	if x != nil {
		return x.PhoneNumber
	}
	return ""
}

func (x *User) GetReferralId() int32 {
	if x != nil {
		return x.ReferralId
	}
	return 0
}

func (x *User) GetLevel() uint32 {
	if x != nil {
		return x.Level
	}
	return 0
}

func (x *User) GetProviders() []v1.AuthProvider {
	if x != nil {
		return x.Providers
	}
	return nil
}

func (x *User) GetCreatedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.CreatedAt
	}
	return nil
}

func (x *User) GetUpdatedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.UpdatedAt
	}
	return nil
}

var File_types_v1_user_proto protoreflect.FileDescriptor

const file_types_v1_user_proto_rawDesc = "" +
	"\n" +
	"\x13types/v1/user.proto\x12\btypes.v1\x1a\x14enums/v1/enums.proto\x1a\x1fgoogle/protobuf/timestamp.proto\"\xef\x03\n" +
	"\x04User\x12\x0e\n" +
	"\x02id\x18\x01 \x01(\tR\x02id\x12\x17\n" +
	"\auser_id\x18\x02 \x01(\x05R\x06userId\x12\x1a\n" +
	"\bfullname\x18\x03 \x01(\tR\bfullname\x12\x14\n" +
	"\x05email\x18\x04 \x01(\tR\x05email\x12&\n" +
	"\x04role\x18\x05 \x01(\x0e2\x12.enums.v1.UserRoleR\x04role\x12,\n" +
	"\x06status\x18\x06 \x01(\x0e2\x14.enums.v1.UserStatusR\x06status\x12\x16\n" +
	"\x06avatar\x18\a \x01(\tR\x06avatar\x12\x18\n" +
	"\acountry\x18\b \x01(\tR\acountry\x12!\n" +
	"\fphone_number\x18\t \x01(\tR\vphoneNumber\x12\x1f\n" +
	"\vreferral_id\x18\n" +
	" \x01(\x05R\n" +
	"referralId\x12\x14\n" +
	"\x05level\x18\v \x01(\rR\x05level\x124\n" +
	"\tproviders\x18\f \x03(\x0e2\x16.enums.v1.AuthProviderR\tproviders\x129\n" +
	"\n" +
	"created_at\x18\r \x01(\v2\x1a.google.protobuf.TimestampR\tcreatedAt\x129\n" +
	"\n" +
	"updated_at\x18\x0e \x01(\v2\x1a.google.protobuf.TimestampR\tupdatedAtB\x8e\x01\n" +
	"\fcom.types.v1B\tUserProtoP\x01Z2github.com/vishalx07/next-mlm/gen/types/v1;typesv1\xa2\x02\x03TXX\xaa\x02\bTypes.V1\xca\x02\bTypes\\V1\xe2\x02\x14Types\\V1\\GPBMetadata\xea\x02\tTypes::V1b\x06proto3"

var (
	file_types_v1_user_proto_rawDescOnce sync.Once
	file_types_v1_user_proto_rawDescData []byte
)

func file_types_v1_user_proto_rawDescGZIP() []byte {
	file_types_v1_user_proto_rawDescOnce.Do(func() {
		file_types_v1_user_proto_rawDescData = protoimpl.X.CompressGZIP(unsafe.Slice(unsafe.StringData(file_types_v1_user_proto_rawDesc), len(file_types_v1_user_proto_rawDesc)))
	})
	return file_types_v1_user_proto_rawDescData
}

var file_types_v1_user_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_types_v1_user_proto_goTypes = []any{
	(*User)(nil),                  // 0: types.v1.User
	(v1.UserRole)(0),              // 1: enums.v1.UserRole
	(v1.UserStatus)(0),            // 2: enums.v1.UserStatus
	(v1.AuthProvider)(0),          // 3: enums.v1.AuthProvider
	(*timestamppb.Timestamp)(nil), // 4: google.protobuf.Timestamp
}
var file_types_v1_user_proto_depIdxs = []int32{
	1, // 0: types.v1.User.role:type_name -> enums.v1.UserRole
	2, // 1: types.v1.User.status:type_name -> enums.v1.UserStatus
	3, // 2: types.v1.User.providers:type_name -> enums.v1.AuthProvider
	4, // 3: types.v1.User.created_at:type_name -> google.protobuf.Timestamp
	4, // 4: types.v1.User.updated_at:type_name -> google.protobuf.Timestamp
	5, // [5:5] is the sub-list for method output_type
	5, // [5:5] is the sub-list for method input_type
	5, // [5:5] is the sub-list for extension type_name
	5, // [5:5] is the sub-list for extension extendee
	0, // [0:5] is the sub-list for field type_name
}

func init() { file_types_v1_user_proto_init() }
func file_types_v1_user_proto_init() {
	if File_types_v1_user_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: unsafe.Slice(unsafe.StringData(file_types_v1_user_proto_rawDesc), len(file_types_v1_user_proto_rawDesc)),
			NumEnums:      0,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_types_v1_user_proto_goTypes,
		DependencyIndexes: file_types_v1_user_proto_depIdxs,
		MessageInfos:      file_types_v1_user_proto_msgTypes,
	}.Build()
	File_types_v1_user_proto = out.File
	file_types_v1_user_proto_goTypes = nil
	file_types_v1_user_proto_depIdxs = nil
}
