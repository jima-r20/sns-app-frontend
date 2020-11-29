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

export interface PROPS_UPDATE_USER {
  id: number;
  displayName: string;
  avatar: string;
  about: string;
}

export interface PROPS_CREATE_POST {
  content: string;
}

export interface PROPS_EDIT_POST {
  id: number;
  content: string;
}

export interface PROPS_CREATE_DM {
  receiver: number;
  message: string;
}

export interface PROPS_APPROVE_REQUEST {
  askFrom?: number;
  askTo?: number;
  approved: string;
}

export interface PROPS_CREATE_REQUEST {
  askTo: number;
  approved: string;
}
