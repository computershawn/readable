## Readable
*Readable* is a React app for reading, editing and commenting on blog posts.

#### Running the Application
1. Download *Readable* from its [Github repo](https://github.com/computershawn/readable) to your computer.
2. If you don't already have Node and npm, check out [these instructions](https://www.npmjs.com/get-npm) to get them installed.
3. Assuming you have Node and npm installed, open a terminal tab and navigate to Readable's 'api-server' directory. Type `npm install`.
4. Next, in the same directory, type `node server`.
5. In another terminal tab, navigate to Readable's 'frontend' directory and type `npm install`.
6. Next, in the same directory, type `npm start`.
7. When the application starts itself, it will open a browser window and display the Readable home screen.


#### Using Readable
* From the home screen, click a category name to view posts for just that category. You can also click a specific post's title to jump to a detailed view of that post.
* You're able to vote a post up or down using the thumbs-up/down icons under each post title.
* Click 'Date' or 'Popularity' to sort lists by publish date or number of votes, respectively.
* From any screen, click 'New Post' to create a new post.
* In the detailed view screen of a post, you can click the trash can icon to delete it. Click the edit (pencil) icon if you'd like to edit the post.
* On the detiled view screen, you can create a comment by clicking 'Leave a Comment'. Each item in the comments section under the post can be voted on, edited, or deleted.

To stop the server and the front-end applications, type ```CTRL-C``` in their respective terminal tabs.
