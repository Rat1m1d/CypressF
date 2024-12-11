describe('petstore API', () => {        
    const petData = require('../../fixtures/petData.json')
    let requestBody = require('./models/createPetModel.json')
    it('Create new pet', () => {
    requestBody.id = petData.petId
    requestBody.name = petData.petName
    requestBody.category.id = petData.categoryId
    requestBody.category.name = petData.categoryName
    requestBody.status = petData.petStatus
    cy.request('POST', 'https://petstore.swagger.io/v2/pet', requestBody).then((response) => {
        expect(response.status).to.eq(200)
        })
    })
    it('Validate pet existance using GET pet method', () => {
    cy.request('GET', 'https://petstore.swagger.io/v2/pet/'+ petData.petId).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.name).to.eq(petData.petName)
        expect(response.body.category.name).to.eq(petData.categoryName)
        expect(response.body.status).to.eq(petData.petStatus)
        })
    })
    it('Update pet name and status using PUT method', () => {
        requestBody.name = petData.newPetName
        requestBody.status = petData.newPetStatus
        cy.request('PUT', 'https://petstore.swagger.io/v2/pet', requestBody).then((response) => {
            expect(response.status).to.eq(200)
        })
    })
    it('Validate pet\'s updated name and status using GET pet method', () => {
    cy.request('GET', 'https://petstore.swagger.io/v2/pet/'+ petData.petId).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.name).to.eq(petData.newPetName)
        expect(response.body.category.name).to.eq(petData.categoryName)
        expect(response.body.status).to.eq(petData.newPetStatus)
        })
    })
    it('Delete the pet', () => {
    cy.request('DELETE', 'https://petstore.swagger.io/v2/pet/'+ petData.petId).then((response) => {
        expect(response.status).to.eq(200)
        })
    })
    it('Validate pet\'s updated name and status using GET pet method', () => {
        let options = {
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/pet/'+ petData.petId,
            failOnStatusCode: false}
    cy.request(options).then((response) => {
        expect(response.status).to.eq(404)
        expect(response.body.type).to.eq("error")
        expect(response.body.message).to.eq("Pet not found")
        })
    })
})