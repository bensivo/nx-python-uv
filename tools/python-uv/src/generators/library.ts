import * as fs from 'fs';
import * as toml from 'smol-toml';
import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { LibraryGeneratorSchema } from './schema';

export async function libraryGenerator (tree: Tree, options: LibraryGeneratorSchema) {

  const workspaceRoot = tree.root;
  const projectName = options.name;
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
  const pyprojectTomlFilepath = path.join(workspaceRoot, 'pyproject.toml');
  const pyprojectTomlStr = fs.readFileSync(pyprojectTomlFilepath);
  const data: any = toml.parse(pyprojectTomlStr.toString('utf-8'));
  
  // Create missing datastructures if they are not there
  if (!data.tool) {
      data.tool = {};
  }
  if (!data.tool.uv) {
      data.tool.uv = {};
  }
  if (!data.tool.uv.sources) {
      data.tool.uv.sources = {};
  }
  if (!data.tool.uv.workspace) {
      data.tool.uv.workspace = {
          members: []
      };
  }
  if (!data.project.dependencies) {
      data.project.dependencies = [];
  }

  // Tells UV that this package is from the workspace, not a standard library
  data.tool.uv.sources[projectName] = { workspace: true };

  // Tells UV where to find this package
  data.tool.uv.workspace.members.push(`libs/${projectName}`);

  // Adds this pacakge to dependencies, so it'll be available to all other packages in this workspace
  data.project.dependencies.push(projectName);

  const pyprojectTomlStrNew = toml.stringify(data);
  fs.writeFileSync(pyprojectTomlFilepath, pyprojectTomlStrNew);
}

export default libraryGenerator;
