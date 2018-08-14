# Schematics
> Generate Sketches automatically

## Setup

If you use Angular CLI 1.7 or higher, you can use the Angular CLI to install Kentan.

```bash
ng add @kentan-official/schematics
```

Two packages will be installed on your local machine `@kentan-official/core` & `@kentan-official/schematics`.
After the setup has finished you will be able to run two commands `sketch` & `sketch-barell`

## Commands

The Schematics of Kentan allow you to run the following commands.

|Command|Alias|Description|
| ----- | --- | --------- |
|[sketch](#generate-a-sketch)|ks|Generates a Sketch|
|[sketch-barrel](#generate-a-barrel)|ksb|Generates a Barrel file exporting all Sketches|

You have to tell the Angular CLI where the schematics can be found.
That's why you need to reference the schematics package of Kentan.

```bash
ng g @kentan-official/schematics:<COMMAND>
```

!> Maybe this command becomes simplified in the future.
Therefore it is necessary to be able to register multiple schematic collections inside `angular.json` (see [Feature Request 249](https://github.com/angular/devkit/issues/249)).

## Generate a Sketch

To create a Sketch run the following command inside your Angular Project.

```bash
ng g @kentan-official/schematics:sketch <NAME_YOUR_SKETCH>
```

?> **HINT** If you generate a Sketch for an existing model in your project you may want to pass the model name as sketch name. The schematic automatically resolves the model in your project and links it into your Sketch.

To list all parameters of this command please run `ng g @kentan-official/schematics:sketch --help`.

## Generate a Barrel

You can generate a barrel file exporting all your Sketches.
This simplifies the import paths to your sketches.

```bash
ng g @kentan-official/schematics:sketch-barrel
```

?> **NOTE** If a barrel file is detected all Sketches created in the future will automatically be added to the file. This is the same behavior like adding a Component to a NgModule.

To list all parameters of this command please run `ng g @kentan-official/schematics:sketch-barrel --help`.

## Multiple Applications or Libraries

The schematics default to generate each Sketch or Barrel to the main application of your Angular Project.

You can tell the CLI to generate these files in other projects passing the parameter `--app`.

```bash
ng g @kentan-official/schematics:sketch <NAME_YOUR_SKETCH> --app 0
# OR
ng g @kentan-official/schematics:sketch <NAME_YOUR_SKETCH> --app <APP_NAME>
```

You can either pass the index of the project or the name specified in `angular.json`.

## Use Custom Directories

You will notice that the schematics generate all Sketches in `src/app/test/sketches/*`.
If you want to manage your Sketches in another directory you can pass the parameter `--dir`.

```bash
ng g @kentan-official/schematics:sketch <NAME_YOUR_SKETCH> --dir custom/path
# results in: src/app/custom/patch/<NAME_YOUR_SKETCH>.sketch.ts
```