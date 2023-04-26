import {useEffect} from "react";
import {useRouter} from "next/router";

export default function PublicOffer() {
    // window.location.assign(`http://localhost:5000/public-offer.docx`)
    const router = useRouter()
    useEffect(() => {
        router.push('/public-offer.docx')
    }, [])
    return (
        <>
            Публичная оферта
        </>
    )
}
