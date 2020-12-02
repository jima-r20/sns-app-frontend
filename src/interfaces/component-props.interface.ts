/* =====================
      PostItem.tsx
===================== */
export interface PROPS_POSTLIST {
  mypost?: boolean;
  postFromId?: number;
}

/* =====================
      PostItem.tsx
===================== */
export interface PROPS_POST {
  id: number;
  postFromId: number;
  displayName: string;
  content: string;
}

/* =====================
      Profile.tsx
===================== */
export interface PROPS_PROFILE {
  profile: {
    id: number;
    displayName: string;
    avatar: string;
    about: string;
  };
}

/* =====================
  DMItem.tsx, RightSideBarDMItem.tsx
===================== */
export interface PROPS_DM {
  targetUser: number;
  messages: [
    {
      id: number;
      sender: number;
      receiver: number;
      message: string;
    }
  ];
}

/* =====================
      Friend.tsx
===================== */
export interface PROPS_FRIEND {
  askFrom: number;
  askTo: number;
  approved: boolean;
}

/* =====================
  FriendRequestItem.tsx
===================== */
export interface PROPS_FRIEND_REQUEST {
  askFrom: number;
}
