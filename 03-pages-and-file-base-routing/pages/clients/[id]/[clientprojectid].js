import {useRouter} from "next/router";

const SelectedClientProject = () => {
    const router = useRouter();
    console.log(router.query);

    return (
        <div>
            <h1>Selected Client Project Page!</h1>

        </div>
    );
};

export default SelectedClientProject;