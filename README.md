# MIWeb.GridWall
A js package to group images/videos/containers inside a wrapping container.

The package is designed to be used within the Neos CMS, but the scripts and styles can be used on any webpage.
The files to use it without Neos can be found in Resources/Public directory.

The scripts are vanilla javascript, so no library required.

Example usage:

    window.onload = function() {
      new MIWeb.GridWall(document.getElementById('grid-test'), {
        height: 200,
        maxCols: 3,
        zoom: 'overlay'
      });
    };

Available options:
* height - defines base height of the rows (actual height will vary to fit container width)
  * {numeric value} - height in px
  * 'min' - height of smallest element
  * 'max' - height of biggest element
  * 'avg' - average element height
* maxCols - defines maximum number of elements per row
  * {numeric value} - max elements per row
  * false - no element limit per row
* zoom - zoom mode on element klick
  * 'overlay' - zoomed elements overlay the gridwall container
  * 'popup' - zoomed elements overlay the whole browser window
