import { Config, BundleMap, bundlePackageJson } from 'ts-packager';

export const config: Config = {
	buildDir: 'dist/src/' // Where to put the build files
};

export const files: BundleMap = {
	'CHANGELOG.md': true, // Copy the changelog to the build
	// TODO: 'LICENSE.md': true, // Copy the license to the build
	'README.md': true, // Copy the readme to the build
	'package.json': bundlePackageJson // Copy the package.json to the build, removing scripts & dependencies
};
