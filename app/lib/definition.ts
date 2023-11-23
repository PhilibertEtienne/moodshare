export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    friends : Array<User>;
  };
  
  export type Posts = {
    id: string;
    content: string;
    status: 'published' | 'draft' | 'archived';
    user : User;
  };
  

