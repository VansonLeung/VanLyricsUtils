/*
 * VanLyricsUtils.js
 * Author: Vanson Leung
 * Copyright (c) 2023. All rights reserved.
 *
 * Example usage:

 *  <!-- HTML Installation -->
 *  <!DOCTYPE html>
 *  <html>
 *  <head>
 *    <!-- Other head elements -->
 *    <script src="VanLyricsUtils.js"></script>
 *  </head>
 *  <body>
 *    <!-- Your HTML content -->
 *    <script> 
 *      <!-- run the lyrics util code here -->
 *    </script>
 *  </body>
 *  </html>
 *
 */
 

"use strict";

var VanLyricsUtils = (function() {

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  var lyricsContainer = null;
  var lyrics = [];

  var displayLyrics = function displayLyrics() {
    if (!lyricsContainer) {
      console.error("lyricsContainer not setup properly!");
      return;
    }
    lyricsContainer.innerHTML = "";
    lyrics.forEach(function (_ref, index) {
      var timestamp = _ref.timestamp,
        lyric = _ref.lyric;
      var isActive = currentTimestamp >= timestamp && currentTimestamp < lyrics[index + 1].timestamp;
      var lineElement = document.createElement("div");
      lineElement.innerText = lyric;
      lineElement.classList.add("lyric-line");
      lyricsContainer.appendChild(lineElement);
      lyrics[index].element = lineElement;
    });
  };


  var getCurrentHighlightedLineIndex = function getCurrentHighlightedLineIndex(currentTimestamp) {
    for (var i = 0; i < lyrics.length; i++) {
      var timestamp = lyrics[i].timestamp;
      if (currentTimestamp > timestamp) {
        continue;
      }
      return i - 1;
    }
    return -1;
  };


  var highlightLyricLine = function highlightLyricLine(index) {
    if (!lyricsContainer) {
      return;
    }

    for (var i = 0; i < lyrics.length; i++) {
      var element = lyrics[i].element;
      if (i == index) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    }
  };


  var scrollToLyricLine = function scrollToLyricLine(index) {
    if (!lyricsContainer) {
      return;
    }

    if (index >= 0 && index < lyrics.length) {

      if (previousScrollHighlightedIndex != index) {
        previousScrollHighlightedIndex = index;

        var activeLine = lyrics[index].element;
        var activeLineHeight = activeLine.clientHeight;
        var activeLineOffsetTop = activeLine.offsetTop - lyricsContainer.offsetTop + (activeLineHeight / 2)
  
        var containerHeight = lyricsContainer.clientHeight;
    
        // Calculate the center position of the active line
        var centerPosition = activeLineOffsetTop - (containerHeight) / 2;
        // console.log("ASDSAD", containerHeight, activeLineHeight, "A:", activeLine.getBoundingClientRect().top, "B:", lyricsContainer.getBoundingClientRect().top, activeLineOffsetTop, centerPosition);
        window.aal = activeLine;
        // Scroll to the center position
        lyricsContainer.scrollTo({
          top: centerPosition,
          behavior: 'smooth',
        });
      }

    }

  };


  var currentHighlightedIndex = -1;
  var currentTimestamp = 0;
  var startTime = new Date();
  var endTime = new Date();
  var timeElapsed = endTime - startTime;
  var timeSkip = 0;
  var isPaused = false;
  var previousScrollHighlightedIndex = -1;
  var isAutoScroll = true;


  var lyricsTimer = setInterval(function () {
    if (isPaused) {
      startTime = new Date();
    }
    endTime = new Date();
    timeElapsed = endTime - startTime;
    currentTimestamp = (timeElapsed + timeSkip) / 1000;
    // console.log(timeElapsed, timeSkip, isPaused);
    currentHighlightedIndex = getCurrentHighlightedLineIndex(currentTimestamp);
    highlightLyricLine(currentHighlightedIndex);
    if (isAutoScroll) {
      scrollToLyricLine(currentHighlightedIndex);
    }
  }, 100);




  /**
   * Sets up the lyrics container element.
   * @param {string} selector - The CSS selector for the lyrics container element.
   */
  var setupLyricsContainer = function setupLyricsContainer(selector) {
    lyricsContainer = document.querySelector(selector);
    window.lc = lyricsContainer;
  };


  /**
   * Loads the lyrics from the provided input text.
   * @param {string} inputText - The text containing the lyrics.
   */
  var loadLyrics = function loadLyrics(inputText) {
    var lines = inputText.split("\n").filter(function (line) {
      return line.trim() !== "";
    });
    lines.forEach(function (line) {
      var timestampRegex = /\[(\d{2}:\d{2}\.\d{2})\]/;
      var timestampMatch = line.match(timestampRegex);
      var timestampToSeconds = function timestampToSeconds(timestamp) {
        var _timestamp$split$map = timestamp.split(':').map(parseFloat),
          _timestamp$split$map2 = _slicedToArray(_timestamp$split$map, 2),
          minutes = _timestamp$split$map2[0],
          seconds = _timestamp$split$map2[1];
        return minutes * 60 + seconds;
      };
      if (timestampMatch) {
        var timestamp = timestampMatch[1];
        var lyric = line.replace(timestampRegex, "").trim();
        lyrics.push({
          timestamp: timestampToSeconds(timestamp),
          lyric: lyric
        });
      }
    });

    displayLyrics();
  };

  /**
   * Skips the lyrics timer to the specified time in milliseconds.
   * @param {number} milliseconds - The time in milliseconds to skip to.
   */
  var skipToTime = function skipToTime(milliseconds) {
    timeSkip = milliseconds;
  };

  /**
   * Starts the lyrics timer.
   */
  var startLyricsTimer = function startLyricsTimer() {
    startTime = new Date();
    isPaused = false;
  };

  /**
   * Stops the lyrics timer and resets it to the beginning.
   */
  var stopLyricsTimer = function stopLyricsTimer() {
    skipToTime(0);
    isPaused = true;
    startTime = new Date();
  };

  /**
   * Pauses the lyrics timer at the current elapsed time.
   */
  var pauseLyricsTimer = function pauseLyricsTimer() {
    timeElapsed = endTime - startTime;
    skipToTime(timeElapsed);
    isPaused = true;
    startTime = new Date();
  };

  /**
   * Resumes the lyrics timer from the paused state.
   */
  var resumeLyricsTimer = function resumeLyricsTimer() {
    isPaused = false;
  };

  /**
   * Sets lyrics auto-scrolling.
   */
  var setLyricsAutoScrolling = function setLyricsAutoScrolling(isEnabled) {
    isAutoScroll = isEnabled;
  };

  /**
   * Runs the unit test for the functions.
   */
  var runUnitTest = function runUnitTest() {
    var inputText = "  \n[00:00.04] Mummy don't know daddy's getting hot\n[00:03.14] At the body shop, doing something unholy\n[00:09.34] He lucky, lucky, yeah (ooh)\n[00:13.10] He lucky, lucky, yeah (ye-yeah)\n[00:16.70] He lucky, lucky, yeah\n[00:20.39] He lucky, lucky, yeah\n[00:21.66] A lucky, lucky girl\n[00:24.06] She got married to a boy like you\n[00:27.64] She'd kick you out if she ever, ever knew\n[00:31.25] 'Bout all the - you tell me that you do\n[00:36.45] Dirty, dirty boy\n[00:38.62] You know everyone is talking on the scene\n[00:42.38] I hear them whispering 'bout the places that you've been\n[00:45.98] And how you don't know how to keep your business clean\n[00:51.20] Mummy don't know daddy's getting hot\n[00:54.55] At the body shop, doing something unholy\n[00:58.50] He's sat back while she's dropping it, she be popping it\n[01:03.47] Yeah, she put it down slowly\n[01:05.86] Oh-ee-oh-ee-oh, he left his kids at\n[01:09.47] Ho-ee-oh-ee-ome, so he can get that\n[01:13.18] Mummy don't know daddy's getting hot\n[01:16.53] At the body shop, doing something unholy (woo)\n[01:20.50] Mmm, daddy, daddy, if you want it, drop the add'y (yuh)\n[01:23.74] Give me love, give me Fendi, my Balenciaga daddy\n[01:27.11] You gon' need to bag it up, 'cause I'm spending on Rodeo (woo)\n[01:31.03] You can watch me back it up, I'll be gone in the a.m.\n[01:34.74] And he, he get me Prada, get me Miu Miu like Rihanna (ah)\n[01:39.14] He always call me 'cause I never cause no drama\n[01:42.75] And when you want it, baby, I know I got you covered\n[01:46.41] And when you need it, baby, just jump under the covers\n[01:49.87] Mummy don't know daddy's getting hot\n[01:52.98] At the body shop, doin' somethin' unholy\n[01:57.17] He's sat back while she's dropping it, she be popping it\n[02:02.20] Yeah, she put it down slowly\n[02:04.57] Oh-ee-oh-ee-oh, he left his kids at\n[02:08.16] Ho-ee-oh-ee-ome, so he can get that\n[02:11.88] Mummy don't know daddy's getting hot\n[02:14.95] At the body shop, doin' something unholy\n[02:18.22] \n";
    setupLyricsContainer("#lyrics-container");
    loadLyrics(inputText);
    setTimeout(function () {
      stopLyricsTimer();
    }, 2000);
    setTimeout(function () {
      startLyricsTimer();
    }, 4000);
    setTimeout(function () {
      pauseLyricsTimer();
    }, 6000);
    setTimeout(function () {
      resumeLyricsTimer();
    }, 8000);
    setTimeout(function () {
      stopLyricsTimer();
      loadLyrics(inputText);
      startLyricsTimer();
    }, 10000);
    setTimeout(function () {
      stopLyricsTimer();
      loadLyrics(inputText);
      startLyricsTimer();
      skipToTime(2000);
    }, 12000);
    setTimeout(function () {
      skipToTime(2000);
    }, 16000);
    setTimeout(function () {
      skipToTime(12000);
    }, 20000);
    setTimeout(function () {
      pauseLyricsTimer();
      skipToTime(12000);
    }, 24000);
    setTimeout(function () {
      skipToTime(10000);
    }, 25000);
    setTimeout(function () {
      skipToTime(7000);
    }, 26000);
    setTimeout(function () {
      skipToTime(30000);
    }, 27000);
    setTimeout(function () {
      resumeLyricsTimer();
    }, 28000);
  }

  return {
    setupLyricsContainer: setupLyricsContainer,
    loadLyrics: loadLyrics,
    skipToTime: skipToTime,
    startLyricsTimer: startLyricsTimer,
    stopLyricsTimer: stopLyricsTimer,
    pauseLyricsTimer: pauseLyricsTimer,
    resumeLyricsTimer: resumeLyricsTimer,
    runUnitTest: runUnitTest,
    setLyricsAutoScrolling: setLyricsAutoScrolling,
  }

})();

