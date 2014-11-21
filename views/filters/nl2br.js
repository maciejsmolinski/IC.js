module.exports = function (nunjucks) {

  /**
   * Replaces all occurences of newline with <br> tags
   *
   *   Sample Usage:
   *
   *     {{ 'Hello\n\nWorld' | nl2br }} -> Hello<br><br>World
   *
   */
  return function (string) {
    return new nunjucks.runtime.SafeString(string.replace(/\n/g, '<br>'));
  }

}