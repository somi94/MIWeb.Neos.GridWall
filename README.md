# MIWeb.GridWall
A js package to group images/videos/containers inside a wrapping container (similar to google images).

The package is designed to be used within the Neos CMS, but the scripts and styles can be used on any webpage.
The files to use it without Neos can be found in Resources/Public directory.

The scripts are vanilla javascript, so no library required.

## State of development
This package is in early development and tested with Neos 4.0 only.

Features:
* GridWall component
* Auto-Import of required scripts and styles
* Inspector options: Configure GridWall in the Neos backend

ToDos:
* GridWall Pin component to group components in a single object
* Optional background images?
* Edit Mode (Turn off gridwall in backend mode)
* Make Auto-Import of required scripts and styles optional

## Usage (without Neos)
Example usage:

    window.onload = function() {
      new MIWeb.GridWall(document.getElementById('grid-test'), {
        height: 200,
        maxCols: 3,
        zoom: 'overlay'
      });
    };

## Installation (Neos)
1. Add this repository to your projects composer.json:

        {
          [...]
          "repositories": [
            {
              "type": "vcs",
              "url": "https://github.com/somi94/MIWeb.Neos.GridWall.git"
            }
          ],
          "require": {
            [...]

            "miweb/neos-gridwall": "dev-master"
          }
        }

2. execute a composer update

## Usage
1. Add the "GridWall" component to your page
2. Add components to the gridwall.

## Available JS options
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
