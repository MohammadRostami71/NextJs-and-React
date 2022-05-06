import {getPostData, getPostFile} from "../../lib/posts-util";
import {Fragment} from "react";
import Head from "next/head";
import PostContent from "../../components/posts/post-detail/post-content";

const PostDetail = (props) => {
    return (
        <Fragment>
            <Head>
                <title>{props.post.title}</title>
                <meta name='description' content={props.post.excerpt} />
            </Head>
            <PostContent post={props.post}/>
        </Fragment>

    );
};

export function getStaticProps(context) {
    const {params} = context;
    const {slug} = params;
    const postData = getPostData(slug);
    return {
        props: {
            post: postData
        },
        revalidate: 600
    }
}

export function getStaticPaths() {
    const postFileName = getPostFile();
    const slugs = postFileName.map(fileName => fileName.replace(/\.md$/, ''));
    return {
        paths: slugs.map(slug => ({params:{slug:slug}})),
        fallback: false
    }
}

export default PostDetail;