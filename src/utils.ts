export function replaceName(template: string, name: string): string {
  const firstUpperName = name.replace(/[a-z]/, function (s) {
    return s.toUpperCase();
  });
  const upperName = name.replace(/\B([A-Z])/g, '_$1').toUpperCase();

  template = template.replace(/\#NAME\#/g, name);
  template = template.replace(/\#FIRSET_UPPER_NAME\#/g, firstUpperName);
  template = template.replace(/\#UPPER_NAME\#/g, upperName);

  return template;
}
