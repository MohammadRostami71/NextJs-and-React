import AllPosts from "../../components/posts/all-posts";
import {getAllPosts} from "../../lib/posts-util";
import {Fragment} from "react";
import Head from "next/head";

const Posts = (props) => {
    // const DUMMY_POSTS = [
    //     {
    //         title: 'getting-started',
    //         image: 'getting-started-nextjs.png',
    //         date: '2022-02-10',
    //         slug: 'getting-started-nextjs',
    //         excerpt: 'getting-started-nextjs getting-started-nextjs getting-started-nextjs getting-started-nextjs'
    //     }
    // ];
    return(
        <Fragment>
            <Head>
                <title>All Posts</title>
                <meta
                    name='description'
                    content='A list of all programming-related tutorials and posts!'
                />
            </Head>
            <AllPosts posts={props.posts}/>
        </Fragment>

    );
};

export function getStaticProps(){
    const allPosts = getAllPosts();
    return{
        props:{
            posts:allPosts
        }
    }
}

export default Posts;