import {Fragment} from "react";

const UserProfile = (props) => {
    return (
        <Fragment>
            <h1>{props.username}</h1>
        </Fragment>
    )
};

export default UserProfile;

export async function getServerSideProps(context) {
    const {params,req,res} = context;
    console.log('server side')
    return {
        props: {
            username: 'Mohammad'
        }
    };
}