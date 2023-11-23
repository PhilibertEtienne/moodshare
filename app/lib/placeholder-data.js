const users = [
    {
      id: "1",
      name: "User1",
      email: "user1@example.com",
      password: "password1",
      friends: [],
    },
    {
      id: "2",
      name: "User2",
      email: "user2@example.com",
      password: "password2",
      friends: [],
    },
  ];
  
  const posts = [
    {
        id: "1",
        content: "This is the content of post 1.",
        status: "published",
        user_id: "1", 
      },
      {
        id: "2",
        content: "Another post with some content.",
        status: "draft",
        user_id: "2",
      },
  ]

  module.exports = { users, posts };
  