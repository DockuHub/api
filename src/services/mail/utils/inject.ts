import { promises as fs } from 'fs';
import appRoot from 'app-root-path';

export async function inject_template(
  template_name: string,
  args: object | any,
): Promise<string> {
  try {
    // TODO Cache template
    const template_path: string = `${appRoot}/src/services/mail/templates/${template_name}`;
    const template: string = await fs.readFile(template_path, {
      encoding: 'utf8',
      flag: 'r',
    });

    let injected_template: string = template;
    Object.keys(args).forEach((key: string) => {
      const regex: RegExp = new RegExp(`{${key}}`, 'g');
      injected_template = template.replace(regex, args[key]);
    });

    return injected_template;
  } catch (e) {
    const error: string = `Email Inject Error - Could not inject ${template_name} with ${args.toString()}`;
    throw new Error(error);
  }
}
