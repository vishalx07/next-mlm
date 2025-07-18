// @generated by protoc-gen-es v2.5.2 with parameter "target=ts"
// @generated from file user/profile/v1/profile.proto (package user.profile.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv2";
import { file_buf_validate_validate } from "../../../buf/validate/validate_pb";
import type { AuthProvider } from "../../../enums/v1/enums_pb";
import { file_enums_v1_enums } from "../../../enums/v1/enums_pb";
import type { User } from "../../../types/v1/user_pb";
import { file_types_v1_user } from "../../../types/v1/user_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file user/profile/v1/profile.proto.
 */
export const file_user_profile_v1_profile: GenFile = /*@__PURE__*/
  fileDesc("Ch11c2VyL3Byb2ZpbGUvdjEvcHJvZmlsZS5wcm90bxIPdXNlci5wcm9maWxlLnYxIhMKEUdldFByb2ZpbGVSZXF1ZXN0ImAKEkdldFByb2ZpbGVSZXNwb25zZRIcCgR1c2VyGAEgASgLMg4udHlwZXMudjEuVXNlchIsCgxsb2dpbl9tZXRob2QYAiABKA4yFi5lbnVtcy52MS5BdXRoUHJvdmlkZXIidwoUVXBkYXRlUHJvZmlsZVJlcXVlc3QSDgoGYXZhdGFyGAEgASgJEhgKCGZ1bGxuYW1lGAIgASgJQga6SAPIAQESFwoHY291bnRyeRgDIAEoCUIGukgDyAEBEhwKDHBob25lX251bWJlchgEIAEoCUIGukgDyAEBIkYKFVVwZGF0ZVByb2ZpbGVSZXNwb25zZRIPCgdtZXNzYWdlGAEgASgJEhwKBHVzZXIYAiABKAsyDi50eXBlcy52MS5Vc2VyIlsKFVVwZGF0ZVBhc3N3b3JkUmVxdWVzdBIgChBjdXJyZW50X3Bhc3N3b3JkGAEgASgJQga6SAPIAQESIAoMbmV3X3Bhc3N3b3JkGAIgASgJQgq6SAfIAQFyAhAGIikKFlVwZGF0ZVBhc3N3b3JkUmVzcG9uc2USDwoHbWVzc2FnZRgBIAEoCTKqAgoOUHJvZmlsZVNlcnZpY2USVQoKR2V0UHJvZmlsZRIiLnVzZXIucHJvZmlsZS52MS5HZXRQcm9maWxlUmVxdWVzdBojLnVzZXIucHJvZmlsZS52MS5HZXRQcm9maWxlUmVzcG9uc2USXgoNVXBkYXRlUHJvZmlsZRIlLnVzZXIucHJvZmlsZS52MS5VcGRhdGVQcm9maWxlUmVxdWVzdBomLnVzZXIucHJvZmlsZS52MS5VcGRhdGVQcm9maWxlUmVzcG9uc2USYQoOVXBkYXRlUGFzc3dvcmQSJi51c2VyLnByb2ZpbGUudjEuVXBkYXRlUGFzc3dvcmRSZXF1ZXN0GicudXNlci5wcm9maWxlLnYxLlVwZGF0ZVBhc3N3b3JkUmVzcG9uc2ViBnByb3RvMw", [file_buf_validate_validate, file_enums_v1_enums, file_types_v1_user]);

/**
 * @generated from message user.profile.v1.GetProfileRequest
 */
export type GetProfileRequest = Message<"user.profile.v1.GetProfileRequest"> & {
};

/**
 * Describes the message user.profile.v1.GetProfileRequest.
 * Use `create(GetProfileRequestSchema)` to create a new message.
 */
export const GetProfileRequestSchema: GenMessage<GetProfileRequest> = /*@__PURE__*/
  messageDesc(file_user_profile_v1_profile, 0);

/**
 * @generated from message user.profile.v1.GetProfileResponse
 */
export type GetProfileResponse = Message<"user.profile.v1.GetProfileResponse"> & {
  /**
   * @generated from field: types.v1.User user = 1;
   */
  user?: User;

  /**
   * @generated from field: enums.v1.AuthProvider login_method = 2;
   */
  loginMethod: AuthProvider;
};

/**
 * Describes the message user.profile.v1.GetProfileResponse.
 * Use `create(GetProfileResponseSchema)` to create a new message.
 */
export const GetProfileResponseSchema: GenMessage<GetProfileResponse> = /*@__PURE__*/
  messageDesc(file_user_profile_v1_profile, 1);

/**
 * @generated from message user.profile.v1.UpdateProfileRequest
 */
export type UpdateProfileRequest = Message<"user.profile.v1.UpdateProfileRequest"> & {
  /**
   * @generated from field: string avatar = 1;
   */
  avatar: string;

  /**
   * @generated from field: string fullname = 2;
   */
  fullname: string;

  /**
   * @generated from field: string country = 3;
   */
  country: string;

  /**
   * @generated from field: string phone_number = 4;
   */
  phoneNumber: string;
};

/**
 * Describes the message user.profile.v1.UpdateProfileRequest.
 * Use `create(UpdateProfileRequestSchema)` to create a new message.
 */
export const UpdateProfileRequestSchema: GenMessage<UpdateProfileRequest> = /*@__PURE__*/
  messageDesc(file_user_profile_v1_profile, 2);

/**
 * @generated from message user.profile.v1.UpdateProfileResponse
 */
export type UpdateProfileResponse = Message<"user.profile.v1.UpdateProfileResponse"> & {
  /**
   * @generated from field: string message = 1;
   */
  message: string;

  /**
   * @generated from field: types.v1.User user = 2;
   */
  user?: User;
};

/**
 * Describes the message user.profile.v1.UpdateProfileResponse.
 * Use `create(UpdateProfileResponseSchema)` to create a new message.
 */
export const UpdateProfileResponseSchema: GenMessage<UpdateProfileResponse> = /*@__PURE__*/
  messageDesc(file_user_profile_v1_profile, 3);

/**
 * @generated from message user.profile.v1.UpdatePasswordRequest
 */
export type UpdatePasswordRequest = Message<"user.profile.v1.UpdatePasswordRequest"> & {
  /**
   * @generated from field: string current_password = 1;
   */
  currentPassword: string;

  /**
   * @generated from field: string new_password = 2;
   */
  newPassword: string;
};

/**
 * Describes the message user.profile.v1.UpdatePasswordRequest.
 * Use `create(UpdatePasswordRequestSchema)` to create a new message.
 */
export const UpdatePasswordRequestSchema: GenMessage<UpdatePasswordRequest> = /*@__PURE__*/
  messageDesc(file_user_profile_v1_profile, 4);

/**
 * @generated from message user.profile.v1.UpdatePasswordResponse
 */
export type UpdatePasswordResponse = Message<"user.profile.v1.UpdatePasswordResponse"> & {
  /**
   * @generated from field: string message = 1;
   */
  message: string;
};

/**
 * Describes the message user.profile.v1.UpdatePasswordResponse.
 * Use `create(UpdatePasswordResponseSchema)` to create a new message.
 */
export const UpdatePasswordResponseSchema: GenMessage<UpdatePasswordResponse> = /*@__PURE__*/
  messageDesc(file_user_profile_v1_profile, 5);

/**
 * @generated from service user.profile.v1.ProfileService
 */
export const ProfileService: GenService<{
  /**
   * @generated from rpc user.profile.v1.ProfileService.GetProfile
   */
  getProfile: {
    methodKind: "unary";
    input: typeof GetProfileRequestSchema;
    output: typeof GetProfileResponseSchema;
  },
  /**
   * @generated from rpc user.profile.v1.ProfileService.UpdateProfile
   */
  updateProfile: {
    methodKind: "unary";
    input: typeof UpdateProfileRequestSchema;
    output: typeof UpdateProfileResponseSchema;
  },
  /**
   * @generated from rpc user.profile.v1.ProfileService.UpdatePassword
   */
  updatePassword: {
    methodKind: "unary";
    input: typeof UpdatePasswordRequestSchema;
    output: typeof UpdatePasswordResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_user_profile_v1_profile, 0);

