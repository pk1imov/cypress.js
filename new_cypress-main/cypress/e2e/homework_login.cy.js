import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Домашняя работа - автотесты для формы логина и пароля', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
    });

    afterEach('Конец теста', function () {
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.close).should('be.visible');
    });

    it('Позитивный кейс авторизации', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Авторизация прошла успешно');
     })

     it('Проверка логики восстановления пароля', function () {
        cy.get(main_page.forgot_pass_btn).click();
        cy.get(recovery_password_page.email).type('pk1imov@vk.com');
        cy.get(recovery_password_page.send_button).click();
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
    })

    it('Негативный кейс авторизации - верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type('iloveqastudio');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет');
    })

    it('Негативный кейс авторизации - неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('geman@dolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет');
    })

    it('Негативный кейс валидации', function () {
        cy.get(main_page.email).type('germandolnikov.ru');
        cy.get(main_page.password).type('iLoveqastudio');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Нужно исправить проблему валидации');
    })

    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Авторизация прошла успешно');
    })
 }) 