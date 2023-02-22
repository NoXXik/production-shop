import Link from "next/link";
import Image from "next/image";
import iconMir from "./icon-mir.svg"
import iconMastercard from "../../../public/icon-mastercard.svg"
import iconVisa from "../../../public/icon-visa.svg"
import iconYookassa from "../../../public/icon-yookassa.svg"
import ner from "../static/next.svg"




export default function Footer({ children }: any) {
    return (
      <>
        <footer className="footer">
          <div className="footer__wraper">
            <div className="footer__container _container">
              <div className="footer__subscribe">
                <div className="subscribe__main">
                  <div className="subscribe__title">
                    <h4 className="subscribe__title-email-header _header-level-4">
                      Хочу быть в курсе акций и новинок
                    </h4>
                  </div>
                  <div className="subscribe__body">
                    <div className="subscribe__body_input-body">
                      <span className="subscribe__body_input-alert _alert-dangerous">Укажите адрес электронной почты</span>
                      <label className="input-box__container _input-white">
                        <input type="text" className="subscribe__body_input" placeholder="Мой E-mail *"/>
                      </label>
                    </div>
                    <div className="subsvribe__body_button">
                      <button className="subscribe__button _button-gray">Подписаться</button>
                    </div>
                  </div>
                </div>
                <div className="subscribe__privacy-policy">
                  <div className="subscribe__privacy-policy-text _text-basic">
                    Нажимая «Подписаться», вы соглашаетесь с <Link href={'/'} className="subscibe-privacy-policy__link _link _link-another-page">Политикой обработки персональных данных</Link><span className="_text-basic">, </span><Link href={"/"} className="_link _link-another-page">Пользовательским соглашением об использовании сайта</Link><span className="_text-basic">, а также с </span><Link href={"/"} className="_link _link-another-page">Публичной офертой</Link>
                  </div>
                </div>
              </div>
              <div className="footer__body">
                <div className="footer__contact">
                  <h2 className="footer__contact_title _header-level-2">Контакты</h2>
                  <div className="footer__contact-wrapper">
                  <div className="contact-wrapper__info">
                    <div className="footer__phone">
                      <a href="tel:+78888889988" target='_self' className="_link _link-default">+78888889988</a>
                    </div>
                    <div className="footer__email">
                      <a href="mailto:ildarsharifullin1994@mail.ru" target='_self' className="_link _link-default">ildarsharifullin1994@mail.ru</a>
                    </div>
                  </div>
                </div>
                </div>
                <div className="footer-menu__menu">
                  <div className="footer-menu__list-block _list-text">
                    <ul className="footer-menu__list">
                      <li>
                        <Link className="menu__sub-link _link _link-default" href={'/about/news'} >Новости</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-menu__list-block _list-text">
                    <ul className="footer-menu__list">
                      <li>
                        <Link className="menu__sub-link _link _link-default" href={'/support/order'} >Вопросы в тех.поддержку</Link>
                      </li>
                      <li>
                        <Link className="menu__sub-link _link _link-default" href={'/support/faq'} >Частые вопросы</Link>
                      </li>
                      <li>
                        <Link className="menu__sub-link _link _link-default" href={'/support/contacts'} >Контакты</Link>
                      </li>
                      <li>
                        <Link className="menu__sub-link _link _link-default" href={'/support/reset-password'} >Сброс пороля</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-menu__list-block _list-text">
                    <ul className="footer-menu__list">
                      <li>
                        <Link className="menu__sub-link _link" href={'/service'} >Сервисное обслуживание</Link>
                      </li>
                      <li>
                        <Link className="menu__sub-link _link" href={'/service/status'} >Проверка статуса ремонта</Link>
                      </li>
                      <li>
                        <Link className="menu__sub-link _link" href={'/service/guaranty'} >Гарантия</Link>
                      </li>
                      <li>
                        <Link className="menu__sub-link _link" href={'/service/contacts'} >Контакты</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-menu__list-block _list-text">
                    <ul className="footer-menu__list">
                      <li>
                        <Link className="menu__sub-link _link" href={'/download/software'} >Прошивки и ПО</Link>
                      </li>
                      <li>
                        <Link className="menu__sub-link _link" href={'/download/documents'} >Документация</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="footer__copyright copyright">
                <div className="copyright__brand">
                <p className="_text-basic">© Ecommerce, 2023</p>
                </div>
                <div className="copyright__payments payments-footer">
                  <div className="payments-footer__container">
                    <Image src={'/icons/icon_mastercard.ico'} width={32} height={20} alt={"icon"} quality={100}></Image>
                    <Image src={'/icons/icon_visa.png'} width={32} height={20} alt={"icon"} quality={100}></Image>
                    <Image src={'/icons/icon_yookassa.png'} width={64} height={15} alt={"icon"} quality={100}></Image>
                  </div>
                </div>
                <div className="copyright__privacy">
                  <Link href={'/'} className="subscibe-privacy-policy__link _link _link-another-page">Политикой обработки персональных данных</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    )
}