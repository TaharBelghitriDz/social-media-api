export interface userInterface {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  bio: string;
  cover: string;
  follwing: { followId: string }[];
  followers: { followId: string }[];
  posts: { postId: string }[];
}
