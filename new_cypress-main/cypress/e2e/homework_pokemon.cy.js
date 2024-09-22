import * as data from "../helpers/default_data_pokemon.json"

describe('Домашняя работа - e2e (end-to-end) автотест для покемонов', function () {

it('Покупка нового аватара для своего тренера', function () {
    cy.visit('https://pokemonbattle.ru/login/');
    cy.get(':nth-child(1) > .auth__input').type(data.login);
    cy.get('#password').type(data.password);
    cy.get('.auth__button').click();
    cy.wait(2000);
    cy.get('.pokemon__title').contains('Покемоны');
    cy.get('.pokemon__title').should('be.visible');
    cy.get('.header__container > .header__id').click();
    cy.get('[href="/shop"]').click();
    cy.get('.available > button').first().click({ force: true });
    cy.get('.credit').type(data.card_number);
    cy.get('.k_input_date').type(data.card_date);
    cy.get('.k_input_ccv').type(data.card_cvv);
    cy.get('.k_input_name').type(data.holder);
    cy.get('.pay-btn').click();
    cy.get('#cardnumber').type(data.sms);
    cy.get('.payment__submit-button').click();
    cy.get('.payment__font-for-success').contains('Покупка прошла успешно');
    cy.get('.payment__font-for-success').should('be.visible');
    cy.get('.payment__back-button-success').click();
    cy.get('.header__container > .header__id').click();
    cy.get('.trainer-img').should('be.visible');
}) 
}) 