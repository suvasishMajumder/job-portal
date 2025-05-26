import { useEffect, useState } from 'react'
// import './App.css'
import axios from 'axios'
import toast from 'react-hot-toast';
import manImg from '../assets/joseph.png'
import ReactMarkdown from 'react-markdown';
import { ScaleLoader } from 'react-spinners';
import { LampDemo } from './ui/lamp';


function ChatBot() {
  const [questionValue, setQuestionValue] = useState("");
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);



const hanldeQuestionValue = (event) =>{

 setQuestionValue(event.target.value)

}


async function generateAnswers(){


  if(questionValue.length === 0){

    // alert('Enter a valid question . The question field is blank !');
    // console.log('Enter a valid question . The question field is blank !');
    toast.error('Enter a valid question . The question field is blank !')
    return;

  }
  else if(questionValue.length === 1){
    // alert('Enter a valid question !');
    // console.log('Enter a valid question !');
    toast.error('Enter a valid question !');
    return;

  }

setLoading(true);

const response = await axios({

    url:'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBpi7LH5hM1dGoho0fOtUopEE7KaluxB6o',
    method:'POST',
    data:{
      "contents": [{
        // "parts":[{"text": "Explain why typescript in very important for web development ?"}]
        "parts":[{"text": questionValue}]

        }]
       }



  })



//   console.log(response['data']['candidates'][0]['content']['parts'][0].text);
  const ans = response['data']['candidates'][0]['content']['parts'][0].text;
  setAnswer(ans)
  setLoading(false)

}







  return(



<div className="max-w-[100vw] sm:w-[70vw] h-[130vh] sm:min-h-[100vh] mx-auto overflow-x-hidden space-y-5bg-transparent border-2 border-blue-700">

<div className="w-full flex justify-center p-3.5 items-center h-32 md:h-28 bg-cyan-500">

<h3 className="text-2xl text-center">If you want to take any advice  ? Ask AI Powered <b>Mr. Joseph </b> </h3>

</div>


<div className="container mx-auto lg:w-full h-[70vh] w-full border-2 border-black flex justify-center items-center flex-col space-y-10">

<img src={manImg} className='h-40 w-40 shadow-xl' alt="" />
    <h1 className="text-green-500 text-center text-2xl">Hi ! I'm Mr. Joseph , your AI powered career adviser </h1>


<input type='text' name="" className='p-5 w-3/5 shadow-xl border-[1px] border-white rounded-xl' 
 value={questionValue}
 onChange={(e)=>setQuestionValue(e.target.value)} placeholder='Enter any of your queries related to your career...' id="" />




    <button onClick={generateAnswers} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500
     to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300
      dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 
      font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Click to Ask</button>

<button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg
 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 
 py-2.5 text-center me-2 mb-2 " onClick={(e) => {
  setQuestionValue(e.target.value = "");
  setAnswer("")


 }} >Reset All </button>


      </div>


<div className="answerBox flex justify-center items-center">
<p className="answer p-4 w-3/4 h-auto text-sm  text-left font-medium"> <b className='text-lg text-cyan-500'>{answer 
&& !loading ? "Mr. Joseph:" : ""}</b> 

{/* {!answer && <span>Loading Answer....</span>} */}

<span className='inline-block text-center w-full mx-auto'>{loading && <ScaleLoader color='#ffffff'/>
}</span>

{!loading && <ReactMarkdown>{answer}</ReactMarkdown>}
</p>
</div>
                                                                                   

</div>



  )


}

export default ChatBot;
