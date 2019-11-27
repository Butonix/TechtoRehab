const withCSS = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withOffline = require('next-offline');
const withReactSvg = require('next-react-svg');
const path = require('path');
const withImages = require('next-images');
const withFonts = require('next-fonts');

module.exports = withPlugins([withCSS,withFonts]);