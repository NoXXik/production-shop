import {Button, Input, Space, Tooltip} from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import {  } from '@ant-design/icons';
import HelpPopup from "../../../components/UI/HelpPopup";


interface IMetaInfoProps {
    metaTitle: string;
    metaDescription: string;
    setMetaTitle: React.Dispatch<React.SetStateAction<string>>;
    setMetaDescription: React.Dispatch<React.SetStateAction<string>>;
}

export default function MetaInfo(props: IMetaInfoProps) {
    const {metaTitle, metaDescription, setMetaTitle, setMetaDescription} = props

    return (
        <div className="container">
            <Space  direction={"vertical"}>
                <Space align={"start"} direction={"vertical"} className="item-block">
                    <Title level={5}>Тег Title</Title>
                    <HelpPopup title="Title – тег названия страницы, который выводится первой строчкой в результатах поиска Google и Yandex для каждого сайта и показывается в названии вкладки браузера с вашим сайтом."/>
                    <Input status={metaTitle.length > 0 ? '': 'error'} value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder='Тег Title' style={{maxWidth: 300}} required={true}/>
                </Space>
                <Space align={"start"} direction={"vertical"} className="item-block">
                    <Title style={{marginBottom: 0}} level={5}>Тег Description</Title>
                    <HelpPopup title="Тег Description - это краткое описание страницы. Рекомендуемая длина описания 150-200 символов. Также можно включать туда ключевые слова, которые были использованы в теге TITLE, можно перечислять характеристики и свойства товара, коды производителей и пр. Но перекачивать ключевыми словами не нужно, все должно быть в меру и написано в первую очередь для пользователя."/>
                    <TextArea status={metaDescription.length > 0 ? '': 'error'} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder='Тег Description' required={true}/>
                </Space>
            </Space>
        </div>
    )
}
