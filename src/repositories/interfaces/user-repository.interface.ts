
export interface IRegisterUserParameters {
    user_name: string;
    user_email: string;
    password: string;
}

export interface ILoginUserParameters {
    user_email: string;
    password: string;
}

export interface ILogoutUserParameters {
    refreshToken: string;
}

export interface IRefreshParameters {
    refreshToken: string;
}

export interface IGetUserByIdParameters {
    userId: string;
}