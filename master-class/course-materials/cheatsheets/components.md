# Component-library checklist

The MAUI/component-library catalog and its integration instructions vary by release. The starter and capstone disable automatic component copying because they do not include the MAUI source assets. To use MAUI, obtain the compatible assets and configure `maui.sourceDir` in the Taro plugin options; verify the path and setup for the plugin version in use.

Before demonstrating a component:

1. Confirm the library package/version from an official source.
2. Confirm its supported Macle runtime/compiler versions.
3. Follow the version-specific install and component-registration instructions.
4. Build and verify the component in the simulator and on a device.
5. Include a plain Taro/Macle fallback for unsupported components.

Do not copy an assumed `usingComponents` configuration into a project without checking the library's current documentation.
