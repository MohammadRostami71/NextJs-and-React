import classes from './post-content.module.css';
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {atomDark} from 'react-syntax-highlighter/dist/cjs/styles/prism'

const PostContent = (props) => {
    const {post} = props;
    const imagePath = `/images/posts/${post.slug}/${post.image}`;
    const customRenders = {
        // image(image) {
        //     return (<Image alt={image.alt} src={`/images/posts/${slug}/${image.src}`} width={600} height={300}/>)
        // },
        paragraph(paragraph) {
            const {node} = paragraph;
            if (node.children[0].type === 'image') {
                const image = node.children[0];
                return (
                    <div className={classes.image}>
                        <Image alt={image.alt} src={`/images/posts/${slug}/${image.url}`} width={600} height={300}/>
                    </div>
                )
            }
            return <p>{paragraph.children}</p>
        },
        code(code) {
            const {language, value} = code;
            return <SyntaxHighlighter style={atomDark} language={language} children={value}/>
        }
    };
    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath}/>
            <ReactMarkdown renderers={customRenders}>{post.content}</ReactMarkdown>
        </article>
    );
};

export default PostContent;