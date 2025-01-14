import { Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { DotNetClient, mockDotnetFactory } from '@nx-dotnet/dotnet';

import * as mockedProjectGenerator from '../utils/generate-test-project';
import generator from './generator';
import { NxDotnetGeneratorSchema } from './schema';

jest.mock('../utils/generate-test-project');

describe('nx-dotnet test generator', () => {
  let appTree: Tree;
  let dotnetClient: DotNetClient;

  const options: NxDotnetGeneratorSchema = {
    project: 'existing',
    testTemplate: 'xunit',
    language: 'C#',
    skipOutputPathManipulation: true,
    standalone: false,
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
    dotnetClient = new DotNetClient(mockDotnetFactory());
  });

  it('should run successfully', async () => {
    await generator(appTree, options, dotnetClient);
  });

  it('should call project generator with application project type', async () => {
    const projectGenerator = (
      mockedProjectGenerator as jest.Mocked<typeof mockedProjectGenerator>
    ).GenerateTestProject;

    await generator(appTree, options, dotnetClient);
    expect(projectGenerator).toHaveBeenCalledWith(
      appTree,
      options,
      dotnetClient,
    );
  });
});
