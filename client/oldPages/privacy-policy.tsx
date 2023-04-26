import {useRouter} from "next/router";
import {useEffect} from "react";

export default function PrivacyPolicy() {
    // window.location.assign(`http://localhost:5000/privacy-policy.docx`)
    const router = useRouter()
    useEffect(() => {
        router.push('/privacy-policy.docx')
    }, [])
    return (
        <>
            Политикой обработки персональных данных
        </>
    )
}
