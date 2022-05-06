import classes from './posts-grid.module.css';
import PostItem from "./post-item";

const PostsGrid = (props) => {
    const {posts} = props;
    console.log(posts)
    return (
        <ul className={classes.grid}>
            {posts.map(post => <PostItem key={post.slug} post={post}/>)}
        </ul>
    );
};

export default PostsGrid;