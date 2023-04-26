import Link from "next/link";
import Image from "next/image";
import {AppLink, AppLinkTheme} from "../../shared/ui/Link/Link";
import React from "react";
import {Button, ButtonTheme} from "../../shared/ui/Button/Button";


export default function Footer({ children }: any) {
    return (
      <>
        <footer className="footer">
          <div className="footer__wraper">
            <div className="footer__container _container">
              {/*Подписка на рассылку*/}
              {/*<div className="footer__body">*/}
                {/*<div className="footer__contact">*/}
                {/*  <h2 className="footer__contact_title _header-level-2">Контакты</h2>*/}
                {/*  <div className="footer__contact-wrapper">*/}
                {/*  <div className="contact-wrapper__info">*/}
                {/*    <div className="footer__phone">*/}
                {/*      <AppLink href={"tel: +79867240398"}>+7 986 724 03 98</AppLink>*/}
                {/*    </div>*/}
                {/*    <div className="footer__email">*/}
                {/*      <AppLink href={"mailto:kontrol_116@mail.ru"} >kontrol_116@mail.ru</AppLink>*/}
                {/*    </div>*/}
                {/*    <div className="footer__order">*/}
                {/*      /!*<AppLink theme={AppLinkTheme.BUTTON} href={"mailto:kontrol_116@mail.ru"} >Задать вопрос</AppLink>*!/*/}
                {/*      <Button small={true} theme={ButtonTheme.SECONDARY}>Задать вопрос</Button>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<div className="footer-menu__menu">*/}
                {/*  <div className="footer-menu__list-block _list-text">*/}
                {/*    <ul className="footer-menu__list">*/}
                {/*      <li>*/}
                {/*        <Link className="menu__sub-link _link _link-default" href={'/support/order'}>Обратная связь</Link>*/}
                {/*      </li>*/}
                {/*      <li>*/}
                {/*        <Link className="menu__sub-link _link _link-default" href={'/support/contacts'}>Контакты</Link>*/}
                {/*      </li>*/}
                {/*      <li>*/}
                {/*        <Link className="menu__sub-link _link" href={'/service/contacts'}>Контакты</Link>*/}
                {/*      </li>*/}
                {/*    </ul>*/}
                {/*  </div>*/}
                {/*</div>*/}
              {/*</div>*/}
              <div className="footer__copyright copyright">
                <div className="copyright__brand">
                <p className="_text-basic">ИП Ногманов Артур Русланович</p>
                </div>
                <div className="copyright__payments payments-footer">
                  <div className="payments-footer__container">
                    <Image src={'/icons/icon_mastercard.ico'} width={32} height={20} alt={"icon"} quality={100}></Image>
                    <Image src={'/icons/icon_visa.png'} width={32} height={20} alt={"icon"} quality={100}></Image>
                    <Image src={'/icons/icon_yookassa.png'} width={64} height={15} alt={"icon"} quality={100}></Image>
                  </div>
                </div>
                <div className="copyright__privacy">
                  <AppLink className="subscibe-privacy-policy__link" href={`/privacy-policy.docx`}>Политикой обработки персональных данных</AppLink>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    )
}

{/*<div className="footer__subscribe">*/}
{/*  <div className="subscribe__main">*/}
{/*    <div className="subscribe__title">*/}
{/*      <h4 className="subscribe__title-email-header _header-level-4">*/}
{/*        Хочу быть в курсе акций и новинок*/}
{/*      </h4>*/}
{/*    </div>*/}
{/*    <div className="subscribe__body">*/}
{/*      <div className="subscribe__body_input-body">*/}
{/*        <span className="subscribe__body_input-alert _alert-dangerous">Укажите адрес электронной почты</span>*/}
{/*        <label className="input-box__container _input-white">*/}
{/*          <input type="text" className="subscribe__body_input" placeholder="Мой E-mail *"/>*/}
{/*        </label>*/}
{/*      </div>*/}
{/*      <div className="subsvribe__body_button">*/}
{/*        <button className="subscribe__button _button-gray">Подписаться</button>*/}
{/*      </div>*/}
{/*    </div>*/}
{/*  </div>*/}
{/*  <div className="subscribe__privacy-policy">*/}
{/*    <div className="subscribe__privacy-policy-text _text-basic">*/}
{/*      Нажимая «Подписаться», вы соглашаетесь с <Link href={'/'} className="subscibe-privacy-policy__link _link _link-another-page">Политикой обработки персональных данных</Link><span className="_text-basic">, </span><Link href={"/"} className="_link _link-another-page">Пользовательским соглашением об использовании сайта</Link><span className="_text-basic">, а также с </span><Link href={"/"} className="_link _link-another-page">Публичной офертой</Link>*/}
{/*    </div>*/}
{/*  </div>*/}
{/*</div>*/}
