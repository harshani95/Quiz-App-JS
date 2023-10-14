
let sec=0;
let qNumber=1;
let dataArray=[];
let interval=undefined;
let submitDataArray=[];
let quizFinished = false;

$('#txt-time').val('00:00');
$('#txt-q-number').val('1/10');
$('#btn-finish').prop('disabled',true);
$('#btn-submit').prop('disabled',true);
$('#btn-show').prop('disabled',true);

class Question{
    constructor(id,question,answers){
        this.id = id;
        this.question= question;
        this.answers = answers;
    }
}

class Answer{
    constructor(id,answer,correctState){
        this.id = id;
        this.answer = answer;
        this.correctState = correctState;
    }
}

let q1 = new Question(1,' 1. What is the purpose of a loop in programming?',[new Answer(1,' To store data', false),new Answer(2,'To make decisions', false),new Answer(3,'To repeat a block of code',true),new Answer(4,'To declare variables', false),]);
let q2 = new Question(2,' 2. Which of the following is a high-level programming language?',[new Answer(1,' C', false),new Answer(2,'Assembly', false),new Answer(3,'Python', true),new Answer(4,'Binary', false),]);
let q3 = new Question(3,' 3. In object-oriented programming, what is encapsulation?',[new Answer(1,' Storing data in a database', false),new Answer(2,'Binding data and methods that operate on the data into a single unit', true),new Answer(3,'Creating an instance of a class', false),new Answer(4,' Writing comments in code', false),]);
let q4 = new Question(4,' 4. What does HTML stand for?',[new Answer(1,' Hyperlink Text Markup Language', false),new Answer(2,'Hyper Transfer Markup Language', false),new Answer(3,'Hypertext Markup Language', true),new Answer(4,' High-Level Text Markup Language', false),]);
let q5 = new Question(5,' 5. Which of the following is not a programming paradigm?',[new Answer(1,' Object-Oriented', false),new Answer(2,' Functional', false),new Answer(3,' Procedural', false),new Answer(4,'Blue', true),]);
let q6 = new Question(6,' 6. What is the purpose of the "if" statement in programming?',[new Answer(1,' To declare variables', false),new Answer(2,'To define functions', false),new Answer(3,'To make decisions and execute code conditionally', true),new Answer(4,'To create loops', false),]);
let q7 = new Question(7,' 7. Which programming language is often used for web development and can be executed on both the client and server sides?',[new Answer(1,'Java', false),new Answer(2,'C++', false),new Answer(3,'Ruby', false),new Answer(4,'Java Script', true),]);
let q8 = new Question(8,' 8. What is a data structure in programming?',[new Answer(1,"A computer's physical components", false),new Answer(2,'A way to organize and store data for efficient access and modification', true),new Answer(3,'A type of programming language', false),new Answer(4,'A software development methodology', false),]);
let q9 = new Question(9,' 9. Which of the following is not a commonly used version control system?',[new Answer(1,' Git', false),new Answer(2,' Subversion (SVN)', false),new Answer(3,'Mercurial', false),new Answer(4,' Java', true),]);
let q10 = new Question(10,' 10. What does "IDE" stand for in programming?',[new Answer(1,' Integrated Development Environment', true),new Answer(2,'Internet Development Environment', false),new Answer(3,'Interactive Design Environment', false),new Answer(4,'Integrated Debugging Environment', false),]);
dataArray.push(q1,q2,q3,q4,q5,q6,q7,q8,q9,q10);

const showAnswers=()=>{
    marks=0;
    for(let x=0; x<submitDataArray.length;x++){
    let selectedQuestion = dataArray[x];
    let selectedAnswer = submitDataArray[x];
    let da = selectedQuestion.answers.find(d=>d.id==selectedAnswer.answer)
    if(da.correctState){
        marks++;
    }
    $("#btn-finish").click(function() {
        dataArray=[];
        $('#question').val('');
        $('#txt-answer').val('Result : '+marks+ '/10');
        $('#btn-finish').prop('disabled',true);
        $('#start-btn').prop('disabled',true);
    });
    }
        if (submitDataArray.length === 10  && submitDataArray.every(response => response !== null)) {
            $('#question').val('    Congraulations!!!!!!      See your result by click Finish Attempt....');
         }   
         
    }
    
  
    function verifyAnswer(action) {
        let selectedAnswer = $('input[name="answer"]:checked');
    
        if (selectedAnswer.length === 0 && action === 'Submit') {
            alert("Please select an answer before proceeding.");
            return;
        }
    
        clearInterval(interval);
    
        if (action === 'Submit') {
            let answer = selectedAnswer.val();
            submitDataArray.push({
                qNumber: qNumber,
                answer: answer,
                time: $('#txt-time').val()
            });
        } else if (action === 'Skip') {
            submitDataArray.push(null);
        }
    
        if (qNumber === 10) {
            // Game has finished all questions
            showAnswers();
            $('#btn-finish').prop('disabled', false);
            $('#btn-submit').prop('disabled', true);
            $('#txt-q-number').val('You are done'); // Set message to "You are done"
            $('#txt-time').val('00:00');
            $('#answer-list').empty();
            $('input[name="answer"]').prop('checked', false);
        } else {
            qNumber++;
            $('#txt-q-number').val(qNumber + '/10');
            displayquiz();
        }
    }
    

        const displayquiz=()=>{
            sec=0;

    let selectedQuestion = dataArray[qNumber-1];

    $('#question').val(selectedQuestion.question);
    $('#answer-list').empty();


    $.each(selectedQuestion.answers,function(index,record){
        let li=$('<li>');
        let rbtn = $('<input>').attr({
            name:'answer',
            type:'radio',
            value:record.id
        });

        let lbl = $('<label>').text(record.answer);

        li.append(rbtn);
        li.append(lbl);
        $('#answer-list').append(li);
    });

    

    interval = setInterval(()=>{
        if(sec<10){
            $('#txt-time').val('0'+sec);
        }else{
            $('#txt-time').val(sec);
        }
        sec++;

        if(sec==30){
            verifyAnswer('skipped');
        }
       
    },1000);
}

const start=()=>{
    $('#start-btn').prop('disabled',true);
    $('#btn-submit').prop('disabled',false);
    $('#btn-show').prop('disabled',false);
    submitDataArray=[];
    displayquiz();
}