const assert = require('assert');
const {Text, Vector} = require("../index");

describe('Text', function() {
	describe('#wordTokenizer', function() {
		it('should return words of text as array', function() {
			const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque erat sed erat elementum placerat. Fusce id leo a tortor viverra aliquam et at nunc.';
			assert.deepEqual(Text.wordTokenizer(text), [
				'Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'Nulla', 'pellentesque', 'erat', 'sed', 'erat', 'elementum', 'placerat', 'Fusce', 'id', 'leo', 'a', 'tortor', 'viverra', 'aliquam', 'et', 'at', 'nunc'
			]);
		});
	});

	describe('#normalize', function() {
		it('remove \\n, \\t and double \\s. Replace numbers with %d', function() {
			const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque erat sed erat elementum placerat. 
			Fusce id leo a tortor viverra aliquam et at nunc:
				1. List item
				2. List item
			Cras tempus, lacus at sagittis tempus, elit ligula semper ante, at cursus ligula diam eget magna. 
			Phone: 0800 / 1234567`;
			assert.equal(Text.normalize(text), 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque erat sed erat elementum placerat. Fusce id leo a tortor viverra aliquam et at nunc:%d. List item%d. List itemCras tempus, lacus at sagittis tempus, elit ligula semper ante, at cursus ligula diam eget magna. Phone: %d%d%d%d / %d%d%d%d%d%d%d');
		});
	});

	describe('#languageDetect', function() {
		it('Findes language with the help of stopwords', function() {
			const de = `Wilton war seit September 1883 bei den Rangers tätig, jedoch vergingen 16 Jahre, bis er 1899 zum Trainer ernannt wurde.
			 Vor seinem Trainerengagement war er Geschäftsführer für die Jugend-Mannschaften und ab 1889 auch für die Profimannschaft.
			 In diesen zehn Jahren als Geschäftsführer der ersten Mannschaft gewann der Verein zwei Meisterschaften (1891 und 1899) und dreimal den 
			 Schottischen Pokal (1894, 1897 und 1898). Als 1890 die Scottish Football League gegründet wurde, kümmerte sich Wilton auch um die Finanzen. 
			 Am Ende der Saison 1890 mussten sich die Rangers den Titel mit Dumbarton teilen. In der Saison 1898/99 stellten die Rangers einen Rekord
			 für die Ewigkeit auf: Sie gewannen alle 18 Spiele, erzielten dabei 79 Tore und mussten nur 18 Gegentore hinnehmen. Bis heute gelang
			 dies noch keinem anderen Team. Lediglich der FC Arsenal kam dem Rekord 2004 etwas näher, als sie eine Saison unbesiegt blieben. 
			 Unter dem Trainerengagement von Wilton gewannen die Rangers achtmal die Meisterschaft. Am Tag nach dem letzten Saisonspiel 1920 
			 wollte Wilton Urlaub in Gourock machen, aber er starb am ersten Urlaubstag bei einem Bootsunfall.`;
			assert.equal(Text.languageDetect(de), 'de', 'This text should be german (de)');

			const en = `Wilton joined the club in September 1883 as a player but never progressed beyond the second string eleven. 
			He was soon appointed secretary to the club's youth team and reserve side. 
			He was also on the special committee that oversaw the club's move from Kinning Park to the first Ibrox ground in 1887. 
			Wilton became match secretary of the first team in 1889, 
			succeeding from James Gossland. The club shared the inaugural Scottish League title in 1891. Wilton had been appointed 
			as the league's first treasurer at the start of the season.

			When the club became a limited company ten years later Wilton was chosen as manager. In his decade as match secretary for the 
			first team, the club won two Scottish league championships in 1891 and 1899, as well as three Scottish Cups in 1894, 1897 and 1898. He also won four Glasgow Cup's in 1893, 1894, 1897 and 1898, and a Charity Cup in 1897. Rangers had achieved the first ever 100% league record, winning all 18 games and scoring 79 goals in 1898-99. To date no team has achieved the same, although several teams have gone unbeaten in a league season since.

			Under Wilton's stewardship as manager, Rangers won eight league championships and another Scottish Cup, nine Glasgow Cups and 
			seven Charity Cups. In his final season as manager the club won its tenth league championship. Wilton died in a boating accident in 1920.`;
			assert.equal(Text.languageDetect(en), 'en', 'This text should be english (en)');

			const es = `Pablo Ruiz Picasso1 (Málaga, 25 de octubre de 1881-Mougins, 8 de abril de 1973) fue un pintor y escultor español, creador, junto con Georges Braque, del cubismo.
									Es considerado desde el génesis del siglo XX como uno de los mayores pintores que participaron en muchos movimientos artísticos que se propagaron por el mundo y ejercieron una gran
									influencia en otros grandes artistas de su tiempo. Sus trabajos están presentes en museos y colecciones de toda Europa y del mundo. Además, abordó otros géneros como el dibujo,
									el grabado, la ilustración de libros, la escultura, la cerámica y el diseño de escenografía y vestuario para montajes teatrales. El crítico de arte y coleccionista Christian Zervos 
									reproduce en su catálogo más de 16 000 obras de Picasso.2

									En lo político, Picasso se declaraba pacifista y comunista. Fue miembro del Partido Comunista de España y del Partido Comunista Francés hasta su muerte3 el 8 de abril de 1973 en 
									su casa llamada «Notre-Dame-de-Vie»4 5 en Mougins (Francia) a los 91 años. Está enterrado en el parque del castillo de Vauvenargues (Bouches-du-Rhone).`;
			assert.equal(Text.languageDetect(es), 'es', 'This text should be español (es)');
		});
	});

	describe('#filterStopwords', function() {
		it('Findes language with the help of stopwords', function() {
			const de = 'Wilton war seit September 1883 bei den Rangers tätig, jedoch vergingen 16 Jahre, bis er 1899 zum Trainer ernannt wurde.';
			const deNoSW = ['Wilton',
				'seit',
				'September',
				'1883',
				'Rangers',
				'tätig',
				'jedoch',
				'vergingen',
				'16',
				'Jahre',
				'1899',
				'Trainer',
				'ernannt',
				'wurde'
			];
			assert.deepEqual(Text.filterStopwords(de), deNoSW);
			assert.deepEqual(Text.filterStopwords(de, 'de'), deNoSW);

			const en = 'Wilton joined the club in September 1883 as a player but never progressed beyond the second string eleven. He was soon appointed secretary to the club\'s youth team and reserve side.';
			const enNoSW = [
				'Wilton',
				'joined',
				'club',
				'September',
				'1883',
				'player',
				'never',
				'progressed',
				'beyond',
				'second',
				'string',
				'eleven',
				'He',
				'soon',
				'appointed',
				'secretary',
				'club',
				'youth',
				'team',
				'reserve',
				'side'
			];
			assert.deepEqual(Text.filterStopwords(en), enNoSW);
			assert.deepEqual(Text.filterStopwords(en, 'en'), enNoSW);

			const es = 'Pablo Ruiz Picasso (Málaga, 25 de octubre de 1881-Mougins, 8 de abril de 1973) fue un pintor y escultor español, creador, junto con Georges Braque, del cubismo.';
			const esNoSW = [
				'Pablo',
				'Ruiz',
				'Picasso',
				'Málaga',
				'25',
				'octubre',
				'1881',
				'Mougins',
				'8',
				'abril',
				'1973',
				'pintor',
				'escultor',
				'español',
				'creador',
				'junto',
				'Georges',
				'Braque',
				'cubismo'
			];
			assert.deepEqual(Text.filterStopwords(es), esNoSW);
			assert.deepEqual(Text.filterStopwords(es, 'es'), esNoSW);
		});
	});

	describe('#stemmer', function() {
		it('it should stem words', function() {
			const en = [
				'absence',
				'absent',
				'absey',
				'absolute',
				'absolutely',
				'absolv',
				'absolver',
				'abstains',
				'abstemious',
				'abstinence',
				'abstract',
				'absurd',
				'absyrtus',
				'abundance',
				'abundant',
				'abundantly'
			];
			const enStemmed = [
				'absenc',
				'absent',
				'absei',
				'absolut',
				'absolut',
				'absolv',
				'absolv',
				'abstain',
				'abstemi',
				'abstin',
				'abstract',
				'absurd',
				'absyrtu',
				'abund',
				'abund',
				'abundantli'
			];
			en.forEach((word, i) => {
				assert.equal(Text.stemmer(word, 'en'), enStemmed[i], `${word} should be stemmed to ${enStemmed[i]}`);
			});

			const de = [
				'abgeraten',
				'abgerieben',
				'abgerissen',
				'abgerissenen',
				'abgesandt',
				'abgeschabtes',
				'abgescheuert',
				'abgeschieden',
				'abgeschiedenen',
				'abgeschlagen',
				'abgeschliffen',
				'abgeschmolzen',
				'abgeschnitten',
				'abgeschossenes',
				'abgeschreckt',
				'abgeschwächt',
				'abgesehen',
				'abgesessen',
				'abgesondert',
				'abgesonderten',
				'abgespannt',
				'abgesperrt',
				'abgesprochen',
				'abgesprungen',
				'abgestellt'
			];
			const deStemmed = [
				'abgerat',
				'abgerieb',
				'abgeriss',
				'abgeriss',
				'abgesandt',
				'abgeschabt',
				'abgescheuert',
				'abgeschied',
				'abgeschied',
				'abgeschlag',
				'abgeschliff',
				'abgeschmolz',
				'abgeschnitt',
				'abgeschoss',
				'abgeschreckt',
				'abgeschwacht',
				'abgeseh',
				'abgesess',
				'abgesondert',
				'abgesondert',
				'abgespannt',
				'abgesperrt',
				'abgesproch',
				'abgespr',
				'abgestellt'
			];
			de.forEach((word, i) => {
				assert.equal(Text.stemmer(word, 'de'), deStemmed[i], `${word} should be stemmed to ${deStemmed[i]}`);
			});
		});
	});

	describe('#createBagOfWords', function() {
		it('create bag of words', function(done) {
			const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque erat sed erat elementum placerat. Fusce id leo a tortor viverra aliquam et at nunc. Lorem ipsum dolor sit amet.';
			Text.createBagOfWords(text, ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur']).then(vector => {
			assert.deepEqual(vector, new Vector([2, 2, 2, 2, 2, 1], text));
			done();
			});
		});
	});

	describe('#sentenceTokenizer', function() {
		it('create array of sentences from text', function() {
			const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit! Nulla pellentesque erat sed erat elementum placerat. Fusce id leo a tortor viverra aliquam et at nunc? Lorem ipsum dolor sit amet.';
			assert.deepEqual(Text.sentenceTokenizer(text), ['Lorem ipsum dolor sit amet, consectetur adipiscing elit!', 'Nulla pellentesque erat sed erat elementum placerat.', 'Fusce id leo a tortor viverra aliquam et at nunc?', 'Lorem ipsum dolor sit amet.'])
		});
	});

	describe('#wordCounter', function() {
		it('count words in text', function() {
			const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque erat sed erat elementum placerat. Fusce id leo a tortor viverra aliquam et at nunc. Lorem ipsum dolor sit amet.';
			assert.deepEqual(Text.wordCounter(Text.wordTokenizer(text)), {
				'lorem': 2,
				'ipsum': 2,
				'dolor': 2,
				'sit': 2,
				'amet': 2,
				'consectetur': 1,
				'adipiscing': 1,
				'elit': 1,
				'nulla': 1,
				'pellentesque': 1,
				'erat': 2,
				'sed': 1,
				'elementum': 1,
				'placerat': 1,
				'fusce': 1,
				'id': 1,
				'leo': 1,
				'a': 1,
				'tortor': 1,
				'viverra': 1,
				'aliquam': 1,
				'et': 1,
				'at': 1,
				'nunc': 1
			});
		});
	});

	describe('#levenshteinDistance', function() {
		it('computes levenshtein distance between two strings', function() {
			assert.equal(Text.levenshteinDistance('a', 'b'), 1);
			assert.equal(Text.levenshteinDistance('ab', 'b'), 1);
			assert.equal(Text.levenshteinDistance('a', 'bc'), 2);
			assert.equal(Text.levenshteinDistance('abcdefg', 'cdefghij'), 5);
		});
	});
})
;
