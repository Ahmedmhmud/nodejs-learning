const posts = [
    {
        id: 1,
        title: 'Open Source'
    },
    {
        id: 2,
        title: 'NodeJS'
    }
]

const getPosts = () => posts;

export const getPostsLength = () => posts.length;

export default getPosts;