export function replaceName(template: string, name: string): string {
  const upperName = name.toUpperCase();
  const firstUpperName = name.replace(/[a-z]/, function (s) {
    return s.toUpperCase();
  });
  const upperUnderlineName = name.replace(/\B([A-Z])/g, '_$1').toUpperCase();
  const lowerName = name.toLowerCase();
  const lowerUnderlineName = name.replace(/\B([A-Z])/g, '_$1').toLowerCase();

  template = template.replace(/\#NAME\#/g, name);
  template = template.replace(/\#UPPER_NAME\#/g, upperName);
  template = template.replace(/\#FIRSET_UPPER_NAME\#/g, firstUpperName);
  template = template.replace(/\#UPPER_UNDERLINE_NAME\#/g, upperUnderlineName);
  template = template.replace(/\#LOWER_NAME\#/g, lowerName);
  template = template.replace(/\#LOWER_UNDERLINE_NAME\#/g, lowerUnderlineName);

  return template;
}
