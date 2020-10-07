import getWordIndices from "../../../languages/legacy/researches/passiveVoice/periphrastic/getIndicesWithRegex.js";
import includesIndex from "../../../researches/stringProcessing/includesIndex";
import arrayToRegex from "../../../researches/stringProcessing/createRegexFromArray.js";

import cannotDirectlyPrecedePassiveParticipleFrenchFactory from "../../../languages/legacy/researches/french/functionWords.js";
const cannotDirectlyPrecedePassiveParticipleFrench = cannotDirectlyPrecedePassiveParticipleFrenchFactory().cannotDirectlyPrecedePassiveParticiple;

import cannotDirectlyPrecedePassiveParticipleEnglishFactory from "../../../languages/legacy/researches/english/functionWords.js";
const cannotDirectlyPrecedePassiveParticipleEnglish = cannotDirectlyPrecedePassiveParticipleEnglishFactory().cannotDirectlyPrecedePassiveParticiple;

import cannotDirectlyPrecedePassiveParticipleSpanishFactory from "../../../languages/legacy/researches/spanish/functionWords.js";
const cannotDirectlyPrecedePassiveParticipleSpanish = cannotDirectlyPrecedePassiveParticipleSpanishFactory().cannotDirectlyPrecedePassiveParticiple;

import cannotDirectlyPrecedePassiveParticipleItalianFactory from "../../../languages/legacy/researches/italian/functionWords.js";
const cannotDirectlyPrecedePassiveParticipleItalian = cannotDirectlyPrecedePassiveParticipleItalianFactory().cannotDirectlyPrecedePassiveParticiple;

import cannotDirectlyPrecedePassiveParticipleDutchFactory from "../../../languages/legacy/researches/dutch/functionWords.js";
const cannotDirectlyPrecedePassiveParticipleDutch = cannotDirectlyPrecedePassiveParticipleDutchFactory().cannotDirectlyPrecedePassiveParticiple;

import cannotDirectlyPrecedePassiveParticiplePolishFactory from "../../../languages/legacy/researches/polish/functionWords.js";
const cannotDirectlyPrecedePassiveParticiplePolish = cannotDirectlyPrecedePassiveParticiplePolishFactory().cannotDirectlyPrecedePassiveParticiple;


/**
 * Checks whether the participle is directly preceded by a word from the direct precedence exception list.
 * If this is the case, the sentence part is not passive.
 *
 * @param {string} sentencePart The sentence part that contains the participle.
 * @param {number} participleIndex The index of the participle.
 * @param {string} language The language of the participle.
 *
 * @returns {boolean} Returns true if a word from the direct precedence exception list is directly preceding
 * the participle, otherwise returns false.
 */
export default function( sentencePart, participleIndex, language ) {
	let directPrecedenceExceptionRegex;
	switch ( language ) {
		case "fr":
			directPrecedenceExceptionRegex = arrayToRegex( cannotDirectlyPrecedePassiveParticipleFrench );
			break;
		case "es":
			directPrecedenceExceptionRegex = arrayToRegex( cannotDirectlyPrecedePassiveParticipleSpanish );
			break;
		case "it":
			directPrecedenceExceptionRegex = arrayToRegex( cannotDirectlyPrecedePassiveParticipleItalian );
			break;
		case "nl":
			directPrecedenceExceptionRegex = arrayToRegex( cannotDirectlyPrecedePassiveParticipleDutch );
			break;
		case "pl":
			directPrecedenceExceptionRegex = arrayToRegex( cannotDirectlyPrecedePassiveParticiplePolish );
			break;
		case "en":
		default:
			directPrecedenceExceptionRegex = arrayToRegex( cannotDirectlyPrecedePassiveParticipleEnglish );
			break;
	}
	const directPrecedenceExceptionMatch = getWordIndices( sentencePart, directPrecedenceExceptionRegex );
	return includesIndex( directPrecedenceExceptionMatch, participleIndex );
}