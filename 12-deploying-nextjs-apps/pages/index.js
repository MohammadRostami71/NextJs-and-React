import {Fragment} from "react";
import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import {getFeaturedPosts} from "../lib/posts-util";
import Head from "next/head";

export default function Home(props) {
    return (
        <Fragment>
            <Head>
                <title>Mohammad Blog</title>
                <meta
                    name='description'
                    content='I post about programming and web development.'
                />
            </Head>
            <Hero/>
            <FeaturedPosts posts={props.posts}/>
        </Fragment>
    )
}

export async function getStaticProps() {
    const featuredPosts = getFeaturedPosts();
    return {
        props: {
            posts: featuredPosts
        }
    }
}
