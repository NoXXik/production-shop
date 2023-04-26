import RequireAuthentication from '../common/hocs/RequireAuthentication';
import {NextPageContext} from "next/types";
import axios from "axios";
import authReqHeader from "../common/utils/authReqHeader";
import {useAppSelector} from "../common/hooks/redux/reduxHooks";

const AuthTest = (props: any) => {
    let text = JSON.stringify(props.hello)
    const authData = useAppSelector(state => state.user)
    if(authData.isAuth && authData.user) {
        text = `Hello ${authData.user.first_name}`
    }
    return (
        <>
            Korzina
            {text && <p>{text}</p>}
        </>
    )
}

AuthTest.getInitialProps = async(ctx: NextPageContext) => {
    const res = await axios.get('http://localhost:5000/api/user/hello-user', authReqHeader(ctx))
    console.log(res)
    if(res.status === 401) {
        return null
    }
    return {
        hello: res.data
    }
}


export default RequireAuthentication(AuthTest);
// export default AuthTest;

