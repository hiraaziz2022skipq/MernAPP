describe('My first Test', function(){
    it('Visiting webpage', function(){
        cy.visit('https://hira-mern-app.netlify.app/')
        
        cy.contains('Insert').click() // Click an element
        cy.url().should('include', '/insert') //Check insert button

        cy.contains('Search').click() // Click an element
        cy.url().should('include', '/search') // check search button

        cy.contains('Get Data Points').click() // Click an element
        cy.url().should('include', '/getdata') // Check get update button

        // cy.contains('Insert').click() // In insert.js 
        // cy.get('form') // yields <form>...</form>
        // .contains('form', 'Insert')

        
    })

})