declare module models {
  namespace user {
    interface Attributes {
      id?: string;
      firstname?: string;
      lastname?: string;
      username?: string;
      avatarUrl?: string;
      email?: string;
      salt?: string;
      hash?: string;
      role?: string;
      joinedAt?: Date;
      carPosts?: string[];
    }
  }
}
