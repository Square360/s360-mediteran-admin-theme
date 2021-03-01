# Square360 Modifications to Mediteran Admin Theme for Drupal 8 / 9

Original theme located at: [Mediteran Theme](https://www.drupal.org/project/mediteran)

**This is a child theme, so it is required you install Mediteran first!**
Has been updated for Drupal 8.8 or 9 compatibility

Tweaks added for:
+ Checkbox and radios display as a grid
+ Made main content column wider than standard
+ Theme for Paragraphs Layout structure to be easier to read

## Add via Composer
Add the new Square360 composer package repo to your composer file:
```
"repositories": [
  ...
  {
    "type": "composer",
    "url": "https://packages.square360.com"
  }
]
```

Then just do a normal composer require:
```
composer require "square360/s360_mediteran"
```