import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostFile(){
    return fs.readdirSync(postsDirectory)
}

export function getPostData(postIdentifier) {
    const postSlug = postIdentifier.replace(/\.md$/, '');
    const filePath = path.join(postsDirectory, `${postSlug}.md`);
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const {data, content} = matter(fileData);
    const postData = {
        slug: postSlug,
        ...data,
        content
    };
    return postData;
}

export function getAllPosts() {
    const postFiles = getPostFile();
    const allPosts = postFiles.map(postFile => {
        return getPostData(postFile);
    });
    return allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1);
}

export function getFeaturedPosts() {
    const allPosts = getAllPosts();
    return allPosts.filter(post => post.isFeatured);
}