import {useRouter} from "next/router";

const ProjectIdPage = () => {
    const router = useRouter();
    console.log(router.query)
    return (
        <div>
            <h1>ProjectId Page</h1>
            {/*{router.query}*/}
            {/*{router.query}*/}
        </div>
    );
};

export default ProjectIdPage;