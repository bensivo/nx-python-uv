import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { ApplicationGeneratorSchema } from './schema';

export async function applicationGenerator (tree: Tree, options: ApplicationGeneratorSchema) {

  // TODO: option to change project-root filepath
  const projectRoot = `apps/${options.name}`;


  addProjectConfiguration(
    tree,
    options.name,
    {
      root: projectRoot,
      projectType: 'application',
      sourceRoot: `${projectRoot}/src`,
      targets: {
          // TODO: add executors
      }
    }
  );
  generateFiles(tree, path.join(__dirname, 'files/application'), projectRoot, options);
  await formatFiles(tree);

  // TODO: Do we have to update the root pyproject.toml for this? It seems like things work just fine without 
  // adding them to the workspace, as long as nobody tries to import them.
}

export default applicationGenerator;
