// eslint-disable-next-line
// const live_url = `https://www.investnaira.com`;
// eslint-disable-next-line
const test_url = `https://fulscanner.herokuapp.com/`;

// Authentication
export const REGISTER = `${test_url}/api/v1/auth/user/signup`;
export const REGISTER_KID = `${test_url}/api/v1/auth/child/signup`;
export const USER_LOGIN = `${test_url}/api/v1/auth/user/login`;
export const ADMIN_LOGIN = `${test_url}/api/v1/auth/admin/login`;
export const LOGOUT = `${test_url}/api/v1/logout`;
export const USER_FORGOT = `${test_url}/api/v1/password/reset`;
export const USER_RESET = `${test_url}/api/v1/password/reset_otp`;
export const USER_VERIFY = `${test_url}/api/v1/verification/email_otp`;
export const CHILD_VERIFY = `${test_url}/api/v1/adult/child/add`;
export const RESEND_USER_VERIFY = `${test_url}/api/v1/verification/resend/email`;

// User
export const PROFILE_PICTURE = `${test_url}/api/v1/profile_pic/save`;
export const PROFILE_UPDATE = `${test_url}/api/v1/profile/create`;
export const PASSWORD_UPDATE = `${test_url}/api/v1/password/change`;

export const NOTIFY = `https://exp.host/--/api/v2/push/send/`;
