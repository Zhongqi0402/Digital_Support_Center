/// <reference types="qs" />
interface RegisterUserBody {
    name: string | null;
    email: string | null;
    password: string | null;
}
interface LoginUserBody {
    email: string;
    password: string;
}
declare const registerUser: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, RegisterUserBody, import("qs").ParsedQs, Record<string, any>>;
declare const loginUser: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, LoginUserBody, import("qs").ParsedQs, Record<string, any>>;
declare const getCurrentUser: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export { registerUser, loginUser, getCurrentUser };
