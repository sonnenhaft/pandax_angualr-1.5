import <%= upCaseName %> from './<%= dashName %>.component'

describe('"<%= dashName %>" component', () => {
  let component
  beforeEach(window.module(<%= upCaseName %>));
  beforeEach(inject((directiveBuilder) => {
    component = directiveBuilder.$build('<<%= dashName %>></<%= dashName %>>')
  }))

  it('should compile', () => {
    expect(component.element.html()).toContain('<%= name %>')
  })
})
