import classes from './post-item.module.css';
import Link from "next/link";
import Image from "next/image";

const PostItem = (props) => {
    const {title, image, date, slug, excerpt} = props.post;
    const formattedDate = new Date(date).toLocaleDateString('fa-IR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const imagePath = `/images/posts/${slug}/${image}`;
    const linkPath = `/posts/${slug}`;
    return (
        <li className={classes.post}>
            <Link href={linkPath}>
                <a>
                    <div className={classes.image}>
                        <Image src={imagePath} width={300} height={200} alt={title} layout='responsive'/>
                    </div>
                    <div className={classes.content}>
                        <h3>{title}</h3>
                        <time>{formattedDate}</time>
                        <p>{excerpt}</p>
                    </div>
                </a>
            </Link>
        </li>
    );
};

export default PostItem;