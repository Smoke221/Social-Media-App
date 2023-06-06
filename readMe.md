# Social Media App

## 1. /api/register
   - ### Method
     - POST
   - ### Body
      - name
      - email
      - password
      - dob
      - bio
   - ### Description
     - This endpoint allows users to register.
   - ### Status
     - 201
        - New user has been registered

## 2. /api/login
   - ### Method
     - POST
   - ### Body
      - email
      - password
   - ### Description
     - This endpoint allows users to login.
   - ### Status
     - 201
        - Logged in
        - token 
    
## 3. /api/users
   - ### Method
     - GET
   - ### Description
     - This endpoint returns a list of all registered users.
   - ### Status
     - 200
        - All registered users.
        - List of users

## 4. /api/users/:id/friends
   - ### Method
     - GET
   - ### Description
     - This endpoint returns a list of all friends of a specific user.
   - ### Status
     - 200
        - All friends of the user.
        - Friends list

## 5. /api/users/:id/friends
   - ### Method
     - POST
   - ### Body
      - friendID
   - ### Description
     - This endpoint allows the user to send a friend request to another user
   - ### Status
     - 201
        - Friend request sent successfully.

## 6. /api/users/:id/friends/:friendId
   - ### Method
     - PATCH
   - ### Body
      - status (accept || reject)
   - ### Description
     - This endpoint should allow users to register.
   - ### Status
     - 204 (Request successfull, no content)


## 7. /api/posts
   - ### Method
     - GET
   - ### Description
     - This endpoint returns a list of all posts.
   - ### Status
     - 200
        - All the posts.
        - List of all the posts

## 8. /api/posts
   - ### Method
     - POST
   - ### Body
      - user
      - text
      - image
   - ### Description
     - This endpoint allows the user to create a new post.
   - ### Status
     - 201
        - Post created successfully.

## 9. /api/posts/:id
   - ### Method
     - PATCH
   - ### Body
      - text
      - image
   - ### Description
     - This endpoint allows users to update the text or image of a specific post
   - ### Status
     - 204 (Request successfull, no content)

## 10. /api/posts/:id
   - ### Method
     - DELETE
   - ### Description
     - This endpoint allows users to delete a specific post.
   - ### Status
     - 202
        - Post deleted successfully.

## 11. /api/posts/:id/like
   - ### Method
     - POST
   - ### Body
      - userID
   - ### Description
     - This endpoint allows users to like a specific post.
   - ### Status
     - 201
        - Post liked successfully.

## 12. /api/posts/:id/comment
   - ### Method
     - POST
   - ### Body
      - userID
      - text
   - ### Description
     - This endpoint allows users to comment on a specific post.
   - ### Status
     - 201
        - Commented on a post successfully.

## 13. /api/posts/:id
   - ### Method
     - GET
   - ### Description
     - This endpoint returns the details of a specific post.
   - ### Status
     - 200
        - Details of the post.