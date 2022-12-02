let audioUrl="";
let run=(e)=>{
    let url="https://api.dictionaryapi.dev/api/v2/entries/en/";
    if(e.key==="Enter" || e.type==="click"){
        let mess=document.getElementById("input_").value;
        console.log(mess);
        url=url+mess;
        fetch(url).then((response)=>{
            return response.json();
        }).then((v)=>{
            console.log(v[0]);
            const obj=v[0];
            document.getElementById('word').innerHTML=`${obj.word}`;
            document.getElementById('phonetics').innerHTML=`[${obj.phonetics[obj.phonetics.length-1].text}]`;
            audioUrl=`[${obj.phonetics[obj.phonetics.length-1].audio}]`;
            audioUrl=audioUrl.substring(1,audioUrl.length-1);
            document.getElementById('audio').addEventListener("click",()=>{
                if(audioUrl!=""){
                    var audio = new Audio(audioUrl);
                    audio.play();
                }else{
                    alert("Pronunciation Not Found !");
                }
            })
            document.getElementById('audio').style.opacity="1";
            document.getElementById('pos').innerHTML=`<h3><u>Part Of Speech</u> : ${obj.meanings[0].partOfSpeech}</h3>`;
            document.getElementById('def_').innerHTML='<h3><u>Definition</u> :<ul><br><span id="defination"></span></ul></h3>'
            let define=""
            for(let i=0; i<obj.meanings[0].definitions.length; i++){
                define=define+`<li>${obj.meanings[0].definitions[i].definition}</li>`;
            }
            document.getElementById('defination').innerHTML=`${define}`;
        }).catch(()=>{
            alert('Word Not Found!');
        })
        document.getElementById("input_").value="";
    }
}

document.getElementById("input_").addEventListener("keypress",run);
document.getElementById("search").addEventListener("click",run);