const questions = [
	{
		question: "Какой язык працює в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');


//  перемениє ігри
let score = 0; // кол-во правельних відповідей
let questionIndex = 0; // текуще запитання

clearePage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearePage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion() {

	const heaerTemplate = `<h2 class="title">%title%</h2>`;
	const title = heaerTemplate.replace('%title%', questions[questionIndex]['question']);
	
	headerContainer.innerHTML = title;
	
	let answerNumber = 1;
	// for ([index, answerText] of questions[questionIndex]['answers'].entries())

	for (answerText of questions[questionIndex]['answers']) {

		const questionTemplate = `
		<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
		</li>
		`
	
		const answerHTML = questionTemplate
													.replace('%answer%', answerText)
													.replace('%number%', answerNumber)
		
		listContainer.innerHTML += answerHTML;
		answerNumber++;
	}


}

function checkAnswer() {

	//Знаходимо вибрану радіо кнопку
	const checktRadio = listContainer.querySelector('input[type="radio"]:checked')


	// Якщо нічого не вибрано виходимо з функції 
	if (!checktRadio) {
		submitBtn.blur();
		return
	}

	const userAnswer = parseInt(checktRadio.value)

	// Правельна відповідь чи ні
	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
	}

	if (questionIndex !== questions.length - 1) {
		console.log('Eto ne poslednui vopros');
		questionIndex++;
		clearePage();
		showQuestion();
		return;
	} else {
		console.log('Eto poslednui vopros');
		clearePage();
		showResults();

	}
}


function showResults() {
	console.log('showResults started');
	console.log(score);


	const resultTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
	`;

	let title, message;

	// варіанти відровідей
	if (score === questions.length) {
		title = 'Поздоровляю!🍻';
		message = 'Відповіли на всі запитання😎👍';
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Непоганий результат!🍻';
		message = 'Відповіли більше половини  запитання😎';
	} else {
		title = 'Треба старатися!🍻';
		message = 'Відповіли менше половини  запитання😭😱😨';
	}

	// резутьтат
	let result = `${score} із ${questions.length}`

	//Фінальна відповідь підставляємо дані в шаблон 
	const finalMessage = resultTemplate
		.replace('%title%', title)
		.replace('%message%', message)
		.replace('%result%', result)
	headerContainer.innerHTML = finalMessage;

	submitBtn.blur();
	submitBtn.innerText = 'Начати заново';
	submitBtn.onclick = () => { history.go() };
}