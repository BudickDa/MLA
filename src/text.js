import _ from 'underscore';
import stemmer from 'stemmer';
import lancasterStemmer from 'lancaster-stemmer';
import snowballStemmerDe from 'snowball-german';

import Utils from './utils';
import stopwords from './res/stopwords'

import Vector from './vector';


export default class Text {
	static wordTokenizer(text) {
		return text.match(/[\w\u00C0-\u00ff]+/gi);
	}

	static normalize(text) {
		if (typeof text !== 'string') {
			throw new TypeError('Parameter text has to be a string');
		}
		return text.replace(/\n|\t/gi, '').replace(/\s+/gi, ' ').replace(/\d/gi, '%d');
	}

	static async createBagOfWords(text, words = [], language) {
		if (!language) {
			language = Text.languageDetect(text);
		}
		words = words.map(w => w.toLowerCase());
		const wordsOfText = Text.wordTokenizer(text)
			.map(word => {
				return Text.stemmer(word.toLowerCase(), language);
			});
		const values = new Array(words.length).fill(0);
		wordsOfText.forEach(word => {
			const index = words.indexOf(word);
			if (index >= 0 && index < values.length) {
				values[index]++;
			}
		});
		return new Vector(values, text);
	}

	static sentenceTokenizer(text) {
		text = text.replace(/\t/g, '')
			.replace(/\n/g, ' ').replace(/[\s]{2,}/g, ' ')
			.replace(/(\s-\s)[A-Z]/g, '. ');
		const sentences = text.replace(/(\s[A-z\u00C0-\u00ff']+\s[A-z\u00C0-\u00ff0-9']{2,})([\.+|\?|!])(\s[A-Z\u00C0-\u00DD[0-9]|w{3}|http])/g, '$1$2<split>$3')
			.split('<split>').map(sentence => {
				return sentence.trim();
			});

		return _.uniq(sentences);
	}

	static languageDetect(text) {
		if (typeof text !== 'string') {
			throw new TypeError('Parameter text in languageDetect must be a string.');
		}
		text = text.toLowerCase();
		const words = this.wordTokenizer(text);
		const index = [];
		const counts = [];
		for (let language in stopwords){
			index.push(language);
			let count = 0;
			words.forEach(w => {
				_.contains(stopwords[language], w) ? count++ : '';
			});
			counts.push(count);
		}

		return index[counts.indexOf(_.max(counts))];
	}


	/**
	 * Filters stopwords out of string or array of strings.
	 * @param words {String|Array} Array of words or text.
	 * @param language {String} Language (currently supported: de, en, es);
	 */
	static filterStopwords(words, language) {
		if (typeof words === 'string') {
			words = Text.wordTokenizer(words);
		} else if (!Utils.isStringArray(words)) {
			throw new TypeError('Parameter words in filterStopwords must be a string or an array of strings.');
		}
		if (!language) {
			language = Text.languageDetect(words.join(' '));
		}
		if (stopwords.hasOwnProperty(language)) {
			return words.filter(w => !_.contains(stopwords[language], w));
		} else {
			throw new Error(`No stopwords for language ${language}. Supported languages: de, en and es`);
		}
	}

	static stemmer(word, language) {
		if (typeof word !== 'string') {
			throw new TypeError('Parameter word in stemmer must be a string.');
		}
		if (typeof language !== 'string') {
			throw new TypeError('Parameter language in stemmer must be a string.');
		}
		switch (language) {
			case 'en':
				word = stemmer(word);
				break;
			case 'de':
				word = snowballStemmerDe(word);
				break;
			default:
				word = lancasterStemmer(word);
				break;
		}
		return word;
	}

	static wordCounter(array, insensitive = true) {
		if (!Array.isArray(array)) {
			throw new TypeError('Parameter array in wordCounter must be an array.');
		}
		if (insensitive) {
			array = array.map(w => (w.toLowerCase()));
		}
		return _.chain(array)
			.reduce(function(counts, word) {
				counts[word] = (counts[word] || 0) + 1;
				return counts;
			}, {})
			.value();
	}

	static levenshteinDistance(string, otherString) {
		if (string.length === 0) {
			return otherString.length;
		}
		if (otherString.length === 0) {
			return string.length;
		}
		const matrix = [];
		for (let i = 0; i <= otherString.length; i++){
			matrix[i] = [i];
		}
		for (let j = 0; j <= string.length; j++){
			matrix[0][j] = j;
		}
		for (let i = 1; i <= otherString.length; i++){
			for (let j = 1; j <= string.length; j++){
				if (otherString.charAt(i - 1) === string.charAt(j - 1)) {
					matrix[i][j] = matrix[i - 1][j - 1];
				} else {
					matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1,
						Math.min(matrix[i][j - 1] + 1,
							matrix[i - 1][j] + 1));
				}
			}
		}
		return matrix[otherString.length][string.length];
	}
}