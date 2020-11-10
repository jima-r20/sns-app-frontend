/* auth.slice.ts */
export interface PROPS_SIGNUP {
  email: string;
  password: string;
  displayName: string;
  avarat?: string;
  about?: string;
}

export interface PROPS_SIGNIN {
  email: string;
  password: string;
}

export interface PROPS_CREATE_POST {
  content: string;
}
