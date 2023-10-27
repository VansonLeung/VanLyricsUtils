# VanLyricsUtils.js

VanLyricsUtils.js is a JavaScript library that provides utility functions for managing and displaying lyrics in a web application.

## Usage

### Installation

To use VanLyricsUtils.js, include the script in your HTML file:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Other head elements -->
  <script src="VanLyricsUtils.js"></script>
</head>
<body>
  <!-- Your HTML content -->
  <script> 
    // Run the lyrics util code here
  </script>
</body>
</html>
```

### Example Usage

Here's an example of how to use the VanLyricsUtils functions:

```javascript
// Set up the lyrics container
VanLyricsUtils.setupLyricsContainer('#lyrics-container');

// Load the lyrics from the provided input text
VanLyricsUtils.loadLyrics('  \n[00:00.04] Mummy don't know daddy's getting hot\n[00:03.14] At the body shop, doing something unholy\n ..... ');

// Start the lyrics timer
VanLyricsUtils.startLyricsTimer();

// Pause the lyrics timer
VanLyricsUtils.pauseLyricsTimer();

// Resume the lyrics timer
VanLyricsUtils.resumeLyricsTimer();

// Stop the lyrics timer
VanLyricsUtils.stopLyricsTimer();

// Skip the lyrics timer to the specified time in milliseconds.
VanLyricsUtils.skipToTime(20000);
```

## API Reference

### `setupLyricsContainer(selector)`

Sets up the lyrics container element by specifying the CSS selector of the container.

- `selector` (string): The CSS selector of the lyrics container element.

### `loadLyrics(inputText)`

Loads the lyrics from the provided input text.

- `inputText` (string): The text containing the lyrics.

### `skipToTime(milliseconds)`

Skips the lyrics timer to the specified time in milliseconds.

- `milliseconds` (number): The time to skip to, in milliseconds.

### `startLyricsTimer()`

Starts the lyrics timer.

### `stopLyricsTimer()`

Stops the lyrics timer and resets it to the beginning.

### `pauseLyricsTimer()`

Pauses the lyrics timer.

### `resumeLyricsTimer()`

Resumes the lyrics timer from the paused state.

### `runUnitTest()`

Runs the unit tests for VanLyricsUtils.

## Author

- Author: Vanson Leung
- GitHub: [https://github.com/VansonLeung](https://github.com/VansonLeung)

## License

This project is licensed under the [License Name] - see the [LICENSE](LICENSE) file for details.