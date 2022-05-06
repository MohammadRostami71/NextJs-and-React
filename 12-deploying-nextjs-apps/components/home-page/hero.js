import Image from "next/image";
import classes from './hero.module.css';

const Hero = () => {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src='/images/site/max.png' width={300} height={300} alt='An image show me'/>
            </div>
            <h1>Hi, I am Mohammad</h1>
            <p>I am blog web development - especially front-end development</p>
        </section>
    );
};

export default Hero;