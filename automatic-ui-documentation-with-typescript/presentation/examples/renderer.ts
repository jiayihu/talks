@Component({
  selector: 'markdown',
  template: `
    <div #snippetsContainer></div>
  `
})
export default class MarkdownComponent {
  @ViewChild('snippetsContainer', { read: ViewContainerRef })

private renderTemplate(template: string) {
  if (!template || !template.length) return;

  @Component({
    template
  })
  class TemplateComponent {}

  @NgModule({
    imports: [CommonModule, FormsModule, AngularUIModule],
    declarations: [TemplateComponent]}
  )
  class TemplateModule {}

  try {
    const moduleWithFactories = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);

    const snippetFactory = moduleWithFactories.componentFactories.find(
      factory => factory.componentType === TemplateComponent
    );

    const component = this.snippetsContainer.createComponent(snippetFactory);
  } catch (error) {
    console.group('Error while parsing the markdown code snippet');
    console.error(error.message);
    console.groupEnd();
  }
}



