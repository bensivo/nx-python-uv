import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { LibraryGeneratorSchema } from './schema';

export async function libraryGenerator (tree: Tree, options: LibraryGeneratorSchema) {

  const projectRoot = `libs/${options.name}`;

  addProjectConfiguration(
    tree,
    options.name,
    {
      root: projectRoot,
      projectType: 'library',
      sourceRoot: `${projectRoot}/src`,
      targets: {}
    }
  );
  generateFiles(tree, path.join(__dirname, 'files/library'), projectRoot, options);
  await formatFiles(tree);

  // update pyproject.toml
}

export default libraryGenerator;
