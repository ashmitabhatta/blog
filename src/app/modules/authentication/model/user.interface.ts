export interface Userlist {
  id: number;
  username: string;
  password: string;
  post: Posts[];
}
export interface Posts {
  postId: number;
  title: string;
  content: string;
  author: string;
  date: string;
}
