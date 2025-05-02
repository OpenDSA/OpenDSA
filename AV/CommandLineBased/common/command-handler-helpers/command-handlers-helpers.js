import {
  createLSOutputHTMLString,
  createOutputListHTMLString,
} from "../html-string-components/html-string-components.js";

const getLSHelperOutput = (fileNames) => createOutputListHTMLString(fileNames);

const getLSOutput = (errors, results) =>
  createLSOutputHTMLString(errors, results);

export { getLSHelperOutput, getLSOutput };
